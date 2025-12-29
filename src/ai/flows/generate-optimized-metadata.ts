'use server';

/**
 * @fileOverview An AI agent to generate SEO-optimized titles and descriptions for portfolio projects.
 *
 * - generateOptimizedMetadata - A function that generates SEO-optimized metadata for a given content.
 * - GenerateOptimizedMetadataInput - The input type for the generateOptimizedMetadata function.
 * - GenerateOptimizedMetadataOutput - The return type for the generateOptimizedMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOptimizedMetadataInputSchema = z.object({
  content: z.string().describe('The content of the portfolio project.'),
});

export type GenerateOptimizedMetadataInput = z.infer<typeof GenerateOptimizedMetadataInputSchema>;

const GenerateOptimizedMetadataOutputSchema = z.object({
  title: z.string().describe('The SEO-optimized title for the content.'),
  description: z.string().describe('The SEO-optimized description for the content.'),
});

export type GenerateOptimizedMetadataOutput = z.infer<typeof GenerateOptimizedMetadataOutputSchema>;

export async function generateOptimizedMetadata(
  input: GenerateOptimizedMetadataInput
): Promise<GenerateOptimizedMetadataOutput> {
  return generateOptimizedMetadataFlow(input);
}

const generateOptimizedMetadataPrompt = ai.definePrompt({
  name: 'generateOptimizedMetadataPrompt',
  input: {schema: GenerateOptimizedMetadataInputSchema},
  output: {schema: GenerateOptimizedMetadataOutputSchema},
  prompt: `You are an SEO expert. Generate an SEO-optimized title and description for the following content:\n\nContent: {{{content}}}\n\nTitle:  Include keywords.  Under 60 characters.\nDescription: Include keywords.  Under 160 characters.\n`,
});

const generateOptimizedMetadataFlow = ai.defineFlow(
  {
    name: 'generateOptimizedMetadataFlow',
    inputSchema: GenerateOptimizedMetadataInputSchema,
    outputSchema: GenerateOptimizedMetadataOutputSchema,
  },
  async input => {
    const {output} = await generateOptimizedMetadataPrompt(input);
    return output!;
  }
);
