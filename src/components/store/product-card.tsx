import Image from "next/image";
import Link from "next/link";
import type { WebsiteTemplate } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

type ProductCardProps = {
  product: WebsiteTemplate;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl bg-background/50 border-primary/10 transition-all duration-300 hover:shadow-xl hover:border-primary/30">
        <div className="relative overflow-hidden">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
            />
        </div>
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                <Badge variant="default" className="bg-primary/20 text-primary border-primary/30">${product.price}</Badge>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground text-sm">{product.description}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
            <Button variant="outline" className="w-full" asChild>
                <Link href={product.livePreviewUrl} target="_blank">
                    <Eye className="mr-2 h-4 w-4" /> Live Preview
                </Link>
            </Button>
            <Button className="w-full" asChild>
                <Link href="#">Buy Now</Link>
            </Button>
        </CardFooter>
    </Card>
  );
}

    