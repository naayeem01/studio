"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export function Header() {
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#about", label: "About Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="https://oushodcloud.com/public/uploads/25/07/1752687224-974.svg" alt="OushodCloud Logo" width={170} height={40} />
            <span className="sr-only font-bold">OushodCloud</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between md:justify-end space-x-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 pt-12">
                <Link href="/" className="mr-6 flex items-center space-x-2 px-6">
                    <Image src="https://oushodcloud.com/public/uploads/25/07/1752687224-974.svg" alt="OushodCloud Logo" width={170} height={40} />
                    <span className="sr-only font-bold">OushodCloud</span>
                </Link>
                <div className="my-6 flex flex-col space-y-3 px-6">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-primary py-2 text-lg"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="md:hidden flex items-center">
            <Image src="https://oushodcloud.com/public/uploads/25/07/1752687224-974.svg" alt="OushodCloud Logo" width={170} height={40} />
            <span className="sr-only font-bold">OushodCloud</span>
          </Link>

          <Button className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
            Buy Now
          </Button>
        </div>
      </div>
    </header>
  );
}
