import {
  RiArrowDownSLine,
  RiMenu3Line,
  RiNotification3Line,
  RiSearchLine,
  RiSidebarFoldLine,
  RiSidebarUnfoldFill,
  RiSidebarUnfoldLine,
} from "@remixicon/react";
import { Button } from "react-bootstrap";
import { twMerge } from "tailwind-merge";
import { Dropdown } from "react-bootstrap";
import { useSidebar } from "../contexts/SidebarContext";
import { useEffect } from "react";

interface NavbarLinkBaseProps extends React.HTMLAttributes<HTMLElement> {
  alwaysPresent?: boolean;
  toggler?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface NavbarLinkProps extends NavbarLinkBaseProps {
  type: "link";
  href: string;
}

interface NavbarOptionProps extends NavbarLinkBaseProps {
  type?: "button" | "wrapper";
  href?: never;
}

type HeaderNavbarLinkProps = NavbarLinkProps | NavbarOptionProps;

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
      } tw-transition-all tw-border-b-[5px] tw-border-amber-500 tw-flex tw-items-center`}
    >
      <HeaderNavbarWrapper>
        <HeaderNavbarLink type="button" alwaysPresent onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <RiSidebarFoldLine className="tw-text-white" />
          ) : (
            <RiSidebarUnfoldFill className="tw-text-white" />
          )}
        </HeaderNavbarLink>
        <HeaderNavbarLink>
          <Dropdown align="start" className="tw-h-full tw-w-full">
            <Dropdown.Toggle
              as="div"
              className="tw-flex tw-border-0 tw-items-center !tw-text-white tw-rounded-none tw-gap-2 hover:tw-cursor-pointer tw-h-full waves-effect waves-light"
              id="mega-dropdown-toggle"
            >
              Tasks
              <RiArrowDownSLine />
            </Dropdown.Toggle>
            <Dropdown.Menu className="tw-bg-white tw-shadow-2xl tw-shadow-neutral-400 tw-rounded-b-lg !tw-w-full !tw-left-0 !tw-right-0 animate__animated animate__zoomIn animate__faster">
              <Dropdown.Item>Task 1</Dropdown.Item>
              <Dropdown.Item>Task 2</Dropdown.Item>
              <Dropdown.Item>Task 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </HeaderNavbarLink>
      </HeaderNavbarWrapper>
      <HeaderNavbarWrapper className="tw-ms-auto">
        <HeaderNavbarLink type="link" href="#">
          Management
        </HeaderNavbarLink>
        <HeaderNavbarLink type="link" href="#">
          Inventory
        </HeaderNavbarLink>
        <HeaderNavbarLink>
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
        </HeaderNavbarLink>
        <HeaderNavbarLink>
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
        </HeaderNavbarLink>
        <HeaderNavbarLink>
          <Dropdown align="end" className="tw-h-full">
            <Dropdown.Toggle
              variant="icon"
              className="tw-flex tw-border-0 tw-items-center !tw-text-white tw-rounded-none tw-gap-2 hover:tw-cursor-pointer tw-h-full waves-effect waves-light"
              id="user-dropdown-toggle"
            >
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
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
                  src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
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
                    Admin
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
        </HeaderNavbarLink>
        <HeaderNavbarLink className="tw-flex lg:tw-hidden" toggler>
          <Dropdown align="end" className="tw-h-full tw-w-full">
            <Dropdown.Toggle
              as="div" // prevents default caret
              className="tw-border-0 tw-flex tw-items-center tw-rounded-none tw-w-full tw-h-full tw-text-white hover:tw-cursor-pointer waves-effect waves-light"
              id="navbar-dropdown-toggle"
            >
              <RiMenu3Line className="tw-text-white" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="tw-w-96 tw-rounded-lg tw-shadow-2xl tw-shadow-neutral-400 tw-overflow-hidden">
              <Dropdown.Item href="#">Management</Dropdown.Item>
              <Dropdown.Item href="#">Inventory</Dropdown.Item>
              <Dropdown.Divider />

              <div className="tw-px-3 tw-py-2 tw-relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control tw-rounded-md tw-border tw-w-full tw-ps-10"
                />
                <RiSearchLine
                  className="tw-absolute tw-top-1/2 tw-left-6 tw-transform tw--translate-y-1/2"
                  size={20}
                />
              </div>
              <Dropdown.Divider />

              {/* Notifications */}
              <div className="tw-px-3 tw-py-2">
                <h6 className="tw-text-xs tw-font-bold tw-uppercase tw-text-gray-500">
                  Notifications
                </h6>
                <div className="tw-max-h-40 tw-overflow-y-auto tw-mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="tw-text-xs tw-bg-slate-200 tw-rounded tw-h-6 tw-w-full tw-mb-1"
                    ></div>
                  ))}
                </div>
              </div>
              <Dropdown.Divider />

              {/* User menu */}
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="/logout" className="tw-text-red-600">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </HeaderNavbarLink>
      </HeaderNavbarWrapper>
    </nav>
  );
}

HeaderNavbar.NavLink = HeaderNavbarLink;

export { HeaderNavbar };
