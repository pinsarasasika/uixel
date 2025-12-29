import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Target, Eye } from "lucide-react";

export default function AboutPage() {
    const aboutHeroImage = PlaceHolderImages.find(img => img.id === 'about-hero')!;
    
    let width: number, height: number;

    if (aboutHeroImage.imageUrl.includes('images.unsplash.com')) {
        const url = new URL(aboutHeroImage.imageUrl);
        width = parseInt(url.searchParams.get('w') || '1200');
        height = parseInt(url.searchParams.get('h') || '800');
    } else {
        const urlParts = aboutHeroImage.imageUrl.split('/');
        width = parseInt(urlParts[urlParts.length - 2]);
        height = parseInt(urlParts[urlParts.length - 1]);
    }


  return (
    <div className="container py-20 md:py-24">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">About UIXEL</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          We are a collective of designers, developers, and strategists passionate about building the future of the web.
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden mb-16 animate-in fade-in zoom-in-95 duration-1000">
        <Image
          src={aboutHeroImage.imageUrl}
          alt="UIXEL Team"
          width={width}
          height={height}
          data-ai-hint={aboutHeroImage.imageHint}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-lg">
         <Card className="bg-background/50 border-primary/10 animate-in fade-in slide-in-from-left-12 duration-1000">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    To empower businesses with transformative digital solutions that are not only aesthetically pleasing but also profoundly functional. We strive to push the boundaries of technology and design to create lasting value for our clients and their users.
                </p>
            </CardContent>
        </Card>
         <Card className="bg-background/50 border-accent/10 animate-in fade-in slide-in-from-right-12 duration-1000">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <Eye className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-2xl font-semibold">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    To be a globally recognized leader in digital innovation, known for our commitment to excellence, our futuristic vision, and our ability to turn ambitious ideas into digital realities. We envision a web that is more beautiful, accessible, and intelligent.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
