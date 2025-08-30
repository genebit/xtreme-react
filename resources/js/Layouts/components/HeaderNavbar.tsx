import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";
import { Card, Dropdown } from "react-bootstrap";
import { Button, Col, Row } from "react-bootstrap";

import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCompass3Line,
  RiCornerDownRightLine,
  RiNotification3Line,
  RiSearchLine,
  RiSidebarFoldLine,
  RiSidebarUnfoldFill,
} from "@remixicon/react";

import { useSidebar } from "../contexts/SidebarContext";
import {
  HeaderNavbarLinkMegaProps,
  HeaderNavbarLinkProps,
} from "../types/HeaderNavbar";

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
    toggler
      ? "tw-flex lg:tw-hidden"
      : alwaysPresent
      ? "tw-flex"
      : "lg:tw-flex tw-hidden"
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
            className
          )}
        >
          {children}
        </a>
      ) : type === "button" ? (
        <Button
          {...props}
          variant="ghost"
          className={twMerge(
            "tw-text-white tw-px-3 hover:tw-bg-slate-950 tw-rounded-none waves-effect waves-light",
            defaultClass,
            className
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
        type="button"
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
        } tw-w-full animate__animated animate__zoomIn animate__faster tw-px-6 tw-py-8 tw-pb-10 tw-bg-white tw-shadow-2xl tw-shadow-neutral-400 tw-absolute tw-left-0 tw-top-full`}
      >
        {children}
      </div>
    </div>
  );
}

function HeaderNavbarWrapper({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul
      className={twMerge(
        "tw-list-none tw-flex tw-gap-2 tw-h-full tw-items-center",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

function HeaderNavbar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <nav
      className={`tw-px-4 tw-h-16 bg-dark-blue tw-ms-0 md:tw-ms-[65px] lg:tw-ms-[250px] ${
        isSidebarOpen ? "lg:tw-ms-[250px]" : "lg:tw-ms-[65px]"
      } tw-transition-all tw-border-b-[5px] tw-border-amber-500 tw-flex tw-items-center tw-relative`}
    >
      <HeaderNavbar.Wrapper>
        <HeaderNavbar.Link
          type="button"
          className="md:tw-hidden lg:tw-inline"
          alwaysPresent
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <RiSidebarFoldLine className="tw-text-white" />
          ) : (
            <RiSidebarUnfoldFill className="tw-text-white" />
          )}
        </HeaderNavbar.Link>
        <HeaderNavbarLink.Mega label="Tasks">
          <Row>
            <Col md="4">
              <h4 className="tw-font-light tw-uppercase tw-text-sm tw-tracking-wider">
                Tasks
              </h4>
              <ul className="tw-ms-4 *:tw-my-2">
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  CI/CD Pipeline Setup in GitHub
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Implement User Authentication
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Design Dashboard UI
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Integrate Payment Gateway
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Write Unit Tests
                </li>
              </ul>
            </Col>
            <Col md="4">
              <h4 className="tw-font-light tw-uppercase tw-text-sm tw-tracking-wider">
                Remaining
              </h4>
              <ul className="tw-ms-4 *:tw-my-2">
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Optimize Database Queries
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Implement Role-Based Access Control
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Configure Email Notifications
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Set Up Error Logging
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Refactor Redux Store
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Update Documentation
                </li>
              </ul>
            </Col>
            <Col md="4">
              <h4 className="tw-font-light tw-uppercase tw-text-sm tw-tracking-wider">
                Archived
              </h4>
              <ul className="tw-ms-4 *:tw-my-2">
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Initial Project Setup
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Configure ESLint & Prettier
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Deploy to Staging
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Fix Login Bug
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Update Landing Page
                </li>
                <li className="tw-flex tw-items-center tw-gap-2">
                  <RiCornerDownRightLine size={18} />
                  Remove Deprecated APIs
                </li>
              </ul>
            </Col>
          </Row>
        </HeaderNavbarLink.Mega>
      </HeaderNavbar.Wrapper>
      <HeaderNavbar.Wrapper className="tw-ms-auto">
        <HeaderNavbar.Link type="link" href="#">
          Management
        </HeaderNavbar.Link>
        <HeaderNavbar.Link type="link" href="#">
          Inventory
        </HeaderNavbar.Link>
        <HeaderNavbar.Link>
          <div className="tw-relative tw-w-56 tw-ms-auto hover:tw-w-full tw-transition-[width] tw-shadow-2xl tw-shadow-neutral-400">
            <input
              type="search"
              autoComplete="off"
              className="form-control tw-rounded-md tw-border-none tw-w-full tw-ps-10 tw-pe-20 tw-bg-neutral-50 tw-appearance-none"
              placeholder="Search..."
            />
            <RiSearchLine
              size={20}
              className="tw-absolute tw-left-4 tw-top-1/2 -tw-translate-y-1/2"
            />
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
                <RiNotification3Line className="tw-text-white" />
                <span className="tw-absolute -tw-top-1 -tw-right-0.5 tw-h-2.5 tw-w-2.5 tw-bg-teal-500 tw-rounded-full tw-animate-ping"></span>
                <span className="tw-absolute -tw-top-0.5 tw-right-0 tw-h-2 tw-w-2 tw-bg-teal-500 tw-rounded-full"></span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="tw-w-96 tw-p-0 tw-shadow-2xl tw-shadow-neutral-400 tw-rounded-md animate__animated animate__zoomIn animate__faster">
              <div className="with-arrow">
                <span className="tw-bg-amber-600"></span>
              </div>
              <div className="drop-title tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 tw-rounded-t-md tw-px-2 tw-py-3">
                <h6 className="tw-font-bold tw-uppercase tw-tracking-wider tw-text-white tw-mb-0">
                  Notifications
                </h6>
                <small className="mb-0 tw-text-white tw-font-normal tw-text-xs">
                  Activity logs for this week
                </small>
              </div>
              <div className="tw-p-2 notifications hover:tw-overflow-y-auto tw-overscroll-contain">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i}>
                    <span className="text-dark tw-text-xs tw-bg-slate-200 tw-animate-pulse tw-mt-1 tw-rounded tw-h-8 tw-w-full tw-block"></span>
                  </div>
                ))}
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
              <span className="tw-pointer-events-none tw-select-none">
                johndoe
              </span>
              <RiArrowDownSLine />
            </Dropdown.Toggle>
            <Dropdown.Menu className="tw-bg-white tw-shadow-2xl tw-shadow-neutral-400 tw-rounded-lg tw-py-2 tw-w-60 animate__animated animate__zoomIn animate__faster">
              <div className="tw-px-4 tw-py-2 tw-flex tw-items-center tw-gap-3">
                <img
                  src="https://i.pravatar.cc/36"
                  alt="Avatar"
                  className="tw-rounded-full"
                  width={40}
                  height={40}
                />
                <div className="tw-truncate">
                  <div className="tw-font-semibold tw-text-gray-900">
                    John Doe
                  </div>
                  <div className="tw-text-xs tw-text-gray-500">
                    john.doe@email.com
                  </div>
                  <div className="tw-text-xs tw-text-amber-600 tw-font-medium">
                    Administrator
                  </div>
                </div>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item
                className="tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-gray-700"
                href="/profile"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-gray-700"
                href="/settings"
              >
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-red-600"
                href="/logout"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </HeaderNavbar.Link>
        <HeaderNavbarLink.Mega toggler label={<RiCompass3Line />}>
          <Card className="tw-bg-slate-300 tw-animate-pulse tw-h-12 tw-mb-2 tw-border-none"></Card>
          <Card className="tw-bg-slate-300 tw-animate-pulse tw-h-32 tw-border-none"></Card>
        </HeaderNavbarLink.Mega>
      </HeaderNavbar.Wrapper>
    </nav>
  );
}

HeaderNavbar.Link = HeaderNavbarLink;
HeaderNavbarLink.Mega = HeaderNavbarLinkMega;
HeaderNavbar.Wrapper = HeaderNavbarWrapper;

export { HeaderNavbar };
