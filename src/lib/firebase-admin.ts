import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (!getApps().length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID || "elevepic";
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (serviceAccountKey) {
        // Option 1: Full JSON string
        const serviceAccount = JSON.parse(serviceAccountKey);
        adminApp = initializeApp({
            credential: cert(serviceAccount),
            projectId,
        });
    } else if (clientEmail && privateKey) {
        // Option 2: Individual variables (more robust for Render/Vercel)
        adminApp = initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey,
            }),
            projectId,
        });
    } else {
        // Fallback: Default initialization (works with ADC or in Google Cloud)
        adminApp = initializeApp({
            projectId,
        });
    }
} else {
    adminApp = getApps()[0];
}

export const adminDb = getFirestore(adminApp);
