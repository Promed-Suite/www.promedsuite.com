"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type { CoverDatesEntity, CoverDatesFormData } from "../schemas/cover-dates";

import { createCoverDatesColumns } from "./cover-dates-columns";
import { CoverDatesForm } from "./cover-dates-form";
import { CoverDatesToolbar } from "./cover-dates-toolbar";

export default function CoverDatesTab() {
  const [coverDates, setCoverDates] = useState<CoverDatesEntity[]>([
    {
      id: "1",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      renewalDate: new Date("2024-12-15"),
      intermediary: "DIRECT BUSINESS",
      anniv: 1,
      smartSync: true,
    },
    {
      id: "2",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      renewalDate: new Date("2024-12-15"),
      intermediary: "AGENT",
      anniv: 2,
      smartSync: false,
    },
    {
      id: "3",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
      renewalDate: new Date("2023-12-15"),
      intermediary: "DIRECT BUSINESS",
      anniv: 1,
      smartSync: true,
    },
    {
      id: "4",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
      renewalDate: new Date("2023-12-15"),
      intermediary: "AGENT",
      anniv: 2,
      smartSync: false,
    },
    {
      id: "5",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      renewalDate: new Date("2025-12-15"),
      intermediary: "DIRECT BUSINESS",
      anniv: 1,
      smartSync: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingCoverDate, setEditingCoverDate]
    = useState<CoverDatesEntity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter cover dates based on search query
  const filteredCoverDates = useMemo(() => {
    if (!searchQuery)
      return coverDates;

    return coverDates.filter(
      coverDate =>
        coverDate.intermediary
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
          || coverDate.anniv.toString().includes(searchQuery)
          || coverDate.startDate.toLocaleDateString().includes(searchQuery)
          || coverDate.endDate.toLocaleDateString().includes(searchQuery),
    );
  }, [coverDates, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createCoverDatesColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: CoverDatesFormData) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingCoverDate) {
        // Update existing cover date
        setCoverDates(
          coverDates.map(cd =>
            cd.id === editingCoverDate.id
              ? { ...data, id: editingCoverDate.id }
              : cd,
          ),
        );
      }
      else {
        // Create new cover date
        const newCoverDate: CoverDatesEntity = {
          ...data,
          id: Date.now().toString(),
        };
        setCoverDates([...coverDates, newCoverDate]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingCoverDate(null);
    }, 500);
  }

  function handleEdit(coverDate: CoverDatesEntity) {
    setEditingCoverDate(coverDate);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setCoverDates(coverDates.filter(cd => cd.id !== id));
  }

  function handleNewCoverDate() {
    setEditingCoverDate(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingCoverDate(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <CoverDatesToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewCoverDate={handleNewCoverDate}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <CoverDatesForm
          coverDate={editingCoverDate || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredCoverDates} />
    </div>
  );
}
