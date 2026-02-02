import { z } from "zod";

export const corporateFormSchema = z.object({
  policyNo: z.string().min(1, "Policy number is required"),
  businessClass: z.string().min(1, "Business class is required"),
  abbrev: z.string().optional(),
  corporateName: z.string().min(1, "Corporate name is required"),
  corporateId: z.string().min(1, "Corporate ID is required"),
  telephoneNo: z.string().optional(),
  postalAddress: z.string().optional(),
  mobileNo: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  physicalLocation: z.string().optional(),
  intermediary: z.string().optional(),
  branch: z.string().optional(),
  currency: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  renewalDate: z.date().optional(),
  intermediaryType: z.string().optional(),
  anniv: z.coerce.number().optional(),
  normalize: z.string().optional(),
  smartSync: z.boolean().default(false).optional(),
});

export type CorporateFormData = z.infer<typeof corporateFormSchema>;

export type CorporateEntity = {
  id: string;
} & CorporateFormData;
