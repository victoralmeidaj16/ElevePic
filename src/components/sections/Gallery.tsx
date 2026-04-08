"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { ChevronRight } from "lucide-react";

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

    return (
        <section id="styles" className="py-24 relative overflow-hidden bg-background">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        Catálogo
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Catálogo de Estilos
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Explore os estilos disponíveis para o seu ensaio.
                    </p>
                </div>

                <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key="gallery-content"
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
                            {styles.map((item, index) => (
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
                                            <div className="w-20 h-24 md:w-24 md:h-32 shrink-0 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 shadow-2xl">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags?.slice(0, 2).map((tag) => (
                                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-4">
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
                <DialogContent className="sm:max-w-2xl bg-background border-white/10 overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-foreground">{selectedStyle?.title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
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
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Tags Relacionadas</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStyle?.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <p className="text-sm text-foreground/80 italic leading-relaxed">
                                        "{selectedStyle?.prompt}"
                                    </p>
                                </div>
                            </div>

                            <Button
                                className="w-full py-6 mt-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all duration-300"
                                onClick={() => (window.location.href = '#pricing')}
                            >
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
