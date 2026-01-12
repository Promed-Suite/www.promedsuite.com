import { z } from "zod";

export const providersFormSchema = z.object({
  anniv: z
    .number({ required_error: "Anniversary is required" })
    .min(1, "Anniversary must be at least 1"),
  category: z.enum([
    "CAT A",
    "CAT B",
    "CAT C",
    "CAT D",
    "CAT E",
    "CAT F",
    "CAT G",
    "CAT H",
    "CAT I",
    "CAT J",
    "CAT K",
    "CAT L",
    "CAT M",
    "CAT N",
    "CAT O",
    "CAT P",
    "CAT Q",
    "CAT R",
    "CAT S",
    "CAT T",
    "CAT U",
    "CAT V",
    "CAT W",
    "CAT X",
    "CAT Y",
    "CAT Z",
  ]),
  provider: z.string().min(1, "Provider is required"),
  sync: z.boolean().default(false).optional(),
  smartSync: z.boolean().default(false).optional(),
});

export type ProvidersFormData = z.infer<typeof providersFormSchema>;

export type ProvidersEntity = {
  id: string;
} & ProvidersFormData;

// Mock data for hospitals - in a real app, this would come from your database
export const mockHospitals = [
  { id: "1", name: "General Hospital Central" },
  { id: "2", name: "City Medical Center" },
  { id: "3", name: "University Teaching Hospital" },
  { id: "4", name: "Community Health Hospital" },
  { id: "5", name: "Metropolitan General Hospital" },
  { id: "6", name: "Regional Medical Center" },
  { id: "7", name: "Children's Hospital" },
  { id: "8", name: "Women's Health Center" },
  { id: "9", name: "Cardiac Care Institute" },
  { id: "10", name: "Orthopedic Specialty Hospital" },
  { id: "11", name: "Neurology Center" },
  { id: "12", name: "Oncology Treatment Facility" },
  { id: "13", name: "Emergency Trauma Center" },
  { id: "14", name: "Rehabilitation Hospital" },
  { id: "15", name: "Mental Health Institute" },
];
