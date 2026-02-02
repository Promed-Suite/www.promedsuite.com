import { z } from "zod";

export const reInsurerConfigsFormSchema = z.object({
  reInsurer: z.string().min(1, "Name is required"),
  cede: z
    .number()
    .min(0, "Cede rate must be 0 or greater")
    .max(100, "Cede rate cannot exceed 100%"),
  commission: z
    .number()
    .min(0, "Commission rate must be 0 or greater")
    .max(100, "Commission rate cannot exceed 100%"),
  retention: z
    .number()
    .min(0, "Retention rate must be 0 or greater")
    .max(100, "Retention rate cannot exceed 100%"),
  tax: z
    .number()
    .min(0, "Tax rate must be 0 or greater")
    .max(100, "Tax rate cannot exceed 100%"),
  period: z.date().optional(),
  reBroker: z.boolean(),
});

export type ReInsurerConfigsFormData = z.infer<
  typeof reInsurerConfigsFormSchema
>;

export type ReInsurerConfigsEntity = {
  id: string;
} & ReInsurerConfigsFormData;

// Mock data for re-insurers
export const mockReInsurers = [
  "Kenya Re",
  "Maddison",
  "Hannover Re",
  "Scor",
  "Lloyd's of London",
  "Berkshire Hathaway",
];
