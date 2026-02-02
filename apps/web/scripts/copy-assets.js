/* eslint-disable no-console */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// Source paths
const publicDir = join(projectRoot, "public");
const staticDir = join(projectRoot, ".next/static");

// Destination paths
const standaloneDir = join(projectRoot, ".next/standalone/apps/web");
const standaloneStaticDir = join(standaloneDir, ".next/static");

console.log("Copying assets for Next.js standalone...");

try {
  // Check if standalone directory exists
  if (!existsSync(standaloneDir)) {
    console.error(
      "Standalone directory not found. Make sure next build completed successfully.",
    );
    process.exit(1);
  }

  // Copy public directory if it exists
  if (existsSync(publicDir)) {
    console.log("Copying public directory...");
    cpSync(publicDir, join(standaloneDir, "public"), { recursive: true });
  }

  // Create .next directory in standalone if it doesn't exist
  const standaloneNextDir = join(standaloneDir, ".next");
  if (!existsSync(standaloneNextDir)) {
    mkdirSync(standaloneNextDir, { recursive: true });
  }

  // Copy static files
  if (existsSync(staticDir)) {
    console.log("Copying static files...");
    cpSync(staticDir, standaloneStaticDir, { recursive: true });
  }
  else {
    console.warn("Warning: .next/static directory not found");
  }

  console.log("✅ Assets copied successfully!");
}
catch (error) {
  console.error("❌ Error copying assets:", error.message);
  process.exit(1);
}
