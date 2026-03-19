import { useState } from "react";

import { usePage } from "@inertiajs/react";
import { twMerge } from "tailwind-merge";
import { Card, Form } from "react-bootstrap";

import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiBookOpenLine,
  RiCornerDownRightLine,
  RiDashboard3Line,
  RiFileTextLine,
  RiGithubLine,
  RiLogoutBoxLine,
  RiMoreLine,
  RiSettings4Line,
  RiStackLine,
} from "@remixicon/react";

import { useSidebar } from "../contexts/SidebarContext";
import { SidebarNavLinkProps, SidebarNavLinkWrapperProps } from "../types/Sidebar";

function SidebarNavLinkWrapper({ className, children, ...props }: SidebarNavLinkWrapperProps) {
  return (
    <nav {...props} className={twMerge("tw-mt-3 tw-flex tw-flex-col tw-gap-3 tw-min-h-[calc(100vh-9rem)]", className)}>
      {children}
    </nav>
  );
}

function SidebarNavLinkSectionWrapper({ className, children, ...props }: SidebarNavLinkWrapperProps) {
  return (
    <ul className={twMerge("tw-flex tw-flex-col tw-gap-3", className)} {...props}>
      {children}
    </ul>
  );
}

const BASE_LINK = `tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-2.5 tw-rounded tw-transition-colors waves-effect waves-light`;
const INACTIVE_LINK = `tw-opacity-100 tw-text-white hover:tw-bg-white/10 hover:tw-opacity-90`;
const ACTIVE_LINK = `!tw-opacity-100 tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 tw-text-white`;

function SidebarNavLink({ icon, type = "link", href, className, children, items, ...props }: SidebarNavLinkProps) {
  const { url } = usePage();
  const { isSidebarOpen } = useSidebar();

  const isActive = (target?: string) => {
    if (!target) return false;
    return url === new URL(target, window.location.origin).pathname;
  };

  const linkActive = isActive(href);
  const anyChildActive = items?.some((item) => isActive(item.href)) ?? false;

  const [collapseItem, setCollapseItem] = useState<boolean>(!anyChildActive);

  return (
    <li>
      {type === "btn" ? (
        <button
          type="button"
          {...props}
          className={twMerge(BASE_LINK, INACTIVE_LINK, "!tw-border-0 tw-w-full", className)}
        >
          <span className="tw-flex-shrink-0 tw-opacity-70">{icon}</span>
          <span className="tw-truncate tw-text-sm tw-opacity-70">{children}</span>
        </button>
      ) : type === "dropdown" ? (
        <div>
          <div
            className={twMerge(BASE_LINK, anyChildActive ? ACTIVE_LINK : INACTIVE_LINK, `tw-cursor-pointer`, className)}
            onClick={() => setCollapseItem(!collapseItem)}
          >
            <span className="tw-flex-shrink-0 tw-opacity-70">{icon}</span>
            <span className="tw-truncate tw-text-sm tw-opacity-70">{children}</span>
            {collapseItem ? (
              <RiArrowDownSLine size={20} className="tw-ms-auto" />
            ) : (
              <RiArrowUpSLine size={20} className="tw-ms-auto" />
            )}
          </div>
          <ul
            className={`tw-ml-6 tw-mt-1 tw-space-y-1 tw-flex tw-flex-col tw-gap-2 ${
              collapseItem ? "tw-hidden" : !isSidebarOpen ? "!tw-hidden" : "tw-hidden lg:tw-flex group-hover:tw-flex"
            } animate__animated animate__zoomIn animate__faster`}
          >
            {items?.map((item, idx) => {
              const childActive = isActive(item.href);
              return (
                <li key={idx}>
                  <a href={item.href} className={twMerge(BASE_LINK, childActive ? ACTIVE_LINK : INACTIVE_LINK)}>
                    {item.icon ? (
                      <span className="tw-flex-shrink-0 tw-opacity-70">{item.icon}</span>
                    ) : (
                      <span className="tw-flex-shrink-0 tw-opacity-70">
                        <RiCornerDownRightLine size={18} />
                      </span>
                    )}
                    <span className="tw-text-sm tw-opacity-70">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <a
          {...props}
          role="button"
          href={href}
          className={twMerge(BASE_LINK, linkActive ? ACTIVE_LINK : INACTIVE_LINK, className)}
        >
          <span className={twMerge("tw-flex-shrink-0 tw-opacity-70", linkActive && "tw-text-amber-400")}>{icon}</span>
          <span className="tw-truncate tw-text-sm tw-opacity-70">{children}</span>
        </a>
      )}
    </li>
  );
}

function SidebarNavHeader({
  icon = <RiMoreLine size={18} />,
  type = "link",
  className,
  children,
  ...props
}: SidebarNavLinkProps) {
  return (
    <li>
      <span
        {...props}
        className={twMerge(
          `tw-flex tw-items-center tw-gap-2 tw-pointer-events-none tw-py-2 tw-px-2.5 tw-rounded tw-text-white tw-hover:bg-gray-700 tw-transition-colors waves-effect waves-light`,
          className,
        )}
      >
        <span className="tw-flex-shrink-0 tw-opacity-70 tw-text-amber-500">{icon}</span>
        <span className="tw-truncate tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden tw-uppercase tw-font-semibold tw-text-amber-500 tw-text-xs">
          {children}
        </span>
      </span>
    </li>
  );
}

function Sidebar() {
  const { isSidebarOpen, isSidebarHidden } = useSidebar();

  return (
    <aside
      id="sidebarNavigation"
      className={twMerge(
        "tw-group tw-fixed tw-h-screen md:tw-translate-x-0 md:tw-w-[65px] md:hover:tw-w-[250px] tw-transition-all tw-duration-300 tw-p-3 bg-dark tw-z-40 tw-overflow-clip hover:tw-overflow-y-auto",
        isSidebarOpen ? "tw-translate-x-0 lg:tw-w-[250px]" : "-tw-translate-x-full lg:tw-w-[65px]",
      )}
    >
      <header className="tw-sticky -tw-top-4 tw-z-30 bg-dark tw-pb-3">
        <div className="tw-flex tw-gap-3 tw-flex-row tw-items-center">
          <span
            className={`tw-min-w-9 tw-min-h-9 tw-object-cover tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto lg:tw-m-0 group-hover:tw-m-0 ${
              isSidebarOpen && isSidebarHidden ? "!tw-m-0" : isSidebarOpen ? "tw-m-0" : "lg:tw-mx-auto"
            }`}
            aria-label="Sample Logo"
          >
            <img src="/assets/imgs/logo-icon.png" alt="" className="tw-max-w-9 tw-brightness-200" />
          </span>
          <span
            className={`tw-text-white tw-font-big-shot tw-uppercase tw-hidden lg:tw-inline group-hover:tw-inline ${
              isSidebarOpen && isSidebarHidden ? "!tw-inline" : isSidebarOpen ? "tw-inline" : "lg:tw-hidden"
            }`}
          >
            XTREME
          </span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-3 tw-mt-10 tw-mb-3">
          <img
            src="https://i.pravatar.cc/36"
            alt="User Avatar"
            className={`tw-w-9 tw-h-9 tw-rounded-full tw-bg-gray-300 tw-object-cover tw-mx-auto lg:tw-m-0 group-hover:tw-m-0 ${
              isSidebarOpen && isSidebarHidden ? "!tw-m-0" : isSidebarOpen ? "tw-m-0" : "lg:tw-mx-auto"
            }`}
          />
          <div
            className={`tw-flex-col tw-min-w-0 tw-hidden lg:tw-flex group-hover:tw-flex ${
              isSidebarOpen && isSidebarHidden ? "!tw-flex" : isSidebarOpen ? "tw-flex" : "lg:tw-hidden"
            }`}
          >
            <span className="tw-text-white tw-font-semibold tw-truncate">John Doe</span>
            <span className="tw-text-gray-400 tw-text-xs tw-truncate">Full-stack Web Developer</span>
          </div>
        </div>
      </header>
      <Sidebar.NavWrapper className="tw-z-20">
        <Sidebar.NavSectionWrapper>
          <Sidebar.NavLink
            icon={<RiAddLine size={16} />}
            type="btn"
            className="tw-bg-gradient-to-tr tw-from-blue-600 tw-to-blue-500"
          >
            New Page
          </Sidebar.NavLink>
          <Sidebar.NavHeader>General</Sidebar.NavHeader>
          <Sidebar.NavLink icon={<RiDashboard3Line size={16} />} href={route("starter")}>
            Starter Page
          </Sidebar.NavLink>
          <Sidebar.NavLink
            type="dropdown"
            icon={<RiStackLine size={16} />}
            items={[
              { label: "Typography", href: route("landing") + "#typography" },
              { label: "Buttons", href: route("landing") + "#buttons" },
              { label: "Icons", href: route("landing") + "#icons" },
            ]}
          >
            Components
          </Sidebar.NavLink>
          <Sidebar.NavLink
            type="dropdown"
            icon={<RiFileTextLine size={16} />}
            items={[
              { label: "Form Layouts", href: route("forms") },
              { label: "Modals", href: route("landing") + "#modals" },
              { label: "React Select", href: route("landing") + "#react-select" },
              { label: "DataTables", href: route("landing") + "#datatables" },
            ]}
          >
            Forms & Overlays
          </Sidebar.NavLink>
        </Sidebar.NavSectionWrapper>
        <Sidebar.NavSectionWrapper>
          <Sidebar.NavHeader>Resources</Sidebar.NavHeader>
          <Sidebar.NavLink icon={<RiBookOpenLine size={16} />} href={route("landing")}>
            Documentation
          </Sidebar.NavLink>
          <Sidebar.NavLink icon={<RiGithubLine size={16} />} href="https://github.com/genebit/xtreme-react">
            GitHub
          </Sidebar.NavLink>
        </Sidebar.NavSectionWrapper>
        <Sidebar.NavSectionWrapper>
          <Sidebar.NavHeader>Account</Sidebar.NavHeader>
          <Sidebar.NavLink icon={<RiSettings4Line size={16} />} href={route("landing") + "#admin-layout"}>
            Settings
          </Sidebar.NavLink>
          <Sidebar.NavLink type="btn" className="text-danger" icon={<RiLogoutBoxLine size={16} />}>
            Logout
          </Sidebar.NavLink>
        </Sidebar.NavSectionWrapper>
      </Sidebar.NavWrapper>
    </aside>
  );
}

Sidebar.NavLink = SidebarNavLink;
Sidebar.NavHeader = SidebarNavHeader;
Sidebar.NavWrapper = SidebarNavLinkWrapper;
Sidebar.NavSectionWrapper = SidebarNavLinkSectionWrapper;

export default Sidebar;
