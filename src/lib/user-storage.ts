import { storage, db } from "./firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";

export interface UserImage {
    id: string;
    url: string;
    createdAt: Date;
    path: string;
}

/**
 * Uploads an image file to Firebase Storage under the user's directory.
 * Returns the download URL.
 */
export async function uploadUserImage(userId: string, file: File): Promise<string> {
    const timestamp = Date.now();
    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const path = `users/${userId}/uploads/${timestamp}_${safeName}`;
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // Save metadata to Firestore for easier querying
    await saveImageMetadata(userId, url, path);

    return url;
}

/**
 * Saves image metadata to Firestore.
 */
async function saveImageMetadata(userId: string, url: string, path: string) {
    try {
        await addDoc(collection(db, "user_images"), {
            userId,
            url,
            path,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error saving image metadata:", error);
        // We ensure the upload succeeds even if metadata fails, though not ideal.
    }
}

/**
 * Fetches the user's uploaded images from Firestore.
 */
export async function getUserImages(userId: string): Promise<UserImage[]> {
    try {
        const q = query(
            collection(db, "user_images"),
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            url: doc.data().url,
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            path: doc.data().path,
        }));
    } catch (error) {
        console.error("Error fetching user images:", error);
        return [];
    }
}
