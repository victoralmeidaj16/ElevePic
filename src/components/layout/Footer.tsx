"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/40 pt-16 pb-8">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-white">
                            ElevePic
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Transforming your digital presence with AI-powered photography. Professional headshots, anytime, anywhere.
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
                        <h4 className="text-lg font-semibold">Product</h4>
                        <ul className="space-y-2">
                            <FooterLink href="#features">Features</FooterLink>
                            <FooterLink href="#pricing">Pricing</FooterLink>
                            <FooterLink href="#showcase">Showcase</FooterLink>
                            <FooterLink href="#faq">FAQ</FooterLink>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Company</h4>
                        <ul className="space-y-2">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Stay Updated</h4>
                        <p className="text-muted-foreground text-sm">
                            Subscribe to our newsletter for the latest AI trends and photography tips.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 focus:border-primary duration-300"
                            />
                            <Button size="icon" className="bg-primary hover:bg-primary/90">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ElevePic. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
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
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-primary transition-all duration-300"
        >
            <Icon className="w-5 h-5" />
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-muted-foreground hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                {children}
            </Link>
        </li>
    );
}
