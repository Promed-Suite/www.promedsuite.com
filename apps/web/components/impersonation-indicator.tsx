"use client";

import { UserX } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/auth-client";
import { BetterAuthActionButton } from "@workspace/ui/components/better-auth-action-button";

export function ImpersonationIndicator() {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();

  if (session?.session.impersonatedBy == null)
    return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <BetterAuthActionButton
        action={() =>
          authClient.admin.stopImpersonating(undefined, {
            onSuccess: () => {
              router.push("/administration/users/user-management");
              refetch();
            },
          })}
        variant="destructive"
        size="sm"
      >
        <UserX className="size-4" />
      </BetterAuthActionButton>
    </div>
  );
}
