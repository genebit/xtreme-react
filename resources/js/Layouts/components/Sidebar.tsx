import {
  RiAccountBoxLine,
  RiAddLine,
  RiArchive2Line,
  RiBellLine,
  RiBriefcase2Line,
  RiDashboard3Line,
  RiHome2Line,
  RiImportLine,
  RiLogoutBoxLine,
  RiMore2Line,
  RiMoreLine,
  RiSettings3Line,
  RiUser6Fill,
  RiUser6Line,
} from "@remixicon/react";
import { Badge, Button, NavLink } from "react-bootstrap";
import { twMerge } from "tailwind-merge";

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
    <nav {...props} className={twMerge("tw-mt-3", className)}>
      <ul className="tw-flex tw-flex-col tw-gap-3">{children}</ul>
    </nav>
  );
}

interface SidebarNavLinkProps {
  icon?: React.ReactNode;
  type?: "link" | "btn";
  className?: string;
  children: React.ReactNode;
}

function SidebarNavLink({
  icon,
  type = "link",
  className,
  children,
  ...props
}: SidebarNavLinkProps) {
  return (
    <li>
      {type === "btn" ? (
        <Button
          {...props}
          variant="primary"
          className={twMerge(
            "tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-rounded tw-w-full tw-transition-colors waves-effect waves-light",
            className
          )}
        >
          <span className="tw-flex-shrink-0">{icon}</span>
          <span className="tw-truncate tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden">
            {children}
          </span>
        </Button>
      ) : (
        <a
          {...props}
          role="button"
          href="#"
          className={twMerge(
            "tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-rounded tw-text-white tw-hover:bg-gray-700 tw-transition-colors waves-effect waves-light",
            className
          )}
        >
          <span className="tw-flex-shrink-0">{icon}</span>
          <span className="tw-truncate tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden">
            {children}
          </span>
        </a>
      )}
    </li>
  );
}

function SidebarNavHeader({
  icon = <RiMoreLine />,
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
          "tw-flex tw-items-center tw-gap-2 tw-py-2 tw-pointer-events-none tw-px-4 tw-rounded tw-text-white tw-hover:bg-gray-700 tw-transition-colors waves-effect waves-light",
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

export default function Sidebar() {
  return (
    <aside className="tw-fixed tw-min-h-screen tw-w-[250px] tw-p-3 bg-dark tw-z-40">
      <div className="tw-flex tw-gap-3 tw-flex-row tw-items-center">
        <span
          className="tw-w-[36px] tw-h-[36px] tw-rounded-full tw-bg-gray-300 tw-flex tw-items-center tw-justify-center"
          aria-label="Sample Logo"
        >
          LG
        </span>
        <span className="tw-text-white tw-font-big-shot tw-uppercase">
          Application
        </span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-3 tw-mt-4">
        <img
          src="https://i.pravatar.cc/36"
          alt="User Avatar"
          className="tw-w-[36px] tw-h-[36px] tw-rounded-full tw-bg-gray-300 tw-object-cover"
        />
        <div className="tw-flex tw-flex-col tw-min-w-0">
          <span className="tw-text-white tw-font-semibold tw-truncate tw-max-w-[140px]">
            John Doe
          </span>
          <span className="tw-text-gray-400 tw-text-xs tw-truncate tw-max-w-[140px]">
            Senior Developer
          </span>
        </div>
      </div>
      <SidebarNavLinkWrapper>
        <SidebarNavLink icon={<RiAddLine size={20} />} type="btn">
          Create Tasks
        </SidebarNavLink>
        <SidebarNavHeader>Navigation</SidebarNavHeader>
        <SidebarNavLink icon={<RiDashboard3Line size={20} />}>
          Dashboard
        </SidebarNavLink>
        <SidebarNavLink icon={<RiImportLine size={20} />}>
          Reports
        </SidebarNavLink>
        <SidebarNavLink icon={<RiUser6Line size={20} />}>
          Employee Management
        </SidebarNavLink>
        <SidebarNavLink icon={<RiSettings3Line size={20} />}>
          Settings
        </SidebarNavLink>
      </SidebarNavLinkWrapper>
      <SidebarNavLinkWrapper className="tw-mt-6">
        <SidebarNavHeader>Projects</SidebarNavHeader>
        <SidebarNavLink icon={<RiBriefcase2Line size={20} />}>
          Active Projects <Badge bg="primary">4</Badge>
        </SidebarNavLink>
        <SidebarNavLink icon={<RiArchive2Line size={20} />}>
          Archived Projects
        </SidebarNavLink>
      </SidebarNavLinkWrapper>
      <SidebarNavLinkWrapper className="tw-mt-6">
        <SidebarNavHeader>Account</SidebarNavHeader>
        <SidebarNavLink icon={<RiAccountBoxLine size={20} />}>
          Profile
        </SidebarNavLink>
        <SidebarNavLink icon={<RiBellLine size={20} />}>
          Notifications <Badge bg="danger">9+</Badge>
        </SidebarNavLink>
        <SidebarNavLink
          className="text-danger"
          icon={<RiLogoutBoxLine size={20} />}
        >
          Logout
        </SidebarNavLink>
      </SidebarNavLinkWrapper>
    </aside>
  );
}
