"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Loader2, Plus, Pencil, Trash2, Database, X, Check, AlertTriangle, ShieldAlert, Sparkles, Image as ImageIcon, Download } from "lucide-react";
import { FirestoreStyle } from "@/lib/styles-service";
import { getUserImages, UserImage } from "@/lib/user-storage";
import { STYLE_CATEGORIES, StyleOption } from "@/lib/styles-data";

const ADMIN_EMAIL = "123indiozinhos@gmail.com";

const EMPTY_FORM: Omit<StyleOption, "id"> = {
    title: "",
    category: "editorial",
    image: "",
    prompt: "",
    tags: [],
};

function AdminContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const action = searchParams.get("action");
    const [styles, setStyles] = useState<FirestoreStyle[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const [seedDone, setSeedDone] = useState(false);
    const [editingStyle, setEditingStyle] = useState<FirestoreStyle | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<Omit<StyleOption, "id">>(EMPTY_FORM);
    const [tagsInput, setTagsInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Generation states
    const [testingStyle, setTestingStyle] = useState<FirestoreStyle | null>(null);
    const [includePhotos, setIncludePhotos] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [testResult, setTestResult] = useState<string | null>(null);
    const [userImages, setUserImages] = useState<UserImage[]>([]);

    const isAdmin = user?.email === ADMIN_EMAIL;

    const loadStyles = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/styles");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao carregar");
            setStyles(data.styles);
        } catch (e: any) {
            console.error(e);
            setError(e?.message || "Erro ao carregar estilos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) loadStyles();
    }, [isAdmin]);

    useEffect(() => {
        if (isAdmin && action === "add") {
            openAdd();
        }
    }, [isAdmin, action]);

    const handleSeed = async () => {
        setSeeding(true);
        try {
            const res = await fetch("/api/admin/styles/seed", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao fazer seed");
            setSeedDone(true);
            setSuccessMsg("Cards padrão migrados para o Firestore com sucesso!");
            await loadStyles();
        } catch (e: any) {
            setError(e?.message || "Erro ao fazer seed.");
        } finally {
            setSeeding(false);
        }
    };

    const openAdd = () => {
        setFormData(EMPTY_FORM);
        setTagsInput("");
        setEditingStyle(null);
        setIsAdding(true);
        setError(null);
    };

    const openEdit = (style: FirestoreStyle) => {
        setFormData({
            title: style.title,
            category: style.category,
            image: style.image,
            prompt: style.prompt,
            tags: style.tags ?? [],
        });
        setTagsInput((style.tags ?? []).join(", "));
        setEditingStyle(style);
        setIsAdding(false);
        setError(null);
    };

    const closeForm = () => {
        setEditingStyle(null);
        setIsAdding(false);
    };

    const handleSave = async () => {
        if (!formData.title || !formData.prompt) {
            setError("Título e prompt são obrigatórios.");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const tagsArray = tagsInput ? tagsInput.split(",").map(t => t.trim()).filter(Boolean) : [];
            const styleData = {
                title: formData.title,
                category: formData.category,
                image: formData.image || "",
                prompt: formData.prompt,
                tags: tagsArray
            };

            const endpoint = "/api/admin/styles";
            const method = isAdding ? "POST" : "PUT";
            const payload = isAdding ? styleData : { firestoreId: editingStyle?.firestoreId, ...styleData };

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao salvar o card.");

            setSuccessMsg(isAdding ? "Card adicionado com sucesso!" : "Card atualizado com sucesso!");
            await loadStyles();
            closeForm();
        } catch (e: any) {
            console.error("Save error:", e);
            setError(e?.message || "Erro ao salvar o card. Tente novamente.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (firestoreId: string) => {
        if (!confirm("Tem certeza que deseja excluir este card?")) return;
        setDeletingId(firestoreId);
        try {
            const res = await fetch(`/api/admin/styles?id=${firestoreId}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao excluir.");

            setSuccessMsg("Card excluído.");
            await loadStyles();
        } catch (e: any) {
            console.error("Delete error:", e);
            setError(e?.message || "Erro ao excluir.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleOpenTest = async (style: FirestoreStyle) => {
        setTestingStyle(style);
        setTestResult(null);
        setError(null);
        setGenerating(false);

        // Always try to load user's own reference photos just in case they want to use them
        if (user) {
            try {
                const images = await getUserImages(user.uid);
                setUserImages(images);
            } catch (err) {
                console.error("Failed to load user images", err);
            }
        }
    };

    const handleConfirmTest = async () => {
        if (!testingStyle) return;

        if (includePhotos && userImages.length < 3) {
            setError("Você precisa de pelo menos 3 fotos no seu dashboard para incluir suas fotos como input.");
            return;
        }

        setGenerating(true);
        setError(null);
        setTestResult(null);

        try {
            const bodyPayload = {
                styles: [testingStyle.id], // Use the logical generic ID
                imageUrls: includePhotos ? userImages.map(img => img.url) : [],
                allowNoImages: !includePhotos
            };

            const response = await fetch("/api/dashboard/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyPayload),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Falha na geração");

            if (data.images && data.images.length > 0) {
                // The API returns { styleId, url (base64 data url), promptUsed }
                setTestResult(data.images[0].url);
                setSuccessMsg("Card gerado com sucesso (resolução base64)!");
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro desconhecido";
            setError(msg);
        } finally {
            setGenerating(false);
        }
    };

    // Access denied screen for non-admin
    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="text-center space-y-4">
                    <ShieldAlert className="w-16 h-16 text-red-400 mx-auto" />
                    <h1 className="text-3xl font-bold text-white">Acesso Negado</h1>
                    <p className="text-slate-400">Você não tem permissão para acessar esta página.</p>
                    <Button variant="outline" onClick={() => window.location.href = "/"}>
                        Voltar à Home
                    </Button>
                </div>
            </div>
        );
    }

    const isFormOpen = isAdding || !!editingStyle;

    return (
        <div className="space-y-6">
            <div className="mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Painel Admin</h1>
                        <p className="text-slate-400 mt-1">Gerencie os cards disponíveis para os usuários</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleSeed}
                            disabled={seeding || seedDone || styles.length > 0}
                            className="border-white/10 hover:bg-white/5 gap-2"
                        >
                            {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                            {seedDone ? "Seed Concluído" : "Seed Padrão"}
                        </Button>
                        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 gap-2">
                            <Plus className="w-4 h-4" />
                            Adicionar Card
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        {error}
                        <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
                    </div>
                )}
                {successMsg && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                        <Check className="w-5 h-5 shrink-0" />
                        {successMsg}
                        <button onClick={() => setSuccessMsg(null)} className="ml-auto"><X className="w-4 h-4" /></button>
                    </div>
                )}

                {/* Add/Edit Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
                        <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl mt-10 p-6 space-y-5 shadow-2xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">
                                    {isAdding ? "➕ Novo Card" : "✏️ Editar Card"}
                                </h2>
                                <button onClick={closeForm} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label htmlFor="title">Título</Label>
                                    <Input id="title" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="Ex: Editorial Graffiti" />
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label htmlFor="category">Categoria</Label>
                                    <select
                                        id="category"
                                        value={formData.category}
                                        onChange={e => setFormData(p => ({ ...p, category: e.target.value as StyleOption["category"] }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {STYLE_CATEGORIES.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.emoji} {cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (separadas por vírgula) (Opcional)</Label>
                                <Input id="tags" value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="Ex: Street Art, Fashion, Crown" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prompt">Prompt da IA</Label>
                                <textarea
                                    id="prompt"
                                    value={formData.prompt}
                                    onChange={e => setFormData(p => ({ ...p, prompt: e.target.value }))}
                                    rows={10}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono"
                                    placeholder="High-fashion editorial portrait of [person] ..."
                                />
                                <p className="text-xs text-slate-500">Use <code className="bg-white/10 px-1 rounded">[person]</code> onde o rosto do usuário será inserido.</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button variant="outline" onClick={closeForm} className="border-white/10">Cancelar</Button>
                                <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 min-w-[120px]">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Test Generate Modal */}
                {testingStyle && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative">
                            <button onClick={() => setTestingStyle(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>

                            {!testResult ? (
                                <>
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-blue-400" /> Testar Geração
                                    </h2>
                                    <p className="text-slate-400 text-sm">
                                        Testando o card: <strong className="text-white">{testingStyle.title}</strong>
                                    </p>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 mt-4">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={includePhotos}
                                                onChange={(e) => setIncludePhotos(e.target.checked)}
                                                className="mt-1 w-4 h-4 rounded border-white/20 bg-black/50 text-blue-500 focus:ring-blue-500"
                                            />
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-white">Incluir minhas fotos como input</p>
                                                <p className="text-xs text-slate-400">
                                                    Use as suas fotos de referência para ver como o card fica com o seu rosto. (Requer 3 fotos no dashboard).
                                                </p>
                                            </div>
                                        </label>
                                    </div>

                                    <Button
                                        onClick={handleConfirmTest}
                                        disabled={generating || (includePhotos && userImages.length < 3)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                                    >
                                        {generating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando...
                                            </>
                                        ) : "Gerar Imagem de Teste"}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
                                        <Check className="w-5 h-5" /> Resultado do Teste
                                    </h2>
                                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 relative group bg-black/50">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={testResult} alt="Generated Test" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button className="bg-white text-black hover:bg-white/90" onClick={() => window.open(testResult, "_blank")}>
                                                <Download className="w-4 h-4 mr-2" /> Ampliar
                                            </Button>
                                        </div>
                                    </div>
                                    <Button onClick={() => setTestResult(null)} variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                                        Testar Novamente
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Styles Table */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] rounded-xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : styles.length === 0 ? (
                    <div className="text-center py-24 space-y-4">
                        <Database className="w-12 h-12 text-slate-500 mx-auto" />
                        <p className="text-slate-400">Nenhum card cadastrado.</p>
                        <p className="text-slate-500 text-sm">Clique em "Seed Padrão" para importar os cards existentes, ou "Adicionar Card" para criar um novo.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {styles.map((style) => (
                            <div key={style.firestoreId} className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all bg-slate-800">
                                {style.image ? (
                                    <img src={style.image} alt={style.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                                            <span className="text-sm font-bold text-white/50">{style.title.charAt(0)}</span>
                                        </div>
                                        <p className="text-[9px] text-white/30 uppercase tracking-widest font-medium">Sem Preview</p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 w-full">
                                    <p className="text-sm font-bold text-white truncate">{style.title}</p>
                                    <p className="text-xs text-slate-400 capitalize">{style.category}</p>
                                </div>
                                {/* Action Buttons */}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenTest(style)}
                                        className="w-8 h-8 bg-white/10 hover:bg-yellow-600 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
                                        title="Testar Card (Gerar Imagem)"
                                    >
                                        <Sparkles className="w-3.5 h-3.5 text-white" />
                                    </button>
                                    <button
                                        onClick={() => openEdit(style)}
                                        className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
                                        title="Editar"
                                    >
                                        <Pencil className="w-3.5 h-3.5 text-white" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(style.firestoreId)}
                                        disabled={deletingId === style.firestoreId}
                                        className="w-8 h-8 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
                                        title="Excluir"
                                    >
                                        {deletingId === style.firestoreId
                                            ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                                            : <Trash2 className="w-3.5 h-3.5 text-white" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>}>
            <AdminContent />
        </Suspense>
    );
}
