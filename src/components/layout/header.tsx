'use client';

import Link from 'next/link';
import { Menu, Sparkles, X, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ADMIN_UID } from '@/lib/constants';
import { useSearchParams } from 'next/navigation';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/store', label: 'Store' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/seo-tool', label: 'SEO Tool' },
];

function AuthButton() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const isAdminLogin = searchParams.has('admin');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };
  
  if (isUserLoading) {
    return <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />;
  }

  if (user) {
    return (
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        <LogOut className="mr-2" /> Sign Out
      </Button>
    );
  }

  if (isAdminLogin) {
    return (
      <Button variant="ghost" size="sm" onClick={handleGoogleSignIn}>
        <LogIn className="mr-2" /> Sign In
      </Button>
    );
  }

  return (
    <Button asChild size="sm">
      <Link href="/contact">Let's Start</Link>
    </Button>
  );
}


export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const filteredNavLinks = navLinks.concat(user && user.uid === ADMIN_UID ? [{ href: '/admin', label: 'Admin' }] : []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold">UIXEL</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {filteredNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <AuthButton />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                   <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <Sparkles className="h-6 w-6 text-primary" />
                      <span className="font-bold">UIXEL</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  {filteredNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                       onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                 <Button className="mt-8" asChild>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
