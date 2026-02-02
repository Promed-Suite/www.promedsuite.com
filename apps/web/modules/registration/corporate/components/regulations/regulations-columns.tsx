"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import type { RegulationsEntity } from "../schemas/regulations-form";

type RegulationsColumnsProps = {
  onEdit: (regulation: RegulationsEntity) => void;
  onDelete: (id: string) => void;
};

export function createRegulationsColumns({
  onEdit,
  onDelete,
}: RegulationsColumnsProps): ColumnDef<RegulationsEntity>[] {
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
      accessorKey: "adminFeeType",
      header: "Admin Fee Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("adminFeeType")}
        </Badge>
      ),
    },
    {
      accessorKey: "adminFeeRate",
      header: "Admin Fee Rate",
      cell: ({ row }) => {
        const adminFeeType = row.original.adminFeeType;
        const rate = row.getValue("adminFeeRate") as number;

        if (adminFeeType === "A Flat Fee") {
          return <div className="text-sm">-</div>;
        }

        return (
          <div className="text-sm">
            {rate}
            %
            {adminFeeType === "Per Person Per Month" && "per person"}
          </div>
        );
      },
    },
    {
      accessorKey: "adminFeeAmount",
      header: "Admin Fee Amount",
      cell: ({ row }) => {
        const adminFeeType = row.original.adminFeeType;
        const amount = row.getValue("adminFeeAmount") as number;

        if (adminFeeType !== "A Flat Fee") {
          return <div className="text-sm">-</div>;
        }

        return (
          <div className="text-sm font-medium">
            KES
            {amount.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "agentCommissionRate",
      header: "Agent Commission",
      cell: ({ row }) => (
        <div className="text-sm font-medium">
          {row.getValue("agentCommissionRate") as number}
          %
        </div>
      ),
    },
    {
      accessorKey: "commissionWHTaxRate",
      header: "WH Tax Rate",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.getValue("commissionWHTaxRate") as number}
          %
        </div>
      ),
    },
    {
      accessorKey: "remRule",
      header: "REM Rule",
      cell: ({ row }) => (
        <Badge variant={row.getValue("remRule") ? "default" : "secondary"}>
          {row.getValue("remRule") ? "Enabled" : "Disabled"}
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
            aria-label={`Edit regulation ${row.original.id}`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label={`Delete regulation ${row.original.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
