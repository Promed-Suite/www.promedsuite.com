// "use client";

// import { ChevronsUpDown, FileText, Plus } from "lucide-react";
// import * as React from "react";

// import { authClient, Department } from "@/lib/auth/auth-client";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@workspace/ui/components/sidebar";

// interface IOrgSwitcher {
//   departments: Department[] | null;
// }

// export function OrgSwitcher() {
//   const { data: departments, isPending: departmentsIsPending } =
//     authClient.useListOrganizations();
//   const { data: activeOrganization, isPending: activeOrganizationIsPending } =
//     authClient.useActiveOrganization();

//   const [activeTeam, setActiveTeam] = React.useState<Department | null>(
//     activeOrganization
//   );

//   if (!activeTeam) {
//     return null;
//   }

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size={"sm"}
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
//             >
//               {/* <div className="bg-sidebar-primary/50 text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-lg">
//                 <activeTeam.logo className="size-4" />
//               </div> */}
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{activeTeam.name}</span>
//               </div>
//               <ChevronsUpDown className="ml-auto" />
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//             align={"end"}
//             side={"bottom"}
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="text-muted-foreground text-xs">
//               Teams
//             </DropdownMenuLabel>
//             {departments?.map((team, index) => (
//               <DropdownMenuItem
//                 key={team.name}
//                 onClick={() => setActiveTeam(team)}
//                 className="gap-2 p-2"
//               >
//                 <div className="flex size-6 items-center justify-center rounded-md border">
//                   <FileText className="size-3.5 shrink-0" />
//                 </div>
//                 {team.name}
//                 <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
//               </DropdownMenuItem>
//             ))}
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="gap-2 p-2">
//               <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
//                 <Plus className="size-4" />
//               </div>
//               <div className="text-muted-foreground font-medium">Add team</div>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

// apps/web/components/org-switcher.tsx
"use client";

import { ChevronsUpDown, FileText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import type { Department } from "@/lib/auth/auth-client";

import { authClient } from "@/lib/auth/auth-client";
import { useOrganizationStore } from "@/stores/use-organization-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

export function OrgSwitcher() {
  const router = useRouter();
  const {
    activeOrganization,
    isSwitching,
    setActiveOrganization,
    setIsSwitching,
  } = useOrganizationStore();

  const { data: departments, isPending: departmentsIsPending }
    = authClient.useListOrganizations();
  const {
    data: serverActiveOrganization,
    isPending: activeOrganizationIsPending,
    refetch: refetchActiveOrganization,
  } = authClient.useActiveOrganization();

  // Optimized sync effect - only runs when server data changes
  React.useEffect(() => {
    if (serverActiveOrganization && !activeOrganization) {
      setActiveOrganization(serverActiveOrganization);
    }
  }, [serverActiveOrganization, activeOrganization, setActiveOrganization]);

  // Memoize the handler to prevent unnecessary re-renders
  const handleOrganizationSwitch = React.useCallback(
    async (team: Department) => {
      if (isSwitching || team.id === activeOrganization?.id)
        return;

      setIsSwitching(true);
      try {
        const { error } = await authClient.organization.setActive({
          organizationId: team.id,
          organizationSlug: team.slug,
        });

        if (error) {
          console.error("Failed to switch organization:", error);
          return;
        }

        // Update local store immediately for better UX
        setActiveOrganization(team);

        // Refresh the server state
        await refetchActiveOrganization();

        // Redirect to the new organization's page
        router.push(`/${team.id}`);
      }
      catch (err) {
        console.error("Unexpected error switching organization:", err);
      }
      finally {
        setIsSwitching(false);
      }
    },
    [
      isSwitching,
      activeOrganization,
      router,
      setActiveOrganization,
      setIsSwitching,
      refetchActiveOrganization,
    ],
  );

  // Memoize the render logic to reduce re-renders
  const renderContent = React.useMemo(() => {
    // Show loading state while fetching
    if (departmentsIsPending || activeOrganizationIsPending) {
      return (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" className="border">
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Loading...</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      );
    }

    // Return null only if there's no active team and no departments
    if (!activeOrganization && (!departments || departments.length === 0)) {
      return null;
    }

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isSwitching}>
              <SidebarMenuButton
                size="sm"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
              >
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {isSwitching
                      ? "Switching..."
                      : activeOrganization?.name || "Select a team"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="end"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Teams
              </DropdownMenuLabel>
              {departments?.map((team, index) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => handleOrganizationSwitch(team)}
                  disabled={isSwitching || team.id === activeOrganization?.id}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <FileText className="size-3.5 shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    <span>{team.name}</span>
                  </div>
                  {team.id === activeOrganization?.id && (
                    <span className="ml-auto bg-primary size-1.5 rounded-full" />
                  )}
                  <DropdownMenuShortcut>
                    ⌘
                    {index + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add team
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }, [
    departmentsIsPending,
    activeOrganizationIsPending,
    activeOrganization,
    departments,
    isSwitching,
    handleOrganizationSwitch,
  ]);

  return renderContent;
}

// Optional: Export a memoized version to prevent unnecessary re-renders
// export const MemoizedOrgSwitcher = React.memo(OrgSwitcher);
