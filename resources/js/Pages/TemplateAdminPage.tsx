import { Badge, Card, CardBody } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";

export default function TemplateAdminPage() {
  return (
    <AdminLayout headTitle="Admin Dashboard">
      <Card className="tw-relative bg-dark tw-shadow-slate-400 tw-overflow-clip tw-mb-10">
        <CardBody className="tw-py-10 tw-text-white">
          <h1 className="tw-text-2xl tw-font-black">Welcome back, John Doe!</h1>
          <p className="tw-mt-3 tw-text-base tw-text-muted-foreground">
            Let's start by navigating this xtreme template! Made with 3 cups of
            coffee by <Badge>genebit</Badge>.
          </p>
          <span className="tw-absolute tw-right-16 tw-scale-[10]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 180 164"
              fill="none"
              xmlns="http:www.w3.org/2000/svg"
            >
              <path
                d="M1.46446 70.5355L63.4645 8.53553C66.6143 5.38571 72 7.61654 72 12.0711V86.9787C72 88.2753 71.4964 89.5211 70.5953 90.4534L8.59534 154.606C5.47105 157.839 0 155.627 0 151.132V74.0711C0 72.745 0.526783 71.4732 1.46446 70.5355Z"
                fill="#718BFF"
              />
              <path
                d="M109.464 70.5355L171.464 8.53553C174.614 5.38571 180 7.61654 180 12.0711V86.9787C180 88.2753 179.496 89.5211 178.595 90.4534L116.595 154.606C113.471 157.839 108 155.627 108 151.132V74.0711C108 72.745 108.527 71.4732 109.464 70.5355Z"
                fill="#060C27"
              />
              <path
                d="M105.929 72H12.4527C8.015 72 5.77663 66.6491 8.89253 63.4893L70.0314 1.48928C70.971 0.53643 72.2534 0 73.5916 0H167.929C172.383 0 174.614 5.3857 171.464 8.53552L109.464 70.5355C108.527 71.4732 107.255 72 105.929 72Z"
                fill="#00146B"
              />
            </svg>
          </span>
        </CardBody>
      </Card>
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
