"use client";

import type { Table } from "@tanstack/react-table";

import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

type BenefitsToolbarProps = {
  table: Table<any>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewBenefit: () => void;
};

export function BenefitsToolbar({
  onNewBenefit,
}: BenefitsToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={onNewBenefit}
        className="bg-blue-600 hover:bg-blue-700"
        aria-label="Create new benefit"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Benefit
      </Button>
    </div>
  );
}
