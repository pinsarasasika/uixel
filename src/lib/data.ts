import { BrainCircuit, Code, Palette, PenTool, Sparkles, TrendingUp } from "lucide-react";
import type { Service } from "@/types";
import { PlaceHolderImages } from "./placeholder-images";

export const services: Service[] = [
    {
        icon: PenTool,
        title: "Web Design",
        description: "Crafting visually stunning and intuitive websites that engage and convert visitors.",
    },
    {
        icon: Code,
        title: "Web Development",
        description: "Building robust, scalable, and high-performance web applications tailored to your needs.",
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "Designing user-centric interfaces that deliver seamless and meaningful experiences.",
    },
    {
        icon: BrainCircuit,
        title: "AI-powered Solutions",
        description: "Integrating cutting-edge AI to automate processes and unlock new capabilities.",
    },
    {
        icon: TrendingUp,
        title: "SEO & Digital Marketing",
        description: "Boosting your online visibility and driving organic traffic with proven strategies.",
    },
    {
        icon: Sparkles,
        title: "Brand Identity",
        description: "Creating memorable brand identities that resonate with your target audience.",
    },
];

    