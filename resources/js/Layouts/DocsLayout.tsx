import { useState } from "react";
import { ReactNode } from "react";
import { Head } from "@inertiajs/react";
import { twMerge } from "tailwind-merge";
import {
    RiGithubLine,
    RiMenuLine,
    RiCloseLine,
    RiArrowRightLine,
} from "@remixicon/react";

interface DocsLayoutProps {
    children: ReactNode;
    headTitle?: string;
    rightSidebar?: ReactNode;
}


export default function DocsLayout({
    children,
    headTitle,
    rightSidebar,
}: DocsLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const docs = route("landing");
    const NAV_GROUPS = [
        {
            group: "Getting Started",
            items: [
                { label: "Introduction",     href: `${docs}#introduction` },
                { label: "Tech Stack",       href: `${docs}#stack` },
                { label: "Installation",     href: `${docs}#installation` },
                { label: "Project Structure",href: `${docs}#project-structure` },
            ],
        },
        {
            group: "Components",
            items: [
                { label: "Typography",      href: `${docs}#typography` },
                { label: "Buttons",         href: `${docs}#buttons` },
                { label: "Icons",           href: `${docs}#icons` },
                { label: "Form Layouts",    href: route("forms") },
                { label: "Modals",          href: `${docs}#modals` },
                { label: "React Select",    href: `${docs}#react-select` },
                { label: "DataTables",      href: `${docs}#datatables` },
                { label: "Sidebar / Sheet", href: `${docs}#sheet` },
                { label: "ScrollSpy",       href: `${docs}#scroll-spy` },
                { label: "Admin Layout",    href: `${docs}#admin-layout` },
                { label: "Starter Page",    href: route("starter") },
            ],
        },
        {
            group: "Customization",
            items: [
                { label: "Theme",     href: `${docs}#theme` },
                { label: "Preloader", href: `${docs}#preloader` },
            ],
        },
        {
            group: "About",
            items: [{ label: "Credits", href: `${docs}#credits` }],
        },
    ];

    return (
        <>
            <Head title={headTitle ?? "Docs"} />
            <div className="tw-min-h-screen tw-bg-white tw-text-slate-900">
                <header className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 tw-h-14 tw-bg-white/90 tw-backdrop-blur tw-border-b tw-border-slate-200 tw-flex tw-items-center tw-px-4 sm:tw-px-6 tw-gap-4">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-shrink-0">
                        <div className="tw-w-7 tw-h-7 tw-rounded tw-bg-amber-500 tw-flex tw-items-center tw-justify-center tw-font-black tw-text-white tw-text-sm">
                            X
                        </div>
                        <span className="tw-font-bold tw-text-sm tw-text-slate-900">
                            Xtreme
                        </span>
                        <span className="tw-text-xs tw-text-slate-400 tw-font-medium">
                            Admin
                        </span>
                    </div>
                    <div className="tw-h-4 tw-w-px tw-bg-slate-200 tw-shrink-0" />
                    <nav className="tw-hidden sm:tw-flex tw-items-center tw-gap-1">
                        <a
                            href={route("landing")}
                            className="tw-text-sm tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-slate-600 hover:tw-text-slate-900 hover:tw-bg-slate-100 tw-no-underline tw-transition-colors"
                        >
                            Docs
                        </a>
                        <a
                            href={route("dashboard")}
                            className="tw-text-sm tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-slate-600 hover:tw-text-slate-900 hover:tw-bg-slate-100 tw-no-underline tw-transition-colors"
                        >
                            Demo
                        </a>
                    </nav>
                    <div className="tw-flex-1" />
                    <div className="tw-flex tw-items-center tw-gap-2">
                        <a
                            href="https://github.com/genebit/xtreme-react"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-text-slate-600 hover:tw-text-slate-900 hover:tw-bg-slate-100 tw-transition-colors"
                        >
                            <RiGithubLine size={18} />
                        </a>
                        <a
                            href={route("dashboard")}
                            className="tw-hidden sm:tw-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-semibold tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-white tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 hover:tw-from-amber-600 hover:tw-to-amber-700 tw-no-underline tw-transition-all"
                        >
                            Live Demo
                            <RiArrowRightLine size={14} />
                        </a>
                        <button
                            className="sm:tw-hidden tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-text-slate-600 hover:tw-bg-slate-100 tw-transition-colors tw-border-0 tw-bg-transparent"
                            onClick={() => setSidebarOpen((v) => !v)}
                        >
                            {sidebarOpen ? (
                                <RiCloseLine size={18} />
                            ) : (
                                <RiMenuLine size={18} />
                            )}
                        </button>
                    </div>
                </header>
                <aside
                    className={twMerge(
                        "tw-fixed tw-top-14 tw-left-0 tw-bottom-0 tw-w-56 tw-border-r tw-border-slate-200 tw-bg-white tw-overflow-y-auto tw-z-40 tw-transition-transform",
                        sidebarOpen
                            ? "tw-translate-x-0"
                            : "-tw-translate-x-full lg:tw-translate-x-0"
                    )}
                >
                    <nav className="tw-px-3 tw-py-6 tw-flex tw-flex-col tw-gap-6">
                        {NAV_GROUPS.map((g) => (
                            <div key={g.group}>
                                <p className="tw-uppercase tw-text-xs tw-tracking-widest tw-text-slate-400 tw-font-semibold tw-mb-2 tw-px-2">
                                    {g.group}
                                </p>
                                <ul className="tw-flex tw-flex-col tw-gap-0.5 tw-list-none tw-p-0 tw-m-0">
                                    {g.items.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                                className="tw-block tw-px-2 tw-py-1.5 tw-rounded-lg tw-text-sm tw-text-slate-600 hover:tw-text-slate-900 hover:tw-bg-slate-100 tw-no-underline tw-transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>
                {sidebarOpen && (
                    <div
                        className="lg:tw-hidden tw-fixed tw-inset-0 tw-top-14 tw-z-30 tw-bg-black/20"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                <div className="tw-pt-14 tw-flex">
                    <div className="tw-hidden lg:tw-block tw-w-56 tw-shrink-0" />
                    <main className="tw-flex-1 tw-min-w-0">
                        <div className="tw-max-w-3xl tw-mx-auto tw-px-6 sm:tw-px-10 tw-py-10 tw-pb-24 xl:tw-pr-6">
                            {children}
                        </div>
                    </main>
                    {rightSidebar && (
                        <aside className="tw-hidden xl:tw-block tw-w-56 tw-shrink-0">
                            <div className="tw-fixed tw-top-14 tw-w-56 tw-bottom-0 tw-overflow-y-auto tw-py-6 tw-px-3">
                                {rightSidebar}
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </>
    );
}
