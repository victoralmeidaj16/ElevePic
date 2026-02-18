import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Zap, Clock, Plus, ArrowRight } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome & Credits */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
                    <p className="text-muted-foreground">Bem-vindo de volta, Victor.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Credits Widget */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-white/10 px-4 py-2 rounded-full">
                        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-white">12 Créditos</span>
                    </div>
                    <Link href="/dashboard/create">
                        <Button className="gap-2 bg-primary hover:bg-primary/90">
                            <Plus className="w-4 h-4" /> Nova Geração
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Modelos Treinados</CardTitle>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1 Modelo</div>
                        <p className="text-xs text-muted-foreground">
                            v1.0 (Treinado em 14/02)
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fotos Geradas</CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48 Fotos</div>
                        <p className="text-xs text-muted-foreground">
                            +12 essa semana
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Plano Atual</CardTitle>
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white font-medium">PRO</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Ativo</div>
                        <p className="text-xs text-muted-foreground">
                            Renova em 15/03
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Active Processes (Simulated) */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Atividade Recente</h2>

                <div className="bg-black/20 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <p className="font-medium">Treinando Modelo v2.0</p>
                            <p className="text-sm text-muted-foreground">Iniciado há 15 min • Estimado: 25 min</p>
                        </div>
                    </div>
                    <div className="w-32 hidden md:block">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 w-[60%]" />
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 border border-white/5 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <p className="font-medium">Pacote "Profissional LinkedIn"</p>
                            <p className="text-sm text-muted-foreground">10 fotos geradas com sucesso</p>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
}

function Check({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function ImageIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    )
}
