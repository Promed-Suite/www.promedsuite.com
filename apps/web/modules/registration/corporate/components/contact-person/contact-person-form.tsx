"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

import type {
  ContactPersonEntity,
  ContactPersonFormData,
} from "../schemas/contact-person-form";

import {
  contactPersonFormSchema,
} from "../schemas/contact-person-form";

type ContactPersonFormProps = {
  contactPerson?: ContactPersonEntity;
  onSubmit: (data: ContactPersonFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function ContactPersonForm({
  contactPerson,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ContactPersonFormProps) {
  const form = useForm<ContactPersonFormData>({
    resolver: zodResolver(contactPersonFormSchema),
    defaultValues: contactPerson
      ? {
          title: contactPerson.title,
          surname: contactPerson.surname,
          firstName: contactPerson.firstName,
          otherNames: contactPerson.otherNames,
          position: contactPerson.position,
          mobileNo: contactPerson.mobileNo,
          email: contactPerson.email,
        }
      : {
          title: "",
          surname: "",
          firstName: "",
          otherNames: "",
          position: "",
          mobileNo: "",
          email: "",
        },
  });

  const handleSubmit = (data: ContactPersonFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  return (
    <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={handleReset}
          className="space-y-6 @container"
        >
          <div className="grid grid-cols-12 gap-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>
                    Title
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mr.">Mr.</SelectItem>
                      <SelectItem value="Ms.">Ms.</SelectItem>
                      <SelectItem value="Mrs.">Mrs.</SelectItem>
                      <SelectItem value="Dr.">Dr.</SelectItem>
                      <SelectItem value="Prof.">Prof.</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surname */}
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>
                    Surname
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter surname" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>
                    First Name
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Names */}
            <FormField
              control={form.control}
              name="otherNames"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>
                    Other Names
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter other names"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>
                    Position
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CEO">
                        Chief Executive Officer
                      </SelectItem>
                      <SelectItem value="CFO">
                        Chief Financial Officer
                      </SelectItem>
                      <SelectItem value="COO">
                        Chief Operating Officer
                      </SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Accountant">Accountant</SelectItem>
                      <SelectItem value="HR Manager">HR Manager</SelectItem>
                      <SelectItem value="IT Manager">IT Manager</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile No */}
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Mobile No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter mobile number"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : contactPerson
                  ? "Update Contact Person"
                  : "Create Contact Person"}
            </Button>
            <Button type="reset" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
