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
  RegulationsEntity,
  RegulationsFormData,
} from "../schemas/regulations-form";

import {
  regulationsFormSchema,
} from "../schemas/regulations-form";

type RegulationsFormProps = {
  regulation?: RegulationsEntity;
  onSubmit: (data: RegulationsFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function RegulationsForm({
  regulation,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: RegulationsFormProps) {
  const form = useForm<RegulationsFormData>({
    resolver: zodResolver(regulationsFormSchema),
    defaultValues: regulation
      ? {
          anniv: regulation.anniv,
          adminFeeType: regulation.adminFeeType,
          adminFeeRate: regulation.adminFeeRate,
          adminFeeAmount: regulation.adminFeeAmount,
          agentCommissionRate: regulation.agentCommissionRate,
          commissionWHTaxRate: regulation.commissionWHTaxRate,
          remRule: regulation.remRule,
        }
      : {
          anniv: 1,
          adminFeeType: "Percentage of Bill",
          adminFeeRate: 0,
          adminFeeAmount: 0,
          agentCommissionRate: 0,
          commissionWHTaxRate: 0,
          remRule: false,
        },
  });

  const handleSubmit = (data: RegulationsFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  // Watch admin fee type to conditionally show fields
  const adminFeeType = form.watch("adminFeeType");

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
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Policy anniversary period in years
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Admin Fee Type */}
            <FormField
              control={form.control}
              name="adminFeeType"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Administration Fee Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fee type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Percentage of Bill">
                        Percentage of Bill
                      </SelectItem>
                      <SelectItem value="A Flat Fee">A Flat Fee</SelectItem>
                      <SelectItem value="Per Person Per Month">
                        Per Person Per Month
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Admin Fee Rate - Conditionally shown */}
            {(adminFeeType === "Percentage of Bill"
              || adminFeeType === "Per Person Per Month") && (
              <FormField
                control={form.control}
                name="adminFeeRate"
                render={({ field }) => (
                  <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                    <FormLabel>
                      {adminFeeType === "Percentage of Bill"
                        ? "Admin Fee Rate (%)"
                        : "Admin Fee Rate (Per Person)"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          adminFeeType === "Percentage of Bill"
                            ? "Enter percentage"
                            : "Enter rate per person"
                        }
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      {adminFeeType === "Percentage of Bill"
                        ? "Percentage rate applied to the bill"
                        : "Monthly rate per person"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Admin Fee Amount - Conditionally shown for Flat Fee */}
            {adminFeeType === "A Flat Fee" && (
              <FormField
                control={form.control}
                name="adminFeeAmount"
                render={({ field }) => (
                  <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                    <FormLabel>Admin Fee Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter flat fee amount"
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Fixed administration fee amount
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Agent Commission Rate */}
            <FormField
              control={form.control}
              name="agentCommissionRate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Agent Commission Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter commission rate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Commission rate for agents (0-100%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Commission Withholding Tax Rate */}
            <FormField
              control={form.control}
              name="commissionWHTaxRate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Commission WH Tax Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tax rate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Withholding tax rate on commissions (0-100%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* REM Rule */}
            <FormField
              control={form.control}
              name="remRule"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4 flex flex-row items-start space-x-3 space-y-0 pt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>REM Rule</FormLabel>
                    <FormDescription>
                      Apply REM rule for commission calculation
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
                : regulation
                  ? "Update Regulation"
                  : "Create Regulation"}
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
