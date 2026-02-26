"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

const TIERS = [
    {
        id: "starter",
        name: "Inicial",
        price: "R$ 90",
        description: "Perfeito para testar seus primeiros headshots profissionais.",
        features: [
            "40 Fotos Geradas por IA",
            "2 Estilos Únicos",
            "Resolução Padrão",
            "Entrega em 24h",
        ],
        cta: "Começar Agora",
        popular: false,
    },
    {
        id: "pro",
        name: "Profissional",
        price: "R$ 140",
        description: "A escolha mais popular para profissionais e criadores.",
        features: [
            "100 Fotos Geradas por IA",
            "5 Estilos Únicos",
            "Alta Resolução (4K)",
            "Prioridade: Entrega em 2h",
            "Licença Comercial",
        ],
        cta: "Escolher Profissional",
        popular: true,
    },
    {
        id: "business",
        name: "Empresarial",
        price: "R$ 149",
        description: "Para agências e power users que precisam de variedade máxima.",
        features: [
            "300 Fotos Geradas por IA",
            "Todos os Estilos Liberados",
            "Ultra-Alta Resolução",
            "Prioridade: Entrega em 1h",
            "Suporte Dedicado",
            "Arquivos RAW Incluídos",
        ],
        cta: "Falar com Vendas",
        popular: false,
    },
];

export function Pricing() {
    const handleCheckout = async (tierId: string) => {
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId: tierId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Failed to create checkout session");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    return (
        <section id="pricing" className="py-24 relative bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        Investimento Único
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Sem assinaturas mensais. Pague uma vez, use para sempre.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {TIERS.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative"
                        >
                            <Card className={`h-full flex flex-col transition-all duration-300 rounded-2xl ${tier.popular
                                ? 'bg-slate-900 border-blue-500/50 shadow-2xl shadow-blue-900/20 scale-105 z-10'
                                : 'bg-slate-950/50 border-white/5 hover:border-white/10'
                                }`}>
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                                        Mais Escolhido
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="text-xl font-medium text-slate-300">{tier.name}</CardTitle>
                                    <div className="flex items-baseline gap-1 mt-4">
                                        <span className="text-4xl font-bold text-white">{tier.price}</span>
                                        <span className="text-slate-500 text-sm">/pacote</span>
                                    </div>
                                    <CardDescription className="mt-2 text-slate-400">{tier.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <ul className="space-y-4 mt-4">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                                                <Check className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-blue-500' : 'text-slate-500'}`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className={`w-full rounded-xl py-6 ${tier.popular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
                                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                                            }`}
                                        variant={tier.popular ? 'default' : 'outline'}
                                        size="lg"
                                        onClick={() => handleCheckout(tier.id)}
                                    >
                                        {tier.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
