"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import type { BioDataEntity, BioDataFormData } from "../../schemas/bio-data";

import { createBioDataColumns } from "./bio-data-columns";
import { BioDataForm } from "./bio-data-form";
import { BioDataToolbar } from "./bio-data-toolbar";

export default function BioDataTab() {
  const [bioDataList, setBioDataList] = useState<BioDataEntity[]>([
    {
      id: "1",
      memberNo: "M-001",
      firstName: "John",
      lastName: "Smith",
      otherNames: "David",
      gender: "MALE",
      dateOfBirth: new Date("1985-05-15"),
      maritalStatus: "MARRIED",
      occupation: "Software Engineer",
      email: "john.smith@example.com",
      phoneNumber: "+1-555-0100",
      address: "123 Main St, New York, NY",
      emergencyContactName: "Sarah Smith",
      emergencyContactPhone: "+1-555-0101",
      isAllergicTo: "Penicillin, Pollen",
      bloodGroup: "A+",
      height: 180,
      weight: 75,
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "2",
      memberNo: "M-002",
      firstName: "Sarah",
      lastName: "Johnson",
      otherNames: "Marie",
      gender: "FEMALE",
      dateOfBirth: new Date("1990-08-22"),
      maritalStatus: "SINGLE",
      occupation: "Doctor",
      email: "sarah.johnson@example.com",
      phoneNumber: "+1-555-0200",
      address: "456 Oak Ave, Los Angeles, CA",
      emergencyContactName: "Robert Johnson",
      emergencyContactPhone: "+1-555-0201",
      isAllergicTo: "Shellfish",
      bloodGroup: "O+",
      height: 165,
      weight: 60,
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "3",
      memberNo: "M-003",
      firstName: "Michael",
      lastName: "Williams",
      otherNames: "James",
      gender: "MALE",
      dateOfBirth: new Date("1978-11-30"),
      maritalStatus: "DIVORCED",
      occupation: "Teacher",
      email: "michael.williams@example.com",
      phoneNumber: "+1-555-0300",
      address: "789 Pine St, Chicago, IL",
      emergencyContactName: "Lisa Williams",
      emergencyContactPhone: "+1-555-0301",
      isAllergicTo: "Dust, Mold",
      bloodGroup: "B-",
      height: 175,
      weight: 80,
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingBioData, setEditingBioData] = useState<BioDataEntity | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter bio data based on search query
  const filteredBioData = useMemo(() => {
    if (!searchQuery)
      return bioDataList;

    const query = searchQuery.toLowerCase();
    return bioDataList.filter(
      bioData =>
        bioData.memberNo.toLowerCase().includes(query)
        || bioData.firstName.toLowerCase().includes(query)
        || bioData.lastName.toLowerCase().includes(query)
        || bioData.email?.toLowerCase().includes(query)
        || bioData.phoneNumber?.toLowerCase().includes(query),
    );
  }, [bioDataList, searchQuery]);

  // Create columns with handlers
  const columns = useMemo(
    () =>
      createBioDataColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  function handleCreate(data: BioDataFormData) {
    setIsSubmitting(true);

    // Simulate API call with file upload
    setTimeout(() => {
      // In a real app, you would upload the file here and get a URL
      let photoUrl = editingBioData?.photoUrl;

      // If there's a new photo, simulate upload
      if (data.memberPhoto) {
        photoUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.firstName}`;
      }

      const bioDataToSave: BioDataEntity = {
        id: editingBioData?.id || Date.now().toString(),
        memberNo: data.memberNo,
        firstName: data.firstName,
        lastName: data.lastName,
        otherNames: data.otherNames,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        maritalStatus: data.maritalStatus,
        occupation: data.occupation,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        isAllergicTo: data.isAllergicTo,
        bloodGroup: data.bloodGroup,
        height: data.height,
        weight: data.weight,
        photoUrl,
      };

      if (editingBioData) {
        // Update existing bio data
        setBioDataList(
          bioDataList.map(bd =>
            bd.id === editingBioData.id ? bioDataToSave : bd,
          ),
        );
      }
      else {
        // Create new bio data
        setBioDataList([...bioDataList, bioDataToSave]);
      }

      setIsSubmitting(false);
      setIsCreating(false);
      setEditingBioData(null);
    }, 1000);
  }

  function handleEdit(bioData: BioDataEntity) {
    setEditingBioData(bioData);
    setIsCreating(true);
  }

  function handleDelete(id: string) {
    setBioDataList(bioDataList.filter(bd => bd.id !== id));
  }

  function handleNewBioData() {
    setEditingBioData(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingBioData(null);
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <BioDataToolbar
        table={{} as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewBioData={handleNewBioData}
      />

      {/* Create/Edit Form */}
      {isCreating && (
        <BioDataForm
          bioData={editingBioData || undefined}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Data Table */}
      <DataTable columns={columns} data={filteredBioData} />
    </div>
  );
}
