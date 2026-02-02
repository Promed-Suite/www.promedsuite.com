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
  CoverDatesEntity,
  CoverDatesFormData,
} from "../schemas/cover-dates";

import {
  coverDatesFormSchema,
} from "../schemas/cover-dates";

type CoverDatesFormProps = {
  coverDate?: CoverDatesEntity;
  onSubmit: (data: CoverDatesFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function CoverDatesForm({
  coverDate,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CoverDatesFormProps) {
  const form = useForm<CoverDatesFormData>({
    resolver: zodResolver(coverDatesFormSchema),
    defaultValues: {
      startDate: coverDate?.startDate ?? new Date(),
      endDate:
        coverDate?.endDate
        ?? new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      renewalDate:
        coverDate?.renewalDate
        ?? new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      intermediary: coverDate?.intermediary ?? "DIRECT BUSINESS",
      anniv: coverDate?.anniv ?? 1,
      smartSync: coverDate?.smartSync ?? false,
    },
  });

  const handleSubmit = (data: CoverDatesFormData) => {
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
            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Start Date</FormLabel>
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
                                format(field.value, "PPP")
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
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Policy coverage start date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>End Date</FormLabel>
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
                                format(field.value, "PPP")
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
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Policy coverage end date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Renewal Date */}
            <FormField
              control={form.control}
              name="renewalDate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Renewal Date</FormLabel>
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
                                format(field.value, "PPP")
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
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Policy renewal date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Intermediary */}
            <FormField
              control={form.control}
              name="intermediary"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>Intermediary</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select intermediary" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DIRECT BUSINESS">
                        Direct Business
                      </SelectItem>
                      <SelectItem value="AGENT">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Business acquisition channel
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Smart Sync */}
            <FormField
              control={form.control}
              name="smartSync"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4 flex flex-row items-start space-x-3 space-y-0 pt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Smart Sync</FormLabel>
                    <FormDescription>
                      Enable intelligent date synchronization
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
                : coverDate
                  ? "Update Cover Date"
                  : "Create Cover Date"}
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
