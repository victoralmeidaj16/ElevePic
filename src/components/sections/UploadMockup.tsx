"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CloudUpload, Wand2 } from "lucide-react";

export function UploadMockup() {
    return (
        <section className="py-24 bg-background overflow-hidden relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <Badge className="mb-6">Preview da Plataforma</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                        Estúdio de Criação Intuitivo
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Experimente o futuro da edição. Simples, rápido e incrivelmente poderoso.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Decorative Glow */}
                    <div className="absolute inset-0 bg-blue-600/10 blur-[100px] -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Card className="border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl rounded-2xl">
                            <div className="flex border-b border-white/5 bg-white/5">
                                <div className="p-4 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                                    <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                                    <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                                </div>
                                <div className="flex-1 flex items-center justify-center text-xs text-slate-500 font-mono">
                                    elevepic_studio_app
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row h-[500px]">
                                {/* Sidebar */}
                                <div className="w-full md:w-64 border-r border-white/5 p-6 space-y-8 hidden md:block bg-black/20">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Projeto Atual</label>
                                        <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-500/20 text-sm text-blue-200 font-medium">Headshots LinkedIn</div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estilo Selecionado</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="aspect-square rounded-lg bg-blue-600 ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900 transition-all cursor-pointer" />
                                            <div className="aspect-square rounded-lg bg-slate-800 border border-white/5 hover:bg-slate-700 transition-all cursor-pointer" />
                                            <div className="aspect-square rounded-lg bg-slate-800 border border-white/5 hover:bg-slate-700 transition-all cursor-pointer" />
                                            <div className="aspect-square rounded-lg bg-slate-800 border border-white/5 hover:bg-slate-700 transition-all cursor-pointer" />
                                        </div>
                                    </div>
                                </div>

                                {/* Main Area */}
                                <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

                                    <div className="w-full max-w-md aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-6 bg-slate-900/50 transition-colors hover:bg-slate-800/50 cursor-pointer group">
                                        <div className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <CloudUpload className="w-10 h-10 text-blue-500" />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="text-lg font-semibold text-slate-200">Arraste suas fotos aqui</h3>
                                            <p className="text-sm text-slate-500">JPG ou PNG até 5MB</p>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex gap-4 w-full max-w-md">
                                        <Button variant="ghost" className="text-slate-400 hover:text-white flex-1">Limpar</Button>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-2 shadow-lg shadow-blue-900/20 w-2/3">
                                            <Wand2 className="w-4 h-4 mr-2" />
                                            Gerar Prévia
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ${className}`}>
            {children}
        </span>
    );
}
