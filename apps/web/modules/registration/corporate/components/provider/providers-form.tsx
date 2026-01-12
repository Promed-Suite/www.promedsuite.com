"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
  ProvidersEntity,
  ProvidersFormData,
} from "../schemas/providers-form";

import {
  mockHospitals,
  providersFormSchema,
} from "../schemas/providers-form";

type ProvidersFormProps = {
  provider?: ProvidersEntity;
  onSubmit: (data: ProvidersFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function ProvidersForm({
  provider,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProvidersFormProps) {
  const form = useForm<ProvidersFormData>({
    resolver: zodResolver(providersFormSchema),
    defaultValues: {
      anniv: provider?.anniv ?? 1,
      category: provider?.category ?? "CAT A",
      provider: provider?.provider ?? "",
      sync: provider?.sync ?? false,
      smartSync: provider?.smartSync ?? false,
    },
  });

  const handleSubmit = (data: ProvidersFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  // Handle number input changes
  const handleNumberChange = (field: any, value: string) => {
    const numValue = value === "" ? 1 : Number(value);
    field.onChange(numValue);
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
            {/* Anniversary */}
            <FormField
              control={form.control}
              name="anniv"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Anniv</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1"
                      type="number"
                      min="1"
                      value={field.value}
                      onChange={e =>
                        handleNumberChange(field, e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    Policy anniversary period in years
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 26 }, (_, i) => {
                        const category = `CAT ${String.fromCharCode(65 + i)}`;
                        return (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Provider category classification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Provider */}
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Provider</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockHospitals.map(hospital => (
                        <SelectItem key={hospital.id} value={hospital.name}>
                          {hospital.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select hospital or medical provider
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sync */}
            <FormField
              control={form.control}
              name="sync"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 flex flex-row items-start space-x-3 space-y-0 pt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sync</FormLabel>
                    <FormDescription>
                      Enable synchronization with provider systems
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Smart Sync */}
            <FormField
              control={form.control}
              name="smartSync"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 flex flex-row items-start space-x-3 space-y-0 pt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Smart Sync</FormLabel>
                    <FormDescription>
                      Enable intelligent synchronization features
                    </FormDescription>
                  </div>
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
                : provider
                  ? "Update Provider"
                  : "Create Provider"}
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
