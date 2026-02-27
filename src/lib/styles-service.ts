import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    query,
    writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { STYLES, StyleOption } from "./styles-data";

const STYLES_COLLECTION = "styles";

export interface FirestoreStyle extends StyleOption {
    firestoreId: string;
    order: number;
}

// Fetch all styles ordered by `order` field
export async function getStyles(): Promise<FirestoreStyle[]> {
    const q = query(collection(db, STYLES_COLLECTION), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
        firestoreId: docSnap.id,
        ...docSnap.data(),
    })) as FirestoreStyle[];
}

// Add a new style
export async function addStyle(style: Omit<StyleOption, "id"> & { order?: number }): Promise<string> {
    const docRef = await addDoc(collection(db, STYLES_COLLECTION), {
        ...style,
        id: crypto.randomUUID(),
        order: style.order ?? Date.now(),
    });
    return docRef.id;
}

// Update an existing style by Firestore document ID
export async function updateStyle(firestoreId: string, data: Partial<StyleOption>): Promise<void> {
    await updateDoc(doc(db, STYLES_COLLECTION, firestoreId), data);
}

// Delete a style by Firestore document ID
export async function deleteStyle(firestoreId: string): Promise<void> {
    await deleteDoc(doc(db, STYLES_COLLECTION, firestoreId));
}

// Seed all styles from static data into Firestore (one-time operation)
export async function seedStyles(): Promise<void> {
    const batch = writeBatch(db);
    STYLES.forEach((style, index) => {
        const ref = doc(collection(db, STYLES_COLLECTION));
        batch.set(ref, { ...style, order: index });
    });
    await batch.commit();
}
