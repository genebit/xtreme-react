import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";
import { Button, Dropdown } from "react-bootstrap";

import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiBarChart2Line,
  RiCalendarCheckLine,
  RiCheckDoubleLine,
  RiCompass3Line,
  RiFileListLine,
  RiFlag2Line,
  RiFolder3Line,
  RiInformationLine,
  RiLayoutGridLine,
  RiNotification3Line,
  RiSearchLine,
  RiShieldLine,
  RiSidebarFoldLine,
  RiSidebarUnfoldFill,
  RiTeamLine,
  RiTimeLine,
  RiUser3Line,
} from "@remixicon/react";

import { useSidebar } from "../contexts/SidebarContext";
import { HeaderNavbarLinkMegaProps, HeaderNavbarLinkProps } from "../types/HeaderNavbar";

function HeaderNavbarLink({
  type = "wrapper",
  alwaysPresent = false,
  toggler = false,
  href,
  className,
  children,
  ...props
}: HeaderNavbarLinkProps) {
  const defaultClass = `tw-text-center tw-items-center tw-h-full hover:tw-cursor-pointer hover:tw-bg-opacity-30 tw-transition ${
    toggler ? "tw-flex lg:tw-hidden" : alwaysPresent ? "tw-flex" : "lg:tw-flex tw-hidden"
  }`;

  return (
    <li className="tw-list-none tw-h-full">
      {type === "link" && href ? (
        <a
          {...props}
          href={href}
          className={twMerge(
            "tw-text-white tw-px-3 hover:tw-bg-slate-950 waves-effect waves-light",
            defaultClass,
            className,
          )}
        >
          {children}
        </a>
      ) : type === "btn" ? (
        <Button
          {...props}
          variant="ghost"
          className={twMerge(
            "tw-text-white tw-px-3 hover:tw-bg-slate-950 tw-rounded-none waves-effect waves-light",
            defaultClass,
            className,
          )}
        >
          {children}
        </Button>
      ) : (
        <div className={twMerge(defaultClass, className)}>{children}</div>
      )}
    </li>
  );
}

function HeaderNavbarLinkMega({
  label,
  alwaysPresent = false,
  className,
  children,
  ...props
}: HeaderNavbarLinkMegaProps) {
  const [isMegaDropdownOpen, setIsMegaDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsMegaDropdownOpen(!isMegaDropdownOpen);
  };

  useEffect(() => {
    if (!isMegaDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMegaDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMegaDropdownOpen]);

  return (
    <div className="tw-h-full" ref={dropdownRef}>
      <HeaderNavbar.Link
        className="!tw-text-white"
        type="btn"
        alwaysPresent={alwaysPresent}
        {...props}
        onClick={toggleDropdown}
      >
        {label}
        {isMegaDropdownOpen ? (
          <RiArrowUpSLine size={18} className="tw-ms-1" />
        ) : (
          <RiArrowDownSLine size={18} className="tw-ms-1" />
        )}
      </HeaderNavbar.Link>
      <div
        className={`${
          isMegaDropdownOpen ? "tw-block" : "tw-hidden"
        } tw-w-full animate__animated animate__zoomIn animate__faster tw-bg-white tw-shadow-2xl tw-shadow-neutral-400/40 tw-absolute tw-left-0 tw-top-full tw-border-t-2 tw-border-amber-500 tw-z-50`}
      >
        {children}
      </div>
    </div>
  );
}

function HeaderNavbarWrapper({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={twMerge("tw-list-none tw-flex tw-gap-2 tw-h-full tw-items-center", className)} {...props}>
      {children}
    </ul>
  );
}

function HeaderNavbar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <nav
      className={twMerge(
        "tw-px-4 tw-h-16 tw-bg-gradient-to-tr tw-from-[#07325B] tw-to-[#0C4B81] tw-ms-0 md:tw-ms-[65px] tw-transition-all tw-duration-300 tw-border-b-[5px] tw-border-amber-500 tw-flex tw-items-center tw-relative",
        isSidebarOpen ? "lg:tw-ms-[250px]" : "lg:tw-ms-[65px]",
      )}
    >
      <HeaderNavbar.Wrapper>
        <HeaderNavbar.Link type="btn" className="md:tw-hidden lg:tw-inline" alwaysPresent onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <RiSidebarFoldLine size={18} className="tw-text-white" />
          ) : (
            <RiSidebarUnfoldFill size={18} className="tw-text-white" />
          )}
        </HeaderNavbar.Link>
        <HeaderNavbarLink.Mega label="Tasks">
          <div className="tw-px-6 tw-py-5 tw-max-w-5xl tw-mx-auto">
            <div className="tw-grid tw-grid-cols-3 tw-gap-6">
              <div>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3 tw-pb-3 tw-border-b tw-border-slate-100">
                  <div className="tw-w-7 tw-h-7 tw-rounded-lg tw-bg-amber-50 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                    <RiFlag2Line size={14} className="tw-text-amber-600" />
                  </div>
                  <p className="tw-text-xs tw-font-bold tw-text-slate-800 tw-uppercase tw-tracking-wider tw-mb-0">In Progress</p>
                  <span className="tw-ms-auto tw-text-[10px] tw-font-bold tw-bg-amber-100 tw-text-amber-700 tw-px-1.5 tw-py-0.5 tw-rounded-full">5</span>
                </div>
                <ul className="tw-list-none tw-p-0 tw-m-0 tw-flex tw-flex-col tw-gap-0.5">
                  {[
                    { name: "CI/CD Pipeline Setup",         priority: "High", dot: "tw-bg-red-500",    badge: "tw-bg-red-50 tw-text-red-600" },
                    { name: "Implement User Authentication", priority: "High", dot: "tw-bg-red-500",    badge: "tw-bg-red-50 tw-text-red-600" },
                    { name: "Design Dashboard UI",          priority: "Med",  dot: "tw-bg-amber-500",  badge: "tw-bg-amber-50 tw-text-amber-600" },
                    { name: "Integrate Payment Gateway",    priority: "Med",  dot: "tw-bg-amber-500",  badge: "tw-bg-amber-50 tw-text-amber-600" },
                    { name: "Write Unit Tests",             priority: "Low",  dot: "tw-bg-slate-300",  badge: "tw-bg-slate-100 tw-text-slate-500" },
                  ].map((t) => (
                    <li key={t.name} className="tw-flex tw-items-center tw-gap-2.5 tw-px-2 tw-py-1.5 tw-rounded-lg hover:tw-bg-slate-50 tw-cursor-pointer tw-transition-colors">
                      <span className={`tw-w-1.5 tw-h-1.5 tw-rounded-full tw-flex-shrink-0 ${t.dot}`} />
                      <span className="tw-text-xs tw-text-slate-700 tw-truncate tw-flex-1">{t.name}</span>
                      <span className={`tw-text-[10px] tw-font-semibold tw-px-1.5 tw-py-0.5 tw-rounded tw-flex-shrink-0 ${t.badge}`}>{t.priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3 tw-pb-3 tw-border-b tw-border-slate-100">
                  <div className="tw-w-7 tw-h-7 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                    <RiTimeLine size={14} className="tw-text-blue-600" />
                  </div>
                  <p className="tw-text-xs tw-font-bold tw-text-slate-800 tw-uppercase tw-tracking-wider tw-mb-0">To Do</p>
                  <span className="tw-ms-auto tw-text-[10px] tw-font-bold tw-bg-blue-100 tw-text-blue-700 tw-px-1.5 tw-py-0.5 tw-rounded-full">6</span>
                </div>
                <ul className="tw-list-none tw-p-0 tw-m-0 tw-flex tw-flex-col tw-gap-0.5">
                  {[
                    { name: "Optimize Database Queries",          priority: "High", dot: "tw-bg-red-500",    badge: "tw-bg-red-50 tw-text-red-600" },
                    { name: "Implement Role-Based Access",        priority: "High", dot: "tw-bg-red-500",    badge: "tw-bg-red-50 tw-text-red-600" },
                    { name: "Configure Email Notifications",      priority: "Med",  dot: "tw-bg-amber-500",  badge: "tw-bg-amber-50 tw-text-amber-600" },
                    { name: "Set Up Error Logging",               priority: "Med",  dot: "tw-bg-amber-500",  badge: "tw-bg-amber-50 tw-text-amber-600" },
                    { name: "Refactor Redux Store",               priority: "Low",  dot: "tw-bg-slate-300",  badge: "tw-bg-slate-100 tw-text-slate-500" },
                    { name: "Update Documentation",               priority: "Low",  dot: "tw-bg-slate-300",  badge: "tw-bg-slate-100 tw-text-slate-500" },
                  ].map((t) => (
                    <li key={t.name} className="tw-flex tw-items-center tw-gap-2.5 tw-px-2 tw-py-1.5 tw-rounded-lg hover:tw-bg-slate-50 tw-cursor-pointer tw-transition-colors">
                      <span className={`tw-w-1.5 tw-h-1.5 tw-rounded-full tw-flex-shrink-0 ${t.dot}`} />
                      <span className="tw-text-xs tw-text-slate-700 tw-truncate tw-flex-1">{t.name}</span>
                      <span className={`tw-text-[10px] tw-font-semibold tw-px-1.5 tw-py-0.5 tw-rounded tw-flex-shrink-0 ${t.badge}`}>{t.priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3 tw-pb-3 tw-border-b tw-border-slate-100">
                  <div className="tw-w-7 tw-h-7 tw-rounded-lg tw-bg-teal-50 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                    <RiCheckDoubleLine size={14} className="tw-text-teal-600" />
                  </div>
                  <p className="tw-text-xs tw-font-bold tw-text-slate-800 tw-uppercase tw-tracking-wider tw-mb-0">Archived</p>
                  <span className="tw-ms-auto tw-text-[10px] tw-font-bold tw-bg-teal-100 tw-text-teal-700 tw-px-1.5 tw-py-0.5 tw-rounded-full">6</span>
                </div>
                <ul className="tw-list-none tw-p-0 tw-m-0 tw-flex tw-flex-col tw-gap-0.5">
                  {[
                    "Initial Project Setup",
                    "Configure ESLint & Prettier",
                    "Deploy to Staging",
                    "Fix Login Bug",
                    "Update Landing Page",
                    "Remove Deprecated APIs",
                  ].map((name) => (
                    <li key={name} className="tw-flex tw-items-center tw-gap-2.5 tw-px-2 tw-py-1.5 tw-rounded-lg hover:tw-bg-slate-50 tw-cursor-pointer tw-transition-colors">
                      <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-flex-shrink-0 tw-bg-teal-400" />
                      <span className="tw-text-xs tw-text-slate-400 tw-truncate tw-flex-1 tw-line-through">{name}</span>
                      <span className="tw-text-[10px] tw-font-semibold tw-px-1.5 tw-py-0.5 tw-rounded tw-flex-shrink-0 tw-bg-teal-50 tw-text-teal-600">Done</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tw-mt-4 tw-pt-4 tw-border-t tw-border-slate-100 tw-flex tw-items-center tw-justify-between">
              <div className="tw-flex tw-gap-5">
                <span className="tw-text-xs tw-text-slate-500"><span className="tw-font-bold tw-text-slate-800">17</span> total</span>
                <span className="tw-text-xs tw-text-slate-500"><span className="tw-font-bold tw-text-amber-600">5</span> in progress</span>
                <span className="tw-text-xs tw-text-slate-500"><span className="tw-font-bold tw-text-blue-600">6</span> to do</span>
                <span className="tw-text-xs tw-text-slate-500"><span className="tw-font-bold tw-text-teal-600">6</span> archived</span>
              </div>
              <a
                href={route("starter")}
                className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-font-semibold tw-text-amber-600 hover:tw-text-amber-800 tw-no-underline tw-transition-colors"
              >
                View all tasks <RiArrowRightLine size={12} />
              </a>
            </div>
          </div>
        </HeaderNavbarLink.Mega>
      </HeaderNavbar.Wrapper>
      <HeaderNavbar.Wrapper className="tw-ms-auto">
        <HeaderNavbar.Link>
          <div className="tw-relative tw-w-56 tw-ms-auto hover:tw-w-full tw-transition-[width] tw-shadow-2xl tw-shadow-neutral-400">
            <input
              type="search"
              autoComplete="off"
              className="form-control tw-rounded-md tw-border-none tw-w-full tw-ps-10 tw-pe-20 tw-bg-neutral-50 tw-appearance-none tw-text-xs"
              placeholder="Search..."
            />
            <RiSearchLine size={20} className="tw-absolute tw-left-4 tw-top-1/2 -tw-translate-y-1/2" />
            <div className="tw-flex tw-gap-1 tw-absolute tw-right-4 tw-top-1/2 -tw-translate-y-1/2 tw-scale-85">
              <span className="tw-text-center tw-rounded-md tw-px-2 tw-py-1 tw-bg-slate-300 tw-text-xs tw-font-semibold">
                {navigator.platform.includes("Mac") ? "CMD" : "CTRL"}
              </span>
              <div>+</div>
              <span className="tw-text-center tw-rounded-md tw-px-2 tw-py-1 tw-bg-slate-300 tw-text-xs tw-font-semibold">
                K
              </span>
            </div>
          </div>
        </HeaderNavbar.Link>
        <HeaderNavbar.Link alwaysPresent>
          <Dropdown align="end" className="tw-h-full tw-w-full">
            <Dropdown.Toggle
              variant="icon"
              className="tw-border-0 tw-flex tw-items-center tw-rounded-none tw-w-full tw-h-full tw-text-white waves-effect waves-light"
              id="notification-dropdown-toggle"
            >
              <div className="tw-relative">
                <RiNotification3Line size={18} className="tw-text-white" />
                <span className="tw-absolute -tw-top-1 -tw-right-0.5 tw-h-2.5 tw-w-2.5 tw-bg-teal-500 tw-rounded-full tw-animate-ping"></span>
                <span className="tw-absolute -tw-top-0.5 tw-right-0 tw-h-2 tw-w-2 tw-bg-teal-500 tw-rounded-full"></span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="tw-w-96 tw-p-0 tw-shadow-2xl tw-shadow-neutral-400 tw-rounded-md animate__animated animate__zoomIn animate__faster">
              <div className="with-arrow">
                <span className="tw-bg-amber-600"></span>
              </div>
              <div className="drop-title tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 tw-rounded-t-md tw-px-2 tw-py-3">
                <h6 className="tw-font-bold tw-uppercase tw-tracking-wider tw-text-white tw-mb-0">Notifications</h6>
                <small className="mb-0 tw-text-white tw-font-normal tw-text-xs">Activity logs for this week</small>
              </div>
              <div className="notifications tw-overflow-y-auto tw-overscroll-contain tw-max-h-80">
                {[
                  {
                    icon: <RiShieldLine size={14} />,
                    bg: "tw-bg-red-50",
                    text: "tw-text-red-600",
                    title: "Login from new device",
                    body: "Chrome on Windows 11 — if not you, secure your account.",
                    time: "2m ago",
                    unread: true,
                  },
                  {
                    icon: <RiFlag2Line size={14} />,
                    bg: "tw-bg-teal-50",
                    text: "tw-text-teal-600",
                    title: "Task assigned to you",
                    body: "Alice assigned 'CI/CD Pipeline Setup' — High priority.",
                    time: "15m ago",
                    unread: true,
                  },
                  {
                    icon: <RiCalendarCheckLine size={14} />,
                    bg: "tw-bg-amber-50",
                    text: "tw-text-amber-600",
                    title: "Reminder: Q1 Planning",
                    body: "Meeting tomorrow at 09:00 AM in Conference Room A.",
                    time: "1h ago",
                    unread: true,
                  },
                  {
                    icon: <RiTeamLine size={14} />,
                    bg: "tw-bg-blue-50",
                    text: "tw-text-blue-600",
                    title: "Carol Williams joined",
                    body: "Joined 'Xtreme Admin Panel' as a contributor.",
                    time: "3h ago",
                    unread: false,
                  },
                  {
                    icon: <RiFlag2Line size={14} />,
                    bg: "tw-bg-teal-50",
                    text: "tw-text-teal-600",
                    title: "Task completed",
                    body: "Bob marked 'Configure Email Notifications' as Done.",
                    time: "5h ago",
                    unread: false,
                  },
                  {
                    icon: <RiInformationLine size={14} />,
                    bg: "tw-bg-slate-100",
                    text: "tw-text-slate-500",
                    title: "System maintenance",
                    body: "Scheduled Mar 20, 02:00–04:00 AM UTC. Brief downtime.",
                    time: "1d ago",
                    unread: false,
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    className={`tw-flex tw-items-start tw-gap-3 tw-px-3 tw-py-2.5 hover:tw-bg-slate-50 tw-transition-colors tw-cursor-pointer ${n.unread ? "tw-bg-amber-50/40" : ""}`}
                  >
                    <div
                      className={`tw-w-7 tw-h-7 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 ${n.bg}`}
                    >
                      <span className={n.text}>{n.icon}</span>
                    </div>
                    <div className="tw-flex-1 tw-min-w-0">
                      <div className="tw-flex tw-items-center tw-justify-between tw-gap-1">
                        <p className="tw-text-xs tw-font-semibold tw-text-slate-800 tw-truncate">{n.title}</p>
                        {n.unread && (
                          <span className="tw-w-1.5 tw-h-1.5 tw-bg-amber-500 tw-rounded-full tw-flex-shrink-0" />
                        )}
                      </div>
                      <p className="tw-text-xs tw-text-slate-500 tw-line-clamp-1">{n.body}</p>
                      <p className="tw-text-xs tw-text-slate-400 tw-mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="tw-border-t tw-border-slate-100 tw-px-3 tw-py-2.5">
                <a
                  href={route("landing")}
                  className="tw-text-xs tw-font-semibold tw-text-amber-600 hover:tw-text-amber-800 tw-transition-colors"
                >
                  View all notifications →
                </a>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </HeaderNavbar.Link>
        <HeaderNavbar.Link alwaysPresent>
          <Dropdown align="end" className="tw-h-full">
            <Dropdown.Toggle
              variant="icon"
              className="tw-flex tw-border-0 tw-items-center !tw-text-white tw-rounded-none tw-gap-2 hover:tw-cursor-pointer tw-h-full waves-effect waves-light"
              id="user-dropdown-toggle"
            >
              <img
                src="https://i.pravatar.cc/36"
                alt="Avatar"
                className="rounded-circle tw-select-none"
                width={36}
                height={36}
                aria-expanded="false"
              />
              <span className="tw-pointer-events-none tw-select-none">johndoe</span>
              <RiArrowDownSLine />
            </Dropdown.Toggle>
            <Dropdown.Menu className="tw-bg-white tw-shadow-2xl tw-shadow-neutral-400 tw-rounded-lg tw-py-2 tw-w-60 animate__animated animate__zoomIn animate__faster">
              <div className="tw-px-4 tw-py-2 tw-flex tw-items-center tw-gap-3">
                <img src="https://i.pravatar.cc/36" alt="Avatar" className="tw-rounded-full" width={40} height={40} />
                <div className="tw-truncate">
                  <div className="tw-font-semibold tw-text-gray-900">John Doe</div>
                  <div className="tw-text-xs tw-text-gray-500">john.doe@email.com</div>
                  <div className="tw-text-xs tw-text-amber-600 tw-font-medium">Administrator</div>
                </div>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item className="tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-gray-700" href="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-gray-700"
                href="/settings"
              >
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-red-600" href="/logout">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </HeaderNavbar.Link>
        <HeaderNavbarLink.Mega toggler label={<RiCompass3Line />}>
          <div className="tw-px-5 tw-py-5">
            <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4 tw-pb-4 tw-border-b tw-border-slate-100">
              <img src="https://i.pravatar.cc/36" alt="Avatar" className="tw-rounded-full tw-flex-shrink-0" width={36} height={36} />
              <div>
                <p className="tw-text-sm tw-font-bold tw-text-slate-900 tw-mb-0">John Doe</p>
                <p className="tw-text-xs tw-text-amber-600 tw-font-medium tw-mb-0">Administrator</p>
              </div>
              <a href={route("landing")} className="tw-ms-auto tw-relative">
                <RiNotification3Line size={18} className="tw-text-slate-500" />
                <span className="tw-absolute -tw-top-0.5 -tw-right-0.5 tw-w-2 tw-h-2 tw-bg-teal-500 tw-rounded-full" />
              </a>
            </div>
            <p className="tw-text-[10px] tw-uppercase tw-tracking-widest tw-text-slate-400 tw-font-semibold tw-mb-2">Quick Navigation</p>
            <div className="tw-grid tw-grid-cols-3 tw-gap-2">
              {[
                { label: "Docs",         icon: <RiLayoutGridLine size={18} />,    href: route("landing"),                       bg: "tw-bg-amber-50",   text: "tw-text-amber-600" },
                { label: "Starter",      icon: <RiCompass3Line size={18} />,      href: route("starter"),                       bg: "tw-bg-blue-50",    text: "tw-text-blue-600" },
                { label: "Form Layouts", icon: <RiFileListLine size={18} />,      href: route("forms"),                         bg: "tw-bg-violet-50",  text: "tw-text-violet-600" },
                { label: "Typography",   icon: <RiBarChart2Line size={18} />,     href: route("landing") + "#typography",       bg: "tw-bg-teal-50",    text: "tw-text-teal-600" },
                { label: "Buttons",      icon: <RiFolder3Line size={18} />,       href: route("landing") + "#buttons",          bg: "tw-bg-rose-50",    text: "tw-text-rose-500" },
                { label: "Icons",        icon: <RiNotification3Line size={18} />, href: route("landing") + "#icons",            bg: "tw-bg-indigo-50",  text: "tw-text-indigo-600" },
                { label: "Modals",       icon: <RiUser3Line size={18} />,         href: route("landing") + "#modals",           bg: "tw-bg-amber-50",   text: "tw-text-amber-600" },
                { label: "Admin Layout", icon: <RiTeamLine size={18} />,          href: route("landing") + "#admin-layout",     bg: "tw-bg-slate-100",  text: "tw-text-slate-600" },
                { label: "Theme",        icon: <RiBarChart2Line size={18} />,     href: route("landing") + "#theme",            bg: "tw-bg-blue-50",    text: "tw-text-blue-600" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="tw-flex tw-flex-col tw-items-center tw-gap-1.5 tw-p-3 tw-rounded-xl hover:tw-bg-slate-50 tw-transition-colors tw-no-underline tw-group"
                >
                  <div className={`tw-w-9 tw-h-9 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 ${item.bg}`}>
                    <span className={item.text}>{item.icon}</span>
                  </div>
                  <span className="tw-text-[10px] tw-font-semibold tw-text-slate-600 group-hover:tw-text-slate-900 tw-transition-colors">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </HeaderNavbarLink.Mega>
      </HeaderNavbar.Wrapper>
    </nav>
  );
}

HeaderNavbar.Link = HeaderNavbarLink;
HeaderNavbarLink.Mega = HeaderNavbarLinkMega;
HeaderNavbar.Wrapper = HeaderNavbarWrapper;

export { HeaderNavbar };
