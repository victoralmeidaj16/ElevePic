"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <span className="text-white font-bold">E</span>
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        ElevePic
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="#styles" className="hover:text-white transition-colors">Styles</Link>
                    <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="hidden sm:flex">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm" className="bg-white text-black hover:bg-white/90">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
