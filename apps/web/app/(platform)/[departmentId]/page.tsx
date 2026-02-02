import {
  BarChart3,
  DollarSign,
  FileCheck,
  FileText,
  Heart,
  Percent,
  Settings,
  Shield,
} from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";

const quickLinks = [
  {
    title: "Registration",
    description: "Manage policy registrations and new customer onboarding",
    icon: FileText,
    href: "/registration",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Premiums",
    description: "Track and process premium payments and billing",
    icon: DollarSign,
    href: "/premiums",
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Claims",
    description: "Process and review insurance claims and settlements",
    icon: FileCheck,
    href: "/claims",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Care",
    description: "Customer support and policyholder services",
    icon: Heart,
    href: "/care",
    color: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Commissions",
    description: "Manage agent commissions and incentive programs",
    icon: Percent,
    href: "/commissions",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Reinsurance",
    description: "Oversee reinsurance contracts and risk transfer",
    icon: Shield,
    href: "/reinsurance",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Management",
    description: "Executive reporting and strategic planning",
    icon: BarChart3,
    href: "/management",
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "Administration",
    description: "System settings and administrative controls",
    icon: Settings,
    href: "/administration",
    color: "text-slate-600 dark:text-slate-400",
  },
];

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Welcome back, Bretmda
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View Reports
            </Button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        {/* <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Policies
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    12,453
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Claims
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">237</p>
                </div>
                <div className="rounded-lg bg-orange-100 dark:bg-orange-900/20 p-3">
                  <FileCheck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-orange-600">-8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Monthly Premium
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    $2.4M
                  </p>
                </div>
                <div className="rounded-lg bg-green-100 dark:bg-green-900/20 p-3">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+18%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Customer Satisfaction
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">94%</p>
                </div>
                <div className="rounded-lg bg-rose-100 dark:bg-rose-900/20 p-3">
                  <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+2%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div> */}

        {/* Quick Links Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            Quick Access
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.title}
                  className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className={`rounded-lg bg-muted p-3 transition-colors group-hover:bg-primary/10 ${link.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          Open
                        </Button>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {link.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: "New policy registration",
                    time: "2 minutes ago",
                    type: "registration",
                  },
                  {
                    action: "Claim #2847 approved",
                    time: "15 minutes ago",
                    type: "claim",
                  },
                  {
                    action: "Premium payment received",
                    time: "1 hour ago",
                    type: "payment",
                  },
                  {
                    action: "Support ticket resolved",
                    time: "2 hours ago",
                    type: "support",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
