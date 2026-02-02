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
  CorporateEntity,
  CorporateFormData,
} from "../schemas/corporate-form";

import {
  corporateFormSchema,
} from "../schemas/corporate-form";

type CorporateFormProps = {
  entity?: CorporateEntity;
  onSubmit: (data: CorporateFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function CorporateForm({
  entity,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CorporateFormProps) {
  const form = useForm<CorporateFormData>({
    resolver: zodResolver(corporateFormSchema),
    defaultValues: entity
      ? {
          policyNo: entity.policyNo,
          businessClass: entity.businessClass,
          abbrev: entity.abbrev,
          corporateName: entity.corporateName,
          corporateId: entity.corporateId,
          telephoneNo: entity.telephoneNo,
          postalAddress: entity.postalAddress,
          mobileNo: entity.mobileNo,
          email: entity.email,
          physicalLocation: entity.physicalLocation,
          intermediary: entity.intermediary,
          branch: entity.branch,
          currency: entity.currency,
          startDate: entity.startDate,
          endDate: entity.endDate,
          renewalDate: entity.renewalDate,
          intermediaryType: entity.intermediaryType,
          anniv: entity.anniv,
          normalize: entity.normalize,
          smartSync: entity.smartSync,
        }
      : {
          policyNo: "",
          businessClass: "",
          abbrev: "",
          corporateName: "",
          corporateId: "",
          telephoneNo: "",
          postalAddress: "",
          mobileNo: "",
          email: "",
          physicalLocation: "",
          intermediary: "",
          branch: "",
          currency: "",
          startDate: undefined,
          endDate: undefined,
          renewalDate: undefined,
          intermediaryType: "",
          anniv: undefined,
          normalize: "",
          smartSync: false,
        },
  });

  const handleSubmit = (data: CorporateFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={handleReset}
          className="space-y-6 @container"
        >
          <div className="grid grid-cols-12 gap-4">
            {/* Policy No */}
            <FormField
              control={form.control}
              name="policyNo"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>
                    Policy No.
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter policy number"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Class */}
            <FormField
              control={form.control}
              name="businessClass"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                  <FormLabel>
                    Business Class
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Abbreviation */}
            <FormField
              control={form.control}
              name="abbrev"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-4">
                  <FormLabel>Abbrev</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter abbreviation"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Corporate Name */}
            <FormField
              control={form.control}
              name="corporateName"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>
                    Corporate Name
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter corporate name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Corporate ID */}
            <FormField
              control={form.control}
              name="corporateId"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>
                    Corporate ID
                    {" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter corporate ID"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telephone No */}
            <FormField
              control={form.control}
              name="telephoneNo"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>Telephone No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter telephone number"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Postal Address */}
            <FormField
              control={form.control}
              name="postalAddress"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>Postal Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter postal address"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile No */}
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
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

            {/* Physical Location */}
            <FormField
              control={form.control}
              name="physicalLocation"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                  <FormLabel>Physical Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter physical location"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Intermediary */}
            <FormField
              control={form.control}
              name="intermediary"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>Intermediary</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select intermediary" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Direct Business">
                        Direct Business
                      </SelectItem>
                      <SelectItem value="Broker">Broker</SelectItem>
                      <SelectItem value="Agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Branch */}
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>Branch</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Currency */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
                  <FormLabel>Currency</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
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
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
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
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Renewal Date */}
            <FormField
              control={form.control}
              name="renewalDate"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4">
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
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Intermediary Type */}
            <FormField
              control={form.control}
              name="intermediaryType"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-3 @3xl:col-span-3">
                  <FormLabel>Intermediary Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="type1">Type 1</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Anniv */}
            <FormField
              control={form.control}
              name="anniv"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-3 @3xl:col-span-3">
                  <FormLabel>Anniv</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter anniversary"
                      type="number"
                      {...field}
                      value={field.value || ""}
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Normalize */}
            <FormField
              control={form.control}
              name="normalize"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-3 @3xl:col-span-3">
                  <FormLabel>Normalize</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Smart Sync */}
            <FormField
              control={form.control}
              name="smartSync"
              render={({ field }) => (
                <FormItem className="col-span-12 @5xl:col-span-3 @3xl:col-span-3 flex flex-row items-start space-x-3 space-y-0 pt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Smart Sync</FormLabel>
                    <FormDescription>What is this?</FormDescription>
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
                : entity
                  ? "Update Entity"
                  : "Create Entity"}
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
