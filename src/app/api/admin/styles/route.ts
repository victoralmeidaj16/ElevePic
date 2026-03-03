import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { getStorage } from "firebase-admin/storage";

const STYLES_COLLECTION = "styles";

// GET /api/admin/styles — list all styles using Admin SDK
export async function GET() {
    try {
        const snapshot = await adminDb.collection(STYLES_COLLECTION)
            .orderBy("order", "asc")
            .get();

        const styles = snapshot.docs.map((docSnap) => ({
            firestoreId: docSnap.id,
            ...docSnap.data(),
        }));

        return NextResponse.json({ styles });
    } catch (error: any) {
        console.error("GET /api/admin/styles error:", error);
        return NextResponse.json(
            {
                error: error.message || "Failed to fetch styles",
                code: error.code,
                details: error.details
            },
            { status: 500 }
        );
    }
}

// Helper function to upload base64 image
async function uploadBase64Image(base64Str: string, styleId: string): Promise<string> {
    const bucket = getStorage().bucket();
    const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error("Formato de imagem inválido.");
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");
    const extension = mimeType.split("/")[1] || "jpeg";
    const filename = `admin/styles/${styleId}_${Date.now()}.${extension}`;

    const file = bucket.file(filename);
    await file.save(buffer, {
        metadata: {
            contentType: mimeType,
            cacheControl: 'public, max-age=31536000',
        },
    });

    // Make the file publicly accessible so anyone can view the card cover
    await file.makePublic();

    // Construct the standard public download URL
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}

// POST /api/admin/styles — add a new style using Admin SDK
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, category, image, prompt, tags } = body;

        if (!title || !prompt) {
            return NextResponse.json(
                { error: "Título e prompt são obrigatórios." },
                { status: 400 }
            );
        }

        const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
        let finalImageUrl = image || "";

        if (finalImageUrl.startsWith("data:image/")) {
            finalImageUrl = await uploadBase64Image(finalImageUrl, id);
        }

        const docRef = await adminDb.collection(STYLES_COLLECTION).add({
            id,
            title,
            category: category || "editorial",
            image: finalImageUrl,
            prompt,
            tags: tags || [],
            order: Date.now(),
        });

        return NextResponse.json({ firestoreId: docRef.id, id });
    } catch (error: any) {
        console.error("POST /api/admin/styles error:", error);
        return NextResponse.json(
            {
                error: error.message || "Failed to add style",
                code: error.code
            },
            { status: 500 }
        );
    }
}

// PUT /api/admin/styles — update an existing style using Admin SDK
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { firestoreId, ...data } = body;

        if (!firestoreId) {
            return NextResponse.json(
                { error: "firestoreId é obrigatório." },
                { status: 400 }
            );
        }

        if (data.image && data.image.startsWith("data:image/")) {
            data.image = await uploadBase64Image(data.image, data.id || firestoreId);
        }

        await adminDb.collection(STYLES_COLLECTION).doc(firestoreId).update(data);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("PUT /api/admin/styles error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update style" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/styles — delete a style using Admin SDK
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const firestoreId = searchParams.get("id");

        if (!firestoreId) {
            return NextResponse.json(
                { error: "id parameter é obrigatório." },
                { status: 400 }
            );
        }

        await adminDb.collection(STYLES_COLLECTION).doc(firestoreId).delete();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("DELETE /api/admin/styles error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete style" },
            { status: 500 }
        );
    }
}
