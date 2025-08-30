import { useEffect } from "react";
import { createContext, ReactNode, useContext, useState } from "react";

export type SidebarContextType = {
  isSidebarOpen: boolean;
  isSidebarHidden: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;

    const stored = localStorage.getItem("sidebar-open");
    const isMdOrAbove = window.innerWidth >= 768;
    return stored !== null ? JSON.parse(stored) : isMdOrAbove;
  });

  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsSidebarHidden(true);
      } else {
        setIsSidebarOpen(true);
        setIsSidebarHidden(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // run once
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (isSidebarOpen && isSidebarHidden) {
        const sidebarElement = document.getElementById("sidebarNavigation");

        if (sidebarElement && !sidebarElement.contains(e.target as Node)) {
          setIsSidebarOpen(false);
          localStorage.setItem("sidebar-open", JSON.stringify(false));
        }
      }
    }

    if (isSidebarOpen && isSidebarHidden) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isSidebarHidden]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar-open", JSON.stringify(newValue));
      }
      return newValue;
    });
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, isSidebarHidden, toggleSidebar }}
    >
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
