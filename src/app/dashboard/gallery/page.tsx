import { Button } from "@/components/ui/Button";
import { Download, Share2, MoreHorizontal } from "lucide-react";

const MOCK_GALLERY = [
    {
        id: 1,
        date: "12 de Fev, 2024",
        package: "Profissional LinkedIn",
        images: [
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        date: "10 de Jan, 2024",
        package: "Estúdio Casual",
        images: [
            "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
        ]
    }
];

export default function GalleryPage() {
    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Minha Galeria</h1>
                    <p className="text-muted-foreground">Gerencie suas fotos geradas.</p>
                </div>
            </div>

            {MOCK_GALLERY.map((album) => (
                <div key={album.id} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div>
                            <h2 className="text-xl font-semibold">{album.package}</h2>
                            <p className="text-sm text-muted-foreground">{album.date}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-white/10 gap-2">
                                <Download className="w-4 h-4" /> Baixar Tudo
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {album.images.map((src, i) => (
                            <div key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                                <img
                                    src={src}
                                    alt={`Gallery item ${i}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                    <Button size="icon" variant="secondary" className="rounded-full">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="secondary" className="rounded-full">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
