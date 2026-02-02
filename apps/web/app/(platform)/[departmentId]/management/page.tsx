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
import { useEffect, useState } from "react";

import { DialogButton } from "@/components/dialog-button";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Spinner } from "@workspace/ui/components/spinner";

const groupedItems = {
  Corporate: [
    { name: "Corporate", icon: Building2 },
    { name: "Corporate Renew", icon: BookUser },
    { name: "Group Excess Limit", icon: ReceiptText },
  ],
  Members: [
    { name: "Manage Members", icon: Users },
    { name: "Cancel Members", icon: UserX },
    { name: "Reinstate Members", icon: UserCheck },
    { name: "Members Renewing", icon: UserCog },
    { name: "Change Category Enmass", icon: Users2 },
    { name: "Upload New Members", icon: UserPlus },
    { name: "Individual Products", icon: Package },
    { name: "Upload With Member Numbers", icon: Upload },
    { name: "Change Name Order", icon: TextCursorInput },
    { name: "Change Member's Corporate", icon: Building2 },
  ],
  Reports: [
    { name: "Membership List", icon: List },
    { name: "Population", icon: BarChart3 },
    { name: "Integration Reports", icon: GitMerge },
    { name: "Active Client List", icon: ListChecks },
    { name: "Card Followup", icon: CreditCard },
    { name: "Member Statement", icon: FileText },
    { name: "Card Reports", icon: CreditCard },
    { name: "Card Replacement Report", icon: CreditCard },
    { name: "Insured Corporates", icon: Shield },
    { name: "Renewal Notice", icon: MailWarning },
    { name: "Debited Members", icon: TrendingDown },
    { name: "Renewal Retention", icon: Target },
    { name: "Due For Renewal", icon: CalendarClock },
  ],
};

export default function ManagementPage() {
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
              {items.map(({ name, icon }) => (
                <DialogButton key={name} name={name} icon={icon} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
