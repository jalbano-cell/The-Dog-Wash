import manifest from "./image-manifest.json";

export type ImageSpec = {
  filename: string;
  subject: string;
  aspectRatio: "16:9" | "1:1" | "4:3" | "4:5";
  width: number;
  height: number;
  alt: string;
  tone: "primary" | "sand" | "stone" | "fresh";
};

/**
 * Manifest of every real photograph this site needs. Placeholder graphics are
 * generated from src/data/image-manifest.json (see
 * scripts/generate-placeholder-images.mjs) and should be swapped 1:1 for real
 * photography using the same filenames.
 */
export const imageManifest: ImageSpec[] = manifest as ImageSpec[];

export function getImage(filename: string): ImageSpec {
  const match = imageManifest.find((img) => img.filename === filename);
  if (!match) {
    throw new Error(`Unknown image in manifest: ${filename}`);
  }
  return match;
}
