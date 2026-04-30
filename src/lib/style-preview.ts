import type { FirestoreStyle } from "./styles-service";

type LegacyStyleImageFields = Partial<FirestoreStyle> & {
    imageUrl?: string;
    preview?: string;
    previewUrl?: string;
    cover?: string;
    coverUrl?: string;
};

export function getStylePreviewUrl(style: LegacyStyleImageFields): string | null {
    const candidates = [
        style.image,
        style.imageUrl,
        style.preview,
        style.previewUrl,
        style.cover,
        style.coverUrl,
    ];

    for (const candidate of candidates) {
        if (typeof candidate !== "string") continue;

        const normalized = candidate.trim();
        if (!normalized) continue;

        return normalized;
    }

    return null;
}
