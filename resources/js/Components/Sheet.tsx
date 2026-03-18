import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { RiCloseLine } from "@remixicon/react";
import { twMerge } from "tailwind-merge";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  side?: "left" | "right";
}

export default function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  width = "tw-w-80 sm:tw-w-96",
  side = "right",
}: SheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return createPortal(
    <div
      className={twMerge("tw-fixed tw-inset-0 tw-z-[9999]", !open && "tw-pointer-events-none")}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={twMerge(
          "tw-absolute tw-inset-0 tw-bg-black/40 tw-transition-opacity tw-duration-300",
          open ? "tw-opacity-100" : "tw-opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={twMerge(
          "tw-absolute tw-top-0 tw-h-full tw-bg-white tw-flex tw-flex-col tw-shadow-2xl",
          "tw-transition-transform tw-duration-300 tw-ease-in-out",
          width,
          side === "right" ? "tw-right-0" : "tw-left-0",
          open
            ? "tw-translate-x-0"
            : side === "right"
            ? "tw-translate-x-full"
            : "-tw-translate-x-full"
        )}
      >
        <div className="tw-flex tw-items-center tw-justify-between tw-px-5 tw-py-4 tw-border-b tw-border-slate-100 tw-shrink-0">
          {title != null ? (
            <span className="tw-font-semibold tw-text-slate-800 tw-text-sm">{title}</span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="tw-p-1.5 tw-rounded-md tw-text-slate-400 hover:tw-text-slate-600 hover:tw-bg-slate-100 tw-transition-colors"
          >
            <RiCloseLine size={16} />
          </button>
        </div>
        <div className="tw-flex-1 tw-overflow-y-auto tw-px-5 tw-py-5">{children}</div>
        {footer && (
          <div className="tw-shrink-0 tw-border-t tw-border-slate-100 tw-px-5 tw-py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
