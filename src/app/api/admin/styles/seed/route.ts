import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { STYLES } from "@/lib/styles-data";

// POST /api/admin/styles/seed — seeds all styles from styles-data.ts into Firestore
export async function POST() {
    try {
        const snapshot = await adminDb.collection("styles").get();
        const existingIds = snapshot.docs.map(doc => doc.data().id as string);

        const added: string[] = [];
        const skipped: string[] = [];

        for (let i = 0; i < STYLES.length; i++) {
            const style = STYLES[i];
            if (existingIds.includes(style.id)) {
                skipped.push(style.title);
                continue;
            }

            await adminDb.collection("styles").add({
                id: style.id,
                title: style.title,
                category: style.category,
                image: style.image || "",
                prompt: style.prompt,
                tags: style.tags || [],
                order: Date.now() + i,
            });

            added.push(style.title);
        }

        return NextResponse.json({
            success: true,
            added,
            skipped,
            message: `${added.length} card(s) adicionado(s), ${skipped.length} ignorado(s).`,
        });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json(
            { error: error.message || "Erro ao executar seed." },
            { status: 500 }
        );
    }
}
