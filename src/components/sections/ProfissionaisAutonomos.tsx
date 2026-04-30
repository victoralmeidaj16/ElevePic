"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { STYLES, StyleOption } from "@/lib/styles-data";

const AUTONOMO_IDS = [
    "executivo-moderno-shelf",
    "executivo-borda-mesa",
    "lideranca-determinacao",
    "personal-branding-founder",
    "commercial-studio-clean",
    "corporate-headshot",
    "modern-editorial-minimal",
    "light-gray-executive",
    "modern-navy-professional",
    "advogado-leaning-led",
    "advogado-sitting-led",
    "advogado-leaning-forward",
];

const AUTONOMO_STYLES = AUTONOMO_IDS
    .map(id => STYLES.find(s => s.id === id))
    .filter(Boolean) as StyleOption[];

const INITIAL_VISIBLE = 6;

const PLACEHOLDERS = [
    "from-blue-900/40 to-slate-900/60",
    "from-slate-800/50 to-zinc-900/60",
    "from-indigo-900/40 to-slate-900/60",
    "from-zinc-800/50 to-slate-900/60",
    "from-blue-950/50 to-zinc-900/60",
    "from-slate-900/60 to-blue-950/40",
];

export function ProfissionaisAutonomos() {
    const [selected, setSelected] = useState<StyleOption | null>(null);
    const [expanded, setExpanded] = useState(false);

    const visible = expanded ? AUTONOMO_STYLES : AUTONOMO_STYLES.slice(0, INITIAL_VISIBLE);

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        <Briefcase className="w-3 h-3" />
                        Para Profissionais Autônomos
                    </span>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Fotos que vendem<br className="hidden md:block" /> a sua expertise
                    </h2>

                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Consultores, freelancers e criadores que investem numa imagem profissional
                        <strong className="text-foreground"> conquistam mais clientes e cobram mais</strong>.
                        Escolha o estilo que representa quem você é.
                    </p>

                    {/* Social proof pills */}
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        {[
                            { icon: TrendingUp, label: "LinkedIn Profile Views +3x" },
                            { icon: Star, label: "Personal Branding de alto impacto" },
                            { icon: Briefcase, label: "Ideal para portfólio e propostas" },
                        ].map(({ icon: Icon, label }) => (
                            <span key={label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-white/10 bg-white/5 px-3 py-1.5 rounded-full">
                                <Icon className="w-3 h-3 text-primary" />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cards grid */}
                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {visible.map((style, index) => {
                            const hasImage = !!style.image;
                            const placeholder = PLACEHOLDERS[index % PLACEHOLDERS.length];

                            return (
                                <motion.button
                                    key={style.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.35 }}
                                    onClick={() => setSelected(style)}
                                    className="group text-left w-full rounded-2xl overflow-hidden border border-white/8 bg-white/5 hover:bg-white/8 hover:border-primary/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    {/* Thumbnail */}
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        {hasImage ? (
                                            <img
                                                src={style.image}
                                                alt={style.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${placeholder} flex items-center justify-center`}>
                                                <span className="text-3xl font-bold text-white/10 tracking-tight select-none">
                                                    {style.title.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                                            {style.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {style.tags?.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                            Ver estilo
                                            <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Gradient fade when collapsed */}
                    {!expanded && AUTONOMO_STYLES.length > INITIAL_VISIBLE && (
                        <div className="relative -mt-24 h-24 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                        </div>
                    )}
                </div>

                {/* Expand / Collapse + CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    {AUTONOMO_STYLES.length > INITIAL_VISIBLE && (
                        <button
                            onClick={() => setExpanded(prev => !prev)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-slate-300 hover:text-white transition-all duration-300"
                        >
                            {expanded ? "Ver menos" : `Ver todos os ${AUTONOMO_STYLES.length} estilos`}
                        </button>
                    )}
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full shadow-lg shadow-primary/20"
                        onClick={() => (window.location.href = "#pricing")}
                    >
                        Começar agora
                        <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Style detail dialog */}
            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent className="sm:max-w-2xl bg-background border-white/10 overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{selected?.title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Estilo do catálogo de Profissionais Autônomos
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                            {selected?.image ? (
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-slate-900/60 flex items-center justify-center">
                                    <Briefcase className="w-16 h-16 text-white/10" />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-between">
                            <div className="space-y-5">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selected?.tags?.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <p className="text-xs text-foreground/70 italic leading-relaxed line-clamp-6">
                                        "{selected?.prompt}"
                                    </p>
                                </div>
                            </div>

                            <Button
                                className="w-full py-6 mt-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20"
                                onClick={() => (window.location.href = "#pricing")}
                            >
                                Gerar com este estilo
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
