import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import { RiAddLine, RiArrowRightLine } from "@remixicon/react";

export default function StarterPage() {
  return (
    <AdminLayout
      headTitle="Starter Page"
      breadcrumbs={[
        { label: "Home", href: route("starter") },
        { label: "Starter Page" },
      ]}
    >
      <PageHero
        title="Starter Page"
        subtitle="A blank canvas using AdminLayout. Replace this content with your own page."
      />

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-mb-4">
        {["Metric A", "Metric B", "Metric C"].map((label) => (
          <div
            key={label}
            className="tw-rounded-xl tw-border tw-border-dashed tw-border-slate-300 tw-bg-white tw-p-6 tw-flex tw-flex-col tw-gap-2"
          >
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-tracking-widest tw-text-slate-400">
              {label}
            </span>
            <div className="tw-h-6 tw-w-24 tw-rounded tw-bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="tw-rounded-xl tw-border tw-border-dashed tw-border-slate-300 tw-bg-white tw-p-8 tw-mb-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-min-h-56">
        <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-amber-50 tw-border tw-border-amber-200 tw-flex tw-items-center tw-justify-center">
          <RiAddLine size={22} className="tw-text-amber-500" />
        </div>
        <div className="tw-text-center">
          <p className="tw-text-sm tw-font-semibold tw-text-slate-700 tw-mb-1">Your content goes here</p>
          <p className="tw-text-xs tw-text-slate-400 tw-max-w-xs">
            This page uses <code className="tw-font-mono tw-bg-slate-100 tw-px-1 tw-rounded">AdminLayout</code> as its
            wrapper. The sidebar and header are fully functional.
          </p>
        </div>
        <a
          href={route("landing")}
          className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-text-white tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 hover:tw-from-amber-600 hover:tw-to-amber-700 tw-no-underline tw-transition-all tw-border-0"
        >
          View Component Reference
          <RiArrowRightLine size={15} />
        </a>
      </div>

      <div className="tw-rounded-xl tw-border tw-border-dashed tw-border-slate-300 tw-bg-white tw-p-6 tw-min-h-48" />
    </AdminLayout>
  );
}
