"use client";

import { motion } from "framer-motion";
import { Upload, Sliders, CheckCircle } from "lucide-react";

export function Steps() {
    const steps = [
        {
            icon: Sliders,
            title: "1. Escolha seu Estilo",
            description: "Navegue pelo nosso catálogo e selecione exatamente como você quer a sua imagem final.",
        },
        {
            icon: Upload,
            title: "2. Upload Inteligente",
            description: "Envie selfies simples do seu celular. Nosso sistema é rápido e 100% seguro.",
        },
        {
            icon: CheckCircle,
            title: "3. Sua Melhor Versão",
            description: "Receba seu pacote de fotos profissionais em alta resolução prontas para impacto máximo.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="flex flex-col items-center text-center space-y-6 relative z-10"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 shadow-lg shadow-black/20">
                                <step.icon className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                            </div>

                            {/* Connector Line (Desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-slate-800 -z-10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
