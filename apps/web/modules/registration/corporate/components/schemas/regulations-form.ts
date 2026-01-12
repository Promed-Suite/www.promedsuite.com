import { z } from "zod";

export const regulationsFormSchema = z.object({
  anniv: z.number().min(1, "Anniversary must be at least 1"),
  adminFeeType: z.enum([
    "Percentage of Bill",
    "A Flat Fee",
    "Per Person Per Month",
  ]),
  adminFeeRate: z.number().min(0, "Rate must be 0 or greater"),
  adminFeeAmount: z.number().min(0, "Amount must be 0 or greater"),
  agentCommissionRate: z
    .number()
    .min(0, "Commission rate must be 0 or greater")
    .max(100, "Commission rate cannot exceed 100%"),
  commissionWHTaxRate: z
    .number()
    .min(0, "Tax rate must be 0 or greater")
    .max(100, "Tax rate cannot exceed 100%"),
  // Optional fields last
  remRule: z.boolean().default(false).optional(),
});

export type RegulationsFormData = z.infer<typeof regulationsFormSchema>;

export type RegulationsEntity = {
  id: string;
} & RegulationsFormData;
