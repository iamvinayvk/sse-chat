import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useClientStore = create(
  persist(
    (set, get) => ({
      clientId: null,
      setClientId: (id) => {
        set({ clientId: id });
      },
      clearClientId: () => set({ clientId: null }),
    }),
    {
      name: "client-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        clientId: state.clientId,
      }),
    }
  )
);
