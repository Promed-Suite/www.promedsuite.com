"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import type { ReInsurerConfigsEntity } from "../schemas/re-insurer-configs-form";

type ReInsurerConfigsColumnsProps = {
  onEdit: (config: ReInsurerConfigsEntity) => void;
  onDelete: (id: string) => void;
};

export function createReInsurerConfigsColumns({
  onEdit,
  onDelete,
}: ReInsurerConfigsColumnsProps): ColumnDef<ReInsurerConfigsEntity>[] {
  return [
    {
      accessorKey: "reInsurer",
      header: "Re-insurer",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.reInsurer}</div>
      ),
    },
    {
      accessorKey: "period",
      header: "Period",
      cell: ({ row }) => {
        const period = row.original.period;
        return (
          <div className="text-sm">
            {period ? format(period, "MMM yyyy") : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "cede",
      header: "Cede",
      cell: ({ row }) => (
        <div className="font-medium text-blue-600">
          {row.original.cede.toFixed(2)}
          %
        </div>
      ),
    },
    {
      accessorKey: "commission",
      header: "Commission",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.commission.toFixed(2)}
          %
        </div>
      ),
    },
    {
      accessorKey: "retention",
      header: "Retention",
      cell: ({ row }) => (
        <div className="font-medium text-green-600">
          {row.original.retention.toFixed(2)}
          %
        </div>
      ),
    },
    {
      accessorKey: "tax",
      header: "Tax",
      cell: ({ row }) => (
        <div className="text-sm text-red-600">
          {row.original.tax.toFixed(2)}
          %
        </div>
      ),
    },
    {
      accessorKey: "reBroker",
      header: "Re-broker",
      cell: ({ row }) => (
        <Badge variant={row.original.reBroker ? "default" : "secondary"}>
          {row.original.reBroker ? "Yes" : "No"}
        </Badge>
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
            aria-label={`Edit config for ${row.original.reInsurer}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete config for ${row.original.reInsurer}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
