"use client";

import {
  Activity,
  AlertCircle,
  Building,
  Building2,
  Calendar,
  CalendarDays,
  CreditCard,
  FileArchive,
  Hash,
  Heart,
  Key,
  LineChart,
  Printer,
  Shield,
  Trash2,
  Upload,
  User,
  UserCheck,
  UserCircle,
  UserCog,
  Users,
  Users2,
  UserX,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { getBasePath } from "@/utils/get-base-path";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";

const groupedItems = {
  "Administration": [
    {
      name: "Add Items",
      icon: Building2,
      href: "/administration/add-items",
    },
    {
      name: "Provider List",
      icon: Users,
      href: "/administration/provider-list",
    },
    {
      name: "Agent Management",
      icon: UserCog,
      href: "/administration/agent-management",
    },
    {
      name: "Update Family Size",
      icon: Users2,
      href: "/administration/update-family-size",
    },
  ],
  "Users": [
    {
      name: "User Management",
      icon: User,
      href: "/users/user-management",
    },
    {
      name: "User Excess Roles",
      icon: UserX,
      href: "/users/user-excess-roles",
    },
    {
      name: "User Authorization Limits",
      icon: UserCheck,
      href: "/users/user-authorization-limits",
    },
    {
      name: "User Activity",
      icon: Activity,
      href: "/users/user-activity",
    },
    {
      name: "Change Password",
      icon: Key,
      href: "/users/change-password",
    },
    {
      name: "User Departments",
      icon: Building,
      href: "/users/user-departments",
    },
  ],
  "Operations and Data": [
    {
      name: "Delete Entry",
      icon: Trash2,
      href: "/operations-data/delete-entry",
    },
    {
      name: "Wrong Diagnosis",
      icon: AlertCircle,
      href: "/operations-data/wrong-diagnosis",
    },
    {
      name: "No Claim Numbers",
      icon: Hash,
      href: "/operations-data/no-claim-numbers",
    },
    {
      name: "Upload Old Claims",
      icon: Upload,
      href: "/operations-data/upload-old-claims",
    },
    {
      name: "Import Old Batches",
      icon: FileArchive,
      href: "/operations-data/import-old-batches",
    },
    {
      name: "Align Dates",
      icon: CalendarDays,
      href: "/operations-data/align-dates",
    },
    {
      name: "Pay Old Vouchers",
      icon: CreditCard,
      href: "/operations-data/pay-old-vouchers",
    },
    {
      name: "Fix Family Relations",
      icon: Heart,
      href: "/operations-data/fix-family-relations",
    },
    {
      name: "Show Graphs",
      icon: LineChart,
      href: "/operations-data/show-graphs",
    },
    {
      name: "Fix Claims Deductions",
      icon: Wrench,
      href: "/operations-data/fix-claims-deductions",
    },
    {
      name: "Fix Member Number",
      icon: UserCircle,
      href: "/operations-data/fix-member-number",
    },
    {
      name: "Fix Member Dates",
      icon: Calendar,
      href: "/operations-data/fix-member-dates",
    },
    {
      name: "Unvet Claim",
      icon: Shield,
      href: "/operations-data/unvet-claim",
    },
    {
      name: "Set Printer",
      icon: Printer,
      href: "/operations-data/set-printer",
    },
  ],
};

export default function AdministrationPage() {
  const basePath = getBasePath();

  return (
    <div id="main" className="flex flex-1 flex-col gap-4 p-4">
      <div className="columns-1 gap-4 space-y-4 md:columns-2">
        {Object.entries(groupedItems).map(([groupName, items]) => (
          <Card
            key={groupName}
            className="break-inside-avoid shadow-none relative p-4 w-md"
          >
            <Badge className="bg-background text-primary -translate-y-1/2 absolute top-0 left-2 rounded-full">
              {groupName}
            </Badge>
            <CardContent className="flex flex-col items-start px-2">
              {items.map(({ name, icon: Icon, href }) => (
                // <DialogButton key={name} name={name} icon={icon} />
                <Link
                  key={name}
                  href={`${basePath}/administration${href}`}
                  className="w-full"
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
