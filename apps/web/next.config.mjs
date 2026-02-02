/* eslint-disable node/no-process-env */

import createJiti from "jiti";
import path from "node:path";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.ELECTRON_BUILD ? "standalone" : undefined,
  // this includes files from the monorepo base two directories up
  outputFileTracingRoot: path.join(import.meta.dirname, "../../"),
  transpilePackages: [
    "@workspace/ui",
    "@t3-oss/env-nextjs",
    "@t3-oss/env-core",
  ],
  async rewrites() {
    const isLocal
      = process.env.NODE_ENV !== "production" && !process.env.VERCEL;
    const backendUrl
      = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    return [
      {
        source: "/api/:path*",
        destination: isLocal
          ? "http://localhost:4000/api/:path*"
          : `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
