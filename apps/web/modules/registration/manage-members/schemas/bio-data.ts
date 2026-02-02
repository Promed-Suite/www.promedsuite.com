import { z } from "zod";

export const bioDataFormSchema = z.object({
  memberNo: z.string().min(1, "Member number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherNames: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: z.date(),
  maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
  occupation: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  isAllergicTo: z.string().optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  height: z.number().min(0, "Height must be positive").optional(),
  weight: z.number().min(0, "Weight must be positive").optional(),
  memberPhoto: z.instanceof(File).optional(),
  photoUrl: z.string().optional(), // For storing uploaded photo URL
});

export type BioDataFormData = z.infer<typeof bioDataFormSchema>;

export type BioDataEntity = {
  id: string;
  photoUrl?: string;
} & Omit<BioDataFormData, "memberPhoto">;
