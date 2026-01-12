/* eslint-disable node/no-process-env */

import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.ELECTRON_BUILD ? "standalone" : undefined,
  transpilePackages: ["@workspace/ui", "@t3-oss/env-nextjs", "@t3-oss/env-core"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
