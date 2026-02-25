import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, listAll, getMetadata, deleteObject } from "firebase/storage";

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

    return url;
}

/**
 * Fetches the user's uploaded images directly from Firebase Storage.
 * Does not depend on Firestore.
 */
export async function getUserImages(userId: string): Promise<UserImage[]> {
    try {
        const uploadsRef = ref(storage, `users/${userId}/uploads`);
        const result = await listAll(uploadsRef);

        const images = await Promise.all(
            result.items.map(async (item) => {
                const url = await getDownloadURL(item);
                let createdAt = new Date();
                try {
                    const meta = await getMetadata(item);
                    if (meta.timeCreated) {
                        createdAt = new Date(meta.timeCreated);
                    }
                } catch {
                    // fallback to now
                }
                return {
                    id: item.name,
                    url,
                    createdAt,
                    path: item.fullPath,
                };
            })
        );

        // Sort by createdAt descending
        return images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
        console.error("Error fetching user images from Storage:", error);
        return [];
    }
}

/**
 * Deletes a user image from Firebase Storage.
 */
export async function deleteUserImage(storagePath: string): Promise<void> {
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);
}
