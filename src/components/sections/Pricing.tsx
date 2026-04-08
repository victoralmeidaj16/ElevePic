"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

import { Check, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

const TIERS = [
    {
        id: "starter",
        name: "Essencial",
        price: "R$ 89,90",
        description: "Para profissionais que precisam de fotos impecáveis para LinkedIn e portfólio.",
        features: [
            "5 Fotos Geradas por IA",
            "Estilos à sua escolha",
            "Alta Resolução",
            "Entrega em 24h",
        ],
        cta: "Começar Agora",
        popular: false,
    },
    {
        id: "pro",
        name: "Profissional",
        price: "R$ 109,90",
        description: "A escolha mais popular para profissionais e criadores de conteúdo.",
        features: [
            "12 Fotos Geradas por IA",
            "Múltiplos Estilos Únicos",
            "Alta Resolução (4K)",
            "Prioridade: Entrega em 2h",
            "Licença Comercial",
        ],
        cta: "Escolher Profissional",
        popular: true,
    },
];

export function Pricing() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCheckout = async (tierId: string) => {
        setLoadingTier(tierId);
        setErrorMessage(null);
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
                setErrorMessage("Não foi possível iniciar o pagamento. Tente novamente.");
            }
        } catch {
            setErrorMessage("Erro de conexão. Verifique sua internet e tente novamente.");
        } finally {
            setLoadingTier(null);
        }
    };

    return (
        <section id="pricing" className="py-24 relative bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        Planos
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Investimento Único
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Sem assinaturas mensais. Pague uma vez, use para sempre.
                    </p>
                </div>

                {errorMessage && (
                    <div className="max-w-4xl mx-auto mb-6 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                                ? 'bg-card border-primary/50 shadow-2xl shadow-primary/20 scale-105 z-10'
                                : 'bg-background/50 border-white/5 hover:border-white/10'
                                }`}>
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                                        Mais Escolhido
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="text-xl font-medium text-muted-foreground">{tier.name}</CardTitle>
                                    <div className="flex items-baseline gap-1 mt-4">
                                        <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                                        <span className="text-muted-foreground text-sm">/pacote</span>
                                    </div>
                                    <CardDescription className="mt-2 text-muted-foreground">{tier.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <ul className="space-y-4 mt-4">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                                                <Check className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className={`w-full rounded-xl py-6 ${tier.popular
                                            ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20'
                                            : 'bg-white/5 hover:bg-white/10 text-foreground border border-white/5'
                                            }`}
                                        variant={tier.popular ? 'default' : 'outline'}
                                        size="lg"
                                        disabled={loadingTier !== null}
                                        onClick={() => handleCheckout(tier.id)}
                                    >
                                        {loadingTier === tier.id ? (
                                            <>
                                                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                                Aguarde...
                                            </>
                                        ) : tier.cta}
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
