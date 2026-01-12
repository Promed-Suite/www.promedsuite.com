"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type {
  ContactPersonEntity,
  ContactPersonFormData,
} from "../schemas/contact-person-form";

import { createContactPersonColumns } from "./contact-person-columns";
import { ContactPersonForm } from "./contact-person-form";
import { ContactPersonToolbar } from "./contact-person-toolbar";

export default function ContactPersonTab() {
  const [contactPersons, setContactPersons] = useState<ContactPersonEntity[]>([
    {
      id: "1",
      title: "Mr.",
      surname: "Smith",
      firstName: "John",
      otherNames: "David",
      position: "CEO",
      mobileNo: "+1-555-0100",
      email: "john.smith@example.com",
    },
    {
      id: "2",
      title: "Ms.",
      surname: "Johnson",
      firstName: "Sarah",
      otherNames: "Marie",
      position: "Manager",
      mobileNo: "+1-555-0101",
      email: "sarah.johnson@example.com",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingContactPerson, setEditingContactPerson]
    = useState<ContactPersonEntity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter contact persons based on search query
  const filteredContactPersons = useMemo(() => {
    if (!searchQuery)
      return contactPersons;

    return contactPersons.filter(
      contactPerson =>
        contactPerson.surname
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
          || contactPerson.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
            || contactPerson.otherNames
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
              || contactPerson.position.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [contactPersons, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createContactPersonColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: ContactPersonFormData) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingContactPerson) {
        // Update existing contact person
        setContactPersons(
          contactPersons.map(cp =>
            cp.id === editingContactPerson.id
              ? { ...data, id: editingContactPerson.id }
              : cp,
          ),
        );
      }
      else {
        // Create new contact person
        const newContactPerson: ContactPersonEntity = {
          ...data,
          id: Date.now().toString(),
        };
        setContactPersons([...contactPersons, newContactPerson]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingContactPerson(null);
    }, 500);
  }

  function handleEdit(contactPerson: ContactPersonEntity) {
    setEditingContactPerson(contactPerson);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setContactPersons(contactPersons.filter(cp => cp.id !== id));
  }

  function handleNewContactPerson() {
    setEditingContactPerson(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingContactPerson(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <ContactPersonToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewContactPerson={handleNewContactPerson}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <ContactPersonForm
          contactPerson={editingContactPerson || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredContactPersons} />
    </div>
  );
}
