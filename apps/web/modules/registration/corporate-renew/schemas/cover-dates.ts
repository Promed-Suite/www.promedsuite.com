import { z } from "zod";

export const coverDatesFormSchema = z.object({
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  renewalDate: z.date({ required_error: "Renewal date is required" }),
  intermediary: z.enum(["DIRECT BUSINESS", "AGENT"]),
  anniv: z
    .number({ required_error: "Anniversary is required" })
    .min(1, "Anniversary must be at least 1"),
  smartSync: z.boolean().default(false).optional(),
});

export type CoverDatesFormData = z.infer<typeof coverDatesFormSchema>;

export type CoverDatesEntity = {
  id: string;
} & CoverDatesFormData;
