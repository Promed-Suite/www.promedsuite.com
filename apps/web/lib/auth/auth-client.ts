import type { auth } from "apis/auth";

import { passkeyClient } from "@better-auth/passkey/client";
import {
  adminClient,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

export type WebAuthClient = ReturnType<typeof createAuthClient>;

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_URL,
  plugins: [
    adminClient(),
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>(),
    }),
    passkeyClient(),
  ],
});

export type Session = typeof authClient.$Infer.Session;

export type User = typeof authClient.$Infer.Session.user;

export type Department = typeof authClient.$Infer.Organization;

export type TeamMember = typeof authClient.$Infer.Member;

export type Passkey = typeof authClient.$Infer.Passkey;
