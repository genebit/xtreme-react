import { Head } from "@inertiajs/react";
import { PageWrapper } from "./PageWrapper";
import Preloader from "@/Components/Preloader";

interface AdminLayoutProps {
  headTitle: string;
  withPreloader?: boolean;
  children: React.ReactNode;
}

export default function AdminLayout({
  headTitle,
  withPreloader = true,
  children,
}: AdminLayoutProps) {
  return (
    <>
      <Head title={headTitle} />
      {withPreloader && <Preloader />}
      <PageWrapper>
        <PageWrapper.Sidebar />
        <PageWrapper.Main>
          <PageWrapper.Header />
          <PageWrapper.Content>{children}</PageWrapper.Content>
        </PageWrapper.Main>
      </PageWrapper>
    </>
  );
}
