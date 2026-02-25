"use client";

import Link from "next/link";
import { Mail, Clock, MessageCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="container px-4 md:px-6 pt-36 pb-24 max-w-4xl mx-auto">
                {/* Back link */}
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-10">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o início
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                    Entre em Contato
                </h1>
                <p className="text-slate-400 text-lg mb-16 max-w-2xl">
                    Nossa equipe está pronta para ajudar. Respondemos a todos os contatos em até 24 horas nos dias úteis.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">E-mail de Suporte</h3>
                            <p className="text-slate-400 text-sm mb-3">Para dúvidas gerais, problemas técnicos e solicitações de reembolso.</p>
                            <a
                                href="mailto:suporte@elevepic.com"
                                className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                            >
                                suporte@elevepic.com
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Horário de Atendimento</h3>
                            <p className="text-slate-400 text-sm">Segunda a Sexta</p>
                            <p className="text-white text-sm font-medium">09h00 – 18h00 (BRT)</p>
                            <p className="text-slate-400 text-sm mt-2">Tempo de resposta: até 24h úteis</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Assuntos Comuns</h3>
                            <ul className="text-slate-400 text-sm space-y-1 mt-1">
                                <li>• Problemas com geração de imagens</li>
                                <li>• Solicitações de reembolso</li>
                                <li>• Dúvidas sobre planos</li>
                                <li>• Questões de privacidade</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Envie uma Mensagem</h2>
                    <p className="text-slate-400 text-sm mb-8">
                        Preencha o formulário abaixo ou envie um e-mail diretamente para{" "}
                        <a href="mailto:suporte@elevepic.com" className="text-blue-400 hover:underline">
                            suporte@elevepic.com
                        </a>
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                            const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
                            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                            window.location.href = `mailto:suporte@elevepic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`)}`;
                        }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-300">
                                    Nome completo
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    type="text"
                                    placeholder="Seu nome"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    required
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-slate-300">
                                Assunto
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                required
                                type="text"
                                placeholder="Ex: Problema com geração de imagem"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-slate-300">
                                Mensagem
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                placeholder="Descreva sua dúvida ou problema em detalhes..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-blue-900/20"
                        >
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </main>
    );
}
