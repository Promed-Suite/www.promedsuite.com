// "use client";

// import { MoreHorizontal, type LucideIcon } from "lucide-react";

// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@workspace/ui/components/sidebar";
// import { usePathname } from "next/navigation";

// export function NavProjects({
//   projects,
// }: {
//   projects: {
//     name: string;
//     url: string;
//     icon: LucideIcon;
//   }[];
// }) {
//   const pathname = usePathname();

//   const isActiveRoute = (url: string) => {
//     return pathname === url || pathname.startsWith(url + "/");
//   };

//   return (
//     <SidebarGroup className="group-data-[collapsible=icon]:hidden">
//       <SidebarGroupLabel>Medical Information System</SidebarGroupLabel>
//       <SidebarMenu>
//         {projects.map((item) => {
//           const isActive = isActiveRoute(item.url);

//           return (
//             <SidebarMenuItem key={item.name}>
//               <SidebarMenuButton
//                 asChild
//                 className={isActive ? "text-primary" : ""}
//               >
//                 <a href={item.url}>
//                   <item.icon />
//                   <span>{item.name}</span>
//                 </a>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           );
//         })}
//         <SidebarMenuItem>
//           <SidebarMenuButton>
//             <MoreHorizontal />
//             <span>More</span>
//           </SidebarMenuButton>
//         </SidebarMenuItem>
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

"use client";

import type { LucideIcon } from "lucide-react";

import {
  BarChart3,
  Coins,
  FileText,
  Heart,
  Layers,

  MoreHorizontal,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { getBasePath } from "@/utils/get-base-path";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

export function NavProjects({
  projects = [
    {
      name: "Registration",
      url: "/registration",
      icon: UserPlus,
    },
    {
      name: "Premiums",
      url: "/premiums",
      icon: Coins,
    },
    {
      name: "Claims",
      url: "/claims",
      icon: FileText,
    },
    {
      name: "Care",
      url: "/care",
      icon: Heart,
    },
    {
      name: "Commissions",
      url: "/commissions",
      icon: TrendingUp,
    },
    {
      name: "Reinsurance",
      url: "/reinsurance",
      icon: Layers,
    },
    {
      name: "Management",
      url: "/management",
      icon: BarChart3,
    },
    {
      name: "Administration",
      url: "/administration",
      icon: Users,
      adminOnly: true,
    },
  ],
  userRole = "user", // Default to normal user
}: {
  projects?: {
    name: string;
    url: string;
    icon: LucideIcon;
    adminOnly?: boolean; // Add optional adminOnly flag
  }[];
  userRole?: string; // Accept user role as prop
}) {
  const pathname = usePathname();

  const basePath = getBasePath();

  const isActiveRoute = (url: string) => {
    const fullPath = `${basePath}${url}`;
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
  };

  const isAdmin = userRole === "admin";

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Medical Information System</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = isActiveRoute(item.url);
          const isDisabled = item.adminOnly && !isAdmin;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={`
                  ${isActive ? "text-primary" : ""}
                  ${isDisabled ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""}
                `}
                disabled={isDisabled}
                tooltip={isDisabled ? "Admin access required" : undefined}
              >
                {isDisabled
                  ? (
                      <div className="flex items-center w-full">
                        <item.icon />
                        <span>{item.name}</span>
                      </div>
                    )
                  : (
                      <a href={`${basePath}${item.url}`}>
                        <item.icon />
                        <span>{item.name}</span>
                      </a>
                    )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
    // <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    //   <SidebarGroupLabel>Medical Information System</SidebarGroupLabel>
    //   <SidebarMenu>
    //     {projects.map((item) => {
    //       const isActive = isActiveRoute(item.url);
    //       const isDisabled = item.adminOnly && !isAdmin;

  //       return (
  //         <SidebarMenuItem key={item.name}>
  //           <SidebarMenuButton
  //             asChild
  //             className={`
  //               ${isActive ? "text-primary" : ""}
  //               ${isDisabled ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""}
  //             `}
  //             disabled={isDisabled}
  //             tooltip={isDisabled ? "Admin access required" : undefined}
  //           >
  //             {isDisabled ? (
  //               <div className="flex items-center w-full">
  //                 <item.icon />
  //                 <span>{item.name}</span>
  //               </div>
  //             ) : (
  //               <a href={`${pathname}${item.url}`}>
  //                 <item.icon />
  //                 <span>{item.name}</span>
  //               </a>
  //             )}
  //           </SidebarMenuButton>
  //         </SidebarMenuItem>
  //       );
  //     })}
  //     <SidebarMenuItem>
  //       <SidebarMenuButton>
  //         <MoreHorizontal />
  //         <span>More</span>
  //       </SidebarMenuButton>
  //     </SidebarMenuItem>
  //   </SidebarMenu>
  // </SidebarGroup>
  );
}
