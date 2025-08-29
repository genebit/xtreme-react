import { createContext, useContext, useState, ReactNode } from "react";

export type SidebarContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setisSidebarOpen] = useState<boolean>(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("sidebar-open")
        : null;
    return stored !== null ? JSON.parse(stored) : true;
  });

  const toggleSidebar = () => {
    setisSidebarOpen((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar-open", JSON.stringify(newValue));
      }
      return newValue;
    });
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export { SidebarProvider, useSidebar };
