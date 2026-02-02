"use client";

import {
  Activity,
  Ban,
  LogIn,
  LogOut,
  Mail,
  Settings,
  Shield,
  UserPlus,
} from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

type ActivityLog = {
  id: string;
  user: string;
  action: string;
  type: "login" | "logout" | "create" | "ban" | "update" | "email";
  timestamp: string;
  details: string;
};

const mockActivities: ActivityLog[] = [
  {
    id: "1",
    user: "Admin",
    action: "User Login",
    type: "login",
    timestamp: "2 minutes ago",
    details: "alice@example.com logged in from 192.168.1.1",
  },
  {
    id: "2",
    user: "Admin",
    action: "User Created",
    type: "create",
    timestamp: "15 minutes ago",
    details: "Created new user: bob@example.com with role \"user\"",
  },
  {
    id: "3",
    user: "Moderator",
    action: "User Banned",
    type: "ban",
    timestamp: "1 hour ago",
    details: "Banned user carol@example.com for violating terms",
  },
  {
    id: "4",
    user: "Admin",
    action: "Settings Updated",
    type: "update",
    timestamp: "2 hours ago",
    details: "Changed system security settings",
  },
  {
    id: "5",
    user: "System",
    action: "Email Sent",
    type: "email",
    timestamp: "3 hours ago",
    details: "Welcome email sent to david@example.com",
  },
  {
    id: "6",
    user: "Admin",
    action: "User Logout",
    type: "logout",
    timestamp: "4 hours ago",
    details: "alice@example.com logged out",
  },
];

const activityIcons = {
  login: LogIn,
  logout: LogOut,
  create: UserPlus,
  ban: Ban,
  update: Settings,
  email: Mail,
};

const activityColors = {
  login: "bg-chart-2/10 text-chart-2",
  logout: "bg-muted text-muted-foreground",
  create: "bg-chart-1/10 text-chart-1",
  ban: "bg-destructive/10 text-destructive",
  update: "bg-chart-3/10 text-chart-3",
  email: "bg-chart-4/10 text-chart-4",
};

export function ActivityTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Log
              </CardTitle>
              <CardDescription>
                Real-time system activity and user actions
              </CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activity</SelectItem>
                <SelectItem value="login">Logins</SelectItem>
                <SelectItem value="create">Created</SelectItem>
                <SelectItem value="ban">Bans</SelectItem>
                <SelectItem value="update">Updates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {mockActivities.map((activity) => {
                const Icon = activityIcons[activity.type];
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${activityColors[activity.type]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">
                          {activity.action}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.details}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {activity.user}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-chart-2/10 text-chart-2">
                  <LogIn className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Logins</span>
              </div>
              <span className="text-2xl font-bold">247</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-chart-1/10 text-chart-1">
                  <UserPlus className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">New Users</span>
              </div>
              <span className="text-2xl font-bold">12</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10 text-destructive">
                  <Ban className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Bans</span>
              </div>
              <span className="text-2xl font-bold">3</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-chart-4/10 text-chart-4">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Emails Sent</span>
              </div>
              <span className="text-2xl font-bold">89</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Impersonations</CardTitle>
            <CardDescription>Admin session logs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Admin → Alice Johnson</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Admin → Bob Smith</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
