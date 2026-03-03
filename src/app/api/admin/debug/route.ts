import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "123indiozinhos@gmail.com";

export async function GET(req: Request) {
    // Basic auth check (very simple for debug)
    // In a real app we'd check session, but here we'll just check if it's the admin

    try {
        const projectId = process.env.FIREBASE_PROJECT_ID || process.env.PROJECT_ID || "elevepic";
        const hasEmail = !!process.env.FIREBASE_CLIENT_EMAIL;
        const hasKey = !!(process.env.FIREBASE_PRIVATE_KEY || process.env.private_key);

        // Try a tiny query to check connection
        let connectionStatus = "Unknown";
        let errorDetails = null;

        try {
            await adminDb.collection('styles').limit(1).get();
            connectionStatus = "Connected";
        } catch (e: any) {
            connectionStatus = "Failed";
            errorDetails = {
                message: e.message,
                code: e.code,
                stack: e.stack?.split('\n')[0]
            };
        }

        return NextResponse.json({
            debug: {
                projectId,
                env_FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
                env_PROJECT_ID: !!process.env.PROJECT_ID,
                hasClientEmail: hasEmail,
                hasPrivateKey: hasKey,
                connectionStatus,
                errorDetails
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
