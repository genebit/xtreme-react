import { useState } from "react";

import { twMerge } from "tailwind-merge";
import { Badge, Button, Card, Form } from "react-bootstrap";

import {
  RiAccountBoxLine,
  RiAddLine,
  RiArchive2Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiBellLine,
  RiBriefcase2Line,
  RiCalendar2Line,
  RiCornerDownRightLine,
  RiDashboard3Line,
  RiFilter2Line,
  RiLogoutBoxLine,
  RiMoreLine,
  RiTrelloLine,
} from "@remixicon/react";

import { useSidebar } from "../contexts/SidebarContext";

interface SidebarNavLinkWrapperProps {
  className?: string;
  children: React.ReactNode;
}

function SidebarNavLinkWrapper({
  className,
  children,
  ...props
}: SidebarNavLinkWrapperProps) {
  return (
    <nav
      {...props}
      className={twMerge(
        "tw-mt-3 tw-flex tw-flex-col tw-gap-3 tw-min-h-[calc(100vh-9rem)]",
        className
      )}
    >
      {children}
    </nav>
  );
}

function SidebarNavLinkSectionWrapper({
  className,
  children,
  ...props
}: SidebarNavLinkWrapperProps) {
  return (
    <ul
      className={twMerge("tw-flex tw-flex-col tw-gap-3", className)}
      {...props}
    >
      {children}
    </ul>
  );
}

interface SidebarNavLinkItemProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
}

interface SidebarNavLinkProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  type?: "link" | "btn" | "dropdown";
  className?: string;
  children: React.ReactNode;
  items?: SidebarNavLinkItemProps[];
}

function SidebarNavLink({
  icon,
  type = "link",
  className,
  children,
  items,
  ...props
}: SidebarNavLinkProps) {
  const [collapseItem, setCollapseItem] = useState<boolean>(true);

  return (
    <li>
      {type === "btn" ? (
        <Button
          {...props}
          variant="primary"
          className={twMerge(
            `tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-2.5 tw-rounded tw-w-full tw-transition-colors waves-effect waves-light`,
            className
          )}
        >
          <span className="tw-flex-shrink-0">{icon}</span>
          <span className="tw-truncate">{children}</span>
        </Button>
      ) : type === "dropdown" ? (
        <div>
          <div
            className={twMerge(
              `tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-2.5 tw-rounded tw-opacity-75 tw-text-white tw-hover:bg-gray-700 tw-cursor-pointer tw-transition-colors waves-effect waves-light`,
              className
            )}
            onClick={() => setCollapseItem(!collapseItem)}
          >
            <span className="tw-flex-shrink-0">{icon}</span>
            <span className="tw-truncate">{children}</span>
            {collapseItem ? (
              <RiArrowDownSLine size={20} className="tw-ms-auto" />
            ) : (
              <RiArrowUpSLine size={20} className="tw-ms-auto" />
            )}
          </div>
          <ul
            className={`tw-ml-6 tw-mt-1 tw-space-y-1 tw-flex tw-flex-col tw-gap-2 ${
              collapseItem
                ? "tw-hidden"
                : "tw-hidden lg:tw-flex group-hover:tw-flex"
            } animate__animated animate__zoomIn animate__faster`}
          >
            {items?.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className={`tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-2.5 tw-rounded tw-opacity-75 tw-text-white tw-hover:bg-gray-700 tw-transition-colors waves-effect waves-light`}
                >
                  {item.icon ? (
                    <span className="tw-flex-shrink-0">{item.icon}</span>
                  ) : (
                    <span className="tw-flex-shrink-0">
                      <RiCornerDownRightLine size={18} />
                    </span>
                  )}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <a
          {...props}
          role="button"
          href="#"
          className={twMerge(
            `tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-2.5 tw-rounded tw-opacity-75 tw-text-white tw-hover:bg-gray-700 tw-transition-colors waves-effect waves-light`,
            className
          )}
        >
          <span className="tw-flex-shrink-0">{icon}</span>
          <span className="tw-truncate">{children}</span>
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
          className
        )}
      >
        <span className="tw-flex-shrink-0 tw-text-amber-500">{icon}</span>
        <span className="tw-truncate tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden tw-uppercase tw-text-sm tw-font-semibold tw-text-amber-500">
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
      className={`tw-group tw-fixed tw-h-screen -tw-translate-x-full md:tw-translate-x-0 md:tw-w-[65px] hover:md:tw-w-[250px] ${
        isSidebarOpen ? "tw-translate-x-0 lg:tw-w-[250px]" : "lg:tw-w-[65px]"
      } tw-transition-all tw-p-3 bg-dark tw-z-40 tw-overflow-clip hover:tw-overflow-y-auto`}
    >
      <header className="tw-sticky tw-top-0 tw-z-30 bg-dark tw-pb-3">
        <div className="tw-flex tw-gap-3 tw-flex-row tw-items-center">
          <span
            className={`tw-min-w-9 tw-min-h-9 tw-object-cover tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto lg:tw-m-0 group-hover:tw-m-0 ${
              isSidebarOpen && isSidebarHidden
                ? "!tw-m-0"
                : isSidebarOpen
                ? "tw-m-0"
                : "lg:tw-mx-auto"
            }`}
            aria-label="Sample Logo"
          >
            <img
              src="/assets/imgs/logo-icon.png"
              alt=""
              className="tw-max-w-9 tw-brightness-200"
            />
          </span>
          <span
            className={`tw-text-white tw-font-big-shot tw-uppercase tw-hidden lg:tw-inline group-hover:tw-inline ${
              isSidebarOpen && isSidebarHidden
                ? "!tw-inline"
                : isSidebarOpen
                ? "tw-inline"
                : "lg:tw-hidden"
            }`}
          >
            XTREME
          </span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-3 tw-mt-4">
          <img
            src="https://i.pravatar.cc/36"
            alt="User Avatar"
            className={`tw-w-9 tw-h-9 tw-rounded-full tw-bg-gray-300 tw-object-cover tw-mx-auto lg:tw-m-0 group-hover:tw-m-0 ${
              isSidebarOpen && isSidebarHidden
                ? "!tw-m-0"
                : isSidebarOpen
                ? "tw-m-0"
                : "lg:tw-mx-auto"
            }`}
          />
          <div
            className={`tw-flex-col tw-min-w-0 tw-hidden lg:tw-flex group-hover:tw-flex ${
              isSidebarOpen && isSidebarHidden
                ? "!tw-flex"
                : isSidebarOpen
                ? "tw-flex"
                : "lg:tw-hidden"
            }`}
          >
            <span className="tw-text-white tw-font-semibold tw-truncate">
              John Doe
            </span>
            <span className="tw-text-gray-400 tw-text-xs tw-truncate">
              Full-stack Web Developer
            </span>
          </div>
        </div>
      </header>
      <Sidebar.NavWrapper className="tw-z-20">
        <Sidebar.NavSectionWrapper>
          <Sidebar.NavLink icon={<RiAddLine size={18} />} type="btn">
            Create Tasks
          </Sidebar.NavLink>
          <Sidebar.NavHeader>Navigation</Sidebar.NavHeader>
          <Sidebar.NavLink icon={<RiDashboard3Line size={18} />}>
            Dashboard
          </Sidebar.NavLink>
          <Sidebar.NavLink icon={<RiTrelloLine size={18} />}>
            My Tasks
          </Sidebar.NavLink>
          <Sidebar.NavLink icon={<RiCalendar2Line size={18} />}>
            Company Events
          </Sidebar.NavLink>
          <Sidebar.NavLink
            type="dropdown"
            icon={<RiFilter2Line size={18} />}
            items={[
              { label: "Overview", href: "/overview" },
              { label: "Export", href: "/export" },
            ]}
          >
            Reports
          </Sidebar.NavLink>
        </Sidebar.NavSectionWrapper>
        <Sidebar.NavSectionWrapper>
          <Sidebar.NavHeader>Projects</Sidebar.NavHeader>
          <Sidebar.NavLink icon={<RiBriefcase2Line size={18} />}>
            Active Projects <Badge bg="primary">4</Badge>
          </Sidebar.NavLink>
          <Sidebar.NavLink icon={<RiArchive2Line size={18} />}>
            Archived Projects
          </Sidebar.NavLink>
        </Sidebar.NavSectionWrapper>
        <Sidebar.NavSectionWrapper>
          <Sidebar.NavHeader>Account</Sidebar.NavHeader>
          <Sidebar.NavLink icon={<RiAccountBoxLine size={18} />}>
            Profile
          </Sidebar.NavLink>
          <Sidebar.NavLink icon={<RiBellLine size={18} />}>
            Notifications <Badge bg="danger">9+</Badge>
          </Sidebar.NavLink>
          <Sidebar.NavLink
            className="text-danger"
            icon={<RiLogoutBoxLine size={18} />}
          >
            Logout
          </Sidebar.NavLink>
        </Sidebar.NavSectionWrapper>
        <Sidebar.NavSectionWrapper className="tw-mt-auto">
          <Card
            className={`tw-bg-transparent tw-border-neutral-400 tw-hidden lg:tw-inline group-hover:tw-inline ${
              isSidebarOpen && isSidebarHidden
                ? "!tw-inline"
                : isSidebarOpen
                ? "tw-inline"
                : "lg:tw-hidden"
            }`}
          >
            <Card.Body className="tw-py-2">
              <Form>
                <Form.Check
                  className="tw-text-white tw-whitespace-nowrap"
                  type="switch"
                  id="custom-switch"
                  label="Dark Mode"
                />
              </Form>
            </Card.Body>
          </Card>
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
