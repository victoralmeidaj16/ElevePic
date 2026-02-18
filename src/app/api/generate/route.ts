import { NextRequest, NextResponse } from "next/server";
import { generateHeadshots } from "@/lib/gemini";

export const maxDuration = 120; // 2 minutes for image generation

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const style = formData.get("style") as string;
        const files = formData.getAll("images") as File[];

        if (!files || files.length < 3) {
            return NextResponse.json(
                { error: "Please upload at least 3 photos." },
                { status: 400 }
            );
        }

        if (files.length > 14) {
            return NextResponse.json(
                { error: "Maximum 14 photos allowed." },
                { status: 400 }
            );
        }

        // Convert files to base64
        const imageBase64List = await Promise.all(
            files.map(async (file) => {
                const buffer = await file.arrayBuffer();
                const base64 = Buffer.from(buffer).toString("base64");
                return { data: base64, mimeType: file.type || "image/jpeg" };
            })
        );

        const images = await generateHeadshots(imageBase64List, style);

        if (!images.length) {
            return NextResponse.json(
                { error: "No images were generated. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({ images });
    } catch (error: unknown) {
        console.error("Generation error:", error);
        const message =
            error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
