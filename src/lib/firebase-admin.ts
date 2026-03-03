import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (!getApps().length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID || "elevepic";
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (serviceAccountKey) {
        console.log("Initializing Firebase Admin with Service Account Key JSON...");
        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            adminApp = initializeApp({
                credential: cert(serviceAccount),
                projectId,
            });
        } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", e);
            throw e;
        }
    } else if (clientEmail && privateKey) {
        console.log("Initializing Firebase Admin with individual credentials...");
        // Ensure private key handles newlines correctly
        const formattedKey = privateKey.includes("\\n")
            ? privateKey.replace(/\\n/g, '\n')
            : privateKey;

        adminApp = initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey: formattedKey,
            }),
            projectId,
        });
    } else {
        console.warn("Firebase Admin: Missing credentials (FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY). Falling back to default credentials...");
        // Fallback: Default initialization (works with ADC or in Google Cloud)
        adminApp = initializeApp({
            projectId,
        });
    }
} else {
    adminApp = getApps()[0];
}

export const adminDb = getFirestore(adminApp);
