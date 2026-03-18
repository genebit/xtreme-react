import { useState } from "react";
import { Card } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";
import {
  RiUser3Line,
  RiLockPasswordLine,
  RiShieldLine,
  RiCameraLine,
  RiCheckLine,
} from "@remixicon/react";

const FIELD =
  "!tw-rounded-md !tw-border-slate-200 !tw-bg-white !tw-text-sm !tw-text-slate-800 " +
  "!tw-shadow-none focus:!tw-ring-2 focus:!tw-ring-blue-500 focus:!tw-ring-offset-2 " +
  "!tw-transition-all placeholder:!tw-text-slate-400";

type Tab = "profile" | "password" | "security";

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout headTitle="Profile">
      {/* ── Header ── */}
      <div className="tw-rounded-2xl tw-overflow-hidden tw-mb-6 bg-dark tw-shadow-sm">
        <div className="tw-px-8 tw-py-8 tw-text-white tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-gap-5">
          <div className="tw-relative tw-flex-shrink-0">
            <img
              src="https://i.pravatar.cc/80"
              alt="Avatar"
              className="tw-w-20 tw-h-20 tw-rounded-full tw-border-2 tw-border-amber-500"
            />
            <button className="tw-absolute tw-bottom-0 tw-right-0 tw-w-7 tw-h-7 tw-bg-amber-500 hover:tw-bg-amber-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-colors">
              <RiCameraLine size={14} className="tw-text-white" />
            </button>
          </div>
          <div>
            <h1 className="tw-text-2xl tw-font-black">John Doe</h1>
            <p className="tw-text-slate-400 tw-text-sm">Full-stack Web Developer · <span className="tw-text-amber-400">Administrator</span></p>
            <p className="tw-text-slate-500 tw-text-xs tw-mt-0.5">john.doe@email.com</p>
          </div>
        </div>
      </div>

      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-6 tw-pb-8">
        {/* ── Sidebar tabs ── */}
        <div className="tw-w-full lg:tw-w-52 tw-flex-shrink-0">
          <nav className="tw-flex tw-flex-row lg:tw-flex-col tw-gap-1">
            {([
              { key: "profile",  label: "Profile Info",    icon: <RiUser3Line size={16} /> },
              { key: "password", label: "Change Password", icon: <RiLockPasswordLine size={16} /> },
              { key: "security", label: "Security",        icon: <RiShieldLine size={16} /> },
            ] as { key: Tab; label: string; icon: React.ReactNode }[]).map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`tw-flex tw-items-center tw-gap-2.5 tw-px-3 tw-py-2.5 tw-rounded-lg tw-text-sm tw-font-medium tw-text-left tw-transition-colors ${
                  tab === item.key
                    ? "tw-bg-amber-500 tw-text-white"
                    : "tw-text-slate-600 hover:tw-bg-slate-100"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Content ── */}
        <div className="tw-flex-1">
          {tab === "profile" && (
            <Card className="tw-border-0 tw-shadow-sm">
              <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
                <h2 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-0">Personal Information</h2>
              </Card.Header>
              <Card.Body className="tw-p-5">
                <form onSubmit={handleSave}>
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4 tw-mb-4">
                    <div>
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">First Name</label>
                      <input defaultValue="John" className={`form-control ${FIELD}`} />
                    </div>
                    <div>
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">Last Name</label>
                      <input defaultValue="Doe" className={`form-control ${FIELD}`} />
                    </div>
                    <div>
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">Email Address</label>
                      <input defaultValue="john.doe@email.com" type="email" className={`form-control ${FIELD}`} />
                    </div>
                    <div>
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">Phone</label>
                      <input defaultValue="+1 (555) 000-0000" type="tel" className={`form-control ${FIELD}`} />
                    </div>
                    <div className="sm:tw-col-span-2">
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">Job Title</label>
                      <input defaultValue="Full-stack Web Developer" className={`form-control ${FIELD}`} />
                    </div>
                    <div className="sm:tw-col-span-2">
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">Bio</label>
                      <textarea
                        className={`form-control ${FIELD}`}
                        rows={3}
                        defaultValue="Building scalable web applications with a focus on clean architecture and great user experience."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-transition-colors ${
                      saved
                        ? "tw-bg-teal-500 tw-text-white"
                        : "tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-shadow-sm tw-text-white"
                    }`}
                  >
                    {saved ? <><RiCheckLine size={16} /> Saved!</> : "Save Changes"}
                  </button>
                </form>
              </Card.Body>
            </Card>
          )}

          {tab === "password" && (
            <Card className="tw-border-0 tw-shadow-sm">
              <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
                <h2 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-0">Change Password</h2>
              </Card.Header>
              <Card.Body className="tw-p-5">
                <form onSubmit={handleSave}>
                  <div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-sm">
                    <div>
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">Current Password</label>
                      <input type="password" className={`form-control ${FIELD}`} placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">New Password</label>
                      <input type="password" className={`form-control ${FIELD}`} placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="tw-block tw-text-xs tw-font-semibold tw-text-slate-600 tw-mb-1.5">Confirm New Password</label>
                      <input type="password" className={`form-control ${FIELD}`} placeholder="••••••••" />
                    </div>
                    <button type="submit" className="tw-self-start tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-transition-all tw-shadow-sm">
                      Update Password
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          )}

          {tab === "security" && (
            <Card className="tw-border-0 tw-shadow-sm">
              <Card.Header className="tw-bg-white tw-border-0 tw-py-4 tw-px-5">
                <h2 className="tw-text-base tw-font-bold tw-text-slate-800 tw-mb-0">Security Settings</h2>
              </Card.Header>
              <Card.Body className="tw-p-5 tw-flex tw-flex-col tw-gap-4">
                {[
                  { label: "Two-Factor Authentication", description: "Add an extra layer of security to your account via authenticator app.", enabled: false },
                  { label: "Login Notifications",       description: "Receive an email whenever a new login is detected.",                   enabled: true  },
                  { label: "Session Timeout",           description: "Automatically log out after 30 minutes of inactivity.",               enabled: true  },
                ].map((setting) => (
                  <div key={setting.label} className="tw-flex tw-items-start tw-justify-between tw-gap-4 tw-py-3 tw-border-b tw-border-slate-50 last:tw-border-0">
                    <div>
                      <p className="tw-text-sm tw-font-semibold tw-text-slate-800">{setting.label}</p>
                      <p className="tw-text-xs tw-text-slate-500 tw-mt-0.5">{setting.description}</p>
                    </div>
                    <div className={`tw-flex-shrink-0 tw-w-10 tw-h-5 tw-rounded-full tw-cursor-pointer tw-transition-colors ${setting.enabled ? "tw-bg-amber-500" : "tw-bg-slate-200"}`}>
                      <div className={`tw-w-4 tw-h-4 tw-bg-white tw-rounded-full tw-shadow tw-mt-0.5 tw-transition-all ${setting.enabled ? "tw-ml-5" : "tw-ml-0.5"}`} />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
