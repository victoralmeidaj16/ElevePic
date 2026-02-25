import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        // Parse JSON body instead of FormData
        const body = await req.json();
        const { style, imageUrls } = body;

        if (!style || !imageUrls || !Array.isArray(imageUrls) || imageUrls.length < 3) {
            return NextResponse.json(
                { error: "Invalid input. Provide style and at least 3 image URLs." },
                { status: 400 }
            );
        }

        // Fetch user images from URLs and convert to Base64
        // In a production environment, you might pass these URLs directly if the model supports it 
        // or download them server-side safely. 
        // Here we download them to pass as inline data to Gemini.
        const imageParts = await Promise.all(
            imageUrls.map(async (url: string) => {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                return {
                    inlineData: {
                        data: buffer.toString("base64"),
                        mimeType: "image/jpeg", // Assuming JPEGs for simplicity/mock
                    },
                };
            })
        );

        const prompts: Record<string, string> = {
            Corporate: "Professional corporate headshot, dark navy suit, white shirt, neutral gray background, studio lighting, 4K, photorealistic",
            Creative: "Creative professional headshot, casual smart attire, colorful bokeh background, natural light, 4K, photorealistic",
            Executive: "Executive portrait, formal attire, clean white background, dramatic studio lighting, 4K, photorealistic",
            Natural: "Natural professional headshot, smart casual, outdoor park background, soft golden hour light, 4K, photorealistic",
        };

        const selectedPrompt = prompts[style] || prompts.Corporate;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Note: As before, Gemini 1.5 Pro standard API returns text. 
        // We simulate the generation or use the mock again unless access to a visual generation model is confirmed.
        // For this demo, we proceed with the Mock Fallback but preserve the structure of a real call.

        /* 
        const prompt = `Generate a high-quality professional headshot based on these reference photos. 
        Target Style: ${selectedPrompt}. 
        Ensure the subject resembles the person in the reference photos but with the specified professional style/clothing/background.
        Return ONLY the image.`;
        
        // Real call (commented out until visual generation model availability is confirmed/configured)
        // const result = await model.generateContent([prompt, ...imageParts]); 
        */

        // MOCK FALLBACK
        const mockImages = [
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573496359-0cf84flc527a?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556157382-97eda2d622ca?q=80&w=1000&auto=format&fit=crop"
        ];

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json({ images: mockImages });

    } catch (error) {
        console.error("Generation failed:", error);
        return NextResponse.json({ error: "Generation failed" }, { status: 500 });
    }
}
