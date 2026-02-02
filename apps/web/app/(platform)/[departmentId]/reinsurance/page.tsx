"use client";

import {
  NotepadTextDashedIcon,
  Timer,
  TimerReset,
  Umbrella,
  WrapTextIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { PlaceholderContent } from "@/components/dialog-content";
import { DialogButton } from "@/components/dialog-trigger";
import ReInsurerConfigsTab from "@/modules/re-insurance/re-insurer-configs/components/reinsurer-configs/reinsurer-configs-tab";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Spinner } from "@workspace/ui/components/spinner";

const groupedItems = {
  Reinsurance: [
    {
      name: "Re-insurer Configs",
      icon: Umbrella,
      tabs: [
        {
          value: "re-insurer-configs",
          label: "Re-insurer Configs",
          content: <ReInsurerConfigsTab />,
        },
      ],
    },
    {
      name: "Premium Schedule",
      icon: TimerReset,
      tabs: [
        {
          value: "premium-schedule",
          label: "Premium Schedule",
          content: <PlaceholderContent title="Premium Schedule" />,
        },
      ],
    },
    {
      name: "Claims Schedule",
      icon: Timer,
      tabs: [
        {
          value: "claims-schedule",
          label: "Claims Schedule",
          content: <PlaceholderContent title="Claims Schedule" />,
        },
      ],
    },
    {
      name: "Claims Payment Schedule",
      icon: NotepadTextDashedIcon,
      tabs: [
        {
          value: "claims-payment-schedule",
          label: "Claims Payment Schedule",
          content: <PlaceholderContent title="Claims Payment Schedule" />,
        },
      ],
    },
    {
      name: "XOL Recovery",
      icon: WrapTextIcon,
      tabs: [
        {
          value: "xol-recovery",
          label: "XOL Recovery",
          content: <PlaceholderContent title="XOL Recovery" />,
        },
      ],
    },
  ],
};

export default function ReinsurancePage() {
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
