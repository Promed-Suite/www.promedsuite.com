/* eslint-disable no-console */

"use client";

import { useForm } from "@tanstack/react-form";
import { Building2, Check } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import * as z from "zod";

import type { User } from "@/lib/auth/auth-client";

import { authClient } from "@/lib/auth/auth-client";
import { createSlug } from "@/utils/create-slug";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Spinner } from "@workspace/ui/components/spinner";
import { Textarea } from "@workspace/ui/components/textarea";

const createDepartmentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().optional(),
  organizationHead: z.string().optional(),
});

type ICreateDepartmentTab = {
  setActiveTab: (tab: string) => void;
};

export function CreateDepartmentTab({ setActiveTab }: ICreateDepartmentTab) {
  const [availableUsers, setAvailableUsers] = React.useState<
    User[] | undefined
  >(undefined);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      organizationHead: "",
    } as z.input<typeof createDepartmentFormSchema>,
    validators: {
      onChange: createDepartmentFormSchema,
    },
    onSubmit: async ({ value }) => {
      const slug = createSlug(value.name);

      try {
        // ! TODO: Check if organization slug is taken or not
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { data: verifiedSlug } = await authClient.organization.checkSlug({
          slug,
        });

        await authClient.organization.create(
          {
            name: value.name,
            description: value.description,
            organizationHead: value.organizationHead,
            slug,
            metadata: {
              timezone: "Africa/Nairobi",
              locale: "en-UK",
              notifications: {
                email: true,
                slack: false,
              },
            },
          },
          {
            onError: (error) => {
              console.log(error.error.message);
              toast.error(
                error.error.message || "Failed to create organization.",
              );
            },
            onSuccess: async () => {
              toast.success("Department Created", {
                description: `${value.name} department has been created.`,
              });
              await setTimeout(() => {
                setActiveTab("departments");
              }, 1000);
            },
          },
        );

        // Reset form
        form.reset();
      }
      catch (error) {
        console.error(error);
        toast.error("Failed to create department", {
          description: "Please try again later.",
        });
      }
    },
  });

  React.useEffect(() => {
    const listUsers = async () => {
      try {
        const { data, error } = await authClient.admin.listUsers({
          query: {
            limit: 100,
            sortBy: "name",
            sortDirection: "desc",
          },
        });

        setAvailableUsers(data?.users);

        if (error) {
          throw new Error(error.message);
        }
      }
      catch (error) {
        console.error("Fetching users failed:", error);
        redirect("/");
      }
    };

    listUsers();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Create New Department</CardTitle>
              <CardDescription>
                Add a new department or team to your organization
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <FieldGroup>
              {/* Department Name Field */}
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid
                    = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel htmlFor={field.name}>
                        Department Name
                        {" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        placeholder="e.g., Customer Service, Marketing, Sales"
                        required
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                      <p className="text-xs text-muted-foreground">
                        Choose a clear, descriptive name for the department
                      </p>
                    </Field>
                  );
                }}
              />
              {/* Description Field */}
              <form.Field
                name="description"
                children={field => (
                  <Field className="space-y-2">
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Brief description of the department's purpose and responsibilities"
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Explain what this department does and its primary
                      responsibilities
                    </p>
                  </Field>
                )}
              />
              {/* Department Lead Field */}
              <form.Field
                name="organizationHead"
                children={(field) => {
                  const isInvalid
                    = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel htmlFor={field.name}>
                        Department Head
                        {" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>

                      {/* Debug: Log current value */}
                      {/* {console.log("organizationHead field value:", field.state.value)} */}

                      <Select
                        name={field.name} // Add this for form submission
                        value={field.state.value ?? ""}
                        onValueChange={(value) => {
                          console.log("Select value changed to:", value); // Debug
                          field.handleChange(value);
                        }}
                      >
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select from users..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Users</SelectLabel>
                            {availableUsers?.map(({ id, name }) => (
                              <SelectItem key={id} value={id}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}

                      <p className="text-xs text-muted-foreground">
                        Who will be responsible for managing this department?
                        (defaults to department owner if blank)
                      </p>
                    </Field>
                  );
                }}
              />
              {/* Static Content - Department Settings */}
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  Department Settings
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Status will be set to Active by default</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Members can be added after department creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Department head will receive notification email</span>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Field className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting
                        ? (
                            <>
                              <Spinner />
                              Creating...
                            </>
                          )
                        : (
                            <>
                              <Building2 className="mr-2 h-4 w-4" />
                              Create Department
                            </>
                          )}
                    </Button>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
