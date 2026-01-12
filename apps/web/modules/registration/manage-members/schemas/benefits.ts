import { z } from "zod";

export const benefitsFormSchema = z.object({
  memberNo: z.string().min(1, "Member number is required"),
});

export type BioDataFormData = z.infer<typeof benefitsFormSchema>;

export type BioDataEntity = {
  id: string;
  photoUrl?: string;
} & Omit<BioDataFormData, "memberPhoto">;
