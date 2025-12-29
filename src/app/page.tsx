"use client";
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { PortfolioSection } from '@/components/portfolio/portfolio-section';
import { ProductSection } from '@/components/store/product-section';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { PortfolioProject } from '@/types';
import { collection } from 'firebase/firestore';
import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const firestore = useFirestore();
  const projectsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, "portfolioProjects") : null),
    [firestore]
  );
  const { data: portfolioProjects, isLoading } =
    useCollection<PortfolioProject>(projectsCollection);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20 md:gap-32">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection isPreview={true} projects={portfolioProjects || []} />
      <ProductSection isPreview={true} />
    </div>
  );
}
