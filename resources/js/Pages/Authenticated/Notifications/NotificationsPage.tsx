import { useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  RiBellLine,
  RiCheckDoubleLine,
  RiDeleteBinLine,
  RiShieldLine,
  RiTeamLine,
  RiCalendarCheckLine,
  RiFlag2Line,
  RiInformationLine,
} from "@remixicon/react";

type NotifType = "alert" | "team" | "event" | "task" | "info";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const typeStyle: Record<NotifType, { icon: React.ReactNode; bg: string; text: string }> = {
  alert: { icon: <RiShieldLine size={16} />,          bg: "tw-bg-red-50",    text: "tw-text-red-600"    },
  team:  { icon: <RiTeamLine size={16} />,             bg: "tw-bg-blue-50",   text: "tw-text-blue-600"   },
  event: { icon: <RiCalendarCheckLine size={16} />,    bg: "tw-bg-amber-50",  text: "tw-text-amber-600"  },
  task:  { icon: <RiFlag2Line size={16} />,            bg: "tw-bg-teal-50",   text: "tw-text-teal-600"   },
  info:  { icon: <RiInformationLine size={16} />,      bg: "tw-bg-slate-50",  text: "tw-text-slate-500"  },
};

const initialNotifications: Notification[] = [
  { id: "N-001", type: "alert", title: "Login from new device",      message: "A login was detected from Chrome on Windows 11. If this wasn't you, secure your account.",         time: "2 min ago",   read: false },
  { id: "N-002", type: "task",  title: "Task assigned to you",        message: "Alice Johnson assigned you to 'CI/CD Pipeline Setup' with a High priority.",                         time: "15 min ago",  read: false },
  { id: "N-003", type: "event", title: "Reminder: Q1 Planning",       message: "Your Q1 Planning Meeting starts tomorrow at 09:00 AM in Conference Room A.",                         time: "1 hr ago",    read: false },
  { id: "N-004", type: "team",  title: "Carol Williams joined",        message: "Carol Williams has joined the 'Xtreme Admin Panel' project as a contributor.",                        time: "3 hrs ago",   read: true  },
  { id: "N-005", type: "task",  title: "Task completed",              message: "Bob Martinez marked 'Configure Email Notifications' as Done.",                                        time: "5 hrs ago",   read: true  },
  { id: "N-006", type: "info",  title: "System maintenance",          message: "Scheduled maintenance on Mar 20 from 02:00–04:00 AM UTC. Expect brief downtime.",                    time: "1 day ago",   read: true  },
  { id: "N-007", type: "alert", title: "Payment method expiring",     message: "Your payment method ending in 4242 will expire next month. Update your billing details.",            time: "2 days ago",  read: true  },
  { id: "N-008", type: "event", title: "v2.4.0 Release scheduled",    message: "Production release has been scheduled for Mar 22 at 02:00 PM. All PRs must be merged by Mar 21.",  time: "3 days ago",  read: true  },
  { id: "N-009", type: "team",  title: "New comment on your PR",      message: "David Lee left a review on your pull request: 'Fix N+1 queries in orders module'.",                  time: "4 days ago",  read: true  },
  { id: "N-010", type: "info",  title: "New policy update",           message: "The company remote work policy has been updated. Please review the changes in the handbook.",        time: "1 week ago",  read: true  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const visible = useMemo(
    () => filter === "unread" ? notifications.filter((n) => !n.read) : notifications,
    [notifications, filter]
  );

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <AdminLayout headTitle="Notifications">
      {/* ── Header ── */}
      <div className="tw-rounded-2xl tw-overflow-hidden tw-mb-6 bg-dark tw-shadow-sm">
        <div className="tw-px-8 tw-py-8 tw-text-white tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-4">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-relative">
              <RiBellLine size={28} />
              {unreadCount > 0 && (
                <span className="tw-absolute -tw-top-1 -tw-right-1 tw-w-5 tw-h-5 tw-bg-amber-500 tw-rounded-full tw-text-xs tw-font-bold tw-flex tw-items-center tw-justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="tw-text-2xl tw-font-black tw-leading-none">Notifications</h1>
              <p className="tw-text-slate-400 tw-text-sm tw-mt-1">{unreadCount} unread</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-white/10 hover:tw-bg-white/20 tw-transition-colors tw-text-white tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg"
            >
              <RiCheckDoubleLine size={16} /> Mark all read
            </button>
          )}
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="tw-flex tw-gap-2 tw-mb-4">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-xs tw-font-semibold tw-capitalize tw-transition-colors ${
              filter === f
                ? "tw-bg-amber-500 tw-text-white"
                : "tw-bg-white tw-text-slate-600 tw-shadow-sm hover:tw-shadow"
            }`}
          >
            {f} {f === "unread" && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      {/* ── List ── */}
      <Card className="tw-border-0 tw-shadow-sm tw-pb-8">
        <Card.Body className="tw-p-0">
          {visible.length === 0 ? (
            <div className="tw-text-center tw-py-16 tw-text-slate-400">
              <RiBellLine size={32} className="tw-mx-auto tw-mb-3 tw-opacity-30" />
              <p className="tw-text-sm">No notifications</p>
            </div>
          ) : (
            <div className="tw-divide-y tw-divide-slate-50">
              {visible.map((n) => {
                const s = typeStyle[n.type];
                return (
                  <div
                    key={n.id}
                    className={`tw-flex tw-items-start tw-gap-4 tw-px-5 tw-py-4 tw-transition-colors hover:tw-bg-amber-50/20 ${!n.read ? "tw-bg-amber-50/10" : ""}`}
                    onClick={() => markRead(n.id)}
                  >
                    <div className={`tw-w-9 tw-h-9 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 ${s.bg}`}>
                      <span className={s.text}>{s.icon}</span>
                    </div>
                    <div className="tw-flex-1 tw-min-w-0">
                      <div className="tw-flex tw-items-start tw-justify-between tw-gap-2">
                        <p className={`tw-text-sm tw-font-semibold ${n.read ? "tw-text-slate-600" : "tw-text-slate-900"}`}>
                          {n.title}
                          {!n.read && <span className="tw-inline-block tw-w-2 tw-h-2 tw-bg-amber-500 tw-rounded-full tw-ms-2 tw-align-middle" />}
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                          className="tw-flex-shrink-0 tw-text-slate-300 hover:tw-text-red-400 tw-transition-colors"
                        >
                          <RiDeleteBinLine size={15} />
                        </button>
                      </div>
                      <p className="tw-text-xs tw-text-slate-500 tw-mt-0.5">{n.message}</p>
                      <p className="tw-text-xs tw-text-slate-400 tw-mt-1">{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}
