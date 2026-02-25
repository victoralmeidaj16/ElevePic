import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RefundsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="container px-4 md:px-6 pt-36 pb-24 max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-10">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o início
                </Link>

                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Política de Reembolso e Cancelamento
                </h1>
                <p className="text-slate-500 text-sm mb-12">Última atualização: 25 de fevereiro de 2025</p>

                <div className="prose prose-invert prose-slate max-w-none space-y-10">

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Modelo de Compra</h2>
                        <p className="text-slate-400 leading-relaxed">
                            O ElevePic opera com um modelo de <strong className="text-white">compra única</strong> (one-time purchase). Não existem assinaturas mensais ou cobranças recorrentes. Ao adquirir um de nossos planos (Inicial, Profissional ou Empresarial), você recebe um pacote de créditos que podem ser utilizados para a geração de headshots profissionais por inteligência artificial.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Elegibilidade para Reembolso</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            Aceitamos solicitações de reembolso integral nas seguintes condições:
                        </p>
                        <ul className="list-none space-y-3">
                            {[
                                "A solicitação é realizada dentro de 7 (sete) dias corridos a partir da data da compra.",
                                "Nenhum crédito do pacote adquirido foi utilizado para gerar imagens.",
                                "A solicitação é enviada por e-mail para suporte@elevepic.com com o comprovante de compra.",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-400">
                                    <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Casos em que o Reembolso não se Aplica</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            O reembolso <strong className="text-white">não será concedido</strong> nos seguintes casos:
                        </p>
                        <ul className="space-y-2 text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                Um ou mais créditos do pacote já foram utilizados para gerar imagens.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                A solicitação é feita após o prazo de 7 dias corridos da compra.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                A conta do usuário foi suspensa por violação dos nossos Termos de Serviço.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                Insatisfação com o resultado estético das imagens geradas (a qualidade do resultado depende da qualidade das fotos enviadas pelo usuário).
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Como Solicitar um Reembolso</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Para solicitar um reembolso, envie um e-mail para{" "}
                            <a href="mailto:suporte@elevepic.com" className="text-blue-400 hover:underline">
                                suporte@elevepic.com
                            </a>{" "}
                            com o assunto <strong className="text-white">&quot;Solicitação de Reembolso&quot;</strong>, incluindo:
                        </p>
                        <ul className="mt-4 space-y-2 text-slate-400">
                            <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Seu nome completo e e-mail de cadastro</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400">•</span> ID ou comprovante da transação (disponível no e-mail de confirmação Stripe)</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Motivo da solicitação</li>
                        </ul>
                        <p className="text-slate-400 leading-relaxed mt-4">
                            Nossa equipe responderá em até <strong className="text-white">2 dias úteis</strong>. Se aprovado, o reembolso será processado em até <strong className="text-white">5 a 10 dias úteis</strong>, dependendo da operadora do seu cartão.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Cancelamento de Compra</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Como o ElevePic não possui assinaturas recorrentes, não há processo de cancelamento de contrato. Ao comprar um pacote, os créditos ficam disponíveis indefinidamente em sua conta até serem utilizados. Não realizamos cobranças automáticas futuras.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Contestações e Chargebacks</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Encorajamos os clientes a entrar em contato conosco antes de iniciar uma contestação junto ao banco ou operadora do cartão. Trabalhamos proativamente para resolver qualquer problema. Disputas não comunicadas previamente podem resultar na suspensão do acesso à plataforma enquanto a contestação estiver em aberto.
                        </p>
                    </section>

                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm">
                            <strong className="text-white">Dúvidas?</strong> Entre em contato com nossa equipe pelo e-mail{" "}
                            <a href="mailto:suporte@elevepic.com" className="text-blue-400 hover:underline">
                                suporte@elevepic.com
                            </a>{" "}
                            ou acesse nossa{" "}
                            <Link href="/contact" className="text-blue-400 hover:underline">
                                página de contato
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
