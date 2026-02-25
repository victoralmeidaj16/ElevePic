"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STYLES, STYLE_CATEGORIES } from "@/lib/styles-data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StyleSelectorProps {
    selectedStyles: string[];
    onSelect: (id: string) => void;
}

export function StyleSelector({ selectedStyles, onSelect }: StyleSelectorProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredStyles = activeCategory
        ? STYLES.filter(s => s.category === activeCategory)
        : STYLES;

    return (
        <div className="space-y-6">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={cn(
                        "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                        activeCategory === null
                            ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                            : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white"
                    )}
                >
                    Todos
                </button>
                {STYLE_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                            "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                            activeCategory === cat.id
                                ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                                : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white"
                        )}
                    >
                        <span>{cat.emoji}</span>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Style Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory ?? "all"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    {filteredStyles.map((style) => {
                        const isSelected = selectedStyles.includes(style.id);
                        return (
                            <div
                                key={style.id}
                                onClick={() => onSelect(style.id)}
                                className={cn(
                                    "group relative aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 border-2 cursor-pointer",
                                    isSelected
                                        ? "border-primary ring-2 ring-primary/50 scale-[1.02]"
                                        : "border-transparent hover:border-white/20 hover:scale-[1.01]"
                                )}
                            >
                                {/* Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={style.image}
                                    alt={style.title}
                                    className={cn(
                                        "w-full h-full object-cover transition-transform duration-500",
                                        isSelected ? "scale-110" : "group-hover:scale-110"
                                    )}
                                />

                                {/* Overlay */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity",
                                    isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                                )} />

                                {/* Selection Indicator */}
                                <div className={cn(
                                    "absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all border",
                                    isSelected
                                        ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                                        : "bg-black/30 backdrop-blur-sm border-white/20 opacity-0 group-hover:opacity-100"
                                )}>
                                    <Check className={cn("w-4 h-4", isSelected ? "opacity-100" : "opacity-0")} />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-4 w-full">
                                    <p className={cn(
                                        "text-sm font-bold text-white mb-1.5 transition-transform",
                                        isSelected ? "translate-y-0" : "translate-y-1"
                                    )}>
                                        {style.title}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {style.tags?.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white/80 backdrop-blur-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
