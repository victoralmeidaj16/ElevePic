"use client";

import { motion } from "framer-motion";
import { ComparisonSlider } from "@/components/ui/ComparisonSlider";

export function TransformationShowcase() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        O Resultado Real
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Arraste para ver como nossa IA transforma selfies comuns em retratos de alta performance.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10"
                >
                    <ComparisonSlider
                        image1="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop" // Casual Selfie
                        image2="https://plus.unsplash.com/premium_photo-1688350338342-65076e077d29?q=80&w=2540&auto=format&fit=crop" // Professional equivalent
                        label1="Selfie Original"
                        label2="IA Profissional"
                    />
                    <p className="text-center text-sm text-slate-500 mt-6 italic">
                        * Resultados reais gerados pela plataforma ElevePic.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
