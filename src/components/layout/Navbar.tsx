"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-900/80 backdrop-blur-xl">
            <div className="container flex items-center justify-between h-20 px-4 md:px-6">
                <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                        <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <span className="text-white font-semibold tracking-tight">
                        ElevePic
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link href="#styles" className="hover:text-white transition-colors">Estilos</Link>
                    <Link href="#how-it-works" className="hover:text-white transition-colors">Como funciona</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Planos</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-300 hover:text-white hover:bg-white/5">
                            Entrar
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 font-medium shadow-lg shadow-blue-900/20 border border-blue-500/10">
                            Começar agora
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
