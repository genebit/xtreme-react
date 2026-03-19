import { Card } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import {
  RiAddLine,
  RiCalendarLine,
  RiTeamLine,
  RiArrowRightLine,
} from "@remixicon/react";

type Status = "On Track" | "At Risk" | "Delayed";

interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  progress: number;
  deadline: string;
  team: { avatar: string }[];
  tech: string[];
}

const statusStyle: Record<Status, { badge: string; bar: string }> = {
  "On Track": { badge: "tw-bg-teal-50 tw-text-teal-700",   bar: "tw-bg-teal-500"  },
  "At Risk":  { badge: "tw-bg-amber-50 tw-text-amber-700", bar: "tw-bg-amber-500" },
  "Delayed":  { badge: "tw-bg-red-50 tw-text-red-600",     bar: "tw-bg-red-500"   },
};

const projects: Project[] = [
  {
    id: "P-001",
    name: "Xtreme Admin Panel",
    description: "Full-featured admin dashboard with analytics, user management, and reporting modules.",
    status: "On Track",
    progress: 72,
    deadline: "Apr 30, 2026",
    team: [
      { avatar: "https://i.pravatar.cc/32?img=1" },
      { avatar: "https://i.pravatar.cc/32?img=2" },
      { avatar: "https://i.pravatar.cc/32?img=3" },
    ],
    tech: ["React", "Laravel", "TypeScript"],
  },
  {
    id: "P-002",
    name: "Payment Gateway Integration",
    description: "Stripe-based subscription and one-time payment flow with webhook handling.",
    status: "At Risk",
    progress: 45,
    deadline: "Apr 10, 2026",
    team: [
      { avatar: "https://i.pravatar.cc/32?img=4" },
      { avatar: "https://i.pravatar.cc/32?img=5" },
    ],
    tech: ["Stripe", "PHP", "Redis"],
  },
  {
    id: "P-003",
    name: "Mobile App — iOS & Android",
    description: "Cross-platform mobile client for the admin suite with offline-first capability.",
    status: "On Track",
    progress: 30,
    deadline: "Jun 15, 2026",
    team: [
      { avatar: "https://i.pravatar.cc/32?img=6" },
      { avatar: "https://i.pravatar.cc/32?img=7" },
      { avatar: "https://i.pravatar.cc/32?img=8" },
      { avatar: "https://i.pravatar.cc/32?img=9" },
    ],
    tech: ["React Native", "Expo", "SQLite"],
  },
  {
    id: "P-004",
    name: "DevOps & CI/CD Pipeline",
    description: "GitHub Actions automation for testing, building, and deploying to staging and production.",
    status: "Delayed",
    progress: 18,
    deadline: "Mar 31, 2026",
    team: [
      { avatar: "https://i.pravatar.cc/32?img=10" },
      { avatar: "https://i.pravatar.cc/32?img=11" },
    ],
    tech: ["Docker", "GitHub Actions", "AWS"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const s = statusStyle[project.status];
  return (
    <Card className="tw-border-0 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-rounded-2xl tw-h-full">
      <Card.Body className="tw-p-5 tw-flex tw-flex-col">
        <div className="tw-flex tw-items-start tw-justify-between tw-mb-2">
          <span className="tw-text-xs tw-font-mono tw-text-slate-400">{project.id}</span>
          <span className={`tw-text-xs tw-font-semibold tw-px-2 tw-py-0.5 tw-rounded-full ${s.badge}`}>
            {project.status}
          </span>
        </div>
        <h3 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-1">{project.name}</h3>
        <p className="tw-text-xs tw-text-slate-500 tw-mb-4 tw-flex-1">{project.description}</p>

        {/* Progress */}
        <div className="tw-mb-4">
          <div className="tw-flex tw-justify-between tw-text-xs tw-text-slate-500 tw-mb-1.5">
            <span>Progress</span>
            <span className="tw-font-semibold">{project.progress}%</span>
          </div>
          <div className="tw-w-full tw-bg-slate-100 tw-rounded-full tw-h-2">
            <div className={`${s.bar} tw-h-2 tw-rounded-full tw-transition-all`} style={{ width: `${project.progress}%` }} />
          </div>
        </div>

        {/* Tech tags */}
        <div className="tw-flex tw-flex-wrap tw-gap-1.5 tw-mb-4">
          {project.tech.map((t) => (
            <span key={t} className="tw-text-xs tw-px-2 tw-py-0.5 tw-rounded tw-bg-slate-100 tw-text-slate-600 tw-font-medium">
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-flex -tw-space-x-2">
              {project.team.map((m, i) => (
                <img key={i} src={m.avatar} alt="" className="tw-w-7 tw-h-7 tw-rounded-full tw-border-2 tw-border-white" />
              ))}
            </div>
            <span className="tw-text-xs tw-text-slate-500">
              <RiTeamLine size={12} className="tw-inline tw-mr-1" />{project.team.length}
            </span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-slate-400">
            <RiCalendarLine size={12} />
            {project.deadline}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="tw-bg-white tw-border-t tw-border-slate-100 tw-py-2.5 tw-px-5">
        <button className="tw-text-xs tw-font-semibold tw-text-amber-600 hover:tw-text-amber-800 tw-transition-colors tw-inline-flex tw-items-center tw-gap-1">
          View Details <RiArrowRightLine size={13} />
        </button>
      </Card.Footer>
    </Card>
  );
}

export default function ProjectsPage() {
  return (
    <AdminLayout headTitle="Active Projects">
      <PageHero title="Active Projects" subtitle="Monitor the health and progress of all live projects.">
        <a href={route("projects.archived")} className="tw-text-slate-400 hover:tw-text-white tw-text-sm tw-transition-colors">
          View Archived
        </a>
        <button className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-transition-all tw-shadow-sm tw-text-white tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg">
          <RiAddLine size={16} /> New Project
        </button>
      </PageHero>

      {/* ── Summary strip ── */}
      <div className="tw-flex tw-gap-4 tw-mb-6 tw-flex-wrap">
        {[
          { label: "Total", value: projects.length, color: "tw-text-slate-700" },
          { label: "On Track", value: projects.filter(p => p.status === "On Track").length, color: "tw-text-teal-600" },
          { label: "At Risk",  value: projects.filter(p => p.status === "At Risk").length,  color: "tw-text-amber-600" },
          { label: "Delayed",  value: projects.filter(p => p.status === "Delayed").length,  color: "tw-text-red-600" },
        ].map((s) => (
          <div key={s.label} className="tw-bg-white tw-rounded-2xl tw-border-0 tw-shadow-sm tw-px-4 tw-py-2.5 tw-flex tw-items-center tw-gap-2">
            <span className={`tw-text-lg tw-font-black ${s.color}`}>{s.value}</span>
            <span className="tw-text-xs tw-text-slate-500">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Project cards ── */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-4 tw-pb-8">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </AdminLayout>
  );
}
