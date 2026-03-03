import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { STYLES } from "@/lib/styles-data";

const STYLES_COLLECTION = "styles";

export async function POST() {
    try {
        console.log(`[Seed] Starting seed process for ${STYLES.length} styles...`);
        const batch = adminDb.batch();

        STYLES.forEach((style, index) => {
            // Use the style.id as the document ID to prevent duplicates if seeded multiple times
            const docRef = adminDb.collection(STYLES_COLLECTION).doc(style.id);
            batch.set(docRef, {
                ...style,
                order: index,
                updatedAt: new Date().toISOString()
            });
        });

        await batch.commit();
        console.log(`[Seed] Successfully seeded ${STYLES.length} styles.`);

        return NextResponse.json({ success: true, count: STYLES.length });
    } catch (error: any) {
        console.error("POST /api/admin/styles/seed error:", error);
        return NextResponse.json(
            {
                error: error.message || "Failed to seed styles",
                code: error.code,
                details: error.details
            },
            { status: 500 }
        );
    }
}
