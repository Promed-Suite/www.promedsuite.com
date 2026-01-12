import { redirect } from "next/navigation";
import * as React from "react";

import { hasAdminPermission } from "@/lib/auth/auth";

export default async function AdministrationPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: hasPermission } = await hasAdminPermission();

  if (!hasPermission?.success) {
    return redirect("/");
  }

  return <div>{children}</div>;
}
