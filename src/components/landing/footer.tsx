"use client";

import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Image from "next/image";

export function Footer() {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer id="footer" className="border-t">
            <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
                <div className="col-span-full md:col-span-1">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="https://oushodcloud.com/public/uploads/25/07/1752687224-974.svg" alt="OushodCloud Logo" width={170} height={40} />
                         <span className="sr-only font-bold">OushodCloud</span>
                    </Link>
                    <p className="text-muted-foreground mt-2 font-bangla">
                        ফার্মেসী ব্যবস্থাপনার আধুনিক সমাধান।
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Company</h3>
                    <ul className="space-y-2">
                        <li><Link href="#about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                        <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                        <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Support</h3>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
                        <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
                        <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
                    </div>
                </div>
            </div>

            <div className="bg-muted/50 py-4">
                <div className="container text-center text-sm text-muted-foreground">
                    &copy; {year} OushodCloud. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
