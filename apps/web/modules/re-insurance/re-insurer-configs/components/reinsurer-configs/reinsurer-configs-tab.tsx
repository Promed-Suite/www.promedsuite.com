"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type {
  ReInsurerConfigsEntity,
  ReInsurerConfigsFormData,
} from "../schemas/re-insurer-configs-form";

import { createReInsurerConfigsColumns } from "./reinsurer-configs-columns";
import { ReInsurerConfigsForm } from "./reinsurer-configs-form";
import { ReInsurerConfigsToolbar } from "./reinsurer-configs-toolbar";

export default function ReInsurerConfigsTab() {
  const [configs, setConfigs] = useState<ReInsurerConfigsEntity[]>([
    {
      id: "1",
      reInsurer: "Swiss Re",
      cede: 60,
      commission: 25,
      retention: 40,
      tax: 5,
      period: new Date("2024-01-01"),
      reBroker: true,
    },
    {
      id: "2",
      reInsurer: "Munich Re",
      cede: 70,
      commission: 22,
      retention: 30,
      tax: 5,
      period: new Date("2024-01-01"),
      reBroker: false,
    },
    {
      id: "3",
      reInsurer: "Hannover Re",
      cede: 50,
      commission: 20,
      retention: 50,
      tax: 5,
      period: new Date("2024-01-01"),
      reBroker: true,
    },
    {
      id: "4",
      reInsurer: "Lloyd's of London",
      cede: 80,
      commission: 28,
      retention: 20,
      tax: 5,
      period: new Date("2024-01-01"),
      reBroker: false,
    },
    {
      id: "5",
      reInsurer: "Berkshire Hathaway",
      cede: 40,
      commission: 18,
      retention: 60,
      tax: 5,
      period: new Date("2024-01-01"),
      reBroker: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingConfig, setEditingConfig]
    = useState<ReInsurerConfigsEntity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter configs based on search query
  const filteredConfigs = useMemo(() => {
    if (!searchQuery)
      return configs;

    return configs.filter(
      config =>
        config.reInsurer.toLowerCase().includes(searchQuery.toLowerCase())
        || config.cede.toString().includes(searchQuery)
        || config.retention.toString().includes(searchQuery),
    );
  }, [configs, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createReInsurerConfigsColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: ReInsurerConfigsFormData) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingConfig) {
        // Update existing config
        setConfigs(
          configs.map(config =>
            config.id === editingConfig.id
              ? { ...data, id: editingConfig.id }
              : config,
          ),
        );
      }
      else {
        // Create new config
        const newConfig: ReInsurerConfigsEntity = {
          ...data,
          id: Date.now().toString(),
        };
        setConfigs([...configs, newConfig]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingConfig(null);
    }, 500);
  }

  function handleEdit(config: ReInsurerConfigsEntity) {
    setEditingConfig(config);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setConfigs(configs.filter(config => config.id !== id));
  }

  function handleNewConfig() {
    setEditingConfig(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingConfig(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <ReInsurerConfigsToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewConfig={handleNewConfig}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <ReInsurerConfigsForm
          config={editingConfig || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredConfigs} />
    </div>
  );
}
