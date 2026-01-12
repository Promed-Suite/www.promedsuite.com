"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type {
  ServiceUnitsEntity,
  ServiceUnitsFormData,
} from "../schemas/categories-form";

import { createServiceUnitsColumns } from "./service-units-columns";
import { ServiceUnitsForm } from "./service-units-form";
import { ServiceUnitsToolbar } from "./service-units-toolbar";

export default function ServiceUnitsTab() {
  const [serviceUnits, setServiceUnits] = useState<ServiceUnitsEntity[]>([
    {
      id: "1",
      anniv: 1,
      service: "Consultation Unit",
    },
    {
      id: "2",
      anniv: 1,
      service: "Hospital Day Unit",
    },
    {
      id: "3",
      anniv: 2,
      service: "ICU Day Unit",
    },
    {
      id: "4",
      anniv: 2,
      service: "Surgery Unit",
    },
    {
      id: "5",
      anniv: 3,
      service: "Lab Test Unit",
    },
    {
      id: "6",
      anniv: 3,
      service: "X-Ray Unit",
    },
    {
      id: "7",
      anniv: 1,
      service: "MRI Unit",
    },
    {
      id: "8",
      anniv: 2,
      service: "CT Scan Unit",
    },
    {
      id: "9",
      anniv: 1,
      service: "Pharmacy Unit",
    },
    {
      id: "10",
      anniv: 2,
      service: "Physiotherapy Session",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingServiceUnit, setEditingServiceUnit]
    = useState<ServiceUnitsEntity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter service units based on search query
  const filteredServiceUnits = useMemo(() => {
    if (!searchQuery)
      return serviceUnits;

    return serviceUnits.filter(
      serviceUnit =>
        serviceUnit.service.toLowerCase().includes(searchQuery.toLowerCase())
        || serviceUnit.anniv.toString().includes(searchQuery),
    );
  }, [serviceUnits, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createServiceUnitsColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: ServiceUnitsFormData) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingServiceUnit) {
        // Update existing service unit
        setServiceUnits(
          serviceUnits.map(su =>
            su.id === editingServiceUnit.id
              ? { ...data, id: editingServiceUnit.id }
              : su,
          ),
        );
      }
      else {
        // Create new service unit
        const newServiceUnit: ServiceUnitsEntity = {
          ...data,
          id: Date.now().toString(),
        };
        setServiceUnits([...serviceUnits, newServiceUnit]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingServiceUnit(null);
    }, 500);
  }

  function handleEdit(serviceUnit: ServiceUnitsEntity) {
    setEditingServiceUnit(serviceUnit);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setServiceUnits(serviceUnits.filter(su => su.id !== id));
  }

  function handleNewServiceUnit() {
    setEditingServiceUnit(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingServiceUnit(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <ServiceUnitsToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewServiceUnit={handleNewServiceUnit}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <ServiceUnitsForm
          serviceUnit={editingServiceUnit || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredServiceUnits} />
    </div>
  );
}
