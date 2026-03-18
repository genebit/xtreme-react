import { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  decoration?: ReactNode;
}

export default function PageHero({ title, subtitle, children, decoration }: PageHeroProps) {
  return (
    <div className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-mb-6 bg-dark tw-shadow-md tw-border-amber-500">
      <div className="tw-px-8 tw-py-8 tw-text-white tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-4">
        <div>
          <h1 className="tw-text-2xl tw-font-black">{title}</h1>
          {subtitle && <p className="tw-text-slate-400 tw-text-sm tw-mt-1">{subtitle}</p>}
        </div>
        {children && <div className="tw-flex tw-items-center tw-gap-3">{children}</div>}
      </div>
      {decoration && (
        <span className="tw-pointer-events-none tw-absolute tw-right-10 tw-top-1/2 -tw-translate-y-1/2 tw-opacity-10 tw-scale-125">
          {decoration}
        </span>
      )}
    </div>
  );
}
