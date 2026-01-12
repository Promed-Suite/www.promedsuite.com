import type { auth } from "apis/auth";

import {
  adminClient,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

export type WebAuthClient = ReturnType<typeof createAuthClient>;

export const authClient = createAuthClient({
  // ! TODO: Add baseURL from env
  baseURL: env.NEXT_PUBLIC_URL,
  plugins: [
    adminClient(),
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>(),
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;

export type User = typeof authClient.$Infer.Session.user;

export type Department = typeof authClient.$Infer.Organization;

export type TeamMember = typeof authClient.$Infer.Member;
