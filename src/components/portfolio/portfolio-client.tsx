"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project, ProjectCategory } from "@/types";
import { portfolioProjects } from "@/lib/data";
import { PortfolioCard } from "./portfolio-card";

const categories: ProjectCategory[] = ["Web", "UI/UX", "AI", "Branding"];
const allCategories: ProjectCategory[] = Array.from(new Set(portfolioProjects.map(p => p.category)));


export function PortfolioClient({ isPreview = false }: { isPreview?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");

  const projectsToShow = isPreview ? portfolioProjects.slice(0, 3) : portfolioProjects;
  
  const filteredProjects =
    activeCategory === "All"
      ? projectsToShow
      : projectsToShow.filter((project) => project.category === activeCategory);

  return (
    <>
      {!isPreview && (
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          <Button
            variant={activeCategory === "All" ? "default" : "outline"}
            onClick={() => setActiveCategory("All")}
          >
            All
          </Button>
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div key={project.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{animationDelay: `${index * 100}ms`}}>
            <PortfolioCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
}
