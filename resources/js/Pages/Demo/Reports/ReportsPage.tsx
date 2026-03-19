import { Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import { RiArrowUpLine, RiArrowDownLine } from "@remixicon/react";

// ─── Chart configs ─────────────────────────────────────────────────────────

const monthlyRevenueOptions: ApexOptions = {
  chart: { type: "bar", height: 280, toolbar: { show: false }, background: "transparent", fontFamily: "Figtree, sans-serif" },
  plotOptions: { bar: { borderRadius: 5, columnWidth: "55%" } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    axisBorder: { show: false }, axisTicks: { show: false },
    labels: { style: { colors: "#94a3b8", fontSize: "11px" } },
  },
  yaxis: { labels: { style: { colors: "#94a3b8", fontSize: "11px" }, formatter: (v) => `$${(v/1000).toFixed(0)}k` } },
  colors: ["#f59e0b"],
  grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
  tooltip: { y: { formatter: (v) => `$${v.toLocaleString()}` } },
};

const userGrowthOptions: ApexOptions = {
  chart: { type: "line", height: 280, toolbar: { show: false }, background: "transparent", fontFamily: "Figtree, sans-serif" },
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    axisBorder: { show: false }, axisTicks: { show: false },
    labels: { style: { colors: "#94a3b8", fontSize: "11px" } },
  },
  yaxis: { labels: { style: { colors: "#94a3b8", fontSize: "11px" } } },
  colors: ["#0d9488", "#3b82f6"],
  grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
  legend: { position: "top", horizontalAlign: "right", labels: { colors: "#64748b" } },
};

const monthlySeries = [{ name: "Revenue", data: [31000,40000,28000,51000,42000,89000,72000,65000,80000,91000,76000,112000] }];
const userSeries = [
  { name: "New Users",    data: [120,145,180,162,210,255,230,270,295,310,340,385] },
  { name: "Active Users", data: [900,950,980,1020,1100,1250,1200,1320,1410,1500,1620,1750] },
];

// ─── KPI summary ───────────────────────────────────────────────────────────

const kpis = [
  { label: "Total Revenue",    value: "$677,400", change: 18.2,  positive: true },
  { label: "Avg Monthly Rev",  value: "$56,450",  change: 12.5,  positive: true },
  { label: "Total Users",      value: "1,750",    change: 94.4,  positive: true },
  { label: "Churn Rate",       value: "2.3%",     change: -0.4,  positive: false },
];

// ─── Page ─────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  return (
    <AdminLayout headTitle="Reports — Overview">
      <PageHero title="Reports" subtitle="Analyse performance metrics across revenue, users, and growth." />

      {/* ── KPI row ── */}
      <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4 tw-mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="tw-bg-white tw-rounded-2xl tw-border-0 tw-shadow-sm tw-p-5">
            <p className="tw-text-xs tw-text-slate-500 tw-mb-1">{k.label}</p>
            <h3 className="tw-text-xl tw-font-bold tw-text-slate-800">{k.value}</h3>
            <span className={`tw-inline-flex tw-items-center tw-gap-1 tw-text-xs tw-font-semibold tw-mt-1 ${k.positive ? "tw-text-emerald-600" : "tw-text-red-500"}`}>
              {k.positive ? <RiArrowUpLine size={12} /> : <RiArrowDownLine size={12} />}
              {Math.abs(k.change)}% YoY
            </span>
          </div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-pb-8">
        <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl">
          <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
            <h2 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-0">Monthly Revenue</h2>
            <p className="tw-text-xs tw-text-slate-400 tw-mb-0">Full year 2025</p>
          </Card.Header>
          <Card.Body className="tw-p-4">
            <ReactApexChart type="bar" height={280} options={monthlyRevenueOptions} series={monthlySeries} />
          </Card.Body>
        </Card>
        <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl">
          <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
            <h2 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-0">User Growth</h2>
            <p className="tw-text-xs tw-text-slate-400 tw-mb-0">New vs active users</p>
          </Card.Header>
          <Card.Body className="tw-p-4">
            <ReactApexChart type="line" height={280} options={userGrowthOptions} series={userSeries} />
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
}
