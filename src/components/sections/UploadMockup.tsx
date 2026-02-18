"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CloudUpload, Image as ImageIcon, Wand2 } from "lucide-react";

export function UploadMockup() {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-black/40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <Badge className="mb-4">Internal Preview</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Intuitive Creation Studio
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Experience the future of photo editing. Simple, fast, and incredibly powerful.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Decorative Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[100px] -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
                            <div className="flex border-b border-white/10">
                                <div className="p-4 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground font-mono">
                                    elevepic_studio_v1.0
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row h-[600px]">
                                {/* Sidebar */}
                                <div className="w-full md:w-64 border-r border-white/10 p-6 space-y-6 hidden md:block">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</label>
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-sm">Untitled Project</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Style</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="aspect-square rounded-md bg-purple-500/20 border border-purple-500/50" />
                                            <div className="aspect-square rounded-md bg-white/5 border border-white/5" />
                                            <div className="aspect-square rounded-md bg-white/5 border border-white/5" />
                                            <div className="aspect-square rounded-md bg-white/5 border border-white/5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Main Area */}
                                <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                                    <div className="w-full max-w-md aspect-[4/3] rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-4 bg-white/5 transition-colors hover:bg-white/10 cursor-pointer group">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <CloudUpload className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold">Drop your photos here</h3>
                                            <p className="text-sm text-muted-foreground">or click to browse</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <Button variant="ghost" className="text-muted-foreground">Clear</Button>
                                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                                            <Wand2 className="w-4 h-4 mr-2" />
                                            Generate Preview
                                        </Button>
                                    </div>
                                </div>

                                {/* Properties Panel (Mock) */}
                                <div className="w-72 border-l border-white/10 p-6 hidden lg:block">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="h-2 w-1/3 bg-white/10 rounded" />
                                            <div className="h-8 w-full bg-white/5 rounded" />
                                            <div className="h-8 w-full bg-white/5 rounded" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-2 w-1/2 bg-white/10 rounded" />
                                            <div className="h-32 w-full bg-white/5 rounded" />
                                        </div>
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
        <span className={`inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 ${className}`}>
            {children}
        </span>
    );
}
