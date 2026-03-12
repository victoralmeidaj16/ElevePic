"use client";

import { useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const images = [
    { key: "direito", src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400", alt: "Advocacia Editorial" },
    { key: "saude", src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400", alt: "Médica Especialista" },
    { key: "linkedin", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400", alt: "Executivo LinkedIn" },
    { key: "direito", src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400", alt: "Advocacia Foco" },
    { key: "saude", src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400", alt: "Médico de Plantão" },
    { key: "corporativo", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400", alt: "Foto Corporativa" },
    { key: "direito", src: "https://images.unsplash.com/photo-1556157382-97eda2d622ca?auto=format&fit=crop&q=80&w=400", alt: "Advocacia Executive" },
    { key: "saude", src: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400", alt: "Consulta Médica" },
    { key: "instagram", src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400", alt: "Executivo Premium" },
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
                        <ToggleGroupItem value="saude" className="sm:px-5 rounded-md">
                            Saúde
                        </ToggleGroupItem>
                        <ToggleGroupItem value="direito" className="sm:px-5 rounded-md">
                            Direito
                        </ToggleGroupItem>
                        <ToggleGroupItem value="linkedin" className="sm:px-5 rounded-md">
                            LinkedIn
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
