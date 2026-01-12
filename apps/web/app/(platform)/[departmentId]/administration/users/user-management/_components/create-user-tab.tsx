"use client";

import type React from "react";

import { Lock, Mail, Shield, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export function CreateUserTab() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    sendWelcomeEmail: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("User Created", {
      description: `${formData.name} has been successfully added to the system.`,
    });
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      sendWelcomeEmail: true,
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create New User
          </CardTitle>
          <CardDescription>
            Add a new user account with custom permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters with at least one uppercase letter and
                number
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                User Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={value =>
                  setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="welcome"
                checked={formData.sendWelcomeEmail}
                onCheckedChange={checked =>
                  setFormData({
                    ...formData,
                    sendWelcomeEmail: checked as boolean,
                  })}
              />
              <Label htmlFor="welcome" className="text-sm font-normal">
                Send welcome email to user
              </Label>
            </div>

            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Understanding different user roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Admin</p>
                  <p className="text-sm text-muted-foreground">
                    Full system access and control
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Moderator</p>
                  <p className="text-sm text-muted-foreground">
                    Can manage content and users
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">User</p>
                  <p className="text-sm text-muted-foreground">
                    Standard platform access
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bulk Import</CardTitle>
            <CardDescription>Create multiple users at once</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload a CSV file with user data to create multiple accounts
              simultaneously. The file should include columns for name, email,
              and role.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              Upload CSV File
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
