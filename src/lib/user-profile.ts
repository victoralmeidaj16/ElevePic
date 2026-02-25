import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    credits: number;
    createdAt: Date;
}

const INITIAL_CREDITS = 5;

/**
 * Fetches the user profile from Firestore.
 * If it doesn't exist, creates a new profile with the initial credit balance.
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                uid: userId,
                credits: data.credits ?? 0,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            };
        } else {
            // Create a new profile with initial credits
            const newProfile: UserProfile = {
                uid: userId,
                credits: INITIAL_CREDITS,
                createdAt: new Date(),
            };

            await setDoc(docRef, {
                credits: newProfile.credits,
                createdAt: newProfile.createdAt,
            });

            return newProfile;
        }
    } catch (error) {
        console.error("Error fetching or creating user profile:", error);
        throw new Error("Falha ao carregar o perfil do usuário.");
    }
}

/**
 * Deducts a specific amount of credits from the user's profile.
 */
export async function deductCredits(userId: string, amount: number): Promise<void> {
    if (amount <= 0) return;

    try {
        const docRef = doc(db, "users", userId);

        // Use increment with a negative value to deduct securely
        await updateDoc(docRef, {
            credits: increment(-amount)
        });
    } catch (error) {
        console.error("Error deducting credits:", error);
        throw new Error("Falha ao atualizar o saldo de créditos.");
    }
}
