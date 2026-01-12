"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

import type { ContactPersonEntity } from "../schemas/contact-person-form";

type ContactPersonColumnsProps = {
  onEdit: (contactPerson: ContactPersonEntity) => void;
  onDelete: (id: string) => void;
};

export function createContactPersonColumns({
  onEdit,
  onDelete,
}: ContactPersonColumnsProps): ColumnDef<ContactPersonEntity>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "surname",
      header: "Surname",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("surname")}</div>
      ),
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("firstName")}</div>
      ),
    },
    {
      accessorKey: "otherNames",
      header: "Other Names",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("otherNames")}
        </div>
      ),
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("position")}</div>
      ),
    },
    {
      accessorKey: "mobileNo",
      header: "Mobile No",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("mobileNo") || "-"}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("email") || "-"}</div>
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
            aria-label={`Edit ${row.original.firstName} ${row.original.surname}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete ${row.original.firstName} ${row.original.surname}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
