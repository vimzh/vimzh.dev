import { create } from "zustand";

interface ContactDialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useContactDialog = create<ContactDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
