const { db } = require('./src/lib/firebase');
const { adminDb } = require('./src/lib/firebase-admin');
const { collection, getDocs, limit, query } = require('firebase/firestore');

async function verifyFinalSetup() {
    console.log("--- Final Connection Verification ---");

    try {
        console.log("\n1. Testing Server-Side (Admin SDK)...");
        const adminSnapshot = await adminDb.collection('styles').limit(1).get();
        console.log("✅ Admin SDK connected to 'database'. Styles found:", adminSnapshot.size);

        console.log("\n2. Testing Client-Side (Client SDK)...");
        const q = query(collection(db, 'styles'), limit(1));
        const clientSnapshot = await getDocs(q);
        console.log("✅ Client SDK connected to 'database'. Styles found:", clientSnapshot.size);

    } catch (error) {
        console.error("❌ Verification Failed:", error.message);
    }
}

verifyFinalSetup();
