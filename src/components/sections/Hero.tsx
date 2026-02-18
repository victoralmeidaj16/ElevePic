"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] py-20 overflow-hidden text-center bg-background">
            {/* Subtle Gradient Background - Strict Navy/Blue */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/10 border border-blue-500/20 text-sm font-semibold text-blue-400 mb-6">
                        <span>Identidade Profissional Digital</span>
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white"
                >
                    Sua imagem no nível <br />
                    <span className="text-blue-500">da sua carreira.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
                >
                    Pareça confiante. Sem parecer artificial. <br />
                    Foto profissional. Sem estúdio.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Button size="xl" className="group bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all font-semibold px-8 py-6 text-lg shadow-lg shadow-blue-900/20">
                        Criar minha foto
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="xl" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 rounded-2xl px-8 py-6 text-lg">
                        Ver Galeria
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
