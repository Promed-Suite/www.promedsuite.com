"use client";

import type { Table } from "@tanstack/react-table";

import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

type RegulationsToolbarProps = {
  table: Table<any>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewRegulation: () => void;
};

export function RegulationsToolbar({
  onNewRegulation,
}: RegulationsToolbarProps) {
  return (
    <div className="flex items-center justify-start">
      {/* <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search regulations by type..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            aria-label="Search regulations"
          />
        </div>
      </div> */}
      <Button
        onClick={onNewRegulation}
        className="bg-blue-600 hover:bg-blue-700"
        aria-label="Create new regulation"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Regulation
      </Button>
    </div>
  );
}
