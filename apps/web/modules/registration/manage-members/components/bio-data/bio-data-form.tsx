"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, User } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
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
import { Textarea } from "@workspace/ui/components/textarea";

import type {
  BioDataEntity,
  BioDataFormData,
} from "../../schemas/bio-data";

import {
  bioDataFormSchema,
} from "../../schemas/bio-data";

type BioDataFormProps = {
  bioData?: BioDataEntity;
  onSubmit: (data: BioDataFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function BioDataForm({
  bioData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: BioDataFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    bioData?.photoUrl || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BioDataFormData>({
    resolver: zodResolver(bioDataFormSchema),
    defaultValues: {
      memberNo: bioData?.memberNo ?? "",
      firstName: bioData?.firstName ?? "",
      lastName: bioData?.lastName ?? "",
      otherNames: bioData?.otherNames ?? "",
      gender: bioData?.gender ?? "MALE",
      dateOfBirth: bioData?.dateOfBirth ?? new Date("1990-01-01"),
      maritalStatus: bioData?.maritalStatus ?? "SINGLE",
      occupation: bioData?.occupation ?? "",
      email: bioData?.email ?? "",
      phoneNumber: bioData?.phoneNumber ?? "",
      address: bioData?.address ?? "",
      emergencyContactName: bioData?.emergencyContactName ?? "",
      emergencyContactPhone: bioData?.emergencyContactPhone ?? "",
      isAllergicTo: bioData?.isAllergicTo ?? "",
      bloodGroup: bioData?.bloodGroup ?? "A+",
      height: bioData?.height ?? undefined,
      weight: bioData?.weight ?? undefined,
      memberPhoto: undefined,
    },
  });

  const handleSubmit = (data: BioDataFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    setPreviewUrl(null);
    onCancel();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        form.setError("memberPhoto", {
          type: "manual",
          message: "Please upload an image file",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        form.setError("memberPhoto", {
          type: "manual",
          message: "File size should be less than 5MB",
        });
        return;
      }

      form.setValue("memberPhoto", file);
      form.clearErrors("memberPhoto");

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemovePhoto = () => {
    form.setValue("memberPhoto", undefined);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNumberChange = (field: any, value: string) => {
    const numValue = value === "" ? undefined : Number(value);
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
            {/* Member Photo */}
            <div className="col-span-12 @5xl:col-span-3 @3xl:col-span-4 flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                {previewUrl
                  ? (
                      <img
                        src={previewUrl}
                        alt="Member photo"
                        className="w-full h-full object-cover"
                      />
                    )
                  : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
              </div>

              <div className="space-y-2 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="memberPhoto"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>

                {previewUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePhoto}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove Photo
                  </Button>
                )}

                <FormDescription className="text-xs">
                  Max 5MB, JPG/PNG
                </FormDescription>
                {form.formState.errors.memberPhoto && (
                  <FormMessage className="text-xs">
                    {form.formState.errors.memberPhoto.message}
                  </FormMessage>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="col-span-12 @5xl:col-span-9 @3xl:col-span-8">
              <div className="grid grid-cols-12 gap-4">
                {/* Member Number */}
                <FormField
                  control={form.control}
                  name="memberNo"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Member Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter member number" {...field} />
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
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
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
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Other Names</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter other names" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Gender</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Date of Birth</FormLabel>
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
                            disabled={date => date > new Date()}
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marital Status */}
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Marital Status</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SINGLE">Single</SelectItem>
                          <SelectItem value="MARRIED">Married</SelectItem>
                          <SelectItem value="DIVORCED">Divorced</SelectItem>
                          <SelectItem value="WIDOWED">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Occupation */}
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter occupation" {...field} />
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
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
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

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-4">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-12 @3xl:col-span-8">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter full address"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Emergency Contact Name */}
                <FormField
                  control={form.control}
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                      <FormLabel>Emergency Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Emergency Contact Phone */}
                <FormField
                  control={form.control}
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                      <FormLabel>Emergency Contact Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter contact phone"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Allergies */}
                <FormField
                  control={form.control}
                  name="isAllergicTo"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6">
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any allergies (separate with commas)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        e.g., Penicillin, Peanuts, Dust
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Blood Group */}
                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-3 @3xl:col-span-3">
                      <FormLabel>Blood Group</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Height */}
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-3 @3xl:col-span-3">
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Height in cm"
                          type="number"
                          step="0.1"
                          min="0"
                          value={field.value || ""}
                          onChange={e =>
                            handleNumberChange(field, e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Weight */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="col-span-12 @5xl:col-span-3 @3xl:col-span-3">
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Weight in kg"
                          type="number"
                          step="0.1"
                          min="0"
                          value={field.value || ""}
                          onChange={e =>
                            handleNumberChange(field, e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
                : bioData
                  ? "Update Bio Data"
                  : "Create Bio Data"}
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
