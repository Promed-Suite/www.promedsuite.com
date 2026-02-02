"use client";

import type { Table } from "@tanstack/react-table";

import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

type ProvidersToolbarProps = {
  table: Table<any>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewProvider: () => void;
};

export function ProvidersToolbar({
  onNewProvider,
}: ProvidersToolbarProps) {
  return (
    <div className="flex items-center justify-start">
      {/* <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search providers by name or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            aria-label="Search providers"
          />
        </div>
      </div> */}
      <Button
        onClick={onNewProvider}
        className="bg-blue-600 hover:bg-blue-700"
        aria-label="Create new provider"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Provider
      </Button>
    </div>
  );
}
