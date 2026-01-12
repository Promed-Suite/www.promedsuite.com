"use client";

import { Building2, Hospital } from "lucide-react";
import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

import { CreateDepartmentTab } from "./_components/create-department-tab";
import DepartmentsTab from "./_components/departments-tab";

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = React.useState("departments");

  return (
    <section className="w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="departments" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Departments</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-2">
            <Hospital className="h-4 w-4" />
            <span className="hidden sm:inline">Create Department</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          <DepartmentsTab />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <CreateDepartmentTab setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
