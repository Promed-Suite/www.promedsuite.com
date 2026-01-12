"use client";

import {
  BarChart3,
  BookUser,
  Building2,
  CalendarClock,
  CreditCard,
  FileText,
  GitMerge,
  List,
  ListChecks,
  MailWarning,
  Package,
  ReceiptText,
  Shield,
  Target,
  TextCursorInput,
  TrendingDown,
  Upload,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  Users2,
  UserX,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Spinner } from "@workspace/ui/components/spinner";

const groupedItems = {
  Corporate: [
    { name: "Corporate", icon: Building2, url: "/corporate" },
    { name: "Corporate Renew", icon: BookUser, url: "/corporate" },
    { name: "Group Excess Limit", icon: ReceiptText, url: "/corporate" },
  ],
  Members: [
    { name: "Manage Members", icon: Users, url: "/members" },
    { name: "Cancel Members", icon: UserX, url: "/members" },
    { name: "Reinstate Members", icon: UserCheck, url: "/members" },
    { name: "Members Renewing", icon: UserCog, url: "/members" },
    { name: "Change Category Enmass", icon: Users2, url: "/members" },
    { name: "Upload New Members", icon: UserPlus, url: "/members" },
    { name: "Individual Products", icon: Package, url: "/members" },
    { name: "Upload With Member Numbers", icon: Upload, url: "/members" },
    { name: "Change Name Order", icon: TextCursorInput, url: "/members" },
    { name: "Change Member's Corporate", icon: Building2, url: "/members" },
  ],
  Reports: [
    { name: "Membership List", icon: List, url: "/corporate-reports" },
    { name: "Population", icon: BarChart3, url: "/corporate-reports" },
    { name: "Integration Reports", icon: GitMerge, url: "/corporate-reports" },
    { name: "Active Client List", icon: ListChecks, url: "/corporate-reports" },
    { name: "Card Followup", icon: CreditCard, url: "/corporate-reports" },
    { name: "Member Statement", icon: FileText, url: "/corporate-reports" },
    { name: "Card Reports", icon: CreditCard, url: "/corporate-reports" },
    {
      name: "Card Replacement Report",
      icon: CreditCard,
      url: "/corporate-reports",
    },
    { name: "Insured Corporates", icon: Shield, url: "/corporate-reports" },
    { name: "Renewal Notice", icon: MailWarning, url: "/corporate-reports" },
    { name: "Debited Members", icon: TrendingDown, url: "/corporate-reports" },
    { name: "Renewal Retention", icon: Target, url: "/corporate-reports" },
    { name: "Due For Renewal", icon: CalendarClock, url: "/corporate-reports" },
  ],
};

export default function CommissionsPage() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-start p-4">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

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
              {items.map(({ name, icon: Icon, url }) => (
                <Button
                  key={name}
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <a href={pathname + url}>
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
