"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Zap, Loader2, Download, AlertCircle, CheckCircle2, Image as ImageIcon, Plus } from "lucide-react";
import { StyleSelector } from "@/components/dashboard/StyleSelector";
import { STYLES } from "@/lib/styles-data";
import { useAuth } from "@/context/AuthContext";
import { getUserImages, UserImage } from "@/lib/user-storage";
import { saveGeneration } from "@/lib/gallery-storage";
import { getUserProfile, deductCredits } from "@/lib/user-profile";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const { user } = useAuth();
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [userImages, setUserImages] = useState<UserImage[]>([]);
    const [credits, setCredits] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [results, setResults] = useState<{ styleId: string; url: string; promptUsed: string }[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch user images and profile on mount
    useEffect(() => {
        if (user) {
            setLoading(true);
            Promise.all([
                getUserImages(user.uid),
                getUserProfile(user.uid)
            ]).then(([images, profile]) => {
                setUserImages(images);
                setCredits(profile.credits);
            }).catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [user]);

    const handleSelectStyle = (id: string) => {
        if (selectedStyles.includes(id)) {
            setSelectedStyles(prev => prev.filter(s => s !== id));
        } else {
            setSelectedStyles(prev => [...prev, id]);
        }
    };

    const handleGenerate = async () => {
        if (selectedStyles.length === 0 || userImages.length < 3) return;

        if (credits < selectedStyles.length) {
            setError("Créditos insuficientes para gerar a quantidade de estilos selecionados.");
            return;
        }

        setGenerating(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch("/api/dashboard/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    styles: selectedStyles,
                    imageUrls: userImages.map(img => img.url)
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Falha na geração");

            setSaving(true);
            const savedImages = [];

            // Call saveGeneration for each returned image
            // data.images contains { styleId, url (base64 data url), promptUsed }
            for (const img of data.images) {
                try {
                    const saved = await saveGeneration(
                        user!.uid,
                        img.styleId,
                        img.promptUsed,
                        img.url
                    );
                    savedImages.push(saved);
                } catch (e) {
                    console.error("Failed to save image to gallery:", e);
                }
            }

            // Update results to use the Firebase Storage URL instead of Base64
            // so if they click "Baixar" it opens the public URL.
            setResults(savedImages.map(s => ({
                styleId: s.styleId,
                url: s.url,
                promptUsed: s.promptUsed
            })));

            // Deduct credits and update state
            await deductCredits(user!.uid, data.images.length);
            setCredits(prev => prev - data.images.length);

        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro desconhecido";
            setError(msg);
        } finally {
            setGenerating(false);
            setSaving(false);
        }
    };

    const hasEnoughImages = userImages.length >= 3;
    const selectedCount = selectedStyles.length;

    return (
        <div className="space-y-8 min-h-[80vh]">
            {/* Top Section: User Reference Photos (Small View) */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Minhas Referências ({userImages.length})
                    </h3>
                    <Link href="/dashboard/create">
                        <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-white/10">
                            Gerenciar / Adicionar
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-12 h-12 rounded-lg bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : userImages.length > 0 ? (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {userImages.map((img, i) => (
                            <div key={i} className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-white/10 group">
                                <img src={img.url} alt="Ref" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ImageIcon className="w-3 h-3 text-white/70" />
                                </div>
                            </div>
                        ))}
                        <Link href="/dashboard/create" className="w-12 h-12 shrink-0 rounded-lg border border-dashed border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors">
                            <Plus className="w-4 h-4 text-muted-foreground" />
                        </Link>
                    </div>
                ) : (
                    <div className="text-xs text-muted-foreground py-2">
                        Nenhuma foto de referência encontrada.
                        <Link href="/dashboard/create" className="text-primary hover:underline ml-1">
                            Fazer upload
                        </Link>
                    </div>
                )}
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {!loading && userImages.length === 0 ? "Bem-vindo ao ElevePic" : "Nova Geração"}
                    </h1>
                    <p className="text-muted-foreground">
                        {!loading && userImages.length === 0
                            ? "Vamos criar suas primeiras fotos profissionais. Comece enviando suas referências."
                            : "Selecione as imagens que deseja replicar com o seu rosto (Geração em Lote)."}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                        <Zap className="w-5 h-5 text-primary fill-primary" />
                        <span className="font-bold text-white">{credits} Créditos</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            {generating || saving ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">
                            {saving ? "Salvando na sua galeria..." : "Criando suas fotos..."}
                        </h3>
                        <p className="text-muted-foreground">
                            {saving ? "Arquivando imagens em alta qualidade" : `Gerando ${selectedCount} ${selectedCount === 1 ? "imagem" : "imagens"}`}
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">Processando com IA em lote — isso pode levar alguns instantes.</p>
                    </div>
                </div>
            ) : results ? (
                <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                            <div>
                                <p className="font-bold text-green-400">Geração em Lote Concluída!</p>
                                <p className="text-xs text-green-400/80">{results.length} {results.length === 1 ? "imagem gerada" : "imagens geradas"} com sucesso.</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => { setResults(null); setSelectedStyles([]); }}
                            className="border-green-500/30 hover:bg-green-500/10 text-green-400"
                        >
                            Nova Geração
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((img, i) => (
                            <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.url} alt="Generated" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        className="bg-white text-black hover:bg-white/90"
                                        onClick={() => window.open(img.url, "_blank")}
                                    >
                                        <Download className="w-4 h-4 mr-2" /> Baixar
                                    </Button>
                                </div>
                                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-[10px] text-white/80">
                                    {STYLES.find(s => s.id === img.styleId)?.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Error Display */}
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    {/* Pre-check: User Images */}
                    {!loading && !hasEnoughImages && (
                        <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                                    {userImages.length}/3
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-blue-100">Faltam fotos de referência</h3>
                                    <p className="text-blue-200/70 text-sm">
                                        Você precisa de pelo menos 3 fotos suas para treinar a IA.
                                    </p>
                                </div>
                            </div>
                            <Link href="/dashboard/create">
                                <Button className="bg-blue-500 hover:bg-blue-400 text-white border-0">
                                    Fazer Upload
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Selector */}
                    <div className={!hasEnoughImages ? "opacity-50 pointer-events-none grayscale" : ""}>
                        <StyleSelector
                            selectedStyles={selectedStyles}
                            onSelect={handleSelectStyle}
                        />
                    </div>

                    {/* Action Bar */}
                    <div className="sticky bottom-6 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-2xl z-20">
                        <div className="flex flex-col">
                            {selectedCount > 0 ? (
                                <>
                                    <span className="text-sm font-medium text-white">
                                        {selectedCount} {selectedCount === 1 ? "imagem selecionada" : "imagens selecionadas"}
                                    </span>
                                    <span className="text-xs text-white/50">
                                        Custo total: {selectedCount} {selectedCount === 1 ? "crédito" : "créditos"}
                                    </span>
                                </>
                            ) : (
                                <span className="text-sm text-muted-foreground">
                                    Selecione as imagens para replicar
                                </span>
                            )}
                        </div>
                        <Button
                            size="lg"
                            disabled={selectedCount === 0 || !hasEnoughImages || generating || saving || credits < selectedCount}
                            onClick={handleGenerate}
                            className="bg-primary hover:bg-primary/90 min-w-[200px] font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        >
                            {generating ? "Gerando..." : `Gerar ${selectedCount > 0 ? selectedCount + " " : ""}Fotos`}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
