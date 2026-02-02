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
  BenefitsEntity,
  BenefitsFormData,
} from "../schemas/categories-form";

import {
  benefitsFormSchema,
  mockAllocationOptions,
  mockBenefits,
  mockSharingOptions,
  mockSubLimits,
} from "../schemas/categories-form";

type BenefitsFormProps = {
  benefit?: BenefitsEntity;
  onSubmit: (data: BenefitsFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function BenefitsForm({
  benefit,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: BenefitsFormProps) {
  const form = useForm<BenefitsFormData>({
    resolver: zodResolver(benefitsFormSchema),
    defaultValues: {
      anniv: benefit?.anniv ?? 1,
      category: benefit?.category ?? "CAT A",
      benefit: benefit?.benefit ?? "",
      subLimitOf: benefit?.subLimitOf ?? "",
      limit: benefit?.limit ?? 0,
      frequency: benefit?.frequency ?? 0,
      sharing: benefit?.sharing ?? "",
      allocateTo: benefit?.allocateTo ?? "",
    },
  });

  const handleSubmit = (data: BenefitsFormData) => {
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
                    Benefit category classification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Benefit */}
            <FormField
              control={form.control}
              name="benefit"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Benefit</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select benefit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockBenefits.map(benefitOption => (
                        <SelectItem key={benefitOption} value={benefitOption}>
                          {benefitOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Type of medical benefit</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sublimit Of */}
            <FormField
              control={form.control}
              name="subLimitOf"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Sublimit Of</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sublimit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockSubLimits.map(subLimit => (
                        <SelectItem key={subLimit} value={subLimit}>
                          {subLimit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Parent limit for this benefit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Limit */}
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Limit (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter limit percentage"
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
                    Maximum coverage percentage (0-100%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Frequency */}
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Frequency (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter frequency percentage"
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
                    Usage frequency percentage (0-100%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sharing */}
            <FormField
              control={form.control}
              name="sharing"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Cost Sharing</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sharing option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockSharingOptions.map(sharingOption => (
                        <SelectItem key={sharingOption} value={sharingOption}>
                          {sharingOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Cost sharing arrangement</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Allocate To */}
            <FormField
              control={form.control}
              name="allocateTo"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Allocate To</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select allocation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockAllocationOptions.map(allocationOption => (
                        <SelectItem
                          key={allocationOption}
                          value={allocationOption}
                        >
                          {allocationOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Provider allocation for this benefit
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
                : benefit
                  ? "Update Benefit"
                  : "Create Benefit"}
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
