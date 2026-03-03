import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (!getApps().length) {
    // Explicit project ID - verified from firebase.ts
    const projectId = "elevepic";

    // Credentials from environment
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // Check both uppercase (standard) and lowercase (seen in user screenshot)
    const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY || process.env.private_key;

    console.log(`[Firebase Admin] Attempting initialization for project: ${projectId}`);

    if (clientEmail && privateKeyRaw) {
        // Sanitize Private Key
        let privateKey = privateKeyRaw.trim();

        // Remove surrounding quotes if any (common copy-paste issue)
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.substring(1, privateKey.length - 1);
        }

        // Fix newlines - crucial for Render/Vercel
        privateKey = privateKey.replace(/\\n/g, '\n');

        // Ensure it has the proper BEGIN/END headers
        if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
            console.error("[Firebase Admin] MISSING PRIVATE KEY HEADERS!");
        }

        try {
            adminApp = initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
                projectId,
            });
            console.log(`[Firebase Admin] SUCCESS: Initialized with ${clientEmail}`);
        } catch (e) {
            console.error("[Firebase Admin] FATAL INITIALIZATION ERROR:", e);
            throw e;
        }
    } else {
        console.warn("[Firebase Admin] MISSING CREDENTIALS! Falling back to default...");
        adminApp = initializeApp({
            projectId,
        });
    }
} else {
    adminApp = getApps()[0];
}

export const adminDb = getFirestore(adminApp);
adminDb.settings({ databaseId: "database" });
