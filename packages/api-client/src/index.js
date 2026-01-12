import { hc } from "hono/client";

export const createClient = (baseUrl = "/") => hc(baseUrl);
export const client = createClient(typeof window === "undefined"
  // eslint-disable-next-line node/no-process-env
  ? process.env.API_URL || "http://localhost:4000/"
  : "/");
