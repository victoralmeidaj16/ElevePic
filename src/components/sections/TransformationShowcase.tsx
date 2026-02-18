"use client";

import { motion } from "framer-motion";
import { ComparisonSlider } from "@/components/ui/ComparisonSlider";

export function TransformationShowcase() {
    return (
        <section className="py-24 bg-gradient-to-t from-black/40 to-background relative overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        See the Magic
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Drag the slider to see how AI transforms ordinary selfies into professional masterpieces.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <ComparisonSlider
                        image1="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop" // Casual Selfie
                        image2="https://plus.unsplash.com/premium_photo-1688350338342-65076e077d29?q=80&w=2540&auto=format&fit=crop" // Professional equivalent
                        label1="Original Selfie"
                        label2="AI Professional"
                    />
                    <p className="text-center text-sm text-muted-foreground mt-4 italic">
                        * Actual results may vary based on photo quality.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
