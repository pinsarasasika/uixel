import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const GlassCard = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg ${className}`}
  />
);

export function HeroSection() {
  return (
    <section className="container py-20 md:py-32">
      <div className="relative grid place-items-center text-center gap-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 -z-10 opacity-30 dark:opacity-50">
           <GlassCard className="w-48 h-24 -top-8 -left-8 animate-in fade-in zoom-in duration-1000" />
           <GlassCard className="w-32 h-32 top-16 right-24 animate-in fade-in zoom-in duration-1000 delay-200" />
           <GlassCard className="w-56 h-20 -bottom-12 left-1/4 animate-in fade-in zoom-in duration-1000 delay-400" />
           <GlassCard className="w-24 h-24 -bottom-4 -right-4 animate-in fade-in zoom-in duration-1000 delay-500" />
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-4xl font-headline font-bold md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            Designing the Future of <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Digital Experiences
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
            We are UIXEL, a digital agency that blends innovation, creativity, and technology to build beautiful and effective solutions for brands that dare to be different.
          </p>
        </div>
        <div className="flex gap-4 mt-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <Button size="lg" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/portfolio">
              View Portfolio <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
