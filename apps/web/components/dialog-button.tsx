"use client";

import type { LucideIcon } from "lucide-react";

import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Label } from "@workspace/ui/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

type IDialogButton = {
  name: string;
  icon: LucideIcon;
};

export function DialogButton({ name, icon: Icon }: IDialogButton) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="flex justify-start cursor-pointer text-foreground"
        >
          <Icon className="size-4" />
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col overflow-hidden p-0 md:max-h-[600px] md:max-w-[900px] lg:max-w-[1000px] rounded-xl">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <Tabs
          defaultValue="corporate"
          className="flex flex-col min-h-0 w-full py-4 gap-0"
        >
          <div className="flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
            <Label htmlFor="view-selector" className="sr-only">
              {name}
              {" "}
              menu options
            </Label>
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="contact-person">Contact Person</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="corporate"
            className="flex flex-col gap-4 mt-2 overflow-auto px-4 lg:px-6 flex-1 min-h-0"
          >
            <div className="aspect-video w-full rounded-lg border border-dashed">
              C
            </div>
          </TabsContent>
          <TabsContent
            value="contact-person"
            className="flex flex-col gap-4 mt-2 overflow-auto px-4 lg:px-6 flex-1 min-h-0"
          >
            <div className="aspect-video w-full rounded-lg border border-dashed">
              CP
            </div>
          </TabsContent>
          <TabsContent
            value="regulations"
            className="flex flex-col gap-4 mt-2 overflow-auto px-4 lg:px-6 flex-1 min-h-0"
          >
            <div className="aspect-video w-full rounded-lg border border-dashed">
              R
            </div>
          </TabsContent>
          <TabsContent
            value="categories"
            className="flex flex-col gap-4 mt-2 overflow-auto px-4 lg:px-6 flex-1 min-h-0"
          >
            <div className="aspect-video w-full rounded-lg border border-dashed">
              C
            </div>
          </TabsContent>
          <TabsContent
            value="providers"
            className="flex flex-col gap-4 mt-2 overflow-auto px-4 lg:px-6 flex-1 min-h-0"
          >
            <div className="aspect-video w-full rounded-lg border border-dashed">
              P
            </div>
          </TabsContent>
          <TabsContent
            value="status"
            className="flex flex-col gap-4 mt-2 overflow-auto px-4 lg:px-6 flex-1 min-h-0"
          >
            <div className="aspect-video w-full rounded-lg border border-dashed">
              S
            </div>
          </TabsContent>
          <TabsContent
            value="rates"
            className="flex flex-col gap-4 mt-2 overflow-auto px-4 lg:px-6 flex-1 min-h-0"
          >
            <div className="aspect-video w-full rounded-lg border border-dashed">
              R
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
