"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

const testimonials = [
    {
        name: "Juliana Mendes",
        role: "Diretora de Marketing",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        content: "Eu gastava fortunas com fotógrafos. A ElevePic entregou um resultado superior em 5 minutos, por uma fração do preço.",
        rating: 5
    },
    {
        name: "Ricardo Silva",
        role: "Tech Lead",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "A qualidade impressiona. Atualizei meu LinkedIn e notei um aumento imediato em contatos de recrutadores. Altamente recomendado.",
        rating: 5
    },
    {
        name: "Fernanda Costa",
        role: "Criadora de Conteúdo",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        content: "Como criadora, preciso de imagem impecável. Essa ferramenta é essencial para manter minha marca pessoal sempre atualizada.",
        rating: 5
    }
];

export function SocialProof() {
    return (
        <section className="py-24 bg-slate-900 border-y border-white/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        Confiado por Líderes
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Junte-se a profissionais que elevaram sua presença digital com a ElevePic.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card className="h-full bg-background border border-white/5 hover:border-blue-500/30 transition-all rounded-2xl shadow-lg">
                                <CardContent className="p-8 flex flex-col h-full">
                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 mb-8 flex-grow leading-relaxed font-medium">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
                                        <Avatar className="h-10 w-10 border border-white/10">
                                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                            <AvatarFallback><User className="h-5 w-5 text-slate-400" /></AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                                            <p className="text-xs text-blue-400 font-medium">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
