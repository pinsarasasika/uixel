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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { uploadImage } from '@/firebase/storage';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  category: z.enum(["Web", "UI/UX", "AI", "Branding"]),
  image: z.instanceof(File).refine(file => file.size > 0, 'Please select an image.'),
  projectUrl: z.string().url('Please enter a valid project URL.'),
});

type PortfolioFormValues = z.infer<typeof formSchema>;

interface PortfolioFormProps {
    onSave: () => void;
}

export function PortfolioForm({ onSave }: PortfolioFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  const storage = useStorage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      projectUrl: '#',
      category: 'Web'
    },
  });

  async function onSubmit(data: PortfolioFormValues) {
    if(!firestore || !storage) return;

    setIsSubmitting(true);
    try {
        const imageUrl = await uploadImage(storage, data.image, 'portfolio-images');

        const collectionRef = collection(firestore, 'portfolioProjects');
        await addDoc(collectionRef, {
            title: data.title,
            description: data.description,
            category: data.category,
            projectUrl: data.projectUrl,
            imageUrl: imageUrl,
        });

        toast({
            title: 'Project Saved!',
            description: `${data.title} has been added to your portfolio.`
        });
        onSave();
    } catch (error) {
        console.error('Failed to save project: ', error);
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Could not save the project. Please try again.',
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'Project Alpha'" {...field} />
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
                <Textarea placeholder="A brief description of the project." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Web">Web</SelectItem>
                  <SelectItem value="UI/UX">UI/UX</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="Branding">Branding</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Project Image</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </label>
                  </Button>
                  <Input
                    id="image-upload"
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
          name="projectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project URL</FormLabel>
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
            Save Project
            </Button>
        </div>
      </form>
    </Form>
  );
}
