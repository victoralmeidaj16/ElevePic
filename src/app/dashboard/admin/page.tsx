"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Loader2, Plus, Pencil, Trash2, Database, X, Check, AlertTriangle, ShieldAlert, Sparkles, Image as ImageIcon, Download, ArrowUp, ArrowDown } from "lucide-react";
import { FirestoreStyle } from "@/lib/styles-service";
import { getUserImages, UserImage } from "@/lib/user-storage";
import { STYLE_CATEGORIES, StyleOption } from "@/lib/styles-data";
import { ADMIN_EMAIL } from "@/lib/constants";

const EMPTY_FORM: Omit<StyleOption, "id"> & { tags: string[] } = {
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
    const [formData, setFormData] = useState<Omit<StyleOption, "id"> & { tags: string[] }>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

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
            if (!res.ok) {
                const debugInfo = data.code ? ` (Code: ${data.code})` : "";
                throw new Error(data.error + debugInfo || "Erro ao carregar");
            }
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
        setEditingStyle(null);
        setIsAdding(true);
        setError(null);
        setTagInput("");
        setImagePreview(null);
    };

    const openEdit = (style: FirestoreStyle) => {
        setFormData({
            title: style.title,
            category: style.category,
            image: style.image,
            prompt: style.prompt,
            tags: (style as any).tags || [],
        });
        setEditingStyle(style);
        setIsAdding(false);
        setError(null);
        setTagInput("");
        setImagePreview(style.image || null);
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setFormData(p => ({ ...p, image: base64 }));
            setImagePreview(base64);
        };
        reader.readAsDataURL(file);
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (t && !formData.tags.includes(t)) {
            setFormData(p => ({ ...p, tags: [...p.tags, t] }));
        }
        setTagInput("");
    };

    const removeTag = (tag: string) => {
        setFormData(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }));
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
            const styleData = {
                title: formData.title,
                category: formData.category,
                image: formData.image || "",
                prompt: formData.prompt,
                tags: formData.tags,
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

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === styles.length - 1) return;

        const newStyles = [...styles];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        const item1 = newStyles[index];
        const item2 = newStyles[targetIndex];

        let val1 = item2.order || Date.now();
        let val2 = item1.order || Date.now() + 1;

        if (val1 === val2) {
            val1 = direction === 'up' ? val2 - 1000 : val2 + 1000;
        }

        // Optimistic update
        newStyles[index] = { ...item1, order: val1 };
        newStyles[targetIndex] = { ...item2, order: val2 };
        newStyles.sort((a, b) => (a.order || 0) - (b.order || 0));
        setStyles(newStyles);

        try {
            await Promise.all([
                fetch("/api/admin/styles", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firestoreId: item1.firestoreId, order: val1 })
                }),
                fetch("/api/admin/styles", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firestoreId: item2.firestoreId, order: val2 })
                })
            ]);
        } catch (e) {
            console.error("Move error:", e);
            setError("Erro ao reordenar.");
            loadStyles(); // Revert on error
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

    const handleConfirmTest = async (asCover: boolean = false) => {
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
                styles: [testingStyle.id],
                imageUrls: includePhotos ? userImages.map(img => img.url) : [],
                allowNoImages: !includePhotos,
                uid: user?.uid,
                userEmail: user?.email,
            };

            const response = await fetch("/api/dashboard/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyPayload),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Falha na geração");

            if (data.images && data.images.length > 0) {
                const imageUrl = data.images[0].url;
                setTestResult(imageUrl);

                if (asCover) {
                    // Update the style in Firestore with this new image
                    const updateRes = await fetch("/api/admin/styles", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            firestoreId: testingStyle.firestoreId,
                            image: imageUrl
                        }),
                    });

                    if (updateRes.ok) {
                        setSuccessMsg("Capa do card atualizada com sucesso!");
                        loadStyles(); // Refresh the list
                    } else {
                        throw new Error("Imagem gerada, mas falha ao salvar como capa.");
                    }
                } else {
                    setSuccessMsg("Teste gerado com sucesso!");
                }
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

                            {/* Tags */}
                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); }}}
                                        placeholder="Ex: P&B, Cinemático..."
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="outline" onClick={addTag} className="border-white/10 shrink-0">+ Tag</Button>
                                </div>
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20">
                                                {tag}
                                                <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors"><X className="w-3 h-3" /></button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label>Imagem de Capa</Label>
                                <div className="grid grid-cols-2 gap-3 items-start">
                                    <div className="space-y-2">
                                        <Input
                                            value={formData.image.startsWith("data:") ? "" : formData.image}
                                            onChange={e => { setFormData(p => ({ ...p, image: e.target.value })); setImagePreview(e.target.value || null); }}
                                            placeholder="https://... ou faça upload"
                                            className="text-xs"
                                        />
                                        <label className="flex items-center gap-2 cursor-pointer w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-slate-300">
                                            <ImageIcon className="w-4 h-4" />
                                            Upload arquivo
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
                                        </label>
                                    </div>
                                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <p className="text-xs text-slate-500 text-center px-2">Pré-visualização da capa</p>
                                        )}
                                    </div>
                                </div>
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
                                        <ImageIcon className="w-5 h-5 text-blue-400" /> Gerar Capa do Card
                                    </h2>
                                    <p className="text-slate-400 text-sm">
                                        Card: <strong className="text-white">{testingStyle.title}</strong>
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
                                                <p className="text-sm font-medium text-white">Usar minhas fotos (Admin)</p>
                                                <p className="text-xs text-slate-400">
                                                    Se marcado, usará sua face. Se desmarcado, gerará apenas pelo prompt.
                                                </p>
                                            </div>
                                        </label>
                                    </div>

                                    <Button
                                        onClick={() => handleConfirmTest(true)}
                                        disabled={generating || (includePhotos && userImages.length < 3)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                                    >
                                        {generating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando...
                                            </>
                                        ) : "Gerar e Salvar como Capa"}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
                                        <Check className="w-5 h-5" /> Sucesso!
                                    </h2>
                                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 relative group bg-black/50">
                                        <img src={testResult} alt="Generated Test" className="w-full h-full object-cover" />
                                    </div>
                                    <Button onClick={() => setTestingStyle(null)} variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                                        Fechar
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Category filter */}
                {!loading && styles.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Filtrar:</span>
                        {["all", ...Array.from(new Set(styles.map(s => s.category)))].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                    categoryFilter === cat
                                        ? "bg-blue-600 border-blue-500 text-white"
                                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                                }`}
                            >
                                {cat === "all" ? `✨ Todos (${styles.length})` : `${cat} (${styles.filter(s => s.category === cat).length})`}
                            </button>
                        ))}
                    </div>
                )}

                {/* Styles Grid */}
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
                        {styles.filter(s => categoryFilter === "all" || s.category === categoryFilter).map((style, index) => (
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
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-wrap justify-end max-w-[120px]">
                                    {index > 0 && (
                                        <button
                                            onClick={() => handleMove(index, 'up')}
                                            className="w-8 h-8 bg-black/50 hover:bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
                                            title="Mover para cima"
                                        >
                                            <ArrowUp className="w-3.5 h-3.5 text-white" />
                                        </button>
                                    )}
                                    {index < styles.length - 1 && (
                                        <button
                                            onClick={() => handleMove(index, 'down')}
                                            className="w-8 h-8 bg-black/50 hover:bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
                                            title="Mover para baixo"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5 text-white" />
                                        </button>
                                    )}
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
        </div >
    );
}

export default function AdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>}>
            <AdminContent />
        </Suspense>
    );
}
