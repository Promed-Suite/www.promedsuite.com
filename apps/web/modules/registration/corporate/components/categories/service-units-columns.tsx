"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

import type { ServiceUnitsEntity } from "../schemas/categories-form";

type ServiceUnitsColumnsProps = {
  onEdit: (serviceUnit: ServiceUnitsEntity) => void;
  onDelete: (id: string) => void;
};

export function createServiceUnitsColumns({
  onEdit,
  onDelete,
}: ServiceUnitsColumnsProps): ColumnDef<ServiceUnitsEntity>[] {
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
      size: 120,
    },
    {
      accessorKey: "service",
      header: "Service Unit",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("service")}</div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="flex justify-end">Actions</div>,
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(row.original)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            aria-label={`Edit service unit ${row.original.service}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete service unit ${row.original.service}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      size: 100,
    },
  ];
}
