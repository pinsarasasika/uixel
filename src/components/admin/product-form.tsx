'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  imageUrl: z.string().url('Please enter a valid image URL.'),
  livePreviewUrl: z.string().url('Please enter a valid live preview URL.'),
  category: z.string().min(2, "Category must be at least 2 characters."),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    onSave: () => void;
}

export function ProductForm({ onSave }: ProductFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: 'https://picsum.photos/seed/product/600/400',
      livePreviewUrl: '#',
      category: 'Template'
    },
  });

  async function onSubmit(data: ProductFormValues) {
    if(!firestore) return;

    setIsSubmitting(true);
    try {
        const collectionRef = collection(firestore, 'websiteTemplates');
        await addDoc(collectionRef, data);

        toast({
            title: 'Product Saved!',
            description: `${data.name} has been added to the store.`
        });
        onSave();
    } catch (error) {
        console.error('Failed to save product: ', error);
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Could not save the product. Please try again.',
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'Minima Template'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description of the product." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="49.99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="p-4 border rounded-md bg-muted/50">
            <p className="text-sm text-muted-foreground">
                For now, please provide a URL for the image. We'll add a direct image upload feature soon! Use a service like <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className='underline'>Unsplash</a> or <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" className='underline'>Picsum Photos</a>.
            </p>
        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://picsum.photos/seed/product/600/400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onSave}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
            </Button>
        </div>
      </form>
    </Form>
  );
}
