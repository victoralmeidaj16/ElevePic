"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { href: "#styles", label: "Estilos" },
    { href: "#how-it-works", label: "Como funciona" },
    { href: "#pricing", label: "Planos" },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMobile = () => setMobileOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-card/80 backdrop-blur-xl">
            <div className="container flex items-center justify-between h-20 px-4 md:px-6">
                <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="ElevePic Logo"
                        width={40}
                        height={40}
                        className="rounded-xl shadow-lg shadow-blue-900/20"
                    />
                    <span className="text-white font-semibold tracking-tight">
                        ElevePic
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-300 hover:text-white hover:bg-white/5">
                            Entrar
                        </Button>
                    </Link>
                    <Link href="#pricing" className="hidden md:block">
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 font-medium shadow-lg shadow-blue-900/20 border border-blue-500/10">
                            Começar agora
                        </Button>
                    </Link>

                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/5 bg-card/95 backdrop-blur-xl">
                    <nav className="container flex flex-col px-4 py-4 gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMobile}
                                className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors rounded-lg px-4 py-3 text-sm font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="border-t border-white/5 mt-2 pt-4 flex flex-col gap-2">
                            <Link href="/login" onClick={closeMobile}>
                                <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground hover:bg-white/5 justify-start">
                                    Entrar
                                </Button>
                            </Link>
                            <Link href="#pricing" onClick={closeMobile}>
                                <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-lg shadow-blue-900/20">
                                    Começar agora
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
