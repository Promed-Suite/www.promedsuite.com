"use client";

import type { Table } from "@tanstack/react-table";

import { Plus, Search } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

type CorporateToolbarProps = {
  table: Table<any>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewEntity: () => void;
};

export function CorporateToolbar({
  searchQuery,
  onSearchChange,
  onNewEntity,
}: CorporateToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search entities by name or code..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10"
            aria-label="Search entities"
          />
        </div>
      </div>
      <Button
        onClick={onNewEntity}
        className="bg-blue-600 hover:bg-blue-700"
        aria-label="Create new entity"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Entity
      </Button>
    </div>
  );
}
