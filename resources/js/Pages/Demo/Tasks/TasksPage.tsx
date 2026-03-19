import { useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import {
  RiAddLine,
  RiCalendarLine,
  RiFlag2Line,
  RiMoreLine,
  RiUserLine,
} from "@remixicon/react";

type Priority = "High" | "Medium" | "Low";
type Column = "Backlog" | "In Progress" | "Done";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  avatar: string;
  due: string;
  column: Column;
}

const priorityStyle: Record<Priority, string> = {
  High:   "tw-bg-red-50 tw-text-red-600",
  Medium: "tw-bg-amber-50 tw-text-amber-700",
  Low:    "tw-bg-teal-50 tw-text-teal-700",
};

const tasks: Task[] = [
  { id: "T-001", title: "CI/CD Pipeline Setup",        description: "Configure GitHub Actions for automated builds and deployments.",        priority: "High",   assignee: "Alice J.",  avatar: "https://i.pravatar.cc/32?img=1", due: "Mar 20, 2026", column: "Backlog"     },
  { id: "T-002", title: "User Authentication",          description: "Implement JWT-based login and registration flows.",                      priority: "High",   assignee: "Bob M.",    avatar: "https://i.pravatar.cc/32?img=2", due: "Mar 22, 2026", column: "In Progress" },
  { id: "T-003", title: "Design Dashboard UI",          description: "Redesign the admin dashboard to match brand guidelines.",                priority: "Medium", assignee: "Carol W.",  avatar: "https://i.pravatar.cc/32?img=3", due: "Mar 25, 2026", column: "In Progress" },
  { id: "T-004", title: "Integrate Payment Gateway",    description: "Add Stripe checkout to subscription flow.",                             priority: "High",   assignee: "David L.",  avatar: "https://i.pravatar.cc/32?img=4", due: "Apr 01, 2026", column: "Backlog"     },
  { id: "T-005", title: "Optimize DB Queries",          description: "Profile and fix N+1 queries in the orders module.",                     priority: "Medium", assignee: "Emma D.",   avatar: "https://i.pravatar.cc/32?img=5", due: "Mar 28, 2026", column: "Backlog"     },
  { id: "T-006", title: "Write Unit Tests",             description: "Achieve 80% coverage for the authentication module.",                   priority: "Low",    assignee: "Alice J.",  avatar: "https://i.pravatar.cc/32?img=1", due: "Apr 05, 2026", column: "In Progress" },
  { id: "T-007", title: "Configure Email Notifications",description: "Set up transactional emails with Mailgun.",                             priority: "Medium", assignee: "Bob M.",    avatar: "https://i.pravatar.cc/32?img=2", due: "Mar 30, 2026", column: "Done"        },
  { id: "T-008", title: "Initial Project Setup",        description: "Repository, branching strategy, and deployment environments ready.",    priority: "Low",    assignee: "Carol W.",  avatar: "https://i.pravatar.cc/32?img=3", due: "Mar 01, 2026", column: "Done"        },
  { id: "T-009", title: "Deploy to Staging",            description: "Provision staging server and deploy latest build.",                     priority: "Medium", assignee: "David L.",  avatar: "https://i.pravatar.cc/32?img=4", due: "Mar 10, 2026", column: "Done"        },
];

const columns: Column[] = ["Backlog", "In Progress", "Done"];

const columnStyle: Record<Column, { header: string; dot: string; count: string }> = {
  "Backlog":     { header: "tw-border-t-slate-400",  dot: "tw-bg-slate-400",  count: "tw-bg-slate-100 tw-text-slate-600" },
  "In Progress": { header: "tw-border-t-amber-500",  dot: "tw-bg-amber-500",  count: "tw-bg-amber-100 tw-text-amber-700" },
  "Done":        { header: "tw-border-t-teal-500",   dot: "tw-bg-teal-500",   count: "tw-bg-teal-100 tw-text-teal-700"   },
};

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-p-4 tw-cursor-grab">
      <div className="tw-flex tw-items-start tw-justify-between tw-mb-2">
        <span className={`tw-text-xs tw-font-semibold tw-px-2 tw-py-0.5 tw-rounded-full ${priorityStyle[task.priority]}`}>
          <RiFlag2Line size={11} className="tw-inline tw-mr-1" />{task.priority}
        </span>
        <button className="tw-text-slate-300 hover:tw-text-slate-500 tw-transition-colors">
          <RiMoreLine size={16} />
        </button>
      </div>
      <p className="tw-text-sm tw-font-semibold tw-text-slate-800 tw-mb-1">{task.title}</p>
      <p className="tw-text-xs tw-text-slate-400 tw-mb-3 tw-line-clamp-2">{task.description}</p>
      <div className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-1.5">
          <img src={task.avatar} alt={task.assignee} className="tw-w-6 tw-h-6 tw-rounded-full" />
          <span className="tw-text-xs tw-text-slate-500">{task.assignee}</span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-1 tw-text-slate-400">
          <RiCalendarLine size={12} />
          <span className="tw-text-xs">{task.due}</span>
        </div>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [filter, setFilter] = useState<Priority | "All">("All");

  const filteredByColumn = useMemo(
    () => Object.fromEntries(
      columns.map((col) => [col, tasks.filter((t) => t.column === col && (filter === "All" || t.priority === filter))])
    ) as Record<Column, Task[]>,
    [filter]
  );

  return (
    <AdminLayout headTitle="My Tasks">
      <PageHero title="My Tasks" subtitle="Track and manage your assigned work.">
        <button className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-transition-all tw-shadow-sm tw-text-white tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg">
          <RiAddLine size={16} /> New Task
        </button>
      </PageHero>

      {/* ── Priority filter ── */}
      <div className="tw-flex tw-gap-2 tw-mb-6 tw-flex-wrap">
        {(["All", "High", "Medium", "Low"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-xs tw-font-semibold tw-transition-colors ${
              filter === p
                ? "tw-bg-amber-500 tw-text-white"
                : "tw-bg-white tw-text-slate-600 tw-shadow-sm hover:tw-shadow"
            }`}
          >
            {p}
          </button>
        ))}
        <span className="tw-ms-auto tw-text-xs tw-text-slate-400 tw-self-center">
          <RiUserLine size={13} className="tw-inline tw-mr-1" />
          {tasks.length} total tasks
        </span>
      </div>

      {/* ── Kanban ── */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-pb-8">
        {columns.map((col) => {
          const colTasks = filteredByColumn[col];
          const s = columnStyle[col];
          return (
            <div key={col} className="tw-bg-slate-50/70 tw-rounded-2xl tw-p-4">
              <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
                <span className={`tw-w-2.5 tw-h-2.5 tw-rounded-full ${s.dot}`} />
                <h3 className="tw-font-bold tw-text-slate-700 tw-text-sm tw-uppercase tw-tracking-wide">{col}</h3>
                <span className={`tw-ms-auto tw-text-xs tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-full ${s.count}`}>
                  {colTasks.length}
                </span>
              </div>
              <div className="tw-flex tw-flex-col tw-gap-3">
                {colTasks.map((t) => <TaskCard key={t.id} task={t} />)}
                {colTasks.length === 0 && (
                  <div className="tw-text-center tw-py-8 tw-text-slate-300 tw-text-sm">No tasks</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
