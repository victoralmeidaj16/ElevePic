import { adminDb } from "../src/lib/firebase-admin";

async function addCustomCard() {
    const prompt = "Ultra-realistic professional portrait of [person] wearing a refined golden crown, high-end editorial photography, luxury aesthetic, confident and powerful expression, sharp jawline lighting, soft but dramatic key light from the left, subtle rim light separating from background, dark charcoal background with smooth gradient, shallow depth of field, 85mm lens, f/1.8, cinematic color grading, high dynamic range, ultra detailed skin texture, natural skin tones, premium fashion magazine style, symmetrical composition, centered framing, 4K resolution, no distortion, no extra limbs, no text, no watermark";

    const cardData = {
        id: "golden-crown-premium",
        title: "Golden Crown Premium",
        category: "editorial",
        image: "", // We can add a placeholder later or generate one
        prompt: prompt,
        tags: ["Golden", "Premium", "Editorial", "Crown"],
        order: Date.now()
    };

    try {
        console.log("Attempting to add card directly to Firestore...");
        const docRef = await adminDb.collection("styles").add(cardData);
        console.log("✅ Card added successfully! Document ID:", docRef.id);
    } catch (error) {
        console.error("❌ Failed to add card:", error);
    }
}

addCustomCard();
