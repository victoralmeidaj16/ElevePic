"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Github, Sparkles, Loader2, AlertCircle } from "lucide-react";
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
                            const names = data.name.split(" ");
                            setFormData(prev => ({
                                ...prev,
                                email: data.email,
                                firstName: names[0] || "",
                                lastName: names.slice(1).join(" ") || ""
                            }));
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
            setError("Please fill in all fields.");
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

            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email already registered.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            await signInWithGoogle();
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Failed to sign in with Google.");
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
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                                id="firstName"
                                placeholder="Max"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                id="lastName"
                                placeholder="Robinson"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
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
                        Create Account
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black/40 px-2 text-muted-foreground backdrop-blur-xl">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/5"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                >
                    <Github className="mr-2 h-4 w-4" /> Google
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                <div>
                    Already have an account?{" "}
                    <Link href="/login" className="underline text-primary hover:text-primary/80">
                        Sign in
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
