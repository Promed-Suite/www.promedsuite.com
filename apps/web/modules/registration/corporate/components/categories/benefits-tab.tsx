"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type { BenefitsEntity, BenefitsFormData } from "../schemas/categories-form";

import { createBenefitsColumns } from "./benefits-columns";
import { BenefitsForm } from "./benefits-form";
import { BenefitsToolbar } from "./benefits-toolbar";

export default function BenefitsTab() {
  const [benefits, setBenefits] = useState<BenefitsEntity[]>([
    {
      id: "1",
      anniv: 1,
      category: "CAT A",
      benefit: "Hospitalization",
      subLimitOf: "Overall Limit",
      limit: 100,
      frequency: 80,
      sharing: "100% Insurer",
      allocateTo: "Network Hospital",
    },
    {
      id: "2",
      anniv: 2,
      category: "CAT B",
      benefit: "Outpatient Treatment",
      subLimitOf: "Outpatient Limit",
      limit: 80,
      frequency: 90,
      sharing: "80% / 20%",
      allocateTo: "Primary Provider",
    },
    {
      id: "3",
      anniv: 1,
      category: "CAT C",
      benefit: "Dental Care",
      subLimitOf: "Dental Limit",
      limit: 60,
      frequency: 50,
      sharing: "50% / 50%",
      allocateTo: "Specialist Provider",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<BenefitsEntity | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter benefits based on search query
  const filteredBenefits = useMemo(() => {
    if (!searchQuery)
      return benefits;

    return benefits.filter(
      benefit =>
        benefit.benefit.toLowerCase().includes(searchQuery.toLowerCase())
        || benefit.category.toLowerCase().includes(searchQuery.toLowerCase())
        || benefit.subLimitOf.toLowerCase().includes(searchQuery.toLowerCase())
        || benefit.anniv.toString().includes(searchQuery),
    );
  }, [benefits, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createBenefitsColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: BenefitsFormData) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingBenefit) {
        // Update existing benefit
        setBenefits(
          benefits.map(b =>
            b.id === editingBenefit.id ? { ...data, id: editingBenefit.id } : b,
          ),
        );
      }
      else {
        // Create new benefit
        const newBenefit: BenefitsEntity = {
          ...data,
          id: Date.now().toString(),
        };
        setBenefits([...benefits, newBenefit]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingBenefit(null);
    }, 500);
  }

  function handleEdit(benefit: BenefitsEntity) {
    setEditingBenefit(benefit);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setBenefits(benefits.filter(b => b.id !== id));
  }

  function handleNewBenefit() {
    setEditingBenefit(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingBenefit(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <BenefitsToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewBenefit={handleNewBenefit}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <BenefitsForm
          benefit={editingBenefit || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredBenefits} />
    </div>
  );
}
