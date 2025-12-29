import { storeProducts } from "@/lib/data";
import { ProductCard } from "./product-card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ProductSection({ isPreview = false }: { isPreview?: boolean }) {
  const productsToShow = isPreview ? storeProducts.slice(0, 3) : storeProducts;

  return (
    <section className="container py-20 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Pre-made Websites & Templates</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Accelerate your project with our professionally designed templates.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsToShow.map((product, index) => (
           <div key={product.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{animationDelay: `${index * 100}ms`}}>
             <ProductCard product={product} />
          </div>
        ))}
      </div>
       {isPreview && (
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/store">
              Explore Store <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
