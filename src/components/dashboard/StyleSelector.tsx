"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STYLE_CATEGORIES } from "@/lib/styles-data";
import { FirestoreStyle, getStyles } from "@/lib/styles-service";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StyleSelectorProps {
    selectedStyles: string[];
    onSelect: (id: string) => void;
}

export function StyleSelector({ selectedStyles, onSelect }: StyleSelectorProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [styles, setStyles] = useState<FirestoreStyle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/styles")
            .then(res => res.json())
            .then(data => setStyles(data.styles || []))
            .catch(err => console.error("Failed to load styles:", err))
            .finally(() => setLoading(false));
    }, []);

    const filteredStyles = activeCategory
        ? styles.filter(s => s.category === activeCategory)
        : styles;

    return (
        <div className="space-y-8">
            {/* Header and Category Filter */}
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Catálogo de Estilos</h2>
                    <p className="text-slate-400 text-sm">Navegue pelas referências e selecione os visuais para o seu ensaio.</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={cn(
                            "shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border",
                            activeCategory === null
                                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        Todos os Estilos
                    </button>
                    {STYLE_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border",
                                activeCategory === cat.id
                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <span className="text-base">{cat.emoji}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Catalog Grid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="aspect-[4/5] rounded-xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory ?? "all"}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 xl:gap-4"
                    >
                        {filteredStyles.map((style, index) => {
                            const isSelected = selectedStyles.includes(style.id);
                            // Generate a mock ID number based on index for the visual catalog feel
                            const displayId = String(index + 100).padStart(3, '0');

                            return (
                                <div
                                    key={style.firestoreId}
                                    onClick={() => onSelect(style.id)}
                                    className={cn(
                                        "group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-slate-900 border-2 transition-all duration-300",
                                        isSelected
                                            ? "border-blue-500 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20"
                                            : "border-transparent hover:border-white/20"
                                    )}
                                >
                                    {style.image ? (
                                        <img
                                            src={style.image}
                                            alt={style.title}
                                            className={cn(
                                                "w-full h-full object-cover transition-all duration-700",
                                                isSelected ? "scale-105 brightness-110" : "group-hover:scale-105 group-hover:brightness-110"
                                            )}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                                <span className="text-xl font-bold text-white/30">{style.title.charAt(0)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Gradient Overlay */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300",
                                        isSelected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                                    )} />

                                    {/* ID Number Badge (Top Left) */}
                                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white/90">
                                        #{displayId}
                                    </div>

                                    {/* Selection Check (Top Right) */}
                                    <div className={cn(
                                        "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                        isSelected
                                            ? "bg-blue-600 border-blue-400 text-white scale-100 opacity-100"
                                            : "bg-black/40 border-white/30 text-transparent scale-90 opacity-0 group-hover:opacity-100"
                                    )}>
                                        <Check className={cn("w-4 h-4", isSelected ? "opacity-100" : "opacity-0")} />
                                    </div>

                                    {/* Info Panel (Bottom) */}
                                    <div className="absolute bottom-0 left-0 p-4 w-full">
                                        <p className="text-sm font-semibold text-white/90 truncate mb-1">
                                            {style.title}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {style.tags?.slice(0, 1).map(tag => (
                                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 backdrop-blur-sm border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Selected Overlay Border */}
                                    {isSelected && (
                                        <div className="absolute inset-0 border-4 border-blue-500/80 rounded-xl pointer-events-none" />
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}

