import { create } from "zustand";

import type { Department } from "@/lib/auth/auth-client";

type OrganizationStore = {
  activeOrganization: Department | null;
  isSwitching: boolean;
  setActiveOrganization: (org: Department | null) => void;
  setIsSwitching: (isSwitching: boolean) => void;
};

export const useOrganizationStore = create<OrganizationStore>(set => ({
  activeOrganization: null,
  isSwitching: false,
  setActiveOrganization: org => set({ activeOrganization: org }),
  setIsSwitching: isSwitching => set({ isSwitching }),
}));
