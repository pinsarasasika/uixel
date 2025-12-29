"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateOptimizedMetadata } from "@/ai/flows/generate-optimized-metadata";
import { Loader2, Wand2 } from "lucide-react";
import type { GenerateOptimizedMetadataOutput } from "@/ai/flows/generate-optimized-metadata";
import { Skeleton } from "../ui/skeleton";

export function SeoGenerator() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateOptimizedMetadataOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (content.length < 50) {
      toast({
        variant: "destructive",
        title: "Content too short",
        description: "Please provide at least 50 characters of content.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateOptimizedMetadata({ content });
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "An error occurred while generating metadata. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-background/50 border-primary/10">
        <CardHeader>
          <CardTitle>Content Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your project description, blog post, or any content here..."
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-background/80"
          />
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Metadata
          </Button>
        </CardContent>
      </Card>

      {(isLoading || result) && (
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-background/50 border-primary/10">
            <CardHeader>
              <CardTitle>Generated Title</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-3/4" />
              ) : (
                <p className="text-lg font-semibold">{result?.title}</p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-background/50 border-primary/10">
            <CardHeader>
              <CardTitle>Generated Description</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <p className="text-muted-foreground">{result?.description}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
