"use client";
import { ProductSection } from "@/components/store/product-section";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { WebsiteTemplate } from "@/types";
import { collection } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function StorePage() {
    const firestore = useFirestore();
    const productsCollection = useMemoFirebase(
        () => (firestore ? collection(firestore, "websiteTemplates") : null),
        [firestore]
    );
    const { data: storeProducts, isLoading } = useCollection<WebsiteTemplate>(productsCollection);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }
  return (
    <div className="py-12">
      <ProductSection products={storeProducts || []} />
    </div>
  );
}

    