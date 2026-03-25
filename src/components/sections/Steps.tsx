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
            title: "2. Envie suas Selfies",
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
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        Como funciona
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Pronto em 3 passos simples
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Do upload à foto profissional em minutos. Sem fotógrafo, sem estúdio.
                    </p>
                </div>

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
                            <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-4 shadow-lg shadow-black/20">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
                            </div>

                            {/* Connector Line (Desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] h-[1px] bg-border -z-10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
