"use client";

import { motion } from "framer-motion";
import { Briefcase, Star, TrendingUp } from "lucide-react";
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
    .map(id => STYLES.find(style => style.id === id))
    .filter((style): style is StyleOption => !!style);

const MARQUEE_STYLES = [...AUTONOMO_STYLES, ...AUTONOMO_STYLES];

const PROMPT_POSTER_BACKGROUNDS: Record<string, string> = {
    premium: "from-[#0f172a] via-[#172554] to-[#312e81]",
    corporate: "from-[#111827] via-[#1f2937] to-[#334155]",
    direito: "from-[#1c1917] via-[#292524] to-[#0f172a]",
    studio: "from-[#111827] via-[#374151] to-[#d1d5db]",
    editorial: "from-[#172033] via-[#0f172a] to-[#3b82f6]",
    lifestyle: "from-[#2a2118] via-[#6b4f36] to-[#d6b38d]",
    saude: "from-[#0f172a] via-[#164e63] to-[#0f766e]",
    creative: "from-[#111827] via-[#1e1b4b] to-[#be185d]",
    cinematic: "from-[#0b1220] via-[#1d4ed8] to-[#0f172a]",
    casual: "from-[#1f2937] via-[#334155] to-[#475569]",
    outdoor: "from-[#1c1917] via-[#365314] to-[#166534]",
    noir: "from-[#020617] via-[#111827] to-[#374151]",
    formatura: "from-[#1e293b] via-[#7c2d12] to-[#0f172a]",
};

function hasLocalImage(image: string) {
    return image.startsWith("/styles/");
}

function PromptPoster({ style }: { style: StyleOption }) {
    const background = PROMPT_POSTER_BACKGROUNDS[style.category] ?? "from-[#0f172a] via-[#1e293b] to-[#111827]";
    const promptPreview = style.prompt
        .replace(/\[person\]/g, "profissional")
        .split(".")
        .slice(0, 2)
        .join(".")
        .trim();

    return (
        <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${background}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.25),transparent_32%)]" />
            <div className="absolute inset-x-6 top-6 h-px bg-white/20" />
            <div className="absolute inset-x-6 bottom-6 h-px bg-white/10" />
            <div className="relative flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
                        {style.category}
                    </span>
                    <Briefcase className="h-4 w-4 text-white/50" />
                </div>

                <div className="space-y-3">
                    <h3 className="max-w-[14rem] text-xl font-semibold leading-tight text-white">
                        {style.title}
                    </h3>
                    <p className="max-w-[15rem] text-xs leading-relaxed text-white/70">
                        {promptPreview}
                    </p>
                </div>
            </div>
        </div>
    );
}

function StyleCard({ style }: { style: StyleOption }) {
    return (
        <article className="group w-[280px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <div className="relative aspect-[4/5] overflow-hidden">
                {hasLocalImage(style.image) ? (
                    <img
                        src={style.image}
                        alt={style.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                ) : (
                    <PromptPoster style={style} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-base font-semibold leading-tight text-white">
                        {style.title}
                    </h3>
                </div>
            </div>
        </article>
    );
}

export function ProfissionaisAutonomos() {
    return (
        <section className="relative overflow-hidden bg-background py-24">
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="mb-12 flex flex-col items-center space-y-4 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        <Briefcase className="h-3 w-3" />
                        Para Profissionais Autônomos
                    </span>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                        Fotos que vendem<br className="hidden md:block" /> a sua expertise
                    </h2>

                    <p className="max-w-2xl text-lg text-muted-foreground">
                        Consultores, freelancers e criadores que investem numa imagem profissional
                        <strong className="text-foreground"> conquistam mais clientes e cobram mais</strong>.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        {[
                            { icon: TrendingUp, label: "LinkedIn Profile Views +3x" },
                            { icon: Star, label: "Personal Branding de alto impacto" },
                            { icon: Briefcase, label: "Ideal para portfólio e propostas" },
                        ].map(({ icon: Icon, label }) => (
                            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground">
                                <Icon className="h-3 w-3 text-primary" />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative overflow-hidden"
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

                    <div className="autonomo-marquee flex w-max gap-5">
                        {MARQUEE_STYLES.map((style, index) => (
                            <StyleCard key={`${style.id}-${index}`} style={style} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
