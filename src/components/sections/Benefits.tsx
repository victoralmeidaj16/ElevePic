"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, DollarSign } from "lucide-react";

const benefits = [
    {
        icon: Zap,
        title: "Velocidade Real",
        description: "De selfie a headshot profissional em menos de 60 segundos.",
    },
    {
        icon: TrendingUp,
        title: "Autoridade Digital",
        description: "Perfis com fotos profissionais recebem até 21x mais visitas e 9x mais conexões.",
    },
    {
        icon: DollarSign,
        title: "Investimento Inteligente",
        description: "Qualidade de estúdio por 1% do custo e sem sair de casa.",
    },
    {
        icon: ShieldCheck,
        title: "Privacidade Total",
        description: "Suas fotos são suas. Criptografia ponta a ponta e exclusão automática.",
    }
];

export function Benefits() {
    return (
        <section className="py-24 bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        Por que escolher a ElevePic?
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Unimos inteligência artificial de ponta com princípios de fotografia corporativa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`p-8 rounded-2xl border border-white/5 bg-slate-900 hover:bg-slate-800/80 transition-all duration-300 group`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors`}>
                                <benefit.icon className={`w-6 h-6 text-blue-500`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
