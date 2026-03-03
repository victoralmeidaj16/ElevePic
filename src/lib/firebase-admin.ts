import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (!getApps().length) {
    // Use application default credentials or service account
    // When no FIREBASE_SERVICE_ACCOUNT_KEY is set, it falls back to
    // projectId-based initialization (works on most hosting platforms)
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccountKey) {
        const serviceAccount = JSON.parse(serviceAccountKey);
        adminApp = initializeApp({
            credential: cert(serviceAccount),
            projectId: "elevepic",
        });
    } else {
        // Fallback: initialize with just projectId (uses ADC or emulator)
        adminApp = initializeApp({
            projectId: "elevepic",
        });
    }
} else {
    adminApp = getApps()[0];
}

export const adminDb = getFirestore(adminApp);
