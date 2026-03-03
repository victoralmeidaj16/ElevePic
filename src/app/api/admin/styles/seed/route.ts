import { NextResponse } from "next/server";
import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { STYLES } from "@/lib/styles-data";

const STYLES_COLLECTION = "styles";

// POST /api/admin/styles/seed — seed all default styles
export async function POST() {
    try {
        const batch = writeBatch(db);

        STYLES.forEach((style, index) => {
            const docRef = doc(collection(db, STYLES_COLLECTION));
            batch.set(docRef, { ...style, order: index });
        });

        await batch.commit();

        return NextResponse.json({ success: true, count: STYLES.length });
    } catch (error: any) {
        console.error("POST /api/admin/styles/seed error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to seed styles" },
            { status: 500 }
        );
    }
}
