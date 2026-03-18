import { twMerge } from "tailwind-merge";
import { useSidebar } from "../contexts/SidebarContext";

export default function Breadcrumbs() {
  const { isSidebarOpen } = useSidebar();

  return (
    <nav
      className={twMerge(
        "tw-px-4 lg:tw-ps-14 tw-py-3 tw-h-14 tw-bg-white tw-border-b tw-ms-0 md:tw-ms-[65px] tw-flex tw-items-center tw-transition-all tw-duration-300",
        isSidebarOpen ? "lg:tw-ms-[250px]" : "lg:tw-ms-[65px]",
      )}
      aria-label="breadcrumb"
      style={{
        ["--bs-breadcrumb-divider" as any]:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
      }}
    >
      <ol className="tw-m-0 breadcrumb tw-ps-4">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item active" aria-current="page">
          Blocks
        </li>
      </ol>
    </nav>
  );
}
