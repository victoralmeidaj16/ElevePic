export interface StyleOption {
    id: string;
    title: string;
    image: string;
    prompt: string;
    tags?: string[];
    category: "editorial" | "cinematic" | "studio" | "noir";
}

export const STYLES: StyleOption[] = [
    // ── Batch 1 ──────────────────────────────────────────
    {
        id: "editorial-graffiti",
        title: "Editorial Graffiti",
        category: "editorial",
        tags: ["Street Art", "Fashion", "Crown"],
        image: "https://images.unsplash.com/photo-1529334496112-401a61524e93?q=80&w=400",
        prompt: `High-fashion editorial portrait of [person] sitting backwards on a wooden chair in a dominant and stylish pose. He has short dark hair, a trimmed beard, and medium skin tone. He wears a beige shirt with a red drawn outline around the collar, sleeves, and pocket — looking like it was hand-sketched over the fabric. His pants are black, also outlined with a yellow sketch-style line, and he wears sporty chunky sneakers in beige and black tones. A silver wristwatch is visible on his left wrist. His body posture is slightly leaning forward, arms resting in between his legs, with fists gently clenched and an intense, commanding expression as he stares directly into the camera. The background is a chaotic white wall covered in messy handwritten black graffiti text in all caps, giving the impression of a layered mental stream of consciousness. Above his head floats a hand-drawn yellow crown, drawn in thick paint or digital brush, symbolizing attitude, creativity, and dominance. The lighting is soft, even, and cinematic — studio-style with slight shadows. The overall composition resembles a retro magazine editorial with urban influence, referencing street art, hip-hop energy, and fashion rebellion.

Camera: frontal, leve inclinação para cima, editorial urbana e intimidadora, plano médio mostrando o corpo inteiro sentado na cadeira, com fundo preenchido.
Lighting: luz de estúdio suave, iluminação frontal-lateral com sombra leve e difusa sob o queixo e braços, quente suave, com contraste moderado entre pele e fundo branco pichado.
Style: editorial de moda urbana com ilustração gráfica estilo grafite, alta resolução 4K, foco nítido, textura levemente granulada estilo retrô, lente 50mm f/2.0. Centralizado com destaque para expressão e pose corporal, fundo caótico e elementos desenhados digitalmente. Desenhos digitais sobrepostos (coroa, contornos da roupa), grão analógico sutil, estilo de revista alternativa.`,
    },
    {
        id: "cyberpunk-neo",
        title: "Cyberpunk Neo",
        category: "cinematic",
        tags: ["Matrix", "Trench Coat", "Dark"],
        image: "https://images.unsplash.com/photo-1614846384571-1e31bfbf4cac?q=80&w=400",
        prompt: `Cinematic cyberpunk portrait of [person] dressed in a sleek black trench coat and oval dark sunglasses, captured in a mid-action pose with his right arm flexed and raised near his chest, fist slightly clenched in a powerful and controlled motion. The man's expression is intense and focused, with a slight downward tilt of the head and eyes directed sharply over the rim of his sunglasses, exuding authority and calculated precision. The background is a softly blurred urban setting with muted gray concrete textures, keeping the attention on the subject. The overall tone of the image is dark and minimalist, emphasizing the monochrome palette with high contrast between the black outfit and his skin. The trench coat flows slightly with implied movement, and the composition centers the subject while maintaining a sense of motion. The visual style is inspired by early 2000s dystopian cinema, evoking the iconic aesthetic of The Matrix with subdued colors, matte textures, and controlled cinematic lighting. The mood is intense, futuristic, and heroic.

Camera: frontal ligeiramente abaixo da linha dos olhos, cinematográfica com leve compressão, plano médio fechado, mostrando o tronco e expressão com o braço dobrado em destaque.
Lighting: luz difusa natural ou artificial suave, iluminação frontal ligeiramente lateral, frio e neutro, com contraste acentuado entre tons de pele e roupas escuras.
Style: cyberpunk distópico com influência de filmes dos anos 2000, resolução 4K, texturas foscas realistas, foco nítido, lente 85mm f/1.8 para compressão dramática. Centralizado com leve inclinação diagonal, color grading frio com contraste elevado, redução de saturação, finalização Matrix.`,
    },
    {
        id: "scifi-bullet-time",
        title: "Sci-Fi Control",
        category: "cinematic",
        tags: ["Bullet Time", "Sci-Fi", "Matrix"],
        image: "https://images.unsplash.com/photo-1608096299210-db7e38487075?q=80&w=400",
        prompt: `Cinematic sci-fi portrait of [person] standing in a powerful and iconic pose with his right arm fully extended forward, palm open in a commanding 'stop' gesture. His expression is neutral and focused, exuding control and calm amidst chaos. He wears sleek oval-shaped black sunglasses and a long, high-collared black trench coat with a matte texture. Dozens of silver bullets are frozen mid-air in front of his hand, suspended as if time has stopped, capturing the legendary bullet-time effect. The background shows a dimly lit, antique-style interior with ornate murals and architectural detail, subtly blurred to keep full focus on the subject and the floating bullets. The atmosphere is charged with tension and stillness, emphasizing the moment of defying physics. The overall aesthetic is inspired by The Matrix, blending realism with digital illusion.

Camera: frontal direto com leve inclinação para cima, cinematográfica com profundidade dramática, corpo inteiro, foco central na mão estendida e nas balas suspensas.
Lighting: iluminação artificial controlada de estúdio, luz frontal suave com preenchimento sutil lateral, verde desaturado com tons escuros e contraste elegante, paleta clássica Matrix.
Style: sci-fi cinematográfico com efeito bullet time, resolução 8K, realismo alto, lente 35mm f/1.8. Color grading verde clássico Matrix, efeitos de congelamento realistas com partículas e brilho metálico nas balas.`,
    },
    {
        id: "vintage-warmth",
        title: "Vintage Living",
        category: "studio",
        tags: ["Warm", "Retro", "Film"],
        image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400",
        prompt: `Using the reference photo as the main reference, create a cinematic, moody indoor portrait of [person]. Keep the exact facial features, hairstyle, skin tone, and outfit shape. Place the subject sitting on a wooden stool in a vintage living-room with warm tungsten lighting. Add soft shadows and a cozy, retro atmosphere. Behind the subject, include wooden wall panels, old stereo speakers, vinyl records, and a low shelf with ceramic vases. Maintain a shallow depth of field with soft blur in the background. Keep the colors warm — browns, ambers, and orange highlights. The style should be cinematic, soft, and film-like, with natural skin texture, realistic lighting, and a quiet, contemplative mood. Full-body shot, slightly low angle, 35mm lens look.`,
    },
    {
        id: "red-studio-pop",
        title: "Red Studio Pop",
        category: "studio",
        tags: ["Red", "Polo", "Dramatic"],
        image: "https://images.unsplash.com/photo-1618898909019-010e4e234c55?q=80&w=400",
        prompt: `4:5 aspect ratio, 2K quality. World-class editorial portrait photographer specializing in dramatic, colorful studio lighting. Create a powerful, dynamic portrait with a heroic feel of [person].

IDENTITY ANCHOR: Use the person from the attached reference photos. Keep their exact facial features, skin tone, hairstyle, and natural likeness perfectly unchanged.

WARDROBE: A premium Black Pique Polo Shirt, fitted and sharp, deep matte black.

EXPRESSION: Serious, intense, focused. The subject is looking off-camera into the space above, not directly at the lens.

SCENE: Background is a vibrant, solid orange-red backdrop with smooth, intense color gradients without distinct patterns, creating a "hot" atmosphere. Low-angle shot (looking up at the subject). Medium close-up (focus on face and shoulders).

LIGHTING: Dominated by vibrant orange and deep red hues. Strong directional lighting that casts deep, dramatic shadows on the face (chiaroscuro effect). A strong dramatic edge light separating the subject's shoulders and head from the intense lit background. Mysterious, intense, high-contrast studio aesthetic.

QUALITY: Photorealistic, highly detailed. Sharp focus on the face, contrasting with smooth gradients of the background.`,
    },
    {
        id: "cine-noir",
        title: "Cine Noir P&B",
        category: "noir",
        tags: ["Black & White", "Suit", "Classic"],
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400",
        prompt: `An ultra-realistic, highly detailed 8K black-and-white portrait with a cinematic aesthetic of [person]. The composition is a medium close-up, cropped just below the elbows, with the subject seated and positioned slightly forward, maintaining direct visual engagement with the camera. The framing emphasizes posture, gesture and presence, conveying a refined and composed attitude.

Lighting is dramatic high-contrast chiaroscuro: a single intense key light from the front-left creates deep shadows and pronounced highlights across the subject, while the opposite side fades into darkness, enhancing depth and mystery. The atmosphere is elegant, contemplative and timeless.

The palette is strictly monochrome, with deep blacks dominating the surroundings, sharp whites accentuating illuminated surfaces, and a spectrum of charcoal grays adding tonal richness. The setting is an abstract dark void, removing distractions and focusing attention entirely on the subject.

The subject wears a dark tailored suit jacket over a crisp white shirt. Ultra-realistic skin texture, cinematic depth of field, film grain.`,
    },

    // ── Batch 2 ──────────────────────────────────────────
    {
        id: "film-noir-portrait",
        title: "Film Noir Clássico",
        category: "noir",
        tags: ["Noir", "Shadows", "Contemplative"],
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
        prompt: `High-contrast portrait photography with a cinematic and introspective aesthetic of [person]. The style is reminiscent of classic film noir, emphasizing the play of shadows and strong directional lighting. The treatment intensifies the emotional gravity and dramatic effect, giving the image an intellectual and timeless tone. The subtle grain texture of the film adds a vintage touch to the photograph.

POSE: Seated in three-quarter profile, with arms raised and hands clasped, resting just below the chin in a contemplative gesture. Looking at the camera with an expression of concentration or quiet reflection.

DETAILS: Wearing a dark, long-sleeved, fitted shirt with a classic collar and buttoned cuffs, the matte, smooth fabric captures minimal light. The lighting sculpts the contours of the face, creating a deep contrast on one side and soft highlights on the other, revealing a carefully balanced chiaroscuro.

SETTING: Dark, neutral background with a subtle texture that blends into the shadows, allowing the subject to stand out as the sole visual focus. Minimalist and studio-like, free from distractions.

CAMERA: Nikon D850 + AF-S Nikkor 85mm f/1.4G, 4K resolution. Wide aperture for shallow depth of field, sharp details on the face, soft blur in the background. High dynamic range capturing subtle nuances of shadow and light.`,
    },
    {
        id: "blue-halo-studio",
        title: "Halo Lunar Moderno",
        category: "studio",
        tags: ["Blue", "Halo", "Futuristic"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
        prompt: `Ultramodern digital portrait with a high-definition, hyper-realistic aesthetic of [person]. The image combines fashion and editorial influences with an elegant and refined finish. Cool color gradations predominate, using midnight blue and steel gray tones, creating a futuristic and sophisticated atmosphere. The lighting design incorporates a soft halo effect behind the subject, which emphasizes the silhouette and depth.

POSE: Standing, with arms crossed over the torso in a confident posture. The posture is assertive, balanced, and symmetrical, conveying control and serene strength. The facial expression is calm, focused, and neutral, with a relaxed gaze directed at the camera. The chin is slightly raised, adding serene and balanced energy to the image.

DETAILS: Wearing a matte black short-sleeved t-shirt with a minimalist texture, the smooth fabric perfectly contours the arms and torso.

SETTING: Studio background bathed in deep blue and charcoal tones, fully blurred to create depth. A radiant white circular light positioned directly behind the head and shoulders, simulating a lunar halo. Gradual transition from deep shadows in the corners to soft luminosity in the center. Minimalist and controlled environment.

CAMERA: Canon EOS R5 + RF 85mm f/1.2L, 8K resolution. Ultra-sharp focus on facial features, shallow depth of field, studio lighting with softboxes and contour lights.`,
    },
    {
        id: "tech-contemplation",
        title: "Tech Contemplativo",
        category: "studio",
        tags: ["Tech", "Modern", "Introspective"],
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
        prompt: `Modern commercial portrait with a minimalist, technology-focused aesthetic of [person]. The image evokes the style of personal technology branding ads. Soft color gradation with a subtly desaturated palette dominated by charcoal blacks, deep grays, and natural skin tones. The lighting design is cinematic and melancholic, reminiscent of contemporary photography found in high-tech marketing.

POSE: Relaxed pose, at a three-quarter angle, with the head slightly turned to the right, looking up and into the distance. The posture is calm and introspective, suggesting focus or curiosity. The chin is slightly raised and the expression is neutral, with a slight sense of confidence and contemplation. Shoulders aligned but relaxed.

DETAILS: Wearing a simple black crew-neck t-shirt, soft and matte, with texture, keeping visual distractions to a minimum. Facial features softly illuminated. Skin texture clean and realistic.

SETTING: Studio background with a dark gradient, transitioning from deep black at the top to charcoal gray at the bottom, evoking depth and sophistication. The lighting is directional and diffused, from a large softbox above and slightly to the left, projecting soft highlights and delicate shadows.

CAMERA: Sony A7R IV + 50mm f/1.2 GM, 8K resolution. Wide aperture for cinematic bokeh. Sharp and detailed rendering, professional portrait ideal for technology branding.`,
    },
    {
        id: "avant-garde-backlight",
        title: "Avant-Garde LED",
        category: "editorial",
        tags: ["Backlit", "Abstract", "Avant-Garde"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
        prompt: `Monochromatic editorial portrait with a minimalist and avant-garde aesthetic of [person]. Strong influence from contemporary fashion photography and conceptual fine art. The black and white palette reduces the image to its color contrasts and emphasizes mood and geometry. The style evokes themes of solitude, contemplation, and modernism. Sharp tonal separation and deep blacks contrast with a single intense light source.

POSE: Standing, back to the camera, shoulders relaxed and head turned to the right in a pensive profile. The posture exudes quiet strength and introspection, with a serene and composed energy. The head positioning and gaze averted from the viewer add mystery and distance, enhancing emotional depth.

DETAILS: Wearing a dark, structured blazer with an impeccable cut and no visible adornments, the fabric subtly reflects directional light, revealing delicate folds and surface texture. Clean neckline and lapel emphasizing simplicity and structure.

SETTING: A completely black background horizontally crossed by a single strip of bright white LED light, positioned directly behind the subject at shoulder height. This creates a high-contrast division between light and shadow, framing the figure in a dramatic halo-like glow. The bright strip is the only element in the setting, transforming the space into a surreal and abstract void.

CAMERA: Hasselblad X2D 100C + XCD 80mm f/1.9, medium format, 4K resolution. Intensely controlled backlighting. Post-processing enhances contrast and luminance detail, preserving texture in shadows. Flawless, refined, stylized for gallery or editorial presentation.`,
    },
];

export const STYLE_CATEGORIES = [
    { id: "editorial", label: "Editorial", emoji: "🎨" },
    { id: "cinematic", label: "Cinemático", emoji: "🎬" },
    { id: "studio", label: "Estúdio", emoji: "📷" },
    { id: "noir", label: "Noir", emoji: "🖤" },
] as const;
