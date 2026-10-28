import { create } from 'zustand';

interface UiState {
  menuOpen: boolean;
  setMenu: (open: boolean) => void;
  toggleMenu: () => void;
}

/** Global UI state (mobile menu). */
export const useUiStore = create<UiState>((set) => ({
  menuOpen: false,
  setMenu: (open) => set({ menuOpen: open }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
}));
