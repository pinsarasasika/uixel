import { Github, Linkedin, Sparkles, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center space-x-2">
           <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">UIXEL</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} UIXEL Digital. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
