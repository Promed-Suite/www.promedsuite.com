"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import type { CoverDatesEntity } from "../schemas/cover-dates";

type CoverDatesColumnsProps = {
  onEdit: (coverDate: CoverDatesEntity) => void;
  onDelete: (id: string) => void;
};

export function createCoverDatesColumns({
  onEdit,
  onDelete,
}: CoverDatesColumnsProps): ColumnDef<CoverDatesEntity>[] {
  return [
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("startDate"));
        return <div className="font-medium">{format(date, "MMM dd, yyyy")}</div>;
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("endDate"));
        return <div className="font-medium">{format(date, "MMM dd, yyyy")}</div>;
      },
    },
    {
      accessorKey: "renewalDate",
      header: "Renewal Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("renewalDate"));
        return <div className="font-medium">{format(date, "MMM dd, yyyy")}</div>;
      },
    },
    {
      accessorKey: "intermediary",
      header: "Intermediary",
      cell: ({ row }) => {
        const intermediary = row.getValue("intermediary") as
          | "DIRECT BUSINESS"
          | "AGENT";
        return (
          <Badge variant="outline" className="capitalize">
            {intermediary.replace("_", " ").toLowerCase()}
          </Badge>
        );
      },
    },
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
            aria-label={`Edit cover dates for anniversary ${row.original.anniv}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete cover dates for anniversary ${row.original.anniv}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
