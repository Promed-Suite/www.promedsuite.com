"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

import type { CorporateEntity } from "../schemas/corporate-form";

type CorporateColumnsProps = {
  onEdit: (entity: CorporateEntity) => void;
  onDelete: (id: string) => void;
};

export function createCorporateColumns({
  onEdit,
  onDelete,
}: CorporateColumnsProps): ColumnDef<CorporateEntity>[] {
  return [
    {
      accessorKey: "policyNo",
      header: "Policy No",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("policyNo")}</div>
      ),
    },
    {
      accessorKey: "corporateName",
      header: "Corporate Name",
      cell: ({ row }) => (
        <div className="font-medium max-w-40 truncate">
          {row.getValue("corporateName")}
        </div>
      ),
    },
    {
      accessorKey: "corporateId",
      header: "Corporate ID",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("corporateId")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm max-w-40 truncate">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "telephoneNo",
      header: "Phone",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("telephoneNo")}</div>
      ),
    },
    {
      accessorKey: "businessClass",
      header: "Business Class",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("businessClass")}</div>
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
            aria-label={`Edit ${row.original.corporateName}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete ${row.original.corporateName}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
