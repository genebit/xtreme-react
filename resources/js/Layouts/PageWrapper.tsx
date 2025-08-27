import { ReactNode } from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { HeaderNavbar } from "./components/HeaderNavbar";

function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="page-wrapper tw-flex">{children}</div>;
}

function PageMain({ children }: { children: ReactNode }) {
  return <div className="tw-flex tw-flex-col tw-basis-full">{children}</div>;
}

function PageHeader() {
  return (
    <>
      <div className="tw-sticky tw-top-0 tw-z-20">
        <HeaderNavbar />
        <Breadcrumbs />
      </div>
    </>
  );
}

function PageContent({ children }: { children: ReactNode }) {
  return (
    <main className="tw-px-8 tw-pt-8 tw-ms-[250px] tw-z-10">
      <div className="tw-w-full tw-min-h-[calc(100vh-18rem)] tw-max-w-[85rem] tw-mx-auto">
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
