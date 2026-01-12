"use server";

import { betterFetch } from "@better-fetch/fetch";
import { cookies } from "next/headers";

import { env } from "@/env";

import type { Department, Session } from "./auth-client";

const baseURL = env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function getSession() {
  const cookieStore = await cookies();

  const session = await betterFetch<Session>("/api/auth/get-session", {
    baseURL,
    headers: {
      cookie:
        `${cookieStore.get("better-auth.session_token")?.name
        }=${
          cookieStore.get("better-auth.session_token")?.value}`,
    },
  });

  return session;
}

export async function hasAdminPermission() {
  const cookieStore = await cookies();
  const { data: session } = await getSession();

  const userId = session?.user.id;

  const permissionData = await betterFetch<{
    error: null;
    success: boolean;
  } | null>("/api/auth/admin/has-permission", {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Origin": "http://localhost:3000",
      "cookie":
        `${cookieStore.get("better-auth.session_token")?.name
        }=${
          cookieStore.get("better-auth.session_token")?.value}`,
    },
    method: "POST",
    body: JSON.stringify({
      userId,
      permissions: {
        user: ["list"],
      },
    }),
  });

  return permissionData;
}

export async function getOrganizations() {
  const cookieStore = await cookies();

  const organizations = await betterFetch<Department[]>(
    "/api/auth/organization/list",
    {
      baseURL,
      headers: {
        cookie:
          `${cookieStore.get("better-auth.session_token")?.name
          }=${
            cookieStore.get("better-auth.session_token")?.value}`,
      },
    },
  );

  return organizations;
}

export async function setActiveOrganization(
  organizationId: string,
  organizationSlug: string,
) {
  const cookieStore = await cookies();

  const activeOrganization = await betterFetch<Department>(
    "/api/auth/organization/set-active",
    {
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:3000",
        "cookie":
          `${cookieStore.get("better-auth.session_token")?.name
          }=${
            cookieStore.get("better-auth.session_token")?.value}`,
      },
      method: "POST",
      body: JSON.stringify({
        organizationId,
        organizationSlug,
      }),
    },
  );

  return activeOrganization;
}
