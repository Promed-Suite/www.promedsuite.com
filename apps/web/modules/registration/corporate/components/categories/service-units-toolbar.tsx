"use client";

import type { Table } from "@tanstack/react-table";

import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

type ServiceUnitsToolbarProps = {
  table: Table<any>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewServiceUnit: () => void;
};

export function ServiceUnitsToolbar({
  onNewServiceUnit,
}: ServiceUnitsToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={onNewServiceUnit}
        className="bg-blue-600 hover:bg-blue-700"
        aria-label="Create new service unit"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Service Unit
      </Button>
    </div>
  );
}
