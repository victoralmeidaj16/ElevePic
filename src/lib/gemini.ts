const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const MODEL = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const STYLE_PROMPTS: Record<string, string> = {
    corporate:
        "Generate a professional corporate headshot of this exact person. Dark navy suit, white dress shirt, neutral gray studio background, soft even studio lighting, sharp focus on face, photorealistic, 4K quality. Preserve the person's exact facial features, skin tone, hair, and likeness.",
    creative:
        "Generate a creative professional headshot of this exact person. Smart casual attire, colorful soft bokeh background, natural warm light, relaxed confident expression, photorealistic, 4K quality. Preserve the person's exact facial features, skin tone, hair, and likeness.",
    executive:
        "Generate an executive portrait of this exact person. Formal dark suit, clean white background, dramatic directional studio lighting, powerful confident expression, photorealistic, 4K quality. Preserve the person's exact facial features, skin tone, hair, and likeness.",
    natural:
        "Generate a natural professional headshot of this exact person. Smart casual attire, outdoor park or garden background, soft golden hour sunlight, warm approachable smile, photorealistic, 4K quality. Preserve the person's exact facial features, skin tone, hair, and likeness.",
};

export async function generateHeadshots(
    imageBase64List: { data: string; mimeType: string }[],
    style: string
): Promise<string[]> {
    const prompt = STYLE_PROMPTS[style] ?? STYLE_PROMPTS.corporate;

    // Build parts: all reference images + text prompt
    const parts: object[] = imageBase64List.map((img) => ({
        inlineData: {
            mimeType: img.mimeType,
            data: img.data,
        },
    }));
    parts.push({ text: prompt });

    const body = {
        contents: [{ parts }],
        generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
            numberOfImages: 4,
        },
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Gemini API error: ${res.status} — ${err}`);
    }

    const json = await res.json();
    const candidates = json.candidates ?? [];
    const images: string[] = [];

    for (const candidate of candidates) {
        for (const part of candidate.content?.parts ?? []) {
            if (part.inlineData?.data) {
                const mime = part.inlineData.mimeType ?? "image/png";
                images.push(`data:${mime};base64,${part.inlineData.data}`);
            }
        }
    }

    return images;
}
