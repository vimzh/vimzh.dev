import { create } from "zustand";

interface ResumeDialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useResumeDialog = create<ResumeDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
