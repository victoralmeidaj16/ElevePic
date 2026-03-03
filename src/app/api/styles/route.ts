import { NextResponse } from "next/server";
import {
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const STYLES_COLLECTION = "styles";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const q = query(
            collection(db, STYLES_COLLECTION),
            orderBy("order", "asc")
        );
        const snapshot = await getDocs(q);

        const styles = snapshot.docs.map((docSnap) => ({
            firestoreId: docSnap.id,
            ...docSnap.data(),
        }));

        return NextResponse.json({ styles });
    } catch (error: any) {
        console.error("GET /api/styles error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch styles" },
            { status: 500 }
        );
    }
}
