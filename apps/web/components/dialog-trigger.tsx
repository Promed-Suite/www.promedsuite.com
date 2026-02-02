"use client";

import type { LucideIcon } from "lucide-react";

import { useOpenRegistration } from "@/modules/registration/hooks/use-open-registation";
import { Button } from "@workspace/ui/components/button";

import type { TabConfig } from "./reusable-dialog";

import { ReusableDialog } from "./reusable-dialog";

type DialogButtonProps = {
  name: string;
  icon: LucideIcon;
  tabs: TabConfig[];
  defaultTab?: string;
};

export function DialogButton({
  name,
  icon: Icon,
  tabs,
  defaultTab,
}: DialogButtonProps) {
  const openRegistration = useOpenRegistration();

  const modalId = `dialog-${name.replace(/\s+/g, "-").toLowerCase()}`;
  const isOpen = openRegistration.isOpen(modalId);

  const trigger = (
    <Button
      onClick={() => openRegistration.onOpen(modalId)}
      variant="ghost"
      className="w-full justify-start"
    >
      <Icon className="mr-2 h-4 w-4" />
      {name}
    </Button>
  );

  return (
    <ReusableDialog
      key={modalId}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          openRegistration.onClose(modalId);
        }
      }}
      trigger={trigger}
      title={`${name} Settings`}
      description={`Customize your ${name} settings here.`}
      tabs={tabs}
      defaultTab={defaultTab}
    />
  );
}
