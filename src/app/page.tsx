import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { PortfolioSection } from '@/components/portfolio/portfolio-section';
import { ProductSection } from '@/components/store/product-section';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 md:gap-32">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection isPreview={true} />
      <ProductSection isPreview={true} />
    </div>
  );
}
