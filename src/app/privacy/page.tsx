import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="container px-4 md:px-6 pt-36 pb-24 max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-10">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o início
                </Link>

                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Política de Privacidade
                </h1>
                <p className="text-slate-500 text-sm mb-12">Última atualização: 25 de fevereiro de 2025</p>

                <div className="space-y-10 text-slate-400 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Quem Somos</h2>
                        <p>
                            O ElevePic é um serviço de geração de headshots profissionais via inteligência artificial. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa plataforma. Para dúvidas, entre em contato em{" "}
                            <a href="mailto:suporte@elevepic.com" className="text-blue-400 hover:underline">
                                suporte@elevepic.com
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Dados que Coletamos</h2>
                        <div className="space-y-4">
                            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5">
                                <h3 className="text-white font-medium mb-2">Dados de Cadastro</h3>
                                <p className="text-sm">Endereço de e-mail e senha (armazenada com hash seguro via Firebase Authentication).</p>
                            </div>
                            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5">
                                <h3 className="text-white font-medium mb-2">Imagens Enviadas</h3>
                                <p className="text-sm">As fotografias que você faz upload para geração dos headshots. Estas imagens são armazenadas temporariamente e podem ser deletadas mediante solicitação.</p>
                            </div>
                            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5">
                                <h3 className="text-white font-medium mb-2">Dados de Pagamento</h3>
                                <p className="text-sm">Não armazenamos dados de cartão de crédito. O processamento é realizado integralmente pela Stripe, Inc., que é certificada PCI-DSS. Recebemos apenas confirmações de pagamento e IDs de transação.</p>
                            </div>
                            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5">
                                <h3 className="text-white font-medium mb-2">Dados de Uso</h3>
                                <p className="text-sm">Logs de acesso, endereço IP, tipo de navegador e ações na plataforma, coletados automaticamente para fins de segurança e melhoria do serviço.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Como Usamos Seus Dados</h2>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Criar e gerenciar sua conta de acesso.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Processar suas imagens para gerar os headshots solicitados.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Processar pagamentos e gerenciar seus créditos.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Enviar comunicações transacionais (confirmações de compra, entrega de imagens).</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Detectar e prevenir fraudes e acessos não autorizados.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Melhorar nossos serviços (nunca usando suas imagens para treinar modelos de IA de terceiros).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Serviços de Terceiros</h2>
                        <p className="mb-4">O ElevePic utiliza os seguintes provedores de serviço confiáveis:</p>
                        <div className="space-y-3">
                            {[
                                { name: "Firebase (Google LLC)", desc: "Autenticação de usuários e armazenamento de dados e imagens. Política: firebase.google.com/support/privacy" },
                                { name: "Stripe, Inc.", desc: "Processamento de pagamentos com segurança PCI-DSS. Política: stripe.com/br/privacy" },
                                { name: "Google AI (Gemini)", desc: "Modelo de inteligência artificial utilizado internamente para geração de imagens." },
                            ].map((svc) => (
                                <div key={svc.name} className="bg-slate-900/60 border border-white/5 rounded-xl p-4">
                                    <p className="text-white font-medium text-sm">{svc.name}</p>
                                    <p className="text-slate-400 text-sm mt-1">{svc.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm">
                            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Retenção e Exclusão de Dados</h2>
                        <p>
                            Suas imagens de entrada (fotos enviadas para geração) são deletadas automaticamente de nossos servidores após <strong className="text-white">30 dias</strong> da data de upload. As imagens geradas ficam disponíveis em sua conta até que você as exclua. Dados de conta são mantidos enquanto a conta estiver ativa.
                        </p>
                        <p className="mt-4">
                            Para solicitar a exclusão antecipada de seus dados, envie um e-mail para{" "}
                            <a href="mailto:suporte@elevepic.com" className="text-blue-400 hover:underline">
                                suporte@elevepic.com
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Seus Direitos (LGPD)</h2>
                        <p className="mb-4">
                            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de:
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Acessar os dados pessoais que temos sobre você.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Corrigir dados incompletos, inexatos ou desatualizados.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Solicitar a exclusão de seus dados pessoais.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Revogar seu consentimento para o tratamento de dados a qualquer momento.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Solicitar a portabilidade dos seus dados.</li>
                        </ul>
                        <p className="mt-4">
                            Para exercer qualquer um desses direitos, entre em contato em{" "}
                            <a href="mailto:suporte@elevepic.com" className="text-blue-400 hover:underline">
                                suporte@elevepic.com
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Segurança</h2>
                        <p>
                            Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados, incluindo criptografia em trânsito (HTTPS/TLS) e em repouso, controles de acesso e monitoramento contínuo de segurança. No entanto, nenhuma transmissão pela internet é 100% segura, e não podemos garantir segurança absoluta.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
                        <p>
                            Podemos utilizar cookies essenciais para manter sua sessão autenticada e cookies analíticos para entender como os usuários interagem com a plataforma. Consulte nossa{" "}
                            <Link href="/cookies" className="text-blue-400 hover:underline">Política de Cookies</Link>{" "}
                            para mais detalhes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">9. Alterações a esta Política</h2>
                        <p>
                            Podemos atualizar esta Política de Privacidade periodicamente. Alterações relevantes serão notificadas via e-mail ou por aviso na plataforma. Recomendamos revisitar esta página periodicamente.
                        </p>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    );
}
