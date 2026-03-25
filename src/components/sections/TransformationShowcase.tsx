"use client";

import { useState, useEffect, useRef } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Style {
    id: string;
    firestoreId: string;
    title: string;
    image: string;
    category: string;
    tags: string[];
}

// How many cards to show initially (2 rows × 3 col = 6)
const INITIAL_VISIBLE = 6;

// Fixed super-categories definition: id → which `category` values from Firestore belong here
const SUPER_CATEGORIES = [
    { id: "todos", label: "Todos", emoji: "✨" },
    { id: "corporativo", label: "Corporativo & Executivo", emoji: "💼", categories: ["corporate", "premium"] },
    { id: "profissoes", label: "Profissões", emoji: "🏛️", categories: ["saude", "direito"] },
    { id: "estudio", label: "Estúdio", emoji: "📷", categories: ["studio"] },
    { id: "cinematico", label: "Cinemático & Noir", emoji: "🎬", categories: ["cinematic", "noir"] },
    { id: "lifestyle", label: "Lifestyle & Criativo", emoji: "🌟", categories: ["lifestyle", "creative", "editorial", "outdoor", "casual"] },
] as const;

// Map a style's category to the super-category id
function getSuperCategory(styleCategory: string): string {
    for (const sc of SUPER_CATEGORIES) {
        if (sc.id === "todos") continue;
        if ("categories" in sc && (sc.categories as readonly string[]).includes(styleCategory)) return sc.id;
    }
    return "todos"; // fallback
}

export function TransformationShowcase() {
    const [key, setKey] = useState("todos");
    const [styles, setStyles] = useState<Style[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const expandRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const res = await fetch("/api/styles");
                const data = await res.json();
                setStyles(data.styles || []);
            } catch (err) {
                console.error("Failed to load styles for showcase:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStyles();
    }, []);

    // Reset expanded when switching filters
    const handleFilterChange = (value: string) => {
        if (value) {
            setKey(value);
            setExpanded(false);
        }
    };

    const getMatchKey = (style: Style) => {
        if (key === "todos") return "todos";
        const sc = getSuperCategory(style.category);
        return sc === key ? key : "none";
    };

    const filteredStyles = key === "todos" ? styles : styles.filter(s => getSuperCategory(s.category) === key);
    const isTodos = key === "todos";
    const visibleStyles = isTodos && !expanded ? styles.slice(0, INITIAL_VISIBLE) : filteredStyles;
    const hasMore = isTodos && styles.length > INITIAL_VISIBLE;

    return (
        <section className="py-24 bg-background relative overflow-hidden border-t border-white/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        Resultados Reais
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Galeria de Resultados
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Veja fotos criadas pela nossa IA. Filtre por estilo para explorar as possibilidades.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    {!loading && (
                        <ToggleGroup
                            type="single"
                            className="bg-card/60 rounded-xl border border-white/10 p-1.5 flex-wrap justify-center gap-1"
                            value={key}
                            onValueChange={handleFilterChange}
                        >
                            {SUPER_CATEGORIES.map(sc => {
                                const count = sc.id === "todos"
                                    ? styles.length
                                    : styles.filter(s => getSuperCategory(s.category) === sc.id).length;
                                if (count === 0 && sc.id !== "todos") return null;
                                return (
                                    <ToggleGroupItem
                                        key={sc.id}
                                        value={sc.id}
                                        className="px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all"
                                    >
                                        <span>{sc.emoji}</span>
                                        <span>{sc.label}</span>
                                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/60">
                                            {count}
                                        </span>
                                    </ToggleGroupItem>
                                );
                            })}
                        </ToggleGroup>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="relative w-full max-w-4xl mx-auto">
                            {/* When showing "todos" with collapse, render static grid */}
                            {isTodos ? (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                                        {visibleStyles.map((style) => (
                                            <div
                                                key={style.firestoreId}
                                                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                            >
                                                <img
                                                    src={style.image}
                                                    alt={style.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                    <span className="text-white font-bold text-sm tracking-tight">{style.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Expanded rows (animated) */}
                                    <AnimatePresence>
                                        {expanded && (
                                            <motion.div
                                                key="extra-rows"
                                                ref={expandRef}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                                                    {styles.slice(INITIAL_VISIBLE).map((style) => (
                                                        <div
                                                            key={style.firestoreId}
                                                            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                                        >
                                                            <img
                                                                src={style.image}
                                                                alt={style.title}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                                <span className="text-white font-bold text-sm tracking-tight">{style.title}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Shadow + Ver Mais button */}
                                    {hasMore && !expanded && (
                                        <div className="relative -mt-32 h-32 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                                        </div>
                                    )}

                                    {hasMore && (
                                        <div className="flex justify-center mt-4">
                                            <button
                                                onClick={() => setExpanded(prev => !prev)}
                                                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
                                            >
                                                {expanded ? (
                                                    <>
                                                        <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                                                        Ver menos
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                                                        Ver mais estilos
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Filtered views use the FlipReveal animation */
                                <FlipReveal
                                    className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
                                    keys={[key]}
                                    showClass="flex"
                                    hideClass="hidden"
                                >
                                    {styles.map((style) => (
                                        <FlipRevealItem key={style.firestoreId} flipKey={getMatchKey(style)}>
                                            <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02] w-full">
                                                <img
                                                    src={style.image}
                                                    alt={style.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                    <span className="text-white font-bold text-sm tracking-tight">{style.title}</span>
                                                </div>
                                            </div>
                                        </FlipRevealItem>
                                    ))}
                                </FlipReveal>
                            )}
                        </div>
                    )}
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8 italic">
                    Resultados gerados pela plataforma ElevePic.
                </p>
            </div>
        </section>
    );
}
