/* eslint-disable node/no-process-env */
import type { AppType } from "apis";

import { hc } from "hono/client";

export function createClient() {
  // In browser, use relative path; in SSR, use full URL
  const baseUrl
    = typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_API_URL || "/api"
      : process.env.API_URL || "http://localhost:4000";

  return hc<AppType>(baseUrl, { init: { credentials: "include" } });
}

export const client = createClient();
