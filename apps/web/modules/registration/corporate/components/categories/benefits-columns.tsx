"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import type { BenefitsEntity } from "../schemas/categories-form";

type BenefitsColumnsProps = {
  onEdit: (benefit: BenefitsEntity) => void;
  onDelete: (id: string) => void;
};

export function createBenefitsColumns({
  onEdit,
  onDelete,
}: BenefitsColumnsProps): ColumnDef<BenefitsEntity>[] {
  return [
    {
      accessorKey: "anniv",
      header: "Anniversary",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("anniv")}
          {" "}
          year(s)
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "benefit",
      header: "Benefit",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("benefit")}</div>
      ),
    },
    {
      accessorKey: "subLimitOf",
      header: "Sublimit Of",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("subLimitOf")}</div>
      ),
    },
    {
      accessorKey: "limit",
      header: "Limit",
      cell: ({ row }) => (
        <div className="text-sm font-medium">
          {(row.getValue("limit") as number).toFixed(2)}
          %
        </div>
      ),
    },
    {
      accessorKey: "frequency",
      header: "Frequency",
      cell: ({ row }) => (
        <div className="text-sm">
          {(row.getValue("frequency") as number).toFixed(2)}
          %
        </div>
      ),
    },
    {
      accessorKey: "sharing",
      header: "Sharing",
      cell: ({ row }) => <div className="text-sm">{row.getValue("sharing")}</div>,
    },
    {
      accessorKey: "allocateTo",
      header: "Allocate To",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("allocateTo")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(row.original)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            aria-label={`Edit benefit ${row.original.benefit}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete benefit ${row.original.benefit}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
