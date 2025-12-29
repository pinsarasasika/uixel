import { portfolioProjects } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const project = portfolioProjects.find(p => p.id === params.id);
    const projectIndex = portfolioProjects.findIndex(p => p.id === params.id);

    if (!project) {
        notFound();
    }
    
    const nextProject = projectIndex < portfolioProjects.length - 1 ? portfolioProjects[projectIndex + 1] : null;
    const prevProject = projectIndex > 0 ? portfolioProjects[projectIndex - 1] : null;

    const highResImageUrl = project.image.src.replace('/600/400', '/1200/800');

    return (
        <div className="container py-20 md:py-24">
            <div className="mb-8 animate-in fade-in slide-in-from-left-8 duration-500">
                <Button variant="ghost" asChild>
                    <Link href="/portfolio">
                        <ArrowLeft className="mr-2" />
                        Back to Portfolio
                    </Link>
                </Button>
            </div>
            
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">{project.category}</Badge>
                <h1 className="text-4xl md:text-6xl font-bold font-headline">{project.title}</h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                    {project.description}
                </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-primary/10 animate-in fade-in zoom-in-95 duration-1000 delay-200">
                <Image
                    src={highResImageUrl}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    data-ai-hint={project.image.hint}
                    priority
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
                <Card className="bg-background/50 border-primary/10">
                    <CardHeader>
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">Project Overview</h2>
                    </CardHeader>
                    <CardContent className="space-y-6 text-muted-foreground">
                        <p>This section provides a deeper dive into the {project.title} project. It would typically detail the challenge, our innovative solution, and the successful outcome. We'd showcase the technologies used, the design process from wireframes to final UI, and how our work translated into measurable success for the client.</p>
                        <p>For {project.title}, our team focused on the '{project.category}' aspects, delivering a state-of-the-art solution that exceeded expectations. The result is a product that is not only visually stunning but also highly functional and user-friendly, setting a new standard in its domain.</p>
                         <Button asChild>
                            <Link href="#" target="_blank" rel="noopener noreferrer">
                                Visit Live Site <ExternalLink className="ml-2" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex justify-between items-center">
                    <div>
                        {prevProject && (
                            <Button variant="outline" asChild>
                                <Link href={`/portfolio/${prevProject.id}`}>Previous Project</Link>
                            </Button>
                        )}
                    </div>
                    <div>
                       {nextProject && (
                             <Button variant="outline" asChild>
                                <Link href={`/portfolio/${nextProject.id}`}>Next Project</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
