import { SeoGenerator } from "@/components/seo-tool/seo-generator";

export default function SeoToolPage() {
  return (
    <div className="container py-20 md:py-24">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">AI SEO Optimizer</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          Use our AI-powered tool to generate effective, SEO-optimized titles and descriptions for your content in seconds.
        </p>
      </div>
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
        <SeoGenerator />
      </div>
    </div>
  );
}
