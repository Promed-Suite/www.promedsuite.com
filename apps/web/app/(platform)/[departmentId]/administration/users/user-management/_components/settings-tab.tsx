"use client";

import { Bell, Database, Key, Settings, Shield } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";

export function SettingsTab() {
  const handleSave = () => {
    toast("Settings Saved", {
      description: "Your configuration has been updated successfully.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security and authentication options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all admin accounts
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password Requirements</Label>
              <p className="text-sm text-muted-foreground">
                Enforce strong password policy
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">
                Auto-logout after inactivity
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Session Duration (minutes)</Label>
            <Input type="number" defaultValue="30" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Manage system notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New User Registration</Label>
              <p className="text-sm text-muted-foreground">
                Notify when users sign up
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Notify about security events
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Failed Login Attempts</Label>
              <p className="text-sm text-muted-foreground">
                Alert on suspicious activity
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Admin Email</Label>
            <Input
              type="email"
              placeholder="admin@example.com"
              defaultValue="admin@example.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Backup and data retention settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">
                Daily database backups
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Data Retention (days)</Label>
            <Input type="number" defaultValue="90" />
            <p className="text-xs text-muted-foreground">
              How long to keep deleted user data
            </p>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            Export All Data
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>Manage API keys and integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>API Key</Label>
            <div className="flex gap-2">
              <Input
                type="password"
                value="sk_live_••••••••••••••••"
                readOnly
                className="font-mono"
              />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>API Access</Label>
              <p className="text-sm text-muted-foreground">
                Enable external API access
              </p>
            </div>
            <Switch />
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            View API Documentation
          </Button>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium text-foreground">Save Configuration</p>
              <p className="text-sm text-muted-foreground">
                Apply all changes to the system
              </p>
            </div>
            <Button onClick={handleSave} size="lg">
              <Settings className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
