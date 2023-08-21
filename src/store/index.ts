"use client";

import { UserProfile, ArtisanProfile } from "@/lib/types";
import { create } from "zustand";

type Store = {
  authUser: UserProfile | null;
  requestLoading: boolean;
  setAuthUser: (user: any | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
}));

export default useStore;