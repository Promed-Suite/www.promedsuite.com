"use client";

import { Activity, Settings, UserPlus, Users } from "lucide-react";
import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

import { ActivityTab } from "./_components/activity-tab";
import { CreateUserTab } from "./_components/create-user-tab";
import { SettingsTab } from "./_components/settings-tab";
import { UsersTab } from "./_components/users-tab";

export type IUserManagementPageProps = object;

export default function UserManagementPage(_: IUserManagementPageProps) {
  const [activeTab, setActiveTab] = React.useState("users");

  return (
    <section className="w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Create User</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UsersTab />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <CreateUserTab />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ActivityTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
