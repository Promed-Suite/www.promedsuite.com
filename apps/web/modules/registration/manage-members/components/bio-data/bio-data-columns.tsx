"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import type { BioDataEntity } from "../../schemas/bio-data";

type BioDataColumnsProps = {
  onEdit: (bioData: BioDataEntity) => void;
  onDelete: (id: string) => void;
};

export function createBioDataColumns({
  onEdit,
  onDelete,
}: BioDataColumnsProps): ColumnDef<BioDataEntity>[] {
  return [
    {
      accessorKey: "photoUrl",
      header: "Photo",
      cell: ({ row }) => {
        const photoUrl = row.original.photoUrl;
        const firstName = row.original.firstName || "";
        const lastName = row.original.lastName || "";
        const initials
          = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "??";

        return (
          <Avatar className="h-10 w-10">
            <AvatarImage src={photoUrl} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        );
      },
      size: 80,
    },
    {
      accessorKey: "memberNo",
      header: "Member No",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.memberNo}</div>
      ),
    },
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => {
        const firstName = row.original.firstName || "";
        const lastName = row.original.lastName || "";
        const otherNames = row.original.otherNames || "";

        return (
          <div>
            <div className="font-medium">{`${firstName} ${lastName}`.trim()}</div>
            {otherNames && (
              <div className="text-xs text-muted-foreground">{otherNames}</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.gender.toLowerCase()}
        </Badge>
      ),
      size: 100,
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      cell: ({ row }) => {
        const dob = new Date(row.original.dateOfBirth);
        return <div className="text-sm">{dob.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "maritalStatus",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="secondary" className="capitalize">
          {row.original.maritalStatus.toLowerCase()}
        </Badge>
      ),
      size: 120,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm truncate max-w-[200px]">
          {row.original.email || "-"}
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.phoneNumber || "-"}</div>
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
            aria-label={`Edit ${row.original.firstName} ${row.original.lastName}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete ${row.original.firstName} ${row.original.lastName}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      size: 100,
    },
  ];
}
