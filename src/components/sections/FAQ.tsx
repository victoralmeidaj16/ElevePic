"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
    {
        question: "Como funciona a tecnologia?",
        answer: "Nossa IA analisa suas fotos para entender seus traços faciais e cria um modelo digital exclusivo. Depois, usamos esse modelo para gerar novas fotos em diversos estilos com altíssima precisão."
    },
    {
        question: "Qual a qualidade das fotos?",
        answer: "As fotos são geradas em alta definição (4K), perfeitas para usar em redes sociais, LinkedIn, currículos ou até mesmo imprimir."
    },
    {
        question: "Minhas fotos são mantidas em sigilo?",
        answer: "Sim, absolutamente. Suas fotos são usadas apenas para treinar sua IA pessoal e são deletadas dos nossos servidores após a conclusão do processo. Nós levamos sua privacidade muito a sério."
    },
    {
        question: "Quanto tempo demora para receber as fotos?",
        answer: "O processo leva cerca de 30 a 60 minutos após o envio das suas fotos. Você receberá um e-mail assim que tudo estiver pronto."
    },
    {
        question: "Posso pedir reembolso se não gostar?",
        answer: "Se por algum motivo técnico a IA não conseguir gerar fotos com qualidade aceitável, nós analisaremos seu caso e processaremos o reembolso sem problemas."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-gradient-to-b from-black/0 to-black/40 relative">
            <div className="container px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Dúvidas Frequentes
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Tudo o que você precisa saber sobre o ElevePic.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-xl bg-white/5 overflow-hidden transition-all duration-300 hover:bg-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className="text-lg font-medium">{faq.question}</span>
                                <span className="ml-4 shrink-0 text-blue-500">
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
