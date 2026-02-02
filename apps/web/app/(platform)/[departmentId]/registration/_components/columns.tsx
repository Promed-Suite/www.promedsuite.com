"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Member = {
  id: string;
  corporate: string;
  principleMember: string;
  memberName: string;
  memberNo: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "corporate",
    header: "Corporate",
  },
  {
    accessorKey: "principleMember",
    header: "Principle Member",
  },
  {
    accessorKey: "memberName",
    header: "Member Name",
  },
  {
    accessorKey: "memberNo",
    header: "Member No",
  },
];
