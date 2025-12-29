import { services } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ServicesSection() {
    return (
        <section className="container py-20 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Expertise</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    From concept to launch, we provide end-to-end solutions that drive growth.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <Card 
                        key={service.title} 
                        className="bg-background/50 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-in fade-in slide-in-from-bottom-12 duration-1000"
                        style={{animationDelay: `${index * 100}ms`}}
                    >
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                                <service.icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
