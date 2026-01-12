"use client";

import { MenuIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import * as React from "react";

import { getUrlSegments } from "@/utils/get-base-path";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { useSidebar } from "@workspace/ui/components/sidebar";

import { OrgSwitcher } from "./org-switcher";

export function SiteHeader() {
  const [segment, setSegment] = React.useState("");

  const pathname = usePathname();

  const params = useParams();

  const { toggleSidebar } = useSidebar();

  React.useEffect(() => {
    if (!pathname)
      return;

    const { lastSegment } = getUrlSegments(pathname);

    const departmentId = params.departmentId;

    setSegment(
      (lastSegment !== departmentId
        ? lastSegment?.toLocaleUpperCase()
        : "DASHBOARD") ?? "",
    );
  }, [pathname]);

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <React.Suspense fallback="...">
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Medical Information System
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{segment?.toLocaleUpperCase()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </React.Suspense>
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
        <div className="w-full sm:ml-auto sm:w-auto">
          <OrgSwitcher />
        </div>
      </div>
    </header>
  );
}
