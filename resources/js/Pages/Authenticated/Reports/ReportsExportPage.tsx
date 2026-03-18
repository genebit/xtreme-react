import { Card } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import {
  RiDownload2Line,
  RiFileExcelLine,
  RiFilePdfLine,
  RiFileTextLine,
} from "@remixicon/react";

const exportFormats = [
  {
    label: "PDF Report",
    description: "Full report with charts and summaries, ready to share or print.",
    icon: <RiFilePdfLine size={28} />,
    color: "tw-text-red-500",
    bg: "tw-bg-red-50",
  },
  {
    label: "Excel Spreadsheet",
    description: "Raw data in .xlsx format for further analysis and pivot tables.",
    icon: <RiFileExcelLine size={28} />,
    color: "tw-text-teal-600",
    bg: "tw-bg-teal-50",
  },
  {
    label: "CSV Export",
    description: "Comma-separated values for data pipelines and third-party tools.",
    icon: <RiFileTextLine size={28} />,
    color: "tw-text-amber-600",
    bg: "tw-bg-amber-50",
  },
];

export default function ReportsExportPage() {
  return (
    <AdminLayout headTitle="Reports — Export">
      <PageHero
        title="Export Reports"
        subtitle="Download your data in PDF, Excel, or CSV format for offline use."
      >
        <a
          href={route("reports")}
          className="tw-text-slate-400 hover:tw-text-white tw-text-sm tw-transition-colors"
        >
          ← Back to Overview
        </a>
      </PageHero>

      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 tw-gap-4 tw-mb-6">
        {exportFormats.map((fmt) => (
          <Card
            key={fmt.label}
            className="tw-border-0 tw-shadow-sm hover:tw-shadow-md tw-rounded-2xl tw-transition-all tw-cursor-pointer"
          >
            <Card.Body className="tw-p-6 tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-3">
              <div
                className={`tw-w-14 tw-h-14 tw-rounded-xl tw-flex tw-items-center tw-justify-center ${fmt.bg}`}
              >
                <span className={fmt.color}>{fmt.icon}</span>
              </div>
              <div>
                <h3 className="tw-font-bold tw-text-slate-800 tw-text-sm">{fmt.label}</h3>
                <p className="tw-text-xs tw-text-slate-500 tw-mt-1">{fmt.description}</p>
              </div>
              <button className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-transition-all tw-shadow-sm tw-text-white tw-text-xs tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-mt-1">
                <RiDownload2Line size={14} /> Download
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="tw-p-4 tw-bg-amber-50 tw-border tw-border-amber-200 tw-rounded-2xl tw-pb-8">
        <p className="tw-text-sm tw-text-amber-800">
          <strong>Note:</strong> Exported reports reflect data up to today, March 17, 2026. Large exports may take a moment to generate.
        </p>
      </div>
    </AdminLayout>
  );
}
