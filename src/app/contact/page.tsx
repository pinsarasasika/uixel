import { ContactForm } from "@/components/contact/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container py-20 md:py-24">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Get in Touch</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          Have a project in mind or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <Card className="bg-background/50 border-primary/10 p-4 md:p-8 animate-in fade-in slide-in-from-left-12 duration-1000">
          <ContactForm />
        </Card>
        <div className="space-y-8 animate-in fade-in slide-in-from-right-12 duration-1000">
          <Card className="bg-background/50 border-primary/10">
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-primary"/>
                    <span>contact@uixel.digital</span>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary"/>
                    <span>+1 (234) 567-890</span>
                </div>
                <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-primary"/>
                    <span>123 Innovation Drive, Tech City</span>
                </div>
            </CardContent>
          </Card>
           <Card className="bg-background/50 border-primary/10">
            <CardHeader>
                <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
                <Link href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"><Twitter className="w-6 h-6 text-primary"/></Link>
                <Link href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"><Github className="w-6 h-6 text-primary"/></Link>
                <Link href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"><Linkedin className="w-6 h-6 text-primary"/></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
