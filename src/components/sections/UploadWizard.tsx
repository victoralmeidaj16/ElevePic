"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserImages, uploadUserImage, UserImage } from "@/lib/user-storage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
    CloudUpload,
    Wand2,
    Loader2,
    Download,
    RefreshCw,
    CheckCircle2,
    X,
    ChevronRight,
    Camera,
    RotateCcw,
    Smile,
    User,
    AlertCircle,
    Image as ImageIcon,
    Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "tutorial" | "upload" | "style" | "generating" | "results";

const STYLES = [
    {
        id: "corporate",
        label: "Corporate",
        emoji: "🏢",
        description: "Dark suit, neutral background",
        bg: "from-slate-700 to-slate-900",
    },
    {
        id: "creative",
        label: "Creative",
        emoji: "🎨",
        description: "Casual, colorful studio",
        bg: "from-blue-700 to-indigo-900",
    },
    {
        id: "executive",
        label: "Executive",
        emoji: "💼",
        description: "Formal, white background",
        bg: "from-gray-600 to-gray-900",
    },
    {
        id: "natural",
        label: "Natural",
        emoji: "🌿",
        description: "Outdoor, golden light",
        bg: "from-emerald-700 to-teal-900",
    },
];

// ─── Tutorial Data ─────────────────────────────────────────────────────────────

const TUTORIAL_STEPS = [
    {
        icon: User,
        title: "Frontal Neutro",
        subtitle: "Base de Identidade — OBRIGATÓRIO",
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/30",
        qty: "2 fotos",
        tips: [
            "Olhando direto para a câmera",
            "Expressão neutra",
            "Luz suave na frente",
            "Fundo limpo",
        ],
        avoid: "Selfie torta, sorriso forçado, sombra dura",
    },
    {
        icon: RotateCcw,
        title: "Ângulo 3/4",
        subtitle: "Ângulo Profissional",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        qty: "2 fotos",
        tips: [
            "Rosto a ~45°",
            "Olhos para a câmera",
            "Corpo levemente girado",
        ],
        avoid: "Perfil quase lateral demais",
    },
    {
        icon: Camera,
        title: "Perfil Lateral",
        subtitle: "Estrutura Óssea",
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/30",
        qty: "1 foto",
        tips: [
            "90° exato",
            "Olhando para frente",
            "Luz lateral suave",
        ],
        avoid: "Perfil inclinado, cabelo cobrindo rosto",
    },
    {
        icon: Smile,
        title: "Expressões Variadas",
        subtitle: "Realismo",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        qty: "3 fotos",
        tips: [
            "Neutro",
            "Sorriso leve",
            "Sorriso aberto",
            "Sério",
        ],
        avoid: "Só fotos sorrindo",
    },
];

// ─── Step Indicator ────────────────────────────────────────────────────────────

const STEP_LABELS: { id: Step; label: string }[] = [
    { id: "tutorial", label: "Guia" },
    { id: "upload", label: "Upload" },
    { id: "style", label: "Estilo" },
    { id: "results", label: "Resultado" },
];

function StepIndicator({ current }: { current: Step }) {
    const steps = STEP_LABELS;
    const currentIdx = steps.findIndex((s) => s.id === current);
    const displayIdx = current === "generating" ? 2 : currentIdx;

    return (
        <div className="flex items-center justify-center gap-0 mb-8">
            {steps.map((s, i) => {
                const done = i < displayIdx;
                const active = i === displayIdx;
                return (
                    <div key={s.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${done
                                    ? "bg-primary text-white"
                                    : active
                                        ? "bg-primary text-white ring-4 ring-primary/30"
                                        : "bg-white/10 text-muted-foreground"
                                    }`}
                            >
                                {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                            </div>
                            <span
                                className={`text-xs ${active ? "text-white font-semibold" : "text-muted-foreground"
                                    }`}
                            >
                                {s.label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div
                                className={`w-12 h-0.5 mb-4 mx-1 transition-all duration-300 ${i < displayIdx ? "bg-primary" : "bg-white/10"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Tutorial Step ─────────────────────────────────────────────────────────────

function TutorialStep({ onNext }: { onNext: () => void }) {
    return (
        <motion.div
            key="tutorial"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-6"
        >
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Como tirar as fotos certas</h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                    A qualidade das suas fotos define o resultado final. Siga este guia para garantir headshots profissionais.
                </p>
            </div>

            {/* Tutorial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TUTORIAL_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={i}
                            className={`p-4 rounded-xl border ${step.border} ${step.bg} space-y-3`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon className={`w-5 h-5 ${step.color}`} />
                                    <div>
                                        <p className="font-semibold text-sm">{step.title}</p>
                                        <p className={`text-xs ${step.color}`}>{step.subtitle}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${step.bg} ${step.color} border ${step.border}`}>
                                    {step.qty}
                                </span>
                            </div>
                            <ul className="space-y-1">
                                {step.tips.map((tip, j) => (
                                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                                <AlertCircle className="w-3 h-3 text-yellow-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-yellow-500/80">Evite: {step.avoid}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Checklist summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-semibold mb-3 text-center">✅ Pacote Mínimo Profissional</p>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {[
                        { label: "Frontal", qty: "2" },
                        { label: "3/4", qty: "2" },
                        { label: "Perfil", qty: "1" },
                        { label: "Expressões", qty: "3" },
                    ].map((item) => (
                        <div key={item.label} className="bg-white/5 rounded-lg p-2">
                            <p className="text-lg font-bold text-primary">{item.qty}</p>
                            <p className="text-muted-foreground">{item.label}</p>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-muted-foreground mt-3">
                    💡 Sem estúdio? Use uma <strong className="text-white">janela grande</strong> + <strong className="text-white">parede branca</strong> + câmera traseira do celular.
                </p>
            </div>

            <Button onClick={onNext} size="lg" className="bg-primary hover:bg-primary/90 w-full font-semibold">
                Entendi — Fazer Upload das Fotos
                <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
        </motion.div>
    );
}

// ─── Upload Step ───────────────────────────────────────────────────────────────

function UploadStep({
    selectedUrls,
    onSelectUrl,
    onRemoveUrl,
    onNext,
    onBack,
}: {
    selectedUrls: string[];
    onSelectUrl: (url: string) => void;
    onRemoveUrl: (url: string) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const { user } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [galleryImages, setGalleryImages] = useState<UserImage[]>([]);
    const [activeTab, setActiveTab] = useState<"new" | "library">("new");

    // Fetch user images on mount
    useEffect(() => {
        if (user) {
            getUserImages(user.uid).then(setGalleryImages);
        }
    }, [user]);

    const handleUpload = async (newFiles: FileList | null) => {
        if (!newFiles || !user) return;
        setUploading(true);
        setActiveTab("library");

        const files = Array.from(newFiles).filter((f) =>
            ["image/jpeg", "image/png", "image/webp"].includes(f.type)
        );

        try {
            const uploadPromises = files.map(file => uploadUserImage(user.uid, file));
            const baseUrls = await Promise.all(uploadPromises);

            // Refresh gallery
            getUserImages(user.uid).then(imgs => {
                setGalleryImages(imgs);
                // Auto-select uploaded images
                imgs.filter(img => baseUrls.includes(img.url)).forEach(img => {
                    if (!selectedUrls.includes(img.url)) {
                        onSelectUrl(img.url);
                    }
                });
            });

        } catch (error) {
            console.error("Upload failed:", error);
            alert("Falha no upload. Tente novamente.");
        } finally {
            setUploading(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        handleUpload(e.dataTransfer.files);
    };

    const canProceed = selectedUrls.length >= 3;

    return (
        <motion.div
            key="upload"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-6"
        >
            <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">Upload das suas fotos</h2>
                <p className="text-muted-foreground text-sm">
                    Selecione da sua biblioteca ou faça upload de novas fotos.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl">
                <button
                    onClick={() => setActiveTab("new")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "new" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                        }`}
                >
                    Novo Upload
                </button>
                <button
                    onClick={() => setActiveTab("library")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "library" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                        }`}
                >
                    Minha Biblioteca ({galleryImages.length})
                </button>
            </div>

            {/* Upload Area */}
            {activeTab === "new" && (
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 ${dragging
                        ? "border-primary bg-primary/10"
                        : "border-white/20 bg-white/5 hover:border-primary/50 hover:bg-white/10"
                        }`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        className="hidden"
                        onChange={(e) => handleUpload(e.target.files)}
                    />
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mb-2" />
                            <p className="font-semibold">Enviando fotos...</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <CloudUpload className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-lg">Arraste as fotos aqui</p>
                                <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Gallery / Selection Area */}
            {activeTab === "library" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Selecione pelo menos 3 fotos ({selectedUrls.length} selecionadas)
                        </p>
                        {selectedUrls.length > 0 && (
                            <button
                                onClick={() => selectedUrls.forEach(url => onRemoveUrl(url))}
                                className="text-xs text-red-400 hover:text-red-300"
                            >
                                Limpar seleção
                            </button>
                        )}
                    </div>

                    {galleryImages.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground bg-white/5 rounded-xl border border-white/10">
                            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>Sua biblioteca está vazia.</p>
                            <p className="text-sm">Faça upload de novas fotos para começar.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {galleryImages.map((img) => {
                                const isSelected = selectedUrls.includes(img.url);
                                return (
                                    <div
                                        key={img.id}
                                        onClick={() => isSelected ? onRemoveUrl(img.url) : onSelectUrl(img.url)}
                                        className={`relative group aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${isSelected
                                            ? "border-primary ring-2 ring-primary/30"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt="User upload"
                                            className="w-full h-full object-cover"
                                        />
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                <CheckCircle2 className="w-8 h-8 text-white drop-shadow-lg" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button variant="outline" onClick={onBack} className="border-white/10">
                    ← Voltar
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="flex-1 bg-primary hover:bg-primary/90 font-semibold"
                    size="lg"
                >
                    Continuar ({selectedUrls.length}/14)
                    <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </motion.div>
    );
}

// ─── Style Step ────────────────────────────────────────────────────────────────

function StyleStep({
    selected,
    onSelect,
    onNext,
    onBack,
    loading,
}: {
    selected: string | null;
    onSelect: (s: string) => void;
    onNext: () => void;
    onBack: () => void;
    loading: boolean;
}) {
    return (
        <motion.div
            key="style"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-6"
        >
            <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">Escolha seu estilo</h2>
                <p className="text-muted-foreground text-sm">
                    A IA vai gerar 4 headshots profissionais no estilo escolhido
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {STYLES.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => onSelect(style.id)}
                        className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${selected === style.id
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                            }`}
                    >
                        {selected === style.id && (
                            <div className="absolute top-3 right-3">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                            </div>
                        )}
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.bg} flex items-center justify-center text-xl mb-3`}>
                            {style.emoji}
                        </div>
                        <p className="font-bold text-sm">{style.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{style.description}</p>
                    </button>
                ))}
            </div>

            <div className="flex gap-3">
                <Button variant="outline" onClick={onBack} className="border-white/10" disabled={loading}>
                    ← Voltar
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!selected || loading}
                    className="flex-1 bg-primary hover:bg-primary/90 font-semibold"
                    size="lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Gerando...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Gerar Headshots
                        </>
                    )}
                </Button>
            </div>
        </motion.div>
    );
}

// ─── Generating Step ───────────────────────────────────────────────────────────

function GeneratingStep() {
    return (
        <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center gap-6 py-12"
        >
            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wand2 className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Gerando seus headshots...</h2>
                <p className="text-muted-foreground max-w-sm">
                    O Gemini 3 Pro está analisando suas fotos e criando imagens profissionais. Isso leva cerca de 30 segundos.
                </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                {["Analisando suas características...", "Aplicando estilo profissional...", "Gerando imagens em alta resolução..."].map((msg, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 4 }}
                        className="flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {msg}
                    </motion.p>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Results Step ──────────────────────────────────────────────────────────────

function ResultsStep({
    images,
    onReset,
    onNewStyle,
}: {
    images: string[];
    onReset: () => void;
    onNewStyle: () => void;
}) {
    const downloadImage = (dataUrl: string, i: number) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `elevepic-headshot-${i + 1}.png`;
        a.click();
    };

    return (
        <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
        >
            <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold">Seus headshots estão prontos!</h2>
                </div>
                <p className="text-muted-foreground text-sm">
                    {images.length} imagens geradas · Clique para baixar
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {images.map((img, i) => (
                    <div key={i} className="relative group rounded-2xl overflow-hidden border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`headshot ${i + 1}`} className="w-full aspect-[3/4] object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                size="sm"
                                onClick={() => downloadImage(img, i)}
                                className="bg-white text-black hover:bg-white/90"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Baixar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3">
                <Button variant="outline" onClick={onNewStyle} className="flex-1 border-white/10">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Outro Estilo
                </Button>
                <Button variant="outline" onClick={onReset} className="flex-1 border-white/10">
                    Novo Projeto
                </Button>
            </div>
        </motion.div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function UploadWizard() {
    const [step, setStep] = useState<Step>("tutorial");
    // const [files, setFiles] = useState<File[]>([]); // DEPRECATED: We now use URLs
    const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!selectedStyle || selectedUrls.length < 3) return;
        setLoading(true);
        setError(null);
        setStep("generating");

        try {
            // Note: We are sending URLs now, not files
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    style: selectedStyle,
                    imageUrls: selectedUrls,
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error ?? "Erro ao gerar imagens");

            setGeneratedImages(data.images);
            setStep("results");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro desconhecido";
            setError(msg);
            setStep("style");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setStep("tutorial");
        setSelectedUrls([]);
        setSelectedStyle(null);
        setGeneratedImages([]);
        setError(null);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <StepIndicator current={step} />

            <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === "tutorial" && (
                            <TutorialStep onNext={() => setStep("upload")} />
                        )}
                        {step === "upload" && (
                            <UploadStep
                                selectedUrls={selectedUrls}
                                onSelectUrl={(url) => setSelectedUrls(prev => [...prev, url])}
                                onRemoveUrl={(url) => setSelectedUrls(prev => prev.filter(u => u !== url))}
                                onNext={() => setStep("style")}
                                onBack={() => setStep("tutorial")}
                            />
                        )}
                        {step === "style" && (
                            <StyleStep
                                selected={selectedStyle}
                                onSelect={setSelectedStyle}
                                onNext={handleGenerate}
                                onBack={() => setStep("upload")}
                                loading={loading}
                            />
                        )}
                        {step === "generating" && <GeneratingStep />}
                        {step === "results" && (
                            <ResultsStep
                                images={generatedImages}
                                onReset={reset}
                                onNewStyle={() => setStep("style")}
                            />
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
