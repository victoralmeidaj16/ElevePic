import { NextResponse } from "next/server";
import { STYLES } from "@/lib/styles-data";
import { generateHeadshots } from "@/lib/gemini";
import { adminDb } from "@/lib/firebase-admin";
import { ADMIN_EMAIL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { styles, imageUrls, allowNoImages, uid, userEmail } = body;

        console.log("Generating with:", { styles, imageUrlsCount: imageUrls?.length, allowNoImages, uid });

        if (!styles || !Array.isArray(styles) || styles.length === 0) {
            return NextResponse.json(
                { error: "Selecione pelo menos um estilo." },
                { status: 400 }
            );
        }

        if (!allowNoImages && (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length < 3)) {
            return NextResponse.json(
                { error: "É necessário ter pelo menos 3 fotos de rosto para gerar." },
                { status: 400 }
            );
        }

        const isAdmin = userEmail === ADMIN_EMAIL;

        // Verify and reserve credits before generating (prevents abuse)
        if (!isAdmin) {
            if (!uid) {
                return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
            }

            const { FieldValue } = await import("firebase-admin/firestore");
            const userRef = adminDb.collection("users").doc(uid);

            // Use a transaction to atomically check and deduct credits
            const deducted = await adminDb.runTransaction(async (tx) => {
                const snap = await tx.get(userRef);
                const credits: number = snap.data()?.credits ?? 0;
                if (credits < styles.length) return false;
                tx.update(userRef, { credits: FieldValue.increment(-styles.length) });
                return true;
            });

            if (!deducted) {
                return NextResponse.json(
                    { error: "Créditos insuficientes para gerar a quantidade de estilos selecionados." },
                    { status: 402 }
                );
            }
        }

        // 1. Fetch and convert user images to Base64 (Skip if no images provided)
        let imageBuffers: { data: string; mimeType: string }[] = [];
        if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
            imageBuffers = await Promise.all(
                imageUrls.map(async (url: string) => {
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
                    const arrayBuffer = await res.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const contentType = res.headers.get("content-type") || "image/jpeg";
                    return {
                        data: buffer.toString("base64"),
                        mimeType: contentType
                    };
                })
            );
        }

        // Helper: sleep
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // Helper: call generateHeadshots with retry on rate limit
        async function generateWithRetry(
            imageBuffers: { data: string; mimeType: string }[],
            prompt: string,
            styleId: string,
            maxRetries = 3
        ): Promise<string[]> {
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const images = await generateHeadshots(imageBuffers, prompt);
                    return images;
                } catch (err: any) {
                    const msg = err?.message ?? "";
                    const isRateLimit = msg.includes("429") || msg.toLowerCase().includes("quota") || msg.toLowerCase().includes("rate");
                    console.error(`[${styleId}] Attempt ${attempt} failed:`, msg);
                    if (isRateLimit && attempt < maxRetries) {
                        const delay = 5000 * attempt; // 5s, 10s, 15s
                        console.log(`[${styleId}] Rate limit hit. Waiting ${delay}ms before retry...`);
                        await sleep(delay);
                    } else {
                        throw err;
                    }
                }
            }
            return [];
        }

        // 2. Generate for each style SEQUENTIALLY to avoid rate limits
        const results: any[] = [];

        for (const styleId of styles) {
            let style = STYLES.find(s => s.id === styleId) as any;

            // Fallback to Firestore if it's a dynamic admin card
            if (!style) {
                try {
                    const querySnapshot = await adminDb.collection("styles").where("id", "==", styleId).limit(1).get();
                    if (!querySnapshot.empty) {
                        style = querySnapshot.docs[0].data();
                    }
                } catch (e) {
                    console.error("Erro ao buscar estilo no firestore:", e);
                }
            }

            if (!style) {
                console.warn(`Estilo ${styleId} não encontrado.`);
                continue;
            }

            // Build prompt replacing [person] placeholder
            let prompt = "";
            if (imageBuffers.length > 0) {
                prompt = `Use the reference photos provided to identify the person. Generate a new image of THIS EXACT PERSON preserving their facial features, skin tone, hair, and likeness. Apply the following style:\n\n${style.prompt.replace(/\[person\]/g, "the person shown in the reference photos")}`;
            } else {
                prompt = `Generate an image applying the following style:\n\n${style.prompt.replace(/\[person\]/g, "a mysterious and stylish person")}`;
            }

            console.log(`\n--- PROMPT USED FOR [${styleId}] ---\n${prompt}\n--- END PROMPT ---\n`);

            try {
                const generatedImages = await generateWithRetry(imageBuffers, prompt, styleId);

                if (generatedImages.length > 0) {
                    results.push({
                        styleId,
                        url: generatedImages[0],
                        promptUsed: style.prompt
                    });
                } else {
                    console.warn(`[${styleId}] Gemini returned 0 images (no candidates). Skipping.`);
                }
            } catch (error: any) {
                console.error(`[${styleId}] Generation failed after retries:`, error?.message);
            }

            // Small delay between sequential requests to avoid rate limit
            if (styles.indexOf(styleId) < styles.length - 1) {
                await sleep(2000);
            }
        }

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
