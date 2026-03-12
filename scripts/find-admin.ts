import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env.local") });

import { adminDb } from "../src/lib/firebase-admin";
import { ADMIN_EMAIL } from "../src/lib/constants";

async function findAdmin() {
    try {
        console.log(`Searching for admin: ${ADMIN_EMAIL}`);

        // Try searching by email field in 'users' collection
        const snapshot = await adminDb.collection("users").where("email", "==", ADMIN_EMAIL).get();

        if (snapshot.empty) {
            console.log("No user found with that email in 'users' collection.");

            // Try list all users to see document IDs
            const allUsers = await adminDb.collection("users").limit(10).get();
            console.log("Sample users in collection:");
            allUsers.forEach(doc => {
                console.log(`- ID: ${doc.id}, Email: ${doc.data().email}`);
            });

            process.exit(0);
        }

        snapshot.forEach(doc => {
            console.log(`✅ Found Admin!`);
            console.log(`ID: ${doc.id}`);
            console.log(`Data:`, doc.data());
        });

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

findAdmin();
