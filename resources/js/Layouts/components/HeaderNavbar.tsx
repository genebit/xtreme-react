import {
  RiArrowDownSLine,
  RiNotification3Line,
  RiSearchLine,
  RiSidebarFoldLine,
} from "@remixicon/react";
import { Button } from "react-bootstrap";
import { twMerge } from "tailwind-merge";

interface HeaderNavbarLinkProps {
  type?: "link" | "mega" | "dropdown";
  href: string;
  className?: string;
  children: React.ReactNode;
}

function HeaderNavbarLink({
  type = "link",
  href,
  className,
  children,
}: HeaderNavbarLinkProps) {
  return (
    <li
      className={twMerge(
        "tw-text-white hover:tw-bg-slate-950 hover:tw-bg-opacity-30 tw-transition tw-px-3 tw-text-center tw-flex tw-items-center tw-h-full hover:tw-cursor-pointer waves-effect waves-light",
        className
      )}
    >
      <a href={href}>{children}</a>
    </li>
  );
}

function HeaderNavbar() {
  return (
    <nav className="tw-px-4 tw-h-16 bg-dark-blue tw-ms-[250px] tw-border-b-[5px] tw-border-amber-500 tw-flex tw-items-center">
      <Button variant="icon" className="waves-effect waves-light">
        <RiSidebarFoldLine className="tw-text-white" />
      </Button>
      <ul className="tw-list-none tw-flex tw-ml-4 tw-h-full tw-items-center tw-ms-auto">
        <HeaderNavbarLink href="https://www.google.com">
          Management
        </HeaderNavbarLink>
        <HeaderNavbarLink href="https://www.google.com">
          Inventory
        </HeaderNavbarLink>
        <li className="tw-px-3 tw-text-center tw-flex tw-items-center tw-h-full hover:tw-cursor-pointer">
          <div className="tw-relative tw-w-56 tw-ms-auto hover:tw-w-full tw-transition-[width] tw-shadow-lg">
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
        </li>
        <li className="tw-px-3 tw-text-center tw-flex tw-items-center tw-h-full hover:tw-cursor-pointer">
          <div className="dropdown">
            <div className="tw-relative" data-bs-toggle="dropdown">
              <RiNotification3Line className="tw-text-white" />
              <span className="tw-absolute tw-top-0 -tw-right-0.5 tw-h-2.5 tw-w-2.5 tw-bg-teal-500 tw-rounded-full tw-animate-ping"></span>
              <span className="tw-absolute tw-top-0.5 tw-right-0 tw-h-2 tw-w-2 tw-bg-teal-500 tw-rounded-full"></span>
            </div>
            <ul className="dropdown-menu tw-w-96 tw-p-0">
              <span className="with-arrow">
                <span className="tw-bg-amber-600"></span>
              </span>
              <li>
                <div className="drop-title tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 tw-rounded-t-md tw-px-2 tw-py-3">
                  <h6 className="tw-font-bold tw-uppercase tw-tracking-wider tw-text-white tw-mb-0">
                    Notifications
                  </h6>
                  <small className="mb-0 tw-text-white tw-font-normal tw-text-xs">
                    Activity logs for this week
                  </small>
                </div>
              </li>
              <li>
                <div className="tw-p-2 notifications hover:tw-overflow-y-auto tw-overscroll-contain">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i}>
                      <span className="text-dark tw-text-xs tw-bg-slate-200 tw-animate-pulse tw-mt-1 tw-rounded tw-h-8 tw-w-full tw-block"></span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li className="tw-px-3 tw-text-center tw-flex tw-items-center tw-h-full hover:tw-cursor-pointer">
          <div className="dropdown">
            <div
              className="tw-flex tw-items-center tw-text-white tw-gap-2 hover:tw-cursor-pointer"
              data-bs-toggle="dropdown"
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
                jdoe
              </span>
              <RiArrowDownSLine />
            </div>
            <ul className="mt-2 dropdown-menu dropdown-menu-end tw-bg-white tw-shadow-lg tw-rounded-lg tw-py-2 tw-w-60">
              <li className="tw-px-4 tw-py-2 tw-flex tw-items-center tw-gap-3">
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
              </li>
              <li>
                <hr className="dropdown-divider tw-my-2" />
              </li>
              <li>
                <a
                  className="dropdown-item tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-gray-700"
                  href="/profile"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-gray-700"
                  href="/settings"
                >
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider tw-my-2" />
              </li>
              <li>
                <a
                  className="dropdown-item tw-px-4 tw-py-2 tw-block hover:tw-bg-gray-100 tw-text-red-600"
                  href="/logout"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

HeaderNavbar.NavLink = HeaderNavbarLink;

export { HeaderNavbar };
