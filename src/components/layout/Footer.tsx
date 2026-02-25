"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-slate-950 pt-16 pb-8">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">E</span>
                            </div>
                            ElevePic
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Transformando sua presença digital com fotografia via IA. Headshots profissionais, a qualquer hora, em qualquer lugar.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <SocialLink href="#" icon={Twitter} />
                            <SocialLink href="#" icon={Instagram} />
                            <SocialLink href="#" icon={Linkedin} />
                            <SocialLink href="#" icon={Github} />
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Produto</h4>
                        <ul className="space-y-2">
                            <FooterLink href="#features">Funcionalidades</FooterLink>
                            <FooterLink href="#pricing">Planos</FooterLink>
                            <FooterLink href="#showcase">Exemplos</FooterLink>
                            <FooterLink href="#faq">FAQ</FooterLink>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Empresa</h4>
                        <ul className="space-y-2">
                            <FooterLink href="/about">Sobre Nós</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="/careers">Carreiras</FooterLink>
                            <FooterLink href="/contact">Contato</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Receba Novidades</h4>
                        <p className="text-slate-400 text-sm">
                            Inscreva-se para receber tendências de IA e dicas de marca pessoal.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Seu e-mail profissional"
                                className="bg-white/5 border-white/10 focus:border-blue-500 duration-300 text-white"
                            />
                            <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} ElevePic. Todos os direitos reservados.</p>
                    <div className="flex flex-wrap gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Termos</Link>
                        <Link href="/refunds" className="hover:text-white transition-colors">Reembolsos</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contato</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <Link
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-blue-500 transition-all duration-300"
        >
            <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm">
                {children}
            </Link>
        </li>
    );
}
