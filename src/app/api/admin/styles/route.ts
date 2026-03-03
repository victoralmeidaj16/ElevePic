import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const STYLES_COLLECTION = "styles";
const ADMIN_EMAIL = "123indiozinhos@gmail.com";

// GET /api/admin/styles — list all styles
export async function GET() {
    try {
        const snapshot = await adminDb
            .collection(STYLES_COLLECTION)
            .orderBy("order", "asc")
            .get();

        const styles = snapshot.docs.map((doc) => ({
            firestoreId: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ styles });
    } catch (error: any) {
        console.error("GET /api/admin/styles error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch styles" },
            { status: 500 }
        );
    }
}

// POST /api/admin/styles — add a new style
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

        const id =
            typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).substring(2) + Date.now().toString(36);

        const docRef = await adminDb.collection(STYLES_COLLECTION).add({
            id,
            title,
            category: category || "editorial",
            image: image || "",
            prompt,
            tags: tags || [],
            order: Date.now(),
        });

        return NextResponse.json({ firestoreId: docRef.id, id });
    } catch (error: any) {
        console.error("POST /api/admin/styles error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to add style" },
            { status: 500 }
        );
    }
}

// PUT /api/admin/styles — update an existing style
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

        await adminDb
            .collection(STYLES_COLLECTION)
            .doc(firestoreId)
            .update(data);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("PUT /api/admin/styles error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update style" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/styles — delete a style
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

        await adminDb
            .collection(STYLES_COLLECTION)
            .doc(firestoreId)
            .delete();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("DELETE /api/admin/styles error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete style" },
            { status: 500 }
        );
    }
}
