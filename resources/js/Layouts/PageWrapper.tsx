import { ReactNode } from "react";

import { twMerge } from "tailwind-merge";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Breadcrumbs from "./components/Breadcrumbs";
import { HeaderNavbar } from "./components/HeaderNavbar";
import { SidebarProvider, useSidebar } from "./contexts/SidebarContext";

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="page-wrapper tw-min-h-screen">
        {children}
      </div>
    </SidebarProvider>
  );
}

function PageMain({ children }: { children: ReactNode }) {
  return <div className="tw-flex tw-flex-col">{children}</div>;
}

function PageHeader() {
  return (
    <div className="tw-sticky tw-top-0 tw-z-20">
      <HeaderNavbar />
      <Breadcrumbs />
    </div>
  );
}

function PageContent({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useSidebar();
  return (
    <main
      className={twMerge(
        "tw-px-8 tw-pt-8 tw-ms-0 md:tw-ms-[65px] tw-z-10 tw-transition-all tw-duration-300",
        isSidebarOpen ? "lg:tw-ms-[250px]" : "lg:tw-ms-[65px]"
      )}
    >
      <div className="tw-w-full tw-min-h-[calc(100vh-18rem)] tw-max-w-[100rem] tw-mx-auto">
        {children}
      </div>
      <Footer />
    </main>
  );
}

PageWrapper.Sidebar = Sidebar;
PageWrapper.Main = PageMain;
PageWrapper.Header = PageHeader;
PageWrapper.Content = PageContent;

export { PageWrapper };
