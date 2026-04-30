"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function SignupForm() {
    const router = useRouter();
    const { signInWithGoogle } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionCredits, setSessionCredits] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const auth = getAuth(app);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            const fetchSession = async () => {
                try {
                    const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.email) {
                            const names = (data.name || "").split(" ");
                            setFormData(prev => ({
                                ...prev,
                                email: data.email,
                                firstName: names[0] || "",
                                lastName: names.slice(1).join(" ") || ""
                            }));
                            if (data.credits) {
                                setSessionCredits(data.credits);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching stripe session:", error);
                }
            };
            fetchSession();
        }
    }, [sessionId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            setError("Por favor, preencha todos os campos.");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await updateProfile(userCredential.user, {
                displayName: `${formData.firstName} ${formData.lastName}`
            });

            // Initialize user profile in Firestore via server API (uses Admin SDK — avoids client Firestore issues)
            const profileRes = await fetch("/api/profile/init", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid: userCredential.user.uid,
                    credits: sessionCredits ?? undefined,
                }),
            });

            if (!profileRes.ok) {
                const profileErr = await profileRes.json();
                throw new Error(profileErr.error || "Falha ao criar perfil.");
            }

            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email já cadastrado.");
            } else if (err.code === "auth/weak-password") {
                setError("A senha deve ter pelo menos 6 caracteres.");
            } else {
                setError("Falha ao criar conta. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            await signInWithGoogle();
            const currentUser = auth.currentUser;
            if (currentUser) {
                await fetch("/api/profile/init", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        uid: currentUser.uid,
                        credits: sessionCredits ?? undefined,
                    }),
                });
            }
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Falha ao entrar com Google.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Criar sua conta</CardTitle>
                <CardDescription className="text-center">
                    {sessionId
                        ? "Pagamento confirmado! Escolha uma senha para acessar seus headshots."
                        : "Entre com seus dados abaixo para criar sua conta"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                    {sessionId && (
                        <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Plano ativado com sucesso! Complete os dados abaixo.
                        </div>
                    )}
                    {error && (
                        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nome</Label>
                            <Input
                                id="firstName"
                                placeholder="João"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Sobrenome</Label>
                            <Input
                                id="lastName"
                                placeholder="Silva"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Criar Conta
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black/40 px-2 text-muted-foreground backdrop-blur-xl">
                            Ou continue com
                        </span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/5"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Entrar com Google
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                <div>
                    Já tem uma conta?{" "}
                    <Link href="/login" className="underline text-primary hover:text-primary/80">
                        Entrar
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[130px] rounded-full -z-10" />

            <Suspense fallback={
                <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-xl p-8 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </Card>
            }>
                <SignupForm />
            </Suspense>
        </div>
    );
}
