import { z } from "zod";

export const contactPersonFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  surname: z.string().min(1, "Surname is required"),
  firstName: z.string().min(1, "First name is required"),
  otherNames: z.string().min(1, "Other names required"),
  position: z.string().min(1, "Position is required"),
  mobileNo: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

export type ContactPersonFormData = z.infer<typeof contactPersonFormSchema>;

export type ContactPersonEntity = {
  id: string;
} & ContactPersonFormData;
