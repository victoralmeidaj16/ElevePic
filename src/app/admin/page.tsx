"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Loader2, Plus, Pencil, Trash2, Database, X, Check, AlertTriangle, ShieldAlert } from "lucide-react";
import { FirestoreStyle, getStyles, addStyle, updateStyle, deleteStyle, seedStyles } from "@/lib/styles-service";
import { STYLE_CATEGORIES, StyleOption } from "@/lib/styles-data";

const ADMIN_EMAIL = "123indiozinhos@gmail.com";

const EMPTY_FORM: Omit<StyleOption, "id"> = {
    title: "",
    category: "editorial",
    image: "",
    prompt: "",
    tags: [],
};

export default function AdminPage() {
    const { user } = useAuth();
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

    const isAdmin = user?.email === ADMIN_EMAIL;

    const loadStyles = async () => {
        setLoading(true);
        try {
            const data = await getStyles();
            setStyles(data);
        } catch (e) {
            console.error(e);
            setError("Erro ao carregar estilos do Firestore.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) loadStyles();
    }, [isAdmin]);

    const handleSeed = async () => {
        setSeeding(true);
        try {
            await seedStyles();
            setSeedDone(true);
            setSuccessMsg("Estilos padrão migrados para o Firestore com sucesso!");
            await loadStyles();
        } catch (e) {
            setError("Erro ao fazer seed.");
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
        if (!formData.title || !formData.prompt || !formData.image) {
            setError("Título, imagem e prompt são obrigatórios.");
            return;
        }
        setSaving(true);
        setError(null);
        const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
        try {
            if (isAdding) {
                await addStyle({ ...formData, tags });
                setSuccessMsg("Estilo adicionado com sucesso!");
            } else if (editingStyle) {
                await updateStyle(editingStyle.firestoreId, { ...formData, tags });
                setSuccessMsg("Estilo atualizado com sucesso!");
            }
            await loadStyles();
            closeForm();
        } catch (e) {
            setError("Erro ao salvar. Verifique as permissões do Firestore.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (firestoreId: string) => {
        if (!confirm("Tem certeza que deseja excluir este estilo?")) return;
        setDeletingId(firestoreId);
        try {
            await deleteStyle(firestoreId);
            setSuccessMsg("Estilo excluído.");
            await loadStyles();
        } catch (e) {
            setError("Erro ao excluir.");
        } finally {
            setDeletingId(null);
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
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Painel Admin</h1>
                        <p className="text-slate-400 mt-1">Gerencie os estilos disponíveis para os usuários</p>
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
                            Adicionar Estilo
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
                                    {isAdding ? "➕ Novo Estilo" : "✏️ Editar Estilo"}
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
                                <Label htmlFor="image">URL da Imagem (prévia)</Label>
                                <Input id="image" value={formData.image} onChange={e => setFormData(p => ({ ...p, image: e.target.value }))} placeholder="https://images.unsplash.com/..." />
                                {formData.image && (
                                    <img src={formData.image} alt="Preview" className="w-24 h-32 object-cover rounded-lg border border-white/10 mt-2" />
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
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

                {/* Styles Table */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] rounded-xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : styles.length === 0 ? (
                    <div className="text-center py-24 space-y-4">
                        <Database className="w-12 h-12 text-slate-500 mx-auto" />
                        <p className="text-slate-400">Nenhum estilo cadastrado.</p>
                        <p className="text-slate-500 text-sm">Clique em "Seed Padrão" para importar os estilos existentes, ou "Adicionar Estilo" para criar um novo.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {styles.map((style) => (
                            <div key={style.firestoreId} className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all">
                                <img src={style.image} alt={style.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 w-full">
                                    <p className="text-sm font-bold text-white truncate">{style.title}</p>
                                    <p className="text-xs text-slate-400 capitalize">{style.category}</p>
                                </div>
                                {/* Action Buttons */}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
