import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { PortfolioClient } from "./portfolio-client";

export function PortfolioSection({ isPreview = false }: { isPreview?: boolean }) {
  return (
    <section className="container py-20 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Creative Works</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore a selection of our most innovative and successful projects.
        </p>
      </div>
      <PortfolioClient isPreview={isPreview} />
      {isPreview && (
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/portfolio">
              View All Projects <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
