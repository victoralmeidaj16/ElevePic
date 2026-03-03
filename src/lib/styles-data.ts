export interface StyleOption {
    id: string;
    title: string;
    image: string;
    prompt: string;
    tags?: string[];
    category: "editorial" | "cinematic" | "studio" | "noir";
}

export const STYLES: StyleOption[] = [
    {
        id: "golden-crown",
        title: "Editorial Golden Crown",
        category: "editorial",
        tags: ["Golden", "Premium", "Crown", "Luxury"],
        image: "", // Placeholder
        prompt: `Ultra-realistic professional portrait of [person] wearing a refined golden crown, high-end editorial photography, luxury aesthetic, confident and powerful expression, sharp jawline lighting, soft but dramatic key light from the left, subtle rim light separating from background, dark charcoal background with smooth gradient, shallow depth of field, 85mm lens, f/1.8, cinematic color grading, high dynamic range, ultra detailed skin texture, natural skin tones, premium fashion magazine style, symmetrical composition, centered framing, 4K resolution, no distortion, no extra limbs, no text, no watermark`,
    },
];

export const STYLE_CATEGORIES = [
    { id: "editorial", label: "Editorial", emoji: "🎨" },
    { id: "cinematic", label: "Cinemático", emoji: "🎬" },
    { id: "studio", label: "Estúdio", emoji: "📷" },
    { id: "noir", label: "Noir", emoji: "🖤" },
] as const;
