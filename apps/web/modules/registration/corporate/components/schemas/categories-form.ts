import { z } from "zod";

export const benefitsFormSchema = z.object({
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
  benefit: z.string().min(1, "Benefit is required"),
  subLimitOf: z.string().min(1, "Sublimit is required"),
  limit: z
    .number()
    .min(0, "Limit must be 0 or greater")
    .max(100, "Limit cannot exceed 100%"),
  frequency: z
    .number()
    .min(0, "Frequency must be 0 or greater")
    .max(100, "Frequency cannot exceed 100%"),
  sharing: z.string().min(1, "Sharing is required"),
  allocateTo: z.string().min(1, "Allocate to is required"),
});

export type BenefitsFormData = z.infer<typeof benefitsFormSchema>;

export type BenefitsEntity = {
  id: string;
} & BenefitsFormData;

// Mock data for benefits
export const mockBenefits = [
  "Hospitalization",
  "Outpatient Treatment",
  "Dental Care",
  "Optical Care",
  "Maternity Care",
  "Emergency Services",
  "Chronic Disease Management",
  "Preventive Care",
  "Mental Health Services",
  "Rehabilitation Services",
];

// Mock data for sublimits
export const mockSubLimits = [
  "Overall Limit",
  "Inpatient Limit",
  "Outpatient Limit",
  "Dental Limit",
  "Maternity Limit",
  "Emergency Limit",
];

// Mock data for sharing options
export const mockSharingOptions = [
  "100% Insurer",
  "80% / 20%",
  "70% / 30%",
  "50% / 50%",
  "Co-payment",
  "Deductible",
];

// Mock data for allocation options
export const mockAllocationOptions = [
  "Primary Provider",
  "Secondary Provider",
  "Tertiary Provider",
  "Specialist Provider",
  "Network Hospital",
  "Non-Network Hospital",
];

// Benefits Form Schema
export const serviceUnitsFormSchema = z.object({
  anniv: z
    .number({ required_error: "Anniversary is required" })
    .min(1, "Anniversary must be at least 1"),
  service: z.string().min(1, "Benefit is required"),
});

export type ServiceUnitsFormData = z.infer<typeof serviceUnitsFormSchema>;

export type ServiceUnitsEntity = {
  id: string;
} & ServiceUnitsFormData;

// Mock data for service units
export const mockServiceUnits = [
  "Consultation Unit",
  "Hospital Day Unit",
  "ICU Day Unit",
  "Surgery Unit",
  "Lab Test Unit",
  "X-Ray Unit",
  "MRI Unit",
  "CT Scan Unit",
  "Pharmacy Unit",
  "Physiotherapy Session",
  "Dental Unit",
  "Optical Unit",
  "Maternity Unit",
  "Emergency Unit",
  "Ambulance Service Unit",
  "Rehabilitation Unit",
  "Mental Health Session",
  "Preventive Care Unit",
  "Vaccination Unit",
  "Chronic Disease Management Unit",
];
