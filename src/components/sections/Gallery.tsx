"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { ChevronRight, Briefcase, Camera, Trees, User, Coffee, GraduationCap, Palette, HeartPulse, Gavel, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

// Category Data in Portuguese as requested
const CATEGORIES = {
    men: {
        label: "Ensaios para Homens",
        description: "Explore os estilos disponíveis para ensaios masculinos",
        items: [
            {
                id: "m-saude",
                name: "Área da Saúde",
                description: "Médicos, dentistas e profissionais da saúde",
                icon: HeartPulse,
                color: "from-cyan-500 to-blue-700",
                examples: [
                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                ]
            },
            {
                id: "m-direito",
                name: "Advocacia",
                description: "Estilos clássicos e autoritários para advogados",
                icon: Gavel,
                color: "from-slate-700 to-slate-900",
                examples: [
                    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1556157382-97eda2d622ca?auto=format&fit=crop&q=80&w=800"
                ]
            },
            {
                id: "m-premium",
                name: "Premium / CEO",
                description: "O mais alto nível de autoridade e prestígio",
                icon: Crown,
                color: "from-amber-500 to-yellow-800",
                examples: [
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
                ]
            },
            {
                id: "m-corporativo",
                name: "Corporativo",
                description: "Fotos profissionais para LinkedIn e negócios",
                icon: User,
                color: "from-blue-900 to-slate-900",
                examples: [
                    "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=800&auto=format&fit=crop"
                ]
            },
            {
                id: "m-estudio",
                name: "Estúdio",
                description: "Ensaios em ambiente de estúdio profissional",
                icon: Camera,
                color: "from-zinc-700 to-black",
                examples: [
                    "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
                ]
            },
        ]
    },
    women: {
        label: "Ensaios para Mulheres",
        description: "Explore os estilos disponíveis para ensaios femininos",
        items: [
            {
                id: "f-saude",
                name: "Área da Saúde",
                description: "Médicas, dentistas e profissionais da saúde",
                icon: HeartPulse,
                color: "from-cyan-400 to-blue-600",
                examples: [
                    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1527613052228-8a897e77301f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800"
                ]
            },
            {
                id: "f-direito",
                name: "Advocacia",
                description: "Posturas de confiança e autoridade para advogadas",
                icon: Gavel,
                color: "from-slate-600 to-slate-800",
                examples: [
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop"
                ]
            },
            {
                id: "f-premium",
                name: "Premium / Executiva",
                description: "O mais alto nível para CEOs e líderes",
                icon: Crown,
                color: "from-amber-400 to-yellow-700",
                examples: [
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
                ]
            },
            {
                id: "f-casual",
                name: "Casual",
                description: "Estilo despojado e natural",
                icon: Coffee,
                color: "from-amber-600 to-orange-900",
                examples: [
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
                ]
            },
            {
                id: "f-formatura",
                name: "Formatura",
                description: "Celebrando sua conquista acadêmica",
                icon: GraduationCap,
                color: "from-blue-600 to-indigo-900",
                examples: [
                    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1535982330050-f1c2fb970584?q=80&w=800&auto=format&fit=crop"
                ]
            },
        ]
    }
};

type CategoryKey = keyof typeof CATEGORIES;
type StyleItem = typeof CATEGORIES['men']['items'][0];

export function Gallery() {
    const [activeTab, setActiveTab] = useState<CategoryKey>("men");
    const [selectedStyle, setSelectedStyle] = useState<StyleItem | null>(null);

    // Function to open modal
    const handleOpenStyle = (item: StyleItem) => {
        setSelectedStyle(item);
    };

    return (
        <section id="styles" className="py-24 bg-black/20 relative">
            <div className="container px-4 md:px-6 max-w-5xl">
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Catálogo de Estilos
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Escolha o estilo perfeito para o seu momento.
                    </p>

                    {/* Tab Switcher */}
                    <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mt-6">
                        <button
                            onClick={() => setActiveTab("men")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                activeTab === "men"
                                    ? "bg-white text-black shadow-lg"
                                    : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Para Homens
                        </button>
                        <button
                            onClick={() => setActiveTab("women")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                activeTab === "women"
                                    ? "bg-white text-black shadow-lg"
                                    : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Para Mulheres
                        </button>
                    </div>
                </div>

                <div className="space-y-2 mb-8">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                        {CATEGORIES[activeTab].label}
                    </h3>
                    <p className="text-muted-foreground">{CATEGORIES[activeTab].description}</p>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            {CATEGORIES[activeTab].items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="group overflow-hidden border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer" onClick={() => handleOpenStyle(item)}>
                                        <CardContent className="p-4 md:p-6 flex items-center gap-6">
                                            {/* Icon/Image Placeholder */}
                                            <div className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-inner`}>
                                                <item.icon className="w-8 h-8 text-white/80" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h4>
                                                <p className="text-sm md:text-base text-muted-foreground truncate md:whitespace-normal">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Style Detail Modal */}
            <Dialog open={!!selectedStyle} onOpenChange={(open) => !open && setSelectedStyle(null)}>
                <DialogContent className="max-w-2xl bg-black/80 backdrop-blur-xl border-white/10">
                    <DialogHeader>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedStyle?.color} flex items-center justify-center`}>
                                {selectedStyle && <selectedStyle.icon className="w-6 h-6 text-white/80" />}
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">{selectedStyle?.name}</DialogTitle>
                                <DialogDescription>{selectedStyle?.description}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {selectedStyle?.examples?.map((src, i) => (
                            <div key={i} className="aspect-[3/4] rounded-md overflow-hidden bg-white/5 relative group">
                                <img
                                    src={src}
                                    alt={`Exemplo ${selectedStyle.name} ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">
                            Escolher este estilo
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
