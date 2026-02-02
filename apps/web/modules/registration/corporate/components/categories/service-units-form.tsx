"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
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
  ServiceUnitsEntity,
  ServiceUnitsFormData,
} from "../schemas/categories-form";

import {
  mockServiceUnits,
  serviceUnitsFormSchema,
} from "../schemas/categories-form";

type ServiceUnitsFormProps = {
  serviceUnit?: ServiceUnitsEntity;
  onSubmit: (data: ServiceUnitsFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function ServiceUnitsForm({
  serviceUnit,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ServiceUnitsFormProps) {
  const form = useForm<ServiceUnitsFormData>({
    resolver: zodResolver(serviceUnitsFormSchema),
    defaultValues: {
      anniv: serviceUnit?.anniv ?? 1,
      service: serviceUnit?.service ?? "",
    },
  });

  const handleSubmit = (data: ServiceUnitsFormData) => {
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
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Anniversary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter anniversary"
                      type="number"
                      min="1"
                      value={field.value}
                      onChange={e =>
                        handleNumberChange(field, e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          field.onChange(1);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Policy anniversary period in years
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Unit */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Service Unit</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockServiceUnits.map(serviceUnitOption => (
                        <SelectItem
                          key={serviceUnitOption}
                          value={serviceUnitOption}
                        >
                          {serviceUnitOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Type of medical service unit
                  </FormDescription>
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
                : serviceUnit
                  ? "Update Service Unit"
                  : "Create Service Unit"}
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
