"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import type { ProvidersEntity } from "../schemas/providers-form";

type ProvidersColumnsProps = {
  onEdit: (provider: ProvidersEntity) => void;
  onDelete: (id: string) => void;
};

export function createProvidersColumns({
  onEdit,
  onDelete,
}: ProvidersColumnsProps): ColumnDef<ProvidersEntity>[] {
  return [
    {
      accessorKey: "anniv",
      header: "Anniv",
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
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("provider")}</div>
      ),
    },
    {
      accessorKey: "sync",
      header: "Sync",
      cell: ({ row }) => (
        <Badge variant={row.getValue("sync") ? "default" : "secondary"}>
          {row.getValue("sync") ? "Enabled" : "Disabled"}
        </Badge>
      ),
    },
    {
      accessorKey: "smartSync",
      header: "Smart Sync",
      cell: ({ row }) => (
        <Badge variant={row.getValue("smartSync") ? "default" : "secondary"}>
          {row.getValue("smartSync") ? "Enabled" : "Disabled"}
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
            aria-label={`Edit provider ${row.original.provider}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete provider ${row.original.provider}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
