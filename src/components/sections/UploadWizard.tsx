"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserImages, uploadUserImage, deleteUserImage, UserImage } from "@/lib/user-storage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
    CloudUpload,
    Loader2,
    CheckCircle2,
    Image as ImageIcon,
    Trash2,
    ChevronRight,
    Camera,
    RotateCcw,
    Smile,
    User,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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
            "Ol eyes para a câmera",
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

type Step = "tutorial" | "upload";

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
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Como tirar as fotos certas</h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                    A qualidade das suas fotos define o resultado final. Siga este guia para garantir headshots profissionais.
                </p>
            </div>

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
                                        <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                                <AlertCircle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-rose-400/80">Evite: {step.avoid}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Button onClick={onNext} size="lg" className="bg-primary hover:bg-primary/90 w-full font-semibold">
                Entendi — Gerenciar Minhas Fotos
                <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
        </motion.div>
    );
}

// ─── Upload Step ───────────────────────────────────────────────────────────────

function UploadStep() {
    const { user } = useAuth();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [galleryImages, setGalleryImages] = useState<UserImage[]>([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [toDelete, setToDelete] = useState<string[]>([]);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (user) {
            getUserImages(user.uid).then(setGalleryImages);
        }
    }, [user]);

    const handleUpload = async (newFiles: FileList | null) => {
        if (!newFiles || !user) return;
        setUploading(true);

        const files = Array.from(newFiles).filter((f) =>
            ["image/jpeg", "image/png", "image/webp"].includes(f.type)
        );

        try {
            await Promise.all(files.map(file => uploadUserImage(user.uid, file)));
            const imgs = await getUserImages(user.uid);
            setGalleryImages(imgs);
        } catch (error: any) {
            console.error("Upload failed:", error);
            alert(`Falha no upload: ${error?.message || "Erro desconhecido"}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (toDelete.length === 0) return;
        setDeleting(true);
        try {
            await Promise.all(toDelete.map(path => deleteUserImage(path)));
            if (user) {
                const imgs = await getUserImages(user.uid);
                setGalleryImages(imgs);
            }
            setToDelete([]);
            setDeleteMode(false);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Erro ao excluir imagens.");
        } finally {
            setDeleting(false);
        }
    };

    const hasEnoughImages = galleryImages.length >= 3;

    return (
        <motion.div
            key="upload"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-6"
        >
            <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">Suas Fotos de Referência</h2>
                <p className="text-muted-foreground text-sm">
                    Gerencie as fotos que a IA usará para aprender seu rosto.
                </p>
            </div>

            {/* Upload Area */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleUpload(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 ${dragging
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
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <CloudUpload className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">Clique ou arraste novas fotos</p>
                            <p className="text-xs text-muted-foreground">JPG, PNG ou WEBP</p>
                        </div>
                    </>
                )}
            </div>

            {/* Gallery Area */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        {deleteMode
                            ? `Selecione para excluir (${toDelete.length})`
                            : `${galleryImages.length} fotos disponíveis`}
                    </p>
                    <button
                        onClick={() => {
                            setDeleteMode(!deleteMode);
                            setToDelete([]);
                        }}
                        className={`text-xs px-3 py-1 rounded-full border transition-all ${deleteMode
                            ? "bg-red-500/20 border-red-500/40 text-red-400"
                            : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                            }`}
                    >
                        <Trash2 className="w-3 h-3 inline mr-1" />
                        {deleteMode ? "Cancelar" : "Gerenciar / Excluir"}
                    </button>
                </div>

                {galleryImages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-white/5 rounded-xl border border-white/10">
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Nenhuma foto enviada ainda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {galleryImages.map((img) => {
                            const isMarkedDelete = toDelete.includes(img.path);
                            return (
                                <div
                                    key={img.id}
                                    onClick={() => {
                                        if (deleteMode) {
                                            setToDelete(prev =>
                                                isMarkedDelete
                                                    ? prev.filter(p => p !== img.path)
                                                    : [...prev, img.path]
                                            );
                                        }
                                    }}
                                    className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${deleteMode
                                        ? "cursor-pointer"
                                        : "cursor-default"
                                        } ${isMarkedDelete
                                            ? "border-red-500 ring-2 ring-red-500/30"
                                            : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={img.url}
                                        alt="User upload"
                                        className="w-full h-full object-cover"
                                    />
                                    {deleteMode && isMarkedDelete && (
                                        <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                                            <Trash2 className="w-8 h-8 text-white drop-shadow-lg" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Confirm Delete */}
                {deleteMode && toDelete.length > 0 && (
                    <Button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="w-full bg-red-500 hover:bg-red-600 text-white"
                    >
                        {deleting ? "Excluindo..." : `Confirmar Exclusão (${toDelete.length})`}
                    </Button>
                )}
            </div>

            <div className="pt-6 border-t border-white/10">
                <Button
                    onClick={() => router.push("/dashboard")}
                    disabled={!hasEnoughImages}
                    className="w-full bg-green-600 hover:bg-green-700 font-semibold"
                    size="lg"
                >
                    {hasEnoughImages ? "Tudo pronto — Ir para Geração" : "Envie pelo menos 3 fotos para continuar"}
                    <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </motion.div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function UploadWizard() {
    const [step, setStep] = useState<Step>("tutorial");

    return (
        <div className="w-full max-w-3xl mx-auto">
            <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        {step === "tutorial" && (
                            <TutorialStep onNext={() => setStep("upload")} />
                        )}
                        {step === "upload" && (
                            <UploadStep />
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
