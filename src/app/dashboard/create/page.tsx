import { UploadWizard } from "@/components/sections/UploadWizard";

export default function CreateSimplePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Nova Criação</h1>
                <p className="text-muted-foreground">Inicie um novo treinamento ou gere novas fotos.</p>
            </div>

            {/* Reusing the Wizard Component, but we might want to strip the container padding in the future */}
            <div className="border border-white/10 rounded-xl overflow-hidden">
                <UploadWizard />
            </div>
        </div>
    )
}
