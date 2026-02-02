"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type { ProvidersEntity, ProvidersFormData } from "../schemas/providers-form";

import { createProvidersColumns } from "./providers-columns";
import { ProvidersForm } from "./providers-form";
import { ProvidersToolbar } from "./providers-toolbar";

export default function ProvidersTab() {
  const [providers, setProviders] = useState<ProvidersEntity[]>([
    {
      id: "1",
      anniv: 1,
      category: "CAT A",
      provider: "General Hospital Central",
      sync: true,
      smartSync: false,
    },
    {
      id: "2",
      anniv: 2,
      category: "CAT B",
      provider: "City Medical Center",
      sync: false,
      smartSync: true,
    },
    {
      id: "3",
      anniv: 1,
      category: "CAT C",
      provider: "University Teaching Hospital",
      sync: true,
      smartSync: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingProvider, setEditingProvider]
    = useState<ProvidersEntity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter providers based on search query
  const filteredProviders = useMemo(() => {
    if (!searchQuery)
      return providers;

    return providers.filter(
      provider =>
        provider.provider.toLowerCase().includes(searchQuery.toLowerCase())
        || provider.category.toLowerCase().includes(searchQuery.toLowerCase())
        || provider.anniv.toString().includes(searchQuery),
    );
  }, [providers, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createProvidersColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: ProvidersFormData) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingProvider) {
        // Update existing provider
        setProviders(
          providers.map(prov =>
            prov.id === editingProvider.id
              ? { ...data, id: editingProvider.id }
              : prov,
          ),
        );
      }
      else {
        // Create new provider
        const newProvider: ProvidersEntity = {
          ...data,
          id: Date.now().toString(),
        };
        setProviders([...providers, newProvider]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingProvider(null);
    }, 500);
  }

  function handleEdit(provider: ProvidersEntity) {
    setEditingProvider(provider);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setProviders(providers.filter(prov => prov.id !== id));
  }

  function handleNewProvider() {
    setEditingProvider(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingProvider(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <ProvidersToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewProvider={handleNewProvider}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <ProvidersForm
          provider={editingProvider || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredProviders} />
    </div>
  );
}
