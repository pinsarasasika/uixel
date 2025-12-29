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
import { useFirestore, useStorage } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Loader2, Upload } from 'lucide-react';
import { uploadImage } from '@/firebase/storage';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  image: z.instanceof(File).refine(file => file.size > 0, 'Please select an image.'),
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
  const storage = useStorage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      livePreviewUrl: '#',
      category: 'Template'
    },
  });

  async function onSubmit(data: ProductFormValues) {
    if(!firestore || !storage) return;

    setIsSubmitting(true);
    try {
        const imageUrl = await uploadImage(storage, data.image, 'product-images');
        const collectionRef = collection(firestore, 'websiteTemplates');
        await addDoc(collectionRef, {
            name: data.name,
            description: data.description,
            price: data.price,
            livePreviewUrl: data.livePreviewUrl,
            category: data.category,
            imageUrl: imageUrl,
        });

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
         <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline">
                    <label htmlFor="product-image-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </label>
                  </Button>
                  <Input
                    id="product-image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    {...rest}
                  />
                  {imagePreview && (
                      <Image src={imagePreview} alt="Image preview" width={80} height={80} className="rounded-md object-cover" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="livePreviewUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Preview URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
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
