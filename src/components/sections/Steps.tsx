"use client";

import { motion } from "framer-motion";
import { Upload, Sliders, CheckCircle } from "lucide-react";

export function Steps() {
    const steps = [
        {
            icon: Upload,
            title: "1. Upload Your Photos",
            description: "Securely upload 10-20 selfies. We care about your privacy.",
        },
        {
            icon: Sliders,
            title: "2. Choose Your Styles",
            description: "Select from our curated library of professional and creative looks.",
        },
        {
            icon: CheckCircle,
            title: "3. Get Results",
            description: "Receive high-resolution, AI-enhanced portraits in minutes.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full -z-10" />

            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="flex flex-col items-center text-center space-y-4 relative z-10"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group hover:bg-white/10 transition-colors duration-300">
                                <step.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>

                            {/* Connector Line (Desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/5 to-transparent -z-10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
