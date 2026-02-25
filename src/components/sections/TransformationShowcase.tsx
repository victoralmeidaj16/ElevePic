"use client";

import { useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const images = [
    { key: "linkedin", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400", alt: "Executivo LinkedIn" },
    { key: "instagram", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400", alt: "Retrato Instagram" },
    { key: "corporativo", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400", alt: "Foto Corporativa" },
    { key: "linkedin", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400", alt: "Perfil LinkedIn" },
    { key: "corporativo", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400", alt: "Retrato Corporativo" },
    { key: "instagram", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400", alt: "Criativo Instagram" },
    { key: "linkedin", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400", alt: "Headshot LinkedIn" },
    { key: "corporativo", src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400", alt: "Retrato Executiva" },
    { key: "instagram", src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400", alt: "Lifestyle Instagram" },
];

export function TransformationShowcase() {
    const [key, setKey] = useState("all");

    return (
        <section className="py-24 bg-background relative overflow-hidden border-t border-white/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Galeria de Resultados
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Veja fotos reais criadas pela nossa IA. Filtre por categoria para explorar os estilos.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <ToggleGroup
                        type="single"
                        className="bg-card/60 rounded-lg border border-white/10 p-1"
                        value={key}
                        onValueChange={(value) => { if (value) setKey(value); }}
                    >
                        <ToggleGroupItem value="all" className="sm:px-5 rounded-md">
                            Todos
                        </ToggleGroupItem>
                        <ToggleGroupItem value="linkedin" className="sm:px-5 rounded-md">
                            LinkedIn
                        </ToggleGroupItem>
                        <ToggleGroupItem value="instagram" className="sm:px-5 rounded-md">
                            Instagram
                        </ToggleGroupItem>
                        <ToggleGroupItem value="corporativo" className="sm:px-5 rounded-md">
                            Corporativo
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <FlipReveal
                        className="grid grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto"
                        keys={[key]}
                        showClass="flex"
                        hideClass="hidden"
                    >
                        {images.map((img, i) => (
                            <FlipRevealItem key={i} flipKey={img.key}>
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
                                />
                            </FlipRevealItem>
                        ))}
                    </FlipReveal>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8 italic">
                    * Resultados reais gerados pela plataforma ElevePic.
                </p>
            </div>
        </section>
    );
}
