"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Github, LogIn, Loader2 } from "lucide-react"; // Added Loader2
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set mock token
        localStorage.setItem("elevepic_token", "mock_token_12345");

        // Redirect to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[130px] rounded-full -z-10" />

            <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Button disabled={isLoading} type="submit" className="w-full bg-primary hover:bg-primary/90 hover:shadow-lg">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <LogIn className="mr-2 h-4 w-4" />
                            )}
                            Sign In
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

                    <Button variant="outline" type="button" className="w-full border-white/10 hover:bg-white/5">
                        <Github className="mr-2 h-4 w-4" /> Google
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                    <div>
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline text-primary hover:text-primary/80">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
