import { BrainCircuit, Code, Palette, PenTool, Sparkles, TrendingUp } from "lucide-react";
import type { Service, Project, Product, ProjectCategory } from "@/types";
import { PlaceHolderImages } from "./placeholder-images";

const findImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        // Fallback or error handling
        return { id: 'fallback', src: 'https://picsum.photos/seed/fallback/600/400', width: 600, height: 400, hint: 'abstract' };
    }
    const urlParts = image.imageUrl.split('/');
    const width = urlParts[urlParts.length - 2];
    const height = urlParts[urlParts.length - 1];
    
    return {
        id: image.id,
        src: image.imageUrl,
        width: parseInt(width),
        height: parseInt(height),
        hint: image.imageHint,
    };
};

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

export const portfolioProjects: Project[] = [
    { id: "proj-1", title: "QuantumLeap", description: "A futuristic web platform for a leading tech innovator.", category: "Web", image: findImage('portfolio-1') },
    { id: "proj-2", title: "Aura Finance", description: "A sleek mobile banking app with a focus on user experience.", category: "UI/UX", image: findImage('portfolio-2') },
    { id: "proj-3", title: "Synapse AI", description: "An analytics dashboard powered by machine learning insights.", category: "AI", image: findImage('portfolio-3') },
    { id: "proj-4", title: "Nova Branding", description: "A complete brand identity overhaul for a space-tech startup.", category: "Branding", image: findImage('portfolio-4') },
    { id: "proj-5", title: "Zenith Commerce", description: "An e-commerce store with a minimalist and modern aesthetic.", category: "Web", image: findImage('portfolio-5') },
    { id: "proj-6", title: "Vision OS", description: "A conceptual UI for a next-generation operating system.", category: "UI/UX", image: findImage('portfolio-6') },
];

export const storeProducts: Product[] = [
    { id: "prod-1", title: "Minima", description: "A clean and minimalist portfolio template for creatives.", price: 49, image: findImage('product-1'), livePreviewUrl: "#" },
    { id: "prod-2", title: "Dashly", description: "A feature-rich dashboard UI kit for SaaS applications.", price: 79, image: findImage('product-2'), livePreviewUrl: "#" },
    { id: "prod-3", title: "Agency X", description: "A bold and modern template for digital agencies.", price: 69, image: findImage('product-3'), livePreviewUrl: "#" },
    { id: "prod-4", title: "Shopify Pro", description: "A premium e-commerce template for fashion brands.", price: 99, image: findImage('product-4'), livePreviewUrl: "#" },
]
