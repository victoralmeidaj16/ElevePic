import { NextResponse } from "next/server";
import { STYLES } from "@/lib/styles-data";
import { generateHeadshots } from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { styles, imageUrls } = body;

        console.log("Generating with:", { styles, imageUrlsCount: imageUrls?.length });

        if (!styles || !Array.isArray(styles) || styles.length === 0) {
            return NextResponse.json(
                { error: "Selecione pelo menos um estilo." },
                { status: 400 }
            );
        }

        if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length < 3) {
            return NextResponse.json(
                { error: "É necessário ter pelo menos 3 fotos de rosto para gerar." },
                { status: 400 }
            );
        }

        // 1. Fetch and convert user images to Base64
        const imageBuffers = await Promise.all(
            imageUrls.map(async (url: string) => {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
                const arrayBuffer = await res.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                // Determine mime type (simple check or default to png/jpeg)
                // For simplicity, assuming standard image formats.
                // In production, use magic numbers or content-type header.
                const contentType = res.headers.get("content-type") || "image/jpeg";
                return {
                    data: buffer.toString("base64"),
                    mimeType: contentType
                };
            })
        );

        // 2. Generate for each style
        // We run these in parallel, but catch errors effectively
        const resultsPromises = styles.map(async (styleId: string) => {
            const style = STYLES.find(s => s.id === styleId);
            if (!style) return null;

            // Use the Nano Banana prompt directly, replacing [person] placeholder
            const prompt = `Use the reference photos provided to identify the person. Generate a new image of THIS EXACT PERSON preserving their facial features, skin tone, hair, and likeness. Apply the following style:\n\n${style.prompt.replace(/\[person\]/g, "the person shown in the reference photos")}`;
            console.log(`\n--- PROMPT USED FOR [${styleId}] ---\n${prompt}\n--- END PROMPT ---\n`);

            try {
                // Call Gemini
                // We request 1 image per style to save limit/time, but gemini.ts defaults to 4.
                // Let's take the first valid one.
                const generatedImages = await generateHeadshots(imageBuffers, prompt);

                if (generatedImages.length > 0) {
                    return {
                        styleId,
                        url: generatedImages[0], // Base64 data URL
                        promptUsed: style.prompt
                    };
                }
                return null;
            } catch (error) {
                console.error(`Failed to generate style ${styleId}:`, error);
                return null; // or throw if we want to fail the whole batch
            }
        });

        const results = (await Promise.all(resultsPromises)).filter(Boolean);

        if (results.length === 0) {
            throw new Error("Falha na geração de todas as imagens. Tente novamente.");
        }

        return NextResponse.json({
            success: true,
            images: results,
            message: "Imagens geradas com sucesso!"
        });

    } catch (error: any) {
        console.error("Dashboard generation failed:", error);
        return NextResponse.json(
            { error: error.message || "Falha ao processar solicitação de geração." },
            { status: 500 }
        );
    }
}
