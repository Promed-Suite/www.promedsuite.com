import { create } from "zustand";

type ModalState = {
  id: string;
  isOpen: boolean;
};

type OpenRegistrationState = {
  modals: Record<string, ModalState>;
  onOpen: (id: string) => void;
  onClose: (id: string) => void;
  onCloseAll: () => void;
  isOpen: (id: string) => boolean;
};

export const useOpenRegistration = create<OpenRegistrationState>(
  (set, get) => ({
    modals: {},
    onOpen: (id: string) =>
      set(state => ({
        modals: {
          ...state.modals,
          [id]: { id, isOpen: true },
        },
      })),
    onClose: (id: string) =>
      set(state => ({
        modals: {
          ...state.modals,
          [id]: { id, isOpen: false },
        },
      })),
    onCloseAll: () => set({ modals: {} }),
    isOpen: (id: string) => {
      const state = get();
      return state.modals[id]?.isOpen || false;
    },
  }),
);
