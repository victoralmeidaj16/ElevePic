import { storage, db } from "./firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export interface GeneratedProfile {
    id: string;
    url: string;
    styleId: string;
    promptUsed: string;
    createdAt: Date;
}

/**
 * Saves a base64 generated image to Firebase Storage and metadata to Firestore.
 */
export async function saveGeneration(
    userId: string,
    styleId: string,
    promptUsed: string,
    base64DataUrl: string
): Promise<GeneratedProfile> {
    try {
        // 1. Upload to Storage
        const fileId = crypto.randomUUID();
        const storagePath = `users/${userId}/gallery/${fileId}.jpg`;
        const storageRef = ref(storage, storagePath);

        // Upload the base64 string
        await uploadString(storageRef, base64DataUrl, 'data_url');

        // Get the public URL
        const downloadUrl = await getDownloadURL(storageRef);

        // 2. Save metadata to Firestore
        const docData = {
            userId,
            url: downloadUrl,
            storagePath,
            styleId,
            promptUsed,
            createdAt: new Date(),
        };

        const docRef = await addDoc(collection(db, "generations"), docData);

        return {
            id: docRef.id,
            url: downloadUrl,
            styleId,
            promptUsed,
            createdAt: docData.createdAt,
        };
    } catch (error) {
        console.error("Error saving generation:", error);
        throw new Error("Falha ao salvar a imagem na galeria.");
    }
}

/**
 * Fetches all generated images for a specific user from Firestore.
 */
export async function getUserGallery(userId: string): Promise<GeneratedProfile[]> {
    try {
        const galleryRef = collection(db, "generations");
        // Note: For complex queries we might need a composite index in Firestore.
        // For now, we fetch all where userId matches. 
        // A better approach is placing it under a subcollection users/{userId}/gallery
        // But for simplicity of query here we just order locally or use a simple query if we add indices.

        // Let's just get all generations and filter by userId manually to avoid needing to create composite indexes immediately if not needed.
        // In a real production app with many users, you'd add: where("userId", "==", userId) 
        // and create the necessary index in Firebase Console.

        const q = query(galleryRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const results: GeneratedProfile[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.userId === userId) {
                results.push({
                    id: doc.id,
                    url: data.url,
                    styleId: data.styleId,
                    promptUsed: data.promptUsed,
                    createdAt: data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
                });
            }
        });

        return results;
    } catch (error) {
        console.error("Error fetching user gallery:", error);
        return [];
    }
}
