import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

const INITIAL_CREDITS = 5;

/**
 * POST /api/profile/init
 * Creates or fetches a user profile in Firestore using the Admin SDK.
 * Body: { uid: string, credits?: number }
 */
export async function POST(req: NextRequest) {
    try {
        const { uid, credits } = await req.json();

        if (!uid) {
            return NextResponse.json({ error: "uid é obrigatório." }, { status: 400 });
        }

        const docRef = adminDb.collection("users").doc(uid);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            // Profile already exists — just return it
            const data = docSnap.data()!;
            return NextResponse.json({ uid, credits: data.credits ?? 0, created: false });
        }

        // Create new profile with provided credits (from Stripe session) or default
        const initialCredits = typeof credits === "number" && credits > 0 ? credits : INITIAL_CREDITS;

        await docRef.set({
            credits: initialCredits,
            createdAt: new Date(),
        });

        return NextResponse.json({ uid, credits: initialCredits, created: true });
    } catch (error: any) {
        console.error("POST /api/profile/init error:", error);
        return NextResponse.json(
            { error: error.message || "Falha ao inicializar o perfil." },
            { status: 500 }
        );
    }
}
