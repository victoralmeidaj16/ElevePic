"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

const TIERS = [
    {
        name: "Starter",
        price: "$29",
        description: "Perfect for trying out your first professional headshots.",
        features: [
            "40 AI-Generated Photos",
            "2 Unique Styles",
            "Standard Resolution",
            "24h Delivery",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$59",
        description: "The most popular choice for professionals and creators.",
        features: [
            "100 AI-Generated Photos",
            "5 Unique Styles",
            "High Resolution (4K)",
            "Priority 2h Delivery",
            "Commercial License",
        ],
        cta: "Go Pro",
        popular: true,
    },
    {
        name: "Ultimate",
        price: "$149",
        description: "For agencies and power users needing maximum variety.",
        features: [
            "300 AI-Generated Photos",
            "All Styles Unlocked",
            "Ultra-High Resolution",
            "Priority 1h Delivery",
            "Dedicated Support",
            "Raw Fles Included",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Pay once, keep forever. No subscription required.
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
                            <Card className={`h-full flex flex-col border-white/5 hover:border-primary/50 transition-colors duration-300 ${tier.popular ? 'bg-primary/5 border-primary/20 shadow-lg shadow-primary/30 scale-105 z-10' : 'bg-black/20'}`}>
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="text-xl font-medium text-muted-foreground">{tier.name}</CardTitle>
                                    <div className="flex items-baseline gap-1 mt-4">
                                        <span className="text-4xl font-bold">{tier.price}</span>
                                        <span className="text-muted-foreground">/pack</span>
                                    </div>
                                    <CardDescription className="mt-2">{tier.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <ul className="space-y-3 mt-4">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm">
                                                <Check className="w-5 h-5 text-primary shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90 shadow-md' : ''}`}
                                        variant={tier.popular ? 'default' : 'outline'}
                                        size="lg"
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
