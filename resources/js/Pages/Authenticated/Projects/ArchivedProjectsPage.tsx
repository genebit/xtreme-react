import { Card } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import { RiArchive2Line, RiCalendarLine, RiTeamLine, RiArrowLeftLine } from "@remixicon/react";

interface ArchivedProject {
  id: string;
  name: string;
  description: string;
  completedDate: string;
  teamSize: number;
  duration: string;
  tech: string[];
}

const archived: ArchivedProject[] = [
  { id: "P-A01", name: "Legacy Portal Migration",       description: "Migrated the old PHP 5 portal to Laravel 10 with a React frontend.",   completedDate: "Jan 15, 2026", teamSize: 5, duration: "8 months", tech: ["Laravel", "React", "MySQL"]       },
  { id: "P-A02", name: "Marketing Site Redesign",        description: "Complete overhaul of the public marketing site and SEO optimization.",    completedDate: "Dec 02, 2025", teamSize: 3, duration: "3 months", tech: ["Next.js", "TailwindCSS", "Vercel"] },
  { id: "P-A03", name: "Internal Billing System",        description: "Built an internal invoicing and billing tracker integrated with QuickBooks.", completedDate: "Oct 20, 2025", teamSize: 4, duration: "5 months", tech: ["Vue.js", "Node.js", "PostgreSQL"] },
  { id: "P-A04", name: "Customer Support Chatbot",       description: "AI-powered chatbot for first-tier customer support with escalation routing.",  completedDate: "Aug 08, 2025", teamSize: 2, duration: "4 months", tech: ["Python", "OpenAI", "FastAPI"]      },
  { id: "P-A05", name: "Employee Onboarding Platform",   description: "Digital onboarding portal for HR with document management and e-signatures.", completedDate: "Jun 30, 2025", teamSize: 3, duration: "6 months", tech: ["React", "AWS S3", "DocuSign"]      },
  { id: "P-A06", name: "Analytics Dashboard v1",         description: "First version of the analytics suite, now superseded by the current admin panel.", completedDate: "Mar 14, 2025", teamSize: 6, duration: "7 months", tech: ["Vue.js", "D3.js", "Laravel"]  },
];

export default function ArchivedProjectsPage() {
  return (
    <AdminLayout headTitle="Archived Projects">
      <PageHero
        title="Archived Projects"
        subtitle={`${archived.length} completed projects — stored for reference and audit purposes.`}
      >
        <a href={route("projects")} className="tw-text-slate-400 hover:tw-text-amber-400 tw-transition-colors tw-flex tw-items-center tw-gap-1 tw-text-sm">
          <RiArrowLeftLine size={15} /> Active Projects
        </a>
      </PageHero>

      {/* ── Table ── */}
      <Card className="tw-border-0 tw-shadow-sm tw-rounded-2xl tw-pb-8">
        <Card.Body className="tw-p-0">
          <div className="tw-overflow-x-auto">
            <table className="tw-w-full tw-text-sm">
              <thead>
                <tr className="tw-text-left tw-text-xs tw-text-slate-400 tw-uppercase tw-tracking-wide tw-border-b tw-border-slate-100">
                  <th className="tw-px-5 tw-py-3 tw-font-semibold">Project</th>
                  <th className="tw-px-5 tw-py-3 tw-font-semibold">Tech Stack</th>
                  <th className="tw-px-5 tw-py-3 tw-font-semibold">Team</th>
                  <th className="tw-px-5 tw-py-3 tw-font-semibold">Duration</th>
                  <th className="tw-px-5 tw-py-3 tw-font-semibold">Completed</th>
                  <th className="tw-px-5 tw-py-3 tw-font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="tw-divide-y tw-divide-slate-50">
                {archived.map((p) => (
                  <tr key={p.id} className="hover:tw-bg-amber-50/20 tw-transition-colors">
                    <td className="tw-px-5 tw-py-4">
                      <div className="tw-flex tw-items-center tw-gap-3">
                        <div className="tw-w-9 tw-h-9 tw-rounded-lg tw-bg-slate-100 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                          <RiArchive2Line size={17} className="tw-text-slate-400" />
                        </div>
                        <div>
                          <p className="tw-font-semibold tw-text-slate-800">{p.name}</p>
                          <p className="tw-text-xs tw-text-slate-400 tw-font-mono">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="tw-px-5 tw-py-4">
                      <div className="tw-flex tw-flex-wrap tw-gap-1">
                        {p.tech.map((t) => (
                          <span key={t} className="tw-text-xs tw-px-2 tw-py-0.5 tw-rounded tw-bg-slate-100 tw-text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="tw-px-5 tw-py-4">
                      <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-slate-500">
                        <RiTeamLine size={14} />
                        <span className="tw-text-sm">{p.teamSize}</span>
                      </div>
                    </td>
                    <td className="tw-px-5 tw-py-4 tw-text-slate-600 tw-text-sm">{p.duration}</td>
                    <td className="tw-px-5 tw-py-4">
                      <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-slate-500 tw-text-xs">
                        <RiCalendarLine size={13} />
                        {p.completedDate}
                      </div>
                    </td>
                    <td className="tw-px-5 tw-py-4">
                      <span className="tw-text-xs tw-font-semibold tw-px-2.5 tw-py-1 tw-rounded-full tw-bg-slate-100 tw-text-slate-500">
                        Archived
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}
