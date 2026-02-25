import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"

const testimonials = [
    {
        author: {
            name: "Ana Silva",
            handle: "@ana.design",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
        },
        text: "O ElevePic transformou meu perfil no LinkedIn. As fotos ficaram incrivelmente profissionais e naturais!",
        href: "https://twitter.com/ana.design"
    },
    {
        author: {
            name: "Carlos Mendes",
            handle: "@carlos.dev",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        text: "Impressionante a qualidade. Consegui fotos para meu portfólio em minutos, sem precisar de um estúdio.",
        href: "https://twitter.com/carlos.dev"
    },
    {
        author: {
            name: "Mariana Costa",
            handle: "@mari.marketing",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        text: "A melhor ferramenta de IA para fotos corporativas que já usei. Recomendo para todos os meus colegas."
    },
    {
        author: {
            name: "João Pedro",
            handle: "@jp.tech",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
        },
        text: "Facilidade e resultado. O ElevePic entregou exatamente o que eu precisava para minha marca pessoal."
    }
]

export function Testimonials() {
    return (
        <TestimonialsSection
            title="O que dizem nossos usuários"
            description="Junte-se a milhares de profissionais que já elevaram sua imagem com o ElevePic."
            testimonials={testimonials}
        />
    )
}
