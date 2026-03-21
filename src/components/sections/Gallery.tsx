"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { ChevronRight, HeartPulse, Gavel, Crown, User, Camera, Coffee, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Style {
    id: string;
    firestoreId: string;
    title: string;
    image: string;
    category: "men" | "women";
    prompt: string;
    tags: string[];
}

export function Gallery() {
    const [activeTab, setActiveTab] = useState<"men" | "women">("men");
    const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
    const [styles, setStyles] = useState<Style[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const res = await fetch("/api/styles");
                const data = await res.json();
                setStyles(data.styles || []);
            } catch (err) {
                console.error("Failed to load styles for landing page:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStyles();
    }, []);

    const filteredStyles = styles.filter(s => s.category === activeTab);

    return (
        <section id="styles" className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        Catálogo de Estilos
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Explore os estilos reais disponíveis para o seu ensaio.
                    </p>

                    {/* Tab Switcher */}
                    <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mt-6">
                        <button
                            onClick={() => setActiveTab("men")}
                            className={cn(
                                "px-8 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                activeTab === "men"
                                    ? "bg-white text-black shadow-lg"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            Para Homens
                        </button>
                        <button
                            onClick={() => setActiveTab("women")}
                            className={cn(
                                "px-8 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                activeTab === "women"
                                    ? "bg-white text-black shadow-lg"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            Para Mulheres
                        </button>
                    </div>
                </div>

                <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />
                        ))
                    ) : (
                        <>
                            {filteredStyles.map((item, index) => (
                                <motion.div
                                    key={item.firestoreId}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04, duration: 0.3 }}
                                >
                                    <Card 
                                        className="group overflow-hidden border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer" 
                                        onClick={() => setSelectedStyle(item)}
                                    >
                                        <CardContent className="p-4 md:p-6 flex items-center gap-6">
                                            {/* Style Cover Image */}
                                            <div className="w-20 h-24 md:w-24 md:h-32 shrink-0 rounded-xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags?.slice(0, 2).map((tag) => (
                                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-white transition-colors mt-4">
                                                    Ver Detalhes
                                                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </>
                    )}
                    </motion.div>
                </AnimatePresence>
                </div>
            </div>

            {/* Style Details Dialog */}
            <Dialog open={!!selectedStyle} onOpenChange={() => setSelectedStyle(null)}>
                <DialogContent className="sm:max-w-2xl bg-slate-950 border-white/10 overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">{selectedStyle?.title}</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Exemplo de resultado para o estilo selecionado.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                            <img
                                src={selectedStyle?.image}
                                alt={selectedStyle?.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Tags Relacionadas</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStyle?.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-500/20">
                                    <p className="text-sm text-blue-100 italic leading-relaxed">
                                        "{selectedStyle?.prompt}"
                                    </p>
                                </div>
                            </div>

                            <Button className="w-full py-6 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-900/20 transition-all duration-300" onClick={() => (window.location.href = '#pricing')}>
                                Gerar Fotos com este Estilo
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
