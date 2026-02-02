"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

import type {
  ReInsurerConfigsEntity,
  ReInsurerConfigsFormData,
} from "../schemas/re-insurer-configs-form";

import {
  mockReInsurers,
  reInsurerConfigsFormSchema,
} from "../schemas/re-insurer-configs-form";

type ReInsurerConfigsFormProps = {
  config?: ReInsurerConfigsEntity;
  onSubmit: (data: ReInsurerConfigsFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function ReInsurerConfigsForm({
  config,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ReInsurerConfigsFormProps) {
  const form = useForm<ReInsurerConfigsFormData>({
    resolver: zodResolver(reInsurerConfigsFormSchema),
    defaultValues: {
      reInsurer: config?.reInsurer ?? "",
      cede: config?.cede ?? 0,
      commission: config?.commission ?? 0,
      retention: config?.retention ?? 0,
      tax: config?.tax ?? 0,
      period: config?.period ?? new Date(),
      reBroker: config?.reBroker ?? false,
    },
  });

  const handleSubmit = (data: ReInsurerConfigsFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  // Handle number input changes
  const handleNumberChange = (field: any, value: string) => {
    const numValue = value === "" ? 0 : Number(value);
    field.onChange(numValue);
  };

  // Calculate total to ensure it doesn't exceed 100%
  const cede = form.watch("cede") || 0;
  const retention = form.watch("retention") || 0;
  const totalAllocation = cede + retention;
  const isValidAllocation = totalAllocation <= 100;

  return (
    <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={handleReset}
          className="space-y-6 @container"
        >
          <div className="grid grid-cols-12 gap-4">
            {/* Re-insurer */}
            <FormField
              control={form.control}
              name="reInsurer"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Re-insurer *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select re-insurer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockReInsurers.map(reInsurer => (
                        <SelectItem key={reInsurer} value={reInsurer}>
                          {reInsurer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Re-insurance company</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Period */}
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Effective Period</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? (
                                format(field.value, "MMM yyyy")
                              )
                            : (
                                <span className="text-muted-foreground">
                                  Pick a date
                                </span>
                              )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={date => date < new Date("1900-01-01")}
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Configuration effective date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Allocation Summary */}
            <div className="col-span-12 @5xl:col-span-12 @3xl:col-span-4">
              <div className="p-4 bg-white dark:bg-gray-800 border rounded-lg">
                <h4 className="font-medium mb-2">Allocation Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Cede:</span>
                    <span className="font-medium">
                      {cede.toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Retention:</span>
                    <span className="font-medium">
                      {retention.toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Total:</span>
                    <span
                      className={`font-bold ${isValidAllocation ? "text-green-600" : "text-red-600"}`}
                    >
                      {totalAllocation.toFixed(2)}
                      %
                    </span>
                  </div>
                  {!isValidAllocation && (
                    <div className="text-xs text-red-600 mt-1">
                      Total allocation cannot exceed 100%
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cede Rate */}
            <FormField
              control={form.control}
              name="cede"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Cede Rate (%) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter cede rate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={field.value}
                      onChange={e =>
                        handleNumberChange(field, e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          field.onChange(0);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Percentage ceded to re-insurer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Commission Rate */}
            <FormField
              control={form.control}
              name="commission"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Commission Rate (%) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter commission rate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={field.value}
                      onChange={e =>
                        handleNumberChange(field, e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          field.onChange(0);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Commission paid to re-insurer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Retention Rate */}
            <FormField
              control={form.control}
              name="retention"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Retention Rate (%) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter retention rate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={field.value}
                      onChange={e =>
                        handleNumberChange(field, e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          field.onChange(0);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Percentage retained by insurer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tax Rate */}
            <FormField
              control={form.control}
              name="tax"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Tax Rate (%) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tax rate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={field.value}
                      onChange={e =>
                        handleNumberChange(field, e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          field.onChange(0);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>Tax applied to commission</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Re-broker */}
            <FormField
              control={form.control}
              name="reBroker"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4 flex flex-row items-start space-x-3 space-y-0 pt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Re-broker</FormLabel>
                    <FormDescription>
                      Apply re-broker commission rules
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
              disabled={isSubmitting || !isValidAllocation}
            >
              {isSubmitting
                ? "Saving..."
                : config
                  ? "Update Config"
                  : "Create Config"}
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
