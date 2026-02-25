import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="container px-4 md:px-6 pt-36 pb-24 max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-10">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o início
                </Link>

                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Termos de Serviço
                </h1>
                <p className="text-slate-500 text-sm mb-12">Última atualização: 25 de fevereiro de 2025</p>

                <div className="space-y-10 text-slate-400 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e utilizar o ElevePic (&quot;Plataforma&quot;, &quot;Serviço&quot;), você concorda com estes Termos de Serviço e com nossa{" "}
                            <Link href="/privacy" className="text-blue-400 hover:underline">Política de Privacidade</Link>.
                            Se não concordar com algum dos termos, não utilize o Serviço. Estes termos constituem um acordo legal entre você (&quot;Usuário&quot;) e ElevePic.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Descrição do Serviço</h2>
                        <p>
                            O ElevePic é uma plataforma de geração de headshots profissionais e fotos de perfil utilizando inteligência artificial. Ao enviar suas fotos, nossos modelos de IA criam imagens sintéticas de alta qualidade em diferentes estilos selecionados pelo usuário. O Serviço é disponibilizado mediante a aquisição de pacotes de créditos de uso único.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Cadastro e Conta</h2>
                        <p>
                            Para utilizar o Serviço, você deve criar uma conta informando um endereço de e-mail válido e uma senha. Você é responsável pela confidencialidade das suas credenciais de acesso e por todas as atividades realizadas em sua conta. Notifique imediatamente o ElevePic em caso de uso não autorizado.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Compras e Pagamentos</h2>
                        <p className="mb-4">
                            O ElevePic oferece planos de uso único, sem assinatura recorrente. Os preços são exibidos em Reais (BRL) e incluem todos os impostos aplicáveis. O pagamento é processado com segurança pela Stripe, Inc. Após a confirmação do pagamento, os créditos são disponibilizados imediatamente em sua conta.
                        </p>
                        <p>
                            Consulte nossa{" "}
                            <Link href="/refunds" className="text-blue-400 hover:underline">Política de Reembolso</Link>{" "}
                            para informações sobre devoluções.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Conteúdo Enviado pelo Usuário</h2>
                        <p className="mb-4">
                            Ao enviar fotografias para a plataforma, você declara e garante que:
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> É o titular legítimo dos direitos sobre as imagens enviadas.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> Possui a plena capacidade legal de contratar e consentir com estes termos.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> As imagens não contêm conteúdo de terceiros sem o devido consentimento.</li>
                            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">•</span> As imagens enviadas retratam apenas a sua própria pessoa.</li>
                        </ul>
                        <p className="mt-4">
                            Ao enviar imagens, você concede ao ElevePic uma licença limitada, não exclusiva e revogável para processar tais imagens exclusivamente com o propósito de gerar seus headshots. Não utilizamos suas imagens para treinar modelos de IA de terceiros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Propriedade Intelectual das Imagens Geradas</h2>
                        <p>
                            As imagens geradas pela plataforma a partir das suas fotos são de sua propriedade. Você pode utilizá-las para fins pessoais e, nos planos Profissional e Empresarial, para fins comerciais (Licença Comercial incluída). O ElevePic não reivindica quaisquer direitos sobre as imagens geradas para você.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Uso Proibido</h2>
                        <p className="mb-4">É expressamente proibido utilizar o Serviço para:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">✗</span> Criar imagens de pessoas sem o seu consentimento explícito.</li>
                            <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">✗</span> Gerar conteúdo ilegal, difamatório, obsceno ou que incite violência.</li>
                            <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">✗</span> Tentar contornar medidas de segurança ou fazer acesso não autorizado aos sistemas.</li>
                            <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">✗</span> Revender créditos ou acesso à plataforma para terceiros sem autorização prévia.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">8. Limitação de Responsabilidade</h2>
                        <p>
                            O Serviço é fornecido &quot;como está&quot; (&quot;as is&quot;), sem garantias de qualquer natureza, expressas ou implícitas. O ElevePic não garante que os resultados gerados atenderão plenamente às expectativas estéticas do usuário, pois a qualidade dos outputs depende diretamente da qualidade das imagens de entrada. Na extensão máxima permitida pela lei aplicável, o ElevePic não será responsável por danos indiretos, incidentais ou consequentes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">9. Modificações dos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações significativas serão notificadas por e-mail ou mediante aviso na plataforma. O uso contínuo do Serviço após a notificação constitui aceitação dos novos termos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">10. Lei Aplicável</h2>
                        <p>
                            Estes Termos são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão submetidas ao foro da Comarca de São Paulo – SP, com renúncia a qualquer outro, por mais privilegiado que seja.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">11. Contato</h2>
                        <p>
                            Para dúvidas sobre estes Termos, entre em contato pelo e-mail{" "}
                            <a href="mailto:suporte@elevepic.com" className="text-blue-400 hover:underline">
                                suporte@elevepic.com
                            </a>{" "}
                            ou acesse nossa{" "}
                            <Link href="/contact" className="text-blue-400 hover:underline">página de contato</Link>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
