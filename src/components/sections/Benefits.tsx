"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, DollarSign } from "lucide-react";

const benefits = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Get professional results in seconds, not hours. Our AI processes your photos instantly.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20"
    },
    {
        icon: TrendingUp,
        title: "Boost Engagement",
        description: "Professional photos are proven to increase profile views and engagement by up to 40%.",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        icon: DollarSign,
        title: "Save Money",
        description: "No need for expensive photographers or studio rent. Get studio quality for a fraction of the cost.",
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    },
    {
        icon: ShieldCheck,
        title: "Private & Secure",
        description: "Your photos are yours. We use enterprise-grade encryption and never share your data.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    }
];

export function Benefits() {
    return (
        <section className="py-24 bg-black/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Why Choose ElevePic?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        We combine cutting-edge AI with professional photography principles to deliver results that stand out.
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
                            className={`p-6 rounded-2xl border ${benefit.border} ${benefit.bg} backdrop-blur-sm hover:translate-y-[-5px] transition-transform duration-300`}
                        >
                            <div className={`w-12 h-12 rounded-lg ${benefit.bg} flex items-center justify-center mb-4`}>
                                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
