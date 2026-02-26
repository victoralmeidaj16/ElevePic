"use client";

import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Star, ArrowRight } from "lucide-react";
import { BGPattern } from "@/components/ui/bg-pattern";

export function Hero() {
    return (
        <section className="relative py-32 bg-background overflow-hidden">
            <BGPattern variant="grid" mask="fade-edges" />
            <div className="container text-center px-4 md:px-6 relative z-10">
                <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
                    <h1 className="text-3xl font-extrabold lg:text-6xl tracking-tight text-foreground">
                        Sua imagem no nível <br className="hidden md:block" />
                        <span className="text-primary">da sua carreira.</span>
                    </h1>
                    <p className="text-balance text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                        Pareça confiante. Sem parecer artificial. <br />
                        Foto profissional. Sem estúdio.
                    </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        size="lg"
                        className="rounded-full px-8 text-lg h-12"
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Criar minha foto
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 text-lg h-12"
                        onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Ver Galeria
                    </Button>
                </div>

                <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
                    <span className="mx-4 inline-flex items-center -space-x-4">
                        {[
                            "https://www.shadcnblocks.com/images/block/avatar-1.webp",
                            "https://www.shadcnblocks.com/images/block/avatar-2.webp",
                            "https://www.shadcnblocks.com/images/block/avatar-3.webp",
                            "https://www.shadcnblocks.com/images/block/avatar-4.webp",
                            "https://www.shadcnblocks.com/images/block/avatar-5.webp",
                        ].map((src, index) => (
                            <Avatar key={index} className="size-14 border border-background">
                                <AvatarImage src={src} alt={`Avatar ${index + 1}`} />
                            </Avatar>
                        ))}
                    </span>
                    <div>
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className="size-5 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>
                        <p className="text-left font-medium text-muted-foreground">
                            from 200+ reviews
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
