"use client";

import * as React from "react";

import { Badge } from "@workspace/ui/components/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

export type TabConfig = {
  value: string;
  label: string;
  badge?: number | string;
  content: React.ReactNode;
};

export type ReusableDialogProps = {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  tabs: TabConfig[];
  defaultTab?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  height?: string;
  maxHeight?: string;
};

export function ReusableDialog({
  trigger,
  title,
  description,
  tabs,
  defaultTab,
  open,
  onOpenChange,
  className,
  contentClassName,
  height = "600px",
  maxHeight = "80vh",
}: ReusableDialogProps) {
  const isControlled = open !== undefined;

  const currentOpen = isControlled ? open : false;
  const handleOpenChange = isControlled ? onOpenChange : undefined;

  return (
    <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`overflow-hidden p-0 md:min-w-[900px] lg:min-w-[1000px] ${className}`}
        style={{
          height,
          maxHeight,
        }}
      >
        <DialogTitle className="sr-only">{title || "Dialog"}</DialogTitle>
        <DialogDescription className="sr-only">
          {description || "Dialog content"}
        </DialogDescription>
        <Tabs
          defaultValue={defaultTab || tabs[0]?.value}
          className="flex h-full flex-col"
        >
          <div className="flex shrink-0 px-4 py-4 lg:px-6 border-b">
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex shrink-0"
                >
                  {tab.label}
                  {tab.badge && (
                    <Badge variant="secondary" className="ml-2">
                      {tab.badge}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1 max-h-[444px] md:max-w-[900px] lg:max-w-[1000px]">
            {tabs.map(tab => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className={`flex flex-col p-0 m-0 ${contentClassName}`}
              >
                <div className="p-4 lg:px-6 lg:py-4">{tab.content}</div>
              </TabsContent>
            ))}
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
