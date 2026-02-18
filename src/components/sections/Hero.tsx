"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] py-20 overflow-hidden text-center">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 backdrop-blur-sm mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Professional Imagery</span>
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl"
                >
                    Transform Your Photos into <br />
                    <span className="text-gradient-brand">Digital Masterpieces</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl"
                >
                    Elevate your personal brand with ElevePic. Upload your photos and let our advanced AI reimagine you in stunning, professional styles.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                >
                    <Button size="xl" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all">
                        Start Creating
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="xl" variant="outline" className="border-white/10 hover:bg-white/5">
                        Explore Styles
                    </Button>
                </motion.div>
            </div>

            {/* Floating Abstract Elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 rotate-12 -z-10 hidden lg:block"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500/20 to-orange-500/20 backdrop-blur-md border border-white/10 -z-10 hidden lg:block"
            />
        </section>
    );
}
