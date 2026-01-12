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

import { PlaceholderContent } from "@/components/dialog-content";
import { DialogButton } from "@/components/dialog-trigger";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Spinner } from "@workspace/ui/components/spinner";

import type { Member } from "./_components/columns";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const dummyMembers: Member[] = [
  {
    id: "1",
    corporate: "AMANAH INSURANCE",
    principleMember: "Alice Njoki",
    memberName: "Alice Johnson",
    memberNo: "MEM-001",
  },
  {
    id: "2",
    corporate: "AMANAH INSURANCE",
    principleMember: "Michael Otieno",
    memberName: "Michael Otieno",
    memberNo: "MEM-002",
  },
  {
    id: "3",
    corporate: "AMANAH INSURANCE",
    principleMember: "Emily Lusaka",
    memberName: "Emily Lusaka",
    memberNo: "MEM-003",
  },
  {
    id: "4",
    corporate: "AMANAH INSURANCE",
    principleMember: "Henry Miller",
    memberName: "David Miller",
    memberNo: "MEM-004",
  },
  {
    id: "5",
    corporate: "AMANAH INSURANCE",
    principleMember: "Sarah Kamau",
    memberName: "Jennifer Kamau",
    memberNo: "MEM-005",
  },
  {
    id: "6",
    corporate: "AMANAH INSURANCE",
    principleMember: "James Njue",
    memberName: "Christopher Gitonga",
    memberNo: "MEM-006",
  },
  {
    id: "7",
    corporate: "AMANAH INSURANCE",
    principleMember: "Robert Burale",
    memberName: "Amanda Burale",
    memberNo: "MEM-007",
  },
  {
    id: "8",
    corporate: "AMANAH INSURANCE",
    principleMember: "Patricia Kihoro",
    memberName: "Daniel Kihoro",
    memberNo: "MEM-008",
  },
  {
    id: "9",
    corporate: "AMANAH INSURANCE",
    principleMember: "John Mwenda",
    memberName: "Lisa Mugure",
    memberNo: "MEM-009",
  },
  {
    id: "10",
    corporate: "AMANAH INSURANCE",
    principleMember: "Ahmed Hussein",
    memberName: "Ali Hassan",
    memberNo: "MEM-010",
  },
];

const groupedItems = {
  Corporate: [
    {
      name: "Corporate",
      icon: Building2,
      tabs: [
        {
          value: "corporate",
          label: "Corporate",
          content: (
            <div className="flex flex-col space-y-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">
                      Query By Principle Member
                    </SelectItem>
                    <SelectItem value="apple">Query By Member Name</SelectItem>
                    <SelectItem value="apple">Query By Member No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DataTable columns={columns} data={dummyMembers} />
            </div>
          ),
        },
        {
          value: "contact-person",
          label: "Contact Person",
          content: (
            <div className="flex flex-col space-y-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">
                      Query By Principle Member
                    </SelectItem>
                    <SelectItem value="apple">Query By Member Name</SelectItem>
                    <SelectItem value="apple">Query By Member No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DataTable columns={columns} data={dummyMembers} />
            </div>
          ),
        },
        {
          value: "regulations",
          label: "Regulations",
          content: (
            <div className="flex flex-col space-y-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">
                      Query By Principle Member
                    </SelectItem>
                    <SelectItem value="apple">Query By Member Name</SelectItem>
                    <SelectItem value="apple">Query By Member No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DataTable columns={columns} data={dummyMembers} />
            </div>
          ),
        },
      ],
    },
    {
      name: "Corporate Renew",
      icon: BookUser,
      tabs: [
        {
          value: "corporate-renew",
          label: "Corporate Renew",
          content: <PlaceholderContent title="Corporate Details" />,
        },
      ],
    },
    {
      name: "Group Excess Limit",
      icon: ReceiptText,
      tabs: [
        {
          value: "Group-excess-limit",
          label: "Group Excess Limit",
          content: <PlaceholderContent title="Group Excess Limit" />,
        },
      ],
    },
  ],
  Members: [
    {
      name: "Manage Members",
      icon: Users,
      tabs: [
        {
          value: "manage-members",
          label: "Manage Members",
          content: <PlaceholderContent title="Manage Members" />,
        },
      ],
    },
    {
      name: "Cancel Members",
      icon: UserX,
      tabs: [
        {
          value: "cancel-members",
          label: "Cancel Members",
          content: <PlaceholderContent title="Cancel Members" />,
        },
      ],
    },
    {
      name: "Reinstate Members",
      icon: UserCheck,
      tabs: [
        {
          value: "reinstate-members",
          label: "Reinstate Members",
          content: <PlaceholderContent title="Reinstate Members" />,
        },
      ],
    },
    {
      name: "Members Renewing",
      icon: UserCog,
      tabs: [
        {
          value: "members-renewing",
          label: "Members Renewing",
          content: <PlaceholderContent title="Members Renewing" />,
        },
      ],
    },
    {
      name: "Change Category Enmass",
      icon: Users2,
      tabs: [
        {
          value: "change-category-enmass",
          label: "Change Category Enmass",
          content: <PlaceholderContent title="Change Category Enmass" />,
        },
      ],
    },
    {
      name: "Upload New Members",
      icon: UserPlus,
      tabs: [
        {
          value: "upload-new-members",
          label: "Upload New Members",
          content: <PlaceholderContent title="Upload New Members" />,
        },
      ],
    },
    {
      name: "Individual Products",
      icon: Package,
      tabs: [
        {
          value: "individual-products",
          label: "Individual Products",
          content: <PlaceholderContent title="Individual Products" />,
        },
      ],
    },
    {
      name: "Upload With Member Numbers",
      icon: Upload,
      tabs: [
        {
          value: "upload-with-member-numbers",
          label: "Upload With Member Numbers",
          content: <PlaceholderContent title="Corporate Details" />,
        },
      ],
    },
    {
      name: "Change Name Order",
      icon: TextCursorInput,
      tabs: [
        {
          value: "change-name-order",
          label: "Change Name Order",
          content: <PlaceholderContent title="Change Name Order" />,
        },
      ],
    },
    {
      name: "Change Member's Corporate",
      icon: Building2,
      tabs: [
        {
          value: "change-members-corporate",
          label: "Change Member's Corporate",
          content: <PlaceholderContent title="Corporate Details" />,
        },
      ],
    },
  ],
  Reports: [
    {
      name: "Membership List",
      icon: List,
      tabs: [
        {
          value: "membership-list",
          label: "Membership List",
          content: <PlaceholderContent title="Membership List" />,
        },
      ],
    },
    {
      name: "Population",
      icon: BarChart3,
      tabs: [
        {
          value: "population",
          label: "Population",
          content: <PlaceholderContent title="Population" />,
        },
      ],
    },
    {
      name: "Integration Reports",
      icon: GitMerge,
      tabs: [
        {
          value: "integration-reports",
          label: "Integration Reports",
          content: <PlaceholderContent title="Integration Reports" />,
        },
      ],
    },
    {
      name: "Active Client List",
      icon: ListChecks,
      tabs: [
        {
          value: "active-client-list",
          label: "Active Client List",
          content: <PlaceholderContent title="Active Client List" />,
        },
      ],
    },
    {
      name: "Card Followup",
      icon: CreditCard,
      tabs: [
        {
          value: "card-followup",
          label: "Card Followup",
          content: <PlaceholderContent title="Card Followup" />,
        },
      ],
    },
    {
      name: "Member Statement",
      icon: FileText,
      tabs: [
        {
          value: "member-statement",
          label: "",
          content: <PlaceholderContent title="Member Statement" />,
        },
      ],
    },
    {
      name: "Card Reports",
      icon: CreditCard,
      tabs: [
        {
          value: "card-reports",
          label: "Card Reports",
          content: <PlaceholderContent title="Card Reports" />,
        },
      ],
    },
    {
      name: "Card Replacement Report",
      icon: CreditCard,
      tabs: [
        {
          value: "card-replacement-report",
          label: "Card Replacement Report",
          content: <PlaceholderContent title="Card Replacement Report" />,
        },
      ],
    },
    {
      name: "Insured Corporates",
      icon: Shield,
      tabs: [
        {
          value: "insured-corporates",
          label: "Insured Corporates",
          content: <PlaceholderContent title="Insured Corporates" />,
        },
      ],
    },
    {
      name: "Renewal Notice",
      icon: MailWarning,
      tabs: [
        {
          value: "renewal-notice",
          label: "Renewal Notice",
          content: <PlaceholderContent title="Renewal Notice" />,
        },
      ],
    },
    {
      name: "Debited Members",
      icon: TrendingDown,
      tabs: [
        {
          value: "debited-members",
          label: "Debited Members",
          content: <PlaceholderContent title="Debited Members" />,
        },
      ],
    },
    {
      name: "Renewal Retention",
      icon: Target,
      tabs: [
        {
          value: "renewal-retention",
          label: "Renewal Retention",
          content: <PlaceholderContent title="Renewal Retention" />,
        },
      ],
    },
    {
      name: "Due For Renewal",
      icon: CalendarClock,
      tabs: [
        {
          value: "due-for-renewal",
          label: "Due For Renewal",
          content: <PlaceholderContent title="Due For Renewal" />,
        },
      ],
    },
  ],
};

export default function CarePage() {
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
              {items.map(({ name, icon, tabs }) => (
                <DialogButton key={name} icon={icon} name={name} tabs={tabs} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// function MemberRegistration() {
//   return (
//     <div className="flex flex-col space-y-2">
//       <Select>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Select task" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>Fruits</SelectLabel>
//             <SelectItem value="apple">Query By Principle Member</SelectItem>
//             <SelectItem value="apple">Query By Member Name</SelectItem>
//             <SelectItem value="apple">Query By Member No</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <DataTable columns={columns} data={dummyMembers} />
//     </div>
//   );
// }
