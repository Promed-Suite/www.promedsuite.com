"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type {
  RegulationsEntity,
  RegulationsFormData,
} from "../schemas/regulations-form";

import { createRegulationsColumns } from "./regulations-columns";
import { RegulationsForm } from "./regulations-form";
import { RegulationsToolbar } from "./regulations-toolbar";

export default function RegulationsTab() {
  const [regulations, setRegulations] = useState<RegulationsEntity[]>([
    {
      id: "1",
      anniv: 1,
      adminFeeType: "Percentage of Bill",
      adminFeeRate: 2.5,
      adminFeeAmount: 0,
      agentCommissionRate: 15,
      commissionWHTaxRate: 5,
      remRule: true,
    },
    {
      id: "2",
      anniv: 2,
      adminFeeType: "A Flat Fee",
      adminFeeRate: 0,
      adminFeeAmount: 50,
      agentCommissionRate: 12,
      commissionWHTaxRate: 5,
      remRule: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingRegulation, setEditingRegulation]
    = useState<RegulationsEntity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter regulations based on search query
  const filteredRegulations = useMemo(() => {
    if (!searchQuery)
      return regulations;

    return regulations.filter(
      regulation =>
        regulation.adminFeeType
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
          || regulation.anniv.toString().includes(searchQuery),
    );
  }, [regulations, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createRegulationsColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: RegulationsFormData) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingRegulation) {
        // Update existing regulation
        setRegulations(
          regulations.map(reg =>
            reg.id === editingRegulation.id
              ? { ...data, id: editingRegulation.id }
              : reg,
          ),
        );
      }
      else {
        // Create new regulation
        const newRegulation: RegulationsEntity = {
          ...data,
          id: Date.now().toString(),
        };
        setRegulations([...regulations, newRegulation]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingRegulation(null);
    }, 500);
  }

  function handleEdit(regulation: RegulationsEntity) {
    setEditingRegulation(regulation);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setRegulations(regulations.filter(reg => reg.id !== id));
  }

  function handleNewRegulation() {
    setEditingRegulation(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingRegulation(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <RegulationsToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewRegulation={handleNewRegulation}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <RegulationsForm
          regulation={editingRegulation || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredRegulations} />
    </div>
  );
}
