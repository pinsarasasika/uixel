"use client";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { useCollection, useFirestore } from "@/firebase";
import { PortfolioProject } from "@/types";
import { collection } from "firebase/firestore";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";

export default function PortfolioPage() {
  const firestore = useFirestore();
  const projectsCollection = useMemo(
    () => collection(firestore, "portfolioProjects"),
    [firestore]
  );
  const { data: portfolioProjects, isLoading } = useCollection<PortfolioProject>(
    projectsCollection
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <PortfolioSection projects={portfolioProjects || []} />
    </div>
  );
}
