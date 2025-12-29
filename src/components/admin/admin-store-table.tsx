'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash2, UploadCloud } from 'lucide-react';
import { WebsiteTemplate } from '@/types';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useFirestore } from '@/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { sampleStoreProducts } from '@/lib/sample-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface AdminStoreTableProps {
  products: WebsiteTemplate[];
  isLoading: boolean;
}

export function AdminStoreTable({
  products,
  isLoading,
}: AdminStoreTableProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Firestore not available",
            description: "Please try again later."
        });
        setIsSeeding(false);
        return;
    }
    const productsCollection = collection(firestore, 'websiteTemplates');
    const batch = writeBatch(firestore);

    sampleStoreProducts.forEach(product => {
      const docRef = doc(productsCollection);
      batch.set(docRef, product);
    });

    try {
      await batch.commit();
      toast({
        title: 'Success!',
        description: 'Sample products have been added to your store.',
      });
    } catch (error: any) {
      console.error('Error seeding database:', error);
       const contextualError = new FirestorePermissionError({
        operation: 'write',
        path: productsCollection.path,
        requestResourceData: sampleStoreProducts,
      });
      errorEmitter.emit('permission-error', contextualError);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          error.message || 'Could not seed the database. Check permissions.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDelete = (productId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'websiteTemplates', productId);
    deleteDocumentNonBlocking(docRef);
    toast({
      title: "Product deleted",
      description: "The product has been removed from your store.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Store</h2>
        <div className='flex gap-2'>
        <Button onClick={handleSeedDatabase} disabled={isSeeding}>
          {isSeeding ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          Seed Sample Products
        </Button>
        {/* TODO: Add 'Add New' button here */}
        </div>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
               <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                  No products found. Try seeding some sample data!
                </TableCell>
              </TableRow>
            ) : (
              products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" disabled>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

    