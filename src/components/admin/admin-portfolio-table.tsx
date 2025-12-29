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
import { PortfolioProject } from '@/types';
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
import { collection, writeBatch, doc, deleteDoc } from 'firebase/firestore';
import { samplePortfolioProjects } from '@/lib/sample-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface AdminPortfolioTableProps {
  projects: PortfolioProject[];
  isLoading: boolean;
}

export function AdminPortfolioTable({
  projects,
  isLoading,
}: AdminPortfolioTableProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    const projectsCollection = collection(firestore, 'portfolioProjects');
    const batch = writeBatch(firestore);

    samplePortfolioProjects.forEach(project => {
      const docRef = doc(projectsCollection);
      batch.set(docRef, project);
    });

    try {
      await batch.commit();
      toast({
        title: 'Success!',
        description: 'Sample projects have been added to your portfolio.',
      });
    } catch (error: any) {
      console.error('Error seeding database:', error);
       const contextualError = new FirestorePermissionError({
        operation: 'write',
        path: projectsCollection.path,
        requestResourceData: samplePortfolioProjects,
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

  const handleDelete = (projectId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'portfolioProjects', projectId);
    // Non-blocking delete from our utility file
    deleteDocumentNonBlocking(docRef);
    toast({
      title: "Project deleted",
      description: "The project has been removed from your portfolio.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Portfolio</h2>
        <div className='flex gap-2'>
        <Button onClick={handleSeedDatabase} disabled={isSeeding}>
          {isSeeding ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          Seed Sample Projects
        </Button>
        {/* TODO: Add 'Add New' button here */}
        </div>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
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
            ) : projects.length === 0 ? (
               <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                  No projects found. Try seeding some sample data!
                </TableCell>
              </TableRow>
            ) : (
              projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
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
                              permanently delete the project.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project.id)}
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
