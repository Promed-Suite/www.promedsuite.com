// "use client";

// import { useState, useMemo } from "react";
// import { DataTable } from "@/components/data-table";
// import { CorporateForm } from "./corporate-form";
// import { CorporateToolbar } from "./corporate-toolbar";
// import { createCorporateColumns } from "./corporate-columns";
// import { CorporateEntity, CorporateFormData } from "../schemas/corporate-form";

// export default function CorporateTab() {
//   const [entities, setEntities] = useState<CorporateEntity[]>([
//     {
//       id: "1",
//       policyNo: "POL-001",
//       businessClass: "option1",
//       abbrev: "ACME",
//       corporateName: "Acme Corp",
//       corporateId: "ACME-001",
//       telephoneNo: "+1-555-0100",
//       postalAddress: "123 Main St",
//       mobileNo: "+1-555-0101",
//       email: "contact@acme.com",
//       physicalLocation: "123 Main St, City",
//       intermediary: "Direct Business",
//       branch: "option1",
//       currency: "USD",
//       startDate: new Date("2024-01-01"),
//       endDate: new Date("2024-12-31"),
//       renewalDate: new Date("2024-12-31"),
//       intermediaryType: "type1",
//       anniv: 1,
//       normalize: "option1",
//       smartSync: true,
//     },
//     // ... other entities
//   ]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingEntity, setEditingEntity] = useState<CorporateEntity | null>(
//     null
//   );
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Filter entities based on search query
//   const filteredEntities = useMemo(() => {
//     if (!searchQuery) return entities;

//     return entities.filter(
//       (entity) =>
//         entity.corporateName
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         entity.corporateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         entity.policyNo.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [entities, searchQuery]);

//   // Create columns with handlers
//   const columns = useMemo(
//     () =>
//       createCorporateColumns({
//         onEdit: handleEdit,
//         onDelete: handleDelete,
//       }),
//     []
//   );

//   function handleCreate(data: CorporateFormData) {
//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       if (editingEntity) {
//         // Update existing entity
//         setEntities(
//           entities.map((e) =>
//             e.id === editingEntity.id ? { ...data, id: editingEntity.id } : e
//           )
//         );
//       } else {
//         // Create new entity
//         const newEntity: CorporateEntity = {
//           ...data,
//           id: Date.now().toString(),
//         };
//         setEntities([...entities, newEntity]);
//       }

//       setIsSubmitting(false);
//       setIsCreating(false);
//       setEditingEntity(null);
//     }, 500);
//   }

//   function handleEdit(entity: CorporateEntity) {
//     setEditingEntity(entity);
//     setIsCreating(true);
//   }

//   function handleDelete(id: string) {
//     setEntities(entities.filter((e) => e.id !== id));
//   }

//   function handleNewEntity() {
//     setEditingEntity(null);
//     setIsCreating(true);
//   }

//   function handleCancel() {
//     setIsCreating(false);
//     setEditingEntity(null);
//   }

//   return (
//     <div className="space-y-4">
//       {/* Custom Toolbar */}
//       <CorporateToolbar
//         table={{} as any}
//         searchQuery={searchQuery}
//         onSearchChange={setSearchQuery}
//         onNewEntity={handleNewEntity}
//       />

//       {/* Create/Edit Form */}
//       {isCreating && (
//         <CorporateForm
//           entity={editingEntity || undefined}
//           onSubmit={handleCreate}
//           onCancel={handleCancel}
//           isSubmitting={isSubmitting}
//         />
//       )}

//       {/* Data Table */}
//       <DataTable columns={columns} data={filteredEntities} />
//     </div>
//   );
// }

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query"; // ADDED IMPORT
import { client } from "@workspace/api-client"; // ADDED IMPORT
import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type { CorporateEntity, CorporateFormData } from "../schemas/corporate-form";

import { useGetCorporates } from "../../api/use-get-corporates"; // ADDED IMPORT
import { createCorporateColumns } from "./corporate-columns";
import { CorporateForm } from "./corporate-form";
import { CorporateToolbar } from "./corporate-toolbar";

export default function CorporateTab() {
  const queryClient = useQueryClient(); // ADDED: Access query client

  // REPLACED: useState with useQuery
  const { data: corporatesData, isLoading, isError } = useGetCorporates();

  // ADDED: Transform API data to CorporateEntity format
  const entities = useMemo(() => {
    if (!corporatesData)
      return [];

    return corporatesData.map(
      (item): CorporateEntity => ({
        id: item.idx.toString(),
        policyNo: item.policy_no?.toString() ?? "",
        businessClass: item.scheme ?? "", // Default value or map from API if available
        abbrev: item.abbreviation ?? "",
        corporateName: item.corporate ?? "",
        corporateId: item.corp_id,
        telephoneNo: item.tel_no ?? "",
        postalAddress: item.postal_add ?? "N/A",
        mobileNo: item.tel_no ?? "N/A",
        email: item.email || "N/A",
        physicalLocation: item.phy_loc ?? "N/A",
        intermediary: "Direct Business",
        branch: item.branch ?? "N/A",
        currency: item.currency ?? "N/A",
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default to next year
        renewalDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1),
        ), // Default to next year
        intermediaryType: "type1",
        anniv: 1,
        normalize: "option1",
        smartSync: true,
      }),
    );
  }, [corporatesData]);

  // ADDED: Create mutation for adding/updating corporate
  const createUpdateMutation = useMutation({
    mutationFn: async (data: CorporateFormData & { id?: string }) => {
      // Determine if this is an update or create
      if (data.id) {
        // Update existing corporate (you'll need to implement this API endpoint)
        // const response = await client.corporate[data.id].$put({
        //   json: data
        // });
        const response = await client.corporate.$post({
          json: data,
        });
        return response.json();
      }
      else {
        // Create new corporate (you'll need to implement this API endpoint)
        const response = await client.corporate.$post({
          json: data,
        });
        return response.json();
      }
    },
    onSuccess: () => {
      // Invalidate and refetch corporates after mutation
      queryClient.invalidateQueries({ queryKey: ["corporates"] });
    },
  });

  // ADDED: Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Delete corporate (you'll need to implement this API endpoint)
      // const response = await client.corporate[id].$delete();
      const response = await client.corporate[":id"].$delete({
        param: { id },
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch corporates after deletion
      queryClient.invalidateQueries({ queryKey: ["corporates"] });
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingEntity, setEditingEntity] = useState<CorporateEntity | null>(
    null,
  );

  // REMOVED: setIsSubmitting - using mutation states instead
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter entities based on search query
  const filteredEntities = useMemo(() => {
    if (!searchQuery || !entities)
      return entities || [];

    return entities.filter(
      entity =>
        entity.corporateName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
          || entity.corporateId.toLowerCase().includes(searchQuery.toLowerCase())
          || entity.policyNo.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [entities, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createCorporateColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: CorporateFormData) {
    // REPLACED: Local state update with mutation
    createUpdateMutation.mutate(
      {
        ...data,
        id: editingEntity?.id,
      },
      {
        onSuccess: () => {
          setIsCreating(false);
          setEditingEntity(null);
        },
      },
    );
  }

  function handleEdit(entity: CorporateEntity) {
    setEditingEntity(entity);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    // REPLACED: Local state deletion with mutation
    deleteMutation.mutate(id);
  }

  function handleNewEntity() {
    setEditingEntity(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingEntity(null);
  }

  // ADDED: Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        Loading corporates...
      </div>
    );
  }

  // ADDED: Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        Error loading corporates
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <CorporateToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewEntity={handleNewEntity}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <CorporateForm
          entity={editingEntity || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={createUpdateMutation.isPending} // UPDATED: Use mutation pending state
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredEntities} />
    </div>
  );
}
