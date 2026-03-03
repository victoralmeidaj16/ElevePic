import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (!getApps().length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.PROJECT_ID || "elevepic";
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY || process.env.private_key;

    console.log(`[Firebase Admin] Attempting initialization for project: ${projectId}`);

    if (serviceAccountKey) {
        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            adminApp = initializeApp({
                credential: cert(serviceAccount),
                projectId: serviceAccount.project_id || projectId,
            });
            console.log("[Firebase Admin] Initialized via Service Account JSON");
        } catch (e) {
            console.error("[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", e);
            throw e;
        }
    } else if (clientEmail && privateKeyRaw) {
        // Sanitize Private Key
        let privateKey = privateKeyRaw.trim();

        // Remove surrounding quotes if any
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.substring(1, privateKey.length - 1);
        }

        // Fix newlines
        privateKey = privateKey.replace(/\\n/g, '\n');

        console.log(`[Firebase Admin] Initialized via individual credentials (Email: ${clientEmail.substring(0, 10)}...)`);

        adminApp = initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey,
            }),
            projectId,
        });
    } else {
        console.warn("[Firebase Admin] Initialization fallback (No explicit credentials found)");
        adminApp = initializeApp({
            projectId,
        });
    }
} else {
    adminApp = getApps()[0];
}

export const adminDb = getFirestore(adminApp);
