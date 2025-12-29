import type { LucideIcon } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ProjectCategory = "Web" | "UI/UX" | "AI" | "Branding";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: {
    id: string;
    src: string;
    width: number;
    height: number;
    hint: string;
  };
};

export type Product = {
  id:string;
  title: string;
  description: string;
  price: number;
  image: {
    id: string;
    src: string;
    width: number;
    height: number;
    hint: string;
  };
  livePreviewUrl: string;
}
