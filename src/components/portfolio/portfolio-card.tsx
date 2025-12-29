import Image from "next/image";
import Link from "next/link";
import { PortfolioProject } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

type PortfolioCardProps = {
  project: PortfolioProject;
};

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl bg-background/50 border-primary/10">
      <Link href={`/portfolio/${project.id}`}>
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <div className="flex justify-between items-center mt-4">
            <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-lg">
                {project.category}
            </Badge>
            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="h-5 w-5"/>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
