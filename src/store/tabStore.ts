import { create } from "zustand";

interface TabStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const useTabStore = create<TabStore>((set) => ({
  activeTab: localStorage.getItem("activeTab") || "all",
  setActiveTab: (tab: string) => {
    localStorage.setItem("activeTab", tab);
    set({ activeTab: tab });
  },
}));

export default useTabStore;