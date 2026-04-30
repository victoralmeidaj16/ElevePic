import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

const MODEL = "gemini-3-pro-image-preview";
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const TARGET_IDS = [
  "executivo-moderno-shelf",
  "executivo-borda-mesa",
  "lideranca-determinacao",
  "light-gray-executive",
  "modern-navy-professional",
  "advogado-leaning-led",
  "advogado-sitting-led",
  "advogado-leaning-forward",
];

const ROOT = process.cwd();
const stylesPath = path.join(ROOT, "src/lib/styles-data.ts");
const outputDir = path.join(ROOT, "public/styles");

function extractStyle(source, id) {
  const idIndex = source.indexOf(`id: "${id}"`);
  if (idIndex === -1) {
    throw new Error(`Style not found: ${id}`);
  }

  const objectStart = source.lastIndexOf("{", idIndex);
  const nextObject = source.indexOf("\n    {", idIndex + id.length);
  const objectEnd = nextObject === -1 ? source.indexOf("\n];", idIndex) : nextObject;
  const block = source.slice(objectStart, objectEnd);

  const title = block.match(/title:\s*"([^"]+)"/)?.[1];
  const prompt = block.match(/prompt:\s*`([\s\S]*?)`/)?.[1];

  if (!title || !prompt) {
    throw new Error(`Could not extract title or prompt for ${id}`);
  }

  return { id, title, prompt };
}

async function generateImage(style) {
  const finalPrompt = [
    style.prompt.replaceAll("[person]", "a polished Brazilian professional"),
    "Generate a single premium vertical card image for a professional headshot style catalog.",
    "Use a realistic adult model, natural facial features, no celebrity likeness, no text, no watermark, no logo.",
    "Photorealistic commercial portrait, polished composition, suitable for a website card thumbnail.",
  ].join("\n\n");

  const body = {
    contents: [{ parts: [{ text: finalPrompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
    },
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error for ${style.id}: ${response.status} ${errorText}`);
  }

  const json = await response.json();
  const parts = json.candidates?.flatMap(candidate => candidate.content?.parts ?? []) ?? [];
  const imagePart = parts.find(part => part.inlineData?.data);

  if (!imagePart) {
    throw new Error(`Gemini returned no image for ${style.id}: ${JSON.stringify(json)}`);
  }

  return {
    data: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType ?? "image/png",
  };
}

async function main() {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Load .env.local before running this script.");
  }

  await fs.mkdir(outputDir, { recursive: true });
  const source = await fs.readFile(stylesPath, "utf8");
  const styles = TARGET_IDS.map(id => extractStyle(source, id));

  for (const style of styles) {
    const outputPath = path.join(outputDir, `${style.id}.jpg`);

    try {
      await fs.access(outputPath);
      console.log(`skip ${style.id}: already exists`);
      continue;
    } catch {
      // Generate only missing assets.
    }

    console.log(`generate ${style.id}: ${style.title}`);
    const image = await generateImage(style);
    await fs.writeFile(outputPath, Buffer.from(image.data, "base64"));
    console.log(`saved ${path.relative(ROOT, outputPath)} (${image.mimeType})`);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
