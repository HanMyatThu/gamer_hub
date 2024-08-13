import { create } from "zustand"

interface DashboardSideBarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useDashboardSidebar = create<DashboardSideBarStore>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}))