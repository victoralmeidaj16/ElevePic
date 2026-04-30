const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const MODEL = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export async function generateHeadshots(
    imageBase64List: { data: string; mimeType: string }[],
    prompt: string
): Promise<string[]> {
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
        },
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("Gemini API Error details:", err);
        throw new Error(`Gemini API error: ${res.status} — ${err}`);
    }

    const json = await res.json();
    const candidates = json.candidates ?? [];
    const images: string[] = [];

    if (candidates.length === 0) {
        console.error("Gemini API returned no candidates. Full response:", JSON.stringify(json, null, 2));
    }

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
