// Generates structured placeholder photography for /public/images/.
// Run with: node scripts/generate-placeholder-images.mjs
// Swap the resulting .jpg files 1:1 with real photography using the same filenames.

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import imageManifest from "../src/data/image-manifest.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");

const TONES = {
  primary: { from: "#3f6559", to: "#1f2421", label: "#eef4f1" },
  sand: { from: "#f0eadf", to: "#d7c9ac", label: "#3a423e" },
  stone: { from: "#5b6560", to: "#2b302d", label: "#faf7f2" },
  fresh: { from: "#4f7a6c", to: "#9cbdb0", label: "#1f2421" },
};

// Minimal paw-print glyph drawn from primitive shapes.
function pawGlyph(cx, cy, scale, opacity) {
  const pad = `<ellipse cx="${cx}" cy="${cy + 10 * scale}" rx="${16 * scale}" ry="${13 * scale}" />`;
  const toes = [-18, -6, 6, 18]
    .map((dx, i) => {
      const dy = i === 0 || i === 3 ? -20 : -24;
      return `<ellipse cx="${cx + dx * scale}" cy="${cy + dy * scale}" rx="${7 * scale}" ry="${9 * scale}" />`;
    })
    .join("");
  return `<g fill="white" opacity="${opacity}">${pad}${toes}</g>`;
}

function buildSvg({ width, height, tone, subject, filename }) {
  const { from, to, label } = TONES[tone];
  const scale = Math.min(width, height) / 400;

  // Scatter a handful of faint paw prints for texture.
  const scattered = Array.from({ length: 6 })
    .map((_, i) => {
      const x = (width / 7) * (i + 1) + (i % 2 === 0 ? -30 : 30);
      const y = (height / 5) * ((i % 3) + 1);
      return pawGlyph(x, y, scale * 0.5, 0.06);
    })
    .join("");

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  ${scattered}
  ${pawGlyph(width / 2, height / 2 - 10 * scale, scale * 1.8, 0.9)}
  <text x="${width / 2}" y="${height / 2 + 60 * scale}" font-family="Helvetica, Arial, sans-serif" font-size="${15 * scale}" fill="${label}" fill-opacity="0.85" text-anchor="middle" letter-spacing="2">PLACEHOLDER PHOTOGRAPHY</text>
  <text x="${width / 2}" y="${height / 2 + 84 * scale}" font-family="Helvetica, Arial, sans-serif" font-size="${12 * scale}" fill="${label}" fill-opacity="0.65" text-anchor="middle">${subject}</text>
  <text x="16" y="${height - 16}" font-family="Helvetica, Arial, sans-serif" font-size="${11 * scale}" fill="${label}" fill-opacity="0.5">${filename}</text>
</svg>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });

  for (const spec of imageManifest) {
    const svg = buildSvg({
      width: spec.width,
      height: spec.height,
      tone: spec.tone,
      subject: spec.subject,
      filename: spec.filename,
    });
    const outPath = path.join(outDir, spec.filename);
    await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(outPath);
    console.log("generated", spec.filename);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
