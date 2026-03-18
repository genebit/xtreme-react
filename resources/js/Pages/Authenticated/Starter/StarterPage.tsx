import { Badge, Card, CardBody } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";

export default function StarterPage() {
  return (
    <AdminLayout
      headTitle="Starter Page"
      sidebarContents={null}
      headerContents={null}
    >
      <div className="tw-flex tw-flex-col tw-gap-3">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-3">
          <Card className="tw-bg-white hover:tw-scale-102 tw-transition-transform tw-border lg:tw-basis-full tw-border-dashed tw-border-slate-400 tw-h-36"></Card>
          <Card className="tw-bg-white hover:tw-scale-102 tw-transition-transform tw-border lg:tw-basis-full tw-border-dashed tw-border-slate-400 tw-h-36"></Card>
          <Card className="tw-bg-white hover:tw-scale-102 tw-transition-transform tw-border lg:tw-basis-full tw-border-dashed tw-border-slate-400 tw-h-36"></Card>
          <Card className="tw-bg-white hover:tw-scale-102 tw-transition-transform tw-border lg:tw-basis-full tw-border-dashed tw-border-slate-400 tw-h-36"></Card>
        </div>
        <Card className="tw-bg-white hover:tw-scale-102 tw-transition-transform tw-border tw-border-dashed tw-border-slate-400 tw-h-60"></Card>
        <Card className="tw-bg-white hover:tw-scale-102 tw-transition-transform tw-border tw-border-dashed tw-border-slate-400 tw-h-96"></Card>
      </div>
    </AdminLayout>
  );
}
