import { Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiMoneyDollarCircleLine,
  RiGroupLine,
  RiShoppingCartLine,
  RiPieChartLine,
  RiMoreLine,
  RiArrowRightLine,
} from "@remixicon/react";

// ─── Chart configs ────────────────────────────────────────────────────────────

const revenueChartOptions: ApexOptions = {
  chart: {
    type: "area",
    height: 300,
    toolbar: { show: false },
    background: "transparent",
    fontFamily: "Figtree, sans-serif",
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  fill: {
    type: "gradient",
    gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.02 },
  },
  xaxis: {
    categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#94a3b8", fontSize: "12px" } },
  },
  yaxis: {
    labels: {
      style: { colors: "#94a3b8", fontSize: "12px" },
      formatter: (v) => `$${(v / 1000).toFixed(0)}k`,
    },
  },
  colors: ["#f59e0b", "#0d9488"],
  grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
  tooltip: { y: { formatter: (v) => `$${v.toLocaleString()}` } },
  legend: {
    position: "top",
    horizontalAlign: "right",
    labels: { colors: "#64748b" },
  },
};

const radialChartOptions: ApexOptions = {
  chart: {
    type: "radialBar",
    background: "transparent",
    fontFamily: "Figtree, sans-serif",
  },
  plotOptions: {
    radialBar: {
      hollow: { size: "28%", background: "transparent" },
      track: { background: "#f1f5f9", strokeWidth: "100%", margin: 4 },
      dataLabels: {
        total: {
          show: true,
          label: "Visits",
          color: "#94a3b8",
          fontSize: "12px",
          fontWeight: 400,
          formatter: () => "24,521",
        },
        value: { show: false },
      },
    },
  },
  colors: ["#f59e0b", "#0d9488", "#3b82f6", "#f43f5e"],
  labels: ["Direct", "Organic", "Referral", "Social"],
  legend: {
    show: true,
    position: "bottom",
    labels: { colors: "#64748b" },
    fontSize: "12px",
    markers: { size: 6 },
    itemMargin: { horizontal: 6 },
  },
  stroke: { lineCap: "round" },
  tooltip: { y: { formatter: (v) => `${v}%` } },
};

const barChartOptions: ApexOptions = {
  chart: {
    type: "bar",
    height: 220,
    toolbar: { show: false },
    background: "transparent",
    fontFamily: "Figtree, sans-serif",
  },
  plotOptions: { bar: { borderRadius: 5, columnWidth: "50%" } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#94a3b8", fontSize: "12px" } },
  },
  yaxis: { labels: { style: { colors: "#94a3b8", fontSize: "12px" } } },
  colors: ["#f59e0b"],
  grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
  tooltip: { y: { formatter: (v) => `${v} orders` } },
};

const revenueChartSeries = [
  { name: "Revenue", data: [31000,40000,28000,51000,42000,89000,72000,65000,80000,91000,76000,112000] },
  { name: "Expenses", data: [11000,32000,45000,32000,34000,52000,41000,55000,48000,62000,55000,73000] },
];
const radialChartSeries = [72, 85, 38, 60];
const barChartSeries = [{ name: "Orders", data: [44, 55, 57, 56, 61, 88, 72] }];

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
}

function StatCard({ label, value, change, icon, accentColor, bgColor }: StatCardProps) {
  const isPositive = change >= 0;
  return (
    <div className="tw-flex-1 tw-bg-white tw-rounded-2xl tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
      <div className="tw-p-5">
        <div className="tw-flex tw-items-start tw-justify-between tw-mb-4">
          <div className={`tw-w-11 tw-h-11 tw-rounded-xl tw-flex tw-items-center tw-justify-center ${bgColor}`}>
            <span className={accentColor}>{icon}</span>
          </div>
          <span className={`tw-inline-flex tw-items-center tw-gap-1 tw-text-xs tw-font-semibold tw-px-2 tw-py-1 tw-rounded-full ${isPositive ? "tw-bg-emerald-50 tw-text-emerald-600" : "tw-bg-red-50 tw-text-red-500"}`}>
            {isPositive ? <RiArrowUpLine size={12} /> : <RiArrowDownLine size={12} />}
            {Math.abs(change)}%
          </span>
        </div>
        <p className="tw-text-sm tw-text-slate-500 tw-mb-1">{label}</p>
        <h3 className="tw-text-2xl tw-font-bold tw-text-slate-800">{value}</h3>
        <p className="tw-text-xs tw-text-slate-400 tw-mt-1">vs last month</p>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const transactions = [
  { id: "#TXN-001", name: "Alice Johnson", amount: "$1,200.00", status: "Completed", date: "Feb 24, 2026", avatar: "https://i.pravatar.cc/36?img=1" },
  { id: "#TXN-002", name: "Bob Martinez", amount: "$850.50", status: "Pending", date: "Feb 24, 2026", avatar: "https://i.pravatar.cc/36?img=2" },
  { id: "#TXN-003", name: "Carol Williams", amount: "$3,400.00", status: "Completed", date: "Feb 23, 2026", avatar: "https://i.pravatar.cc/36?img=3" },
  { id: "#TXN-004", name: "David Lee", amount: "$220.00", status: "Failed", date: "Feb 23, 2026", avatar: "https://i.pravatar.cc/36?img=4" },
  { id: "#TXN-005", name: "Emma Davis", amount: "$5,100.00", status: "Completed", date: "Feb 22, 2026", avatar: "https://i.pravatar.cc/36?img=5" },
];

const statusVariant: Record<string, string> = {
  Completed: "tw-bg-emerald-50 tw-text-emerald-700",
  Pending:   "tw-bg-amber-50 tw-text-amber-700",
  Failed:    "tw-bg-red-50 tw-text-red-600",
};

const topProducts = [
  { name: "Pro Subscription", revenue: "$48,200", units: 1230, pct: 82, color: "tw-bg-amber-500" },
  { name: "Starter Pack",     revenue: "$21,500", units: 870,  pct: 58, color: "tw-bg-teal-500" },
  { name: "Enterprise Plan",  revenue: "$95,400", units: 312,  pct: 96, color: "tw-bg-amber-600" },
  { name: "Add-on Storage",   revenue: "$7,800",  units: 2400, pct: 34, color: "tw-bg-blue-500" },
];

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <AdminLayout headTitle="Dashboard">
      {/* ── Hero banner ── */}
      <PageHero
        title={<>Welcome back, <span className="tw-text-amber-400">John Doe!</span></>}
        subtitle="Here's what's happening with your business today. Track, analyse, and grow — all in one place."
        decoration={
          <svg width="180" height="164" viewBox="0 0 180 164" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.46446 70.5355L63.4645 8.53553C66.6143 5.38571 72 7.61654 72 12.0711V86.9787C72 88.2753 71.4964 89.5211 70.5953 90.4534L8.59534 154.606C5.47105 157.839 0 155.627 0 151.132V74.0711C0 72.745 0.526783 71.4732 1.46446 70.5355Z" fill="#f59e0b"/>
            <path d="M109.464 70.5355L171.464 8.53553C174.614 5.38571 180 7.61654 180 12.0711V86.9787C180 88.2753 179.496 89.5211 178.595 90.4534L116.595 154.606C113.471 157.839 108 155.627 108 151.132V74.0711C108 72.745 108.527 71.4732 109.464 70.5355Z" fill="#d97706"/>
            <path d="M105.929 72H12.4527C8.015 72 5.77663 66.6491 8.89253 63.4893L70.0314 1.48928C70.971 0.53643 72.2534 0 73.5916 0H167.929C172.383 0 174.614 5.3857 171.464 8.53552L109.464 70.5355C108.527 71.4732 107.255 72 105.929 72Z" fill="#fbbf24"/>
          </svg>
        }
      >
        <a href={route("reports")} className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-transition-all tw-text-white tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-sm">
          View Reports <RiArrowRightLine size={16} />
        </a>
        <button className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-white/10 hover:tw-bg-white/20 tw-transition-colors tw-text-white tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg">
          Download CSV
        </button>
      </PageHero>

      {/* ── KPI Stat Cards ── */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-mb-6">
        <StatCard label="Total Revenue"   value="$112,400" change={14.5} icon={<RiMoneyDollarCircleLine size={22} />} accentColor="tw-text-amber-600" bgColor="tw-bg-amber-50" />
        <StatCard label="Active Users"    value="8,320"    change={6.2}  icon={<RiGroupLine size={22} />}            accentColor="tw-text-teal-600"  bgColor="tw-bg-teal-50" />
        <StatCard label="New Orders"      value="1,430"    change={-3.1} icon={<RiShoppingCartLine size={22} />}     accentColor="tw-text-rose-600"  bgColor="tw-bg-rose-50" />
        <StatCard label="Conversion Rate" value="5.74%"    change={1.8}  icon={<RiPieChartLine size={22} />}         accentColor="tw-text-blue-600"  bgColor="tw-bg-blue-50" />
      </div>

      {/* ── Charts Row ── */}
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 tw-mb-6">
        <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl tw-flex-1">
          <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <h2 className="tw-text-base tw-font-bold tw-text-slate-800">Revenue vs Expenses</h2>
                <p className="tw-text-xs tw-text-slate-400 tw-mb-0">January – December 2025</p>
              </div>
              <button className="tw-text-slate-400 hover:tw-text-slate-600 tw-transition-colors">
                <RiMoreLine size={20} />
              </button>
            </div>
          </Card.Header>
          <Card.Body className="tw-p-4">
            <ReactApexChart type="area" height={280} options={revenueChartOptions} series={revenueChartSeries} />
          </Card.Body>
        </Card>

        <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl tw-w-full lg:tw-w-72 tw-flex-shrink-0">
          <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <h2 className="tw-text-base tw-font-bold tw-text-slate-800">Traffic Sources</h2>
                <p className="tw-text-xs tw-text-slate-400 tw-mb-0">All time visits</p>
              </div>
              <button className="tw-text-slate-400 hover:tw-text-slate-600 tw-transition-colors">
                <RiMoreLine size={20} />
              </button>
            </div>
          </Card.Header>
          <Card.Body className="tw-p-4">
            <ReactApexChart type="radialBar" height={260} options={radialChartOptions} series={radialChartSeries} />
          </Card.Body>
        </Card>
      </div>

      {/* ── Bottom Row ── */}
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 tw-pb-8">
        <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl tw-flex-1">
          <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <h2 className="tw-text-base tw-font-bold tw-text-slate-800">Recent Transactions</h2>
                <p className="tw-text-xs tw-text-slate-400 tw-mb-0">Latest 5 transactions</p>
              </div>
              <a href="#" className="tw-inline-flex tw-items-center tw-gap-1 tw-text-xs tw-font-semibold tw-text-amber-600 hover:tw-text-amber-800 tw-transition-colors">
                View all <RiArrowRightLine size={14} />
              </a>
            </div>
          </Card.Header>
          <Card.Body className="tw-p-0">
            <div className="tw-overflow-x-auto">
              <table className="tw-w-full tw-text-sm">
                <thead>
                  <tr className="tw-text-left tw-text-slate-400 tw-text-xs tw-uppercase tw-tracking-wide tw-border-0">
                    <th className="tw-px-5 tw-py-3 tw-font-semibold">Customer</th>
                    <th className="tw-px-5 tw-py-3 tw-font-semibold">Txn ID</th>
                    <th className="tw-px-5 tw-py-3 tw-font-semibold">Amount</th>
                    <th className="tw-px-5 tw-py-3 tw-font-semibold">Date</th>
                    <th className="tw-px-5 tw-py-3 tw-font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="tw-divide-y tw-divide-slate-50">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:tw-bg-amber-50/30 tw-transition-colors">
                      <td className="tw-px-5 tw-py-3">
                        <div className="tw-flex tw-items-center tw-gap-2">
                          <img src={txn.avatar} alt={txn.name} className="tw-w-8 tw-h-8 tw-rounded-full tw-object-cover tw-flex-shrink-0" />
                          <span className="tw-font-medium tw-text-slate-700 tw-whitespace-nowrap">{txn.name}</span>
                        </div>
                      </td>
                      <td className="tw-px-5 tw-py-3 tw-text-slate-400 tw-font-mono tw-text-xs tw-whitespace-nowrap">{txn.id}</td>
                      <td className="tw-px-5 tw-py-3 tw-font-semibold tw-text-slate-800 tw-whitespace-nowrap">{txn.amount}</td>
                      <td className="tw-px-5 tw-py-3 tw-text-slate-400 tw-whitespace-nowrap tw-text-xs">{txn.date}</td>
                      <td className="tw-px-5 tw-py-3">
                        <span className={`tw-inline-block tw-px-2.5 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-semibold ${statusVariant[txn.status]}`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full lg:tw-w-80 tw-flex-shrink-0">
          <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl">
            <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
              <h2 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-0">Weekly Orders</h2>
              <p className="tw-text-xs tw-text-slate-400 tw-mb-0">This week</p>
            </Card.Header>
            <Card.Body className="tw-p-4">
              <ReactApexChart type="bar" height={200} options={barChartOptions} series={barChartSeries} />
            </Card.Body>
          </Card>

          <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl tw-flex-1">
            <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
              <h2 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-0">Top Products</h2>
            </Card.Header>
            <Card.Body className="tw-p-5">
              <div className="tw-flex tw-flex-col tw-gap-4">
                {topProducts.map((p) => (
                  <div key={p.name}>
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-1.5">
                      <span className="tw-text-sm tw-font-medium tw-text-slate-700 tw-truncate tw-mr-2">{p.name}</span>
                      <span className="tw-text-sm tw-font-bold tw-text-slate-800 tw-flex-shrink-0">{p.revenue}</span>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <div className="tw-flex-1 tw-bg-slate-100 tw-rounded-full tw-h-1.5">
                        <div className={`${p.color} tw-h-1.5 tw-rounded-full tw-transition-all`} style={{ width: `${p.pct}%` }} />
                      </div>
                      <span className="tw-text-xs tw-text-slate-400 tw-flex-shrink-0">{p.units.toLocaleString()} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
