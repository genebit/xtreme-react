import { useRef, useState } from "react";
import { ReactNode } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import Select from "react-select";
import ScrollSpy from "react-ui-scrollspy";
import DocsLayout from "@/Layouts/DocsLayout";
import { ScrollSpyLink } from "@/Components/ScrollSpy";
import {
  RiArrowRightLine,
  RiExternalLinkLine,
  RiGithubLine,
  RiMenuLine,
  RiCloseLine,
  RiSearchLine,
  RiBellLine,
  RiSettings4Line,
  RiUser3Line,
  RiGroupLine,
  RiShoppingCartLine,
  RiMoneyDollarCircleLine,
  RiBarChart2Line,
  RiPieChartLine,
  RiFileTextLine,
  RiCalendarLine,
  RiAddLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiDownload2Line,
  RiArrowUpLine,
  RiArrowDownLine,
  RiCheckLine,
  RiShieldLine,
  RiLockPasswordLine,
  RiCodeSSlashLine,
} from "@remixicon/react";

const SKILL_ICONS_BASE = "https://go-skill-icons.vercel.app/api/icons?i=";

const TECH_STACK = [
  { name: "Laravel", slug: "laravel", version: "v10", desc: "PHP MVC backend framework" },
  { name: "React", slug: "react", version: "v18", desc: "Component-based UI library" },
  { name: "Inertia.js", slug: "inertia", version: "v1", desc: "Server-driven SPA bridge" },
  { name: "TypeScript", slug: "typescript", version: "v5", desc: "Statically typed JavaScript" },
  { name: "Tailwind CSS", slug: "tailwindcss", version: "v3", desc: "Utility-first CSS framework" },
  { name: "Bootstrap", slug: "bootstrap", version: "v5", desc: "Component CSS library" },
  { name: "Vite", slug: "vite", version: "v5", desc: "Next-gen frontend build tool" },
  { name: "RemixIcon", slug: null, version: "v4", desc: "2,800+ open-source SVG icons", abbr: "RI" },
  { name: "ApexCharts", slug: null, version: "v3", desc: "Interactive data visualization", abbr: "AC" },
];

const ICON_GRID: { icon: React.ReactNode; name: string }[] = [
  { icon: <RiMenuLine size={20} />, name: "RiMenuLine" },
  { icon: <RiCloseLine size={20} />, name: "RiCloseLine" },
  { icon: <RiSearchLine size={20} />, name: "RiSearchLine" },
  { icon: <RiBellLine size={20} />, name: "RiBellLine" },
  { icon: <RiSettings4Line size={20} />, name: "RiSettings4Line" },
  { icon: <RiUser3Line size={20} />, name: "RiUser3Line" },
  { icon: <RiGroupLine size={20} />, name: "RiGroupLine" },
  { icon: <RiShoppingCartLine size={20} />, name: "RiShoppingCartLine" },
  { icon: <RiMoneyDollarCircleLine size={20} />, name: "RiMoneyDollarCircleLine" },
  { icon: <RiBarChart2Line size={20} />, name: "RiBarChart2Line" },
  { icon: <RiPieChartLine size={20} />, name: "RiPieChartLine" },
  { icon: <RiFileTextLine size={20} />, name: "RiFileTextLine" },
  { icon: <RiCalendarLine size={20} />, name: "RiCalendarLine" },
  { icon: <RiAddLine size={20} />, name: "RiAddLine" },
  { icon: <RiPencilLine size={20} />, name: "RiPencilLine" },
  { icon: <RiDeleteBinLine size={20} />, name: "RiDeleteBinLine" },
  { icon: <RiDownload2Line size={20} />, name: "RiDownload2Line" },
  { icon: <RiArrowUpLine size={20} />, name: "RiArrowUpLine" },
  { icon: <RiArrowDownLine size={20} />, name: "RiArrowDownLine" },
  { icon: <RiArrowRightLine size={20} />, name: "RiArrowRightLine" },
  { icon: <RiCheckLine size={20} />, name: "RiCheckLine" },
  { icon: <RiShieldLine size={20} />, name: "RiShieldLine" },
  { icon: <RiLockPasswordLine size={20} />, name: "RiLockPasswordLine" },
  { icon: <RiCodeSSlashLine size={20} />, name: "RiCodeSSlashLine" },
];

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "stack", label: "Tech Stack" },
  { id: "installation", label: "Installation" },
  { id: "project-structure", label: "Project Structure" },
  { id: "live-preview", label: "Live Preview" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "icons", label: "Icons" },
  { id: "form-layout", label: "Form Layout" },
  { id: "form-components", label: "Form Components" },
  { id: "modals", label: "Modals" },
  { id: "react-select", label: "React Select" },
  { id: "datatables", label: "DataTables" },
  { id: "sheet", label: "Sidebar / Sheet" },
  { id: "scroll-spy", label: "ScrollSpy" },
  { id: "admin-layout", label: "Admin Layout" },
  { id: "theme", label: "Theme" },
  { id: "preloader", label: "Preloader" },
  { id: "credits", label: "Credits" },
];

function SectionHeading({ id, title, sub }: { id: string; title: string; sub?: string }) {
  return (
    <div id={id} className="tw-scroll-mt-20 tw-pt-12 tw-mb-5">
      <h2 className="tw-text-2xl tw-font-bold tw-text-slate-900">{title}</h2>
      {sub && <p className="tw-text-sm tw-text-slate-400 tw-mt-1">{sub}</p>}
      <div className="tw-border-b tw-border-slate-100 tw-mt-4" />
    </div>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="tw-text-sm tw-text-slate-600 tw-leading-relaxed tw-mb-4">{children}</p>;
}

function IC({ children }: { children: ReactNode }) {
  return (
    <code className="tw-text-xs tw-font-mono tw-bg-slate-100 tw-text-slate-700 tw-px-1.5 tw-py-0.5 tw-rounded">
      {children}
    </code>
  );
}

function CodeBlock({ lang, children }: { lang?: string; children: string }) {
  return (
    <div className="tw-rounded-xl tw-overflow-hidden tw-border tw-border-slate-700 tw-mb-6">
      <div className="tw-bg-slate-800 tw-px-4 tw-py-2 tw-text-xs tw-text-slate-400 tw-border-b tw-border-slate-700">
        {lang}
      </div>
      <pre className="tw-bg-slate-900 tw-px-5 tw-py-4 tw-overflow-x-auto tw-text-xs tw-font-mono tw-leading-relaxed">
        <code className="tw-text-slate-200">{children}</code>
      </pre>
    </div>
  );
}

function Preview({ children }: { children: ReactNode }) {
  return <div className="tw-rounded-xl tw-border tw-border-slate-200 tw-p-6 tw-mb-4 tw-bg-white">{children}</div>;
}

function AdminPreviewCard() {
  return (
    <div className="tw-rounded-xl tw-overflow-hidden tw-border tw-border-slate-200 tw-shadow-md">
      <div className="tw-flex tw-h-48">
        <div className="tw-w-12 tw-bg-slate-900 tw-flex-shrink-0 tw-flex tw-flex-col tw-items-center tw-pt-3 tw-gap-2.5 tw-px-2">
          <div className="tw-w-6 tw-h-6 tw-rounded tw-bg-amber-500" />
          <div className="tw-w-6 tw-h-1.5 tw-rounded tw-bg-slate-700" />
          <div className="tw-w-6 tw-h-1.5 tw-rounded tw-bg-slate-700" />
          <div className="tw-w-6 tw-h-1.5 tw-rounded tw-bg-slate-700" />
          <div className="tw-w-6 tw-h-1.5 tw-rounded tw-bg-slate-700" />
          <div className="tw-w-6 tw-h-1.5 tw-rounded tw-bg-slate-700" />
        </div>
        <div className="tw-flex-1 tw-flex tw-flex-col tw-bg-slate-100">
          <div className="tw-h-7 tw-bg-white tw-border-b tw-border-slate-200 tw-flex tw-items-center tw-px-3 tw-gap-2">
            <div className="tw-flex-1 tw-h-2 tw-rounded tw-bg-slate-200" />
            <div className="tw-w-12 tw-h-2 tw-rounded tw-bg-slate-200" />
            <div className="tw-w-5 tw-h-5 tw-rounded-full tw-bg-slate-200" />
          </div>
          <div className="tw-p-2.5 tw-flex tw-flex-col tw-gap-2">
            <div className="tw-h-8 tw-rounded-lg tw-bg-slate-800" />
            <div className="tw-grid tw-grid-cols-4 tw-gap-2">
              <div className="tw-h-14 tw-rounded-lg tw-bg-white tw-border tw-border-slate-200" />
              <div className="tw-h-14 tw-rounded-lg tw-bg-white tw-border tw-border-slate-200" />
              <div className="tw-h-14 tw-rounded-lg tw-bg-white tw-border tw-border-slate-200" />
              <div className="tw-h-14 tw-rounded-lg tw-bg-white tw-border tw-border-slate-200" />
            </div>
            <div className="tw-grid tw-grid-cols-2 tw-gap-2">
              <div className="tw-h-10 tw-rounded-lg tw-bg-white tw-border tw-border-slate-200" />
              <div className="tw-h-10 tw-rounded-lg tw-bg-white tw-border tw-border-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RS_OPTIONS = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const rsStyles = {
  control: (base: object, state: { isFocused: boolean }) => ({
    ...base,
    borderRadius: "6px",
    borderColor: "rgb(226 232 240)",
    boxShadow: state.isFocused ? "0 0 0 2px white, 0 0 0 4px rgb(59 130 246)" : "none",
    "&:hover": { borderColor: "rgb(226 232 240)" },
    fontSize: "0.875rem",
    minHeight: "38px",
  }),
  option: (base: object, state: { isSelected: boolean; isFocused: boolean }) => ({
    ...base,
    fontSize: "0.875rem",
    backgroundColor: state.isSelected ? "rgb(59 130 246)" : state.isFocused ? "rgb(239 246 255)" : "white",
    color: state.isSelected ? "white" : "rgb(30 41 59)",
  }),
};

export default function LandingPage() {
  const navRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectVal, setSelectVal] = useState<{ value: string; label: string } | null>(null);
  const [multiVal, setMultiVal] = useState<readonly { value: string; label: string }[]>([]);

  const rightSidebar = (
    <div ref={navRef}>
      <ScrollSpyLink.Container>
        {SECTIONS.map((s) => (
          <ScrollSpyLink.Link key={s.id} jumpTo={s.id}>
            {s.label}
          </ScrollSpyLink.Link>
        ))}
      </ScrollSpyLink.Container>
    </div>
  );

  return (
    <DocsLayout headTitle="Documentation" rightSidebar={rightSidebar}>
      <ScrollSpy navContainerRef={navRef} activeClass="active-scroll-spy" offsetTop={56} scrollThrottle={100}>
        <div className="tw-pb-10 tw-mb-6 tw-border-b tw-border-slate-100">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-px-2.5 tw-py-1 tw-rounded-full tw-bg-amber-50 tw-border tw-border-amber-200 tw-mb-5">
            <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-amber-500 tw-animate-pulse" />
            <span className="tw-text-xs tw-font-medium tw-text-amber-700">v1.0.0 — Public Beta</span>
          </div>
          <h1 className="tw-text-5xl sm:tw-text-6xl tw-font-black tw-text-slate-900 tw-leading-tight tw-mb-4">
            BS5 Xtreme
            <br />
            <span className="tw-text-amber-500">Admin</span>
          </h1>
          <p className="tw-text-base tw-text-slate-500 tw-leading-relaxed tw-mb-6 tw-max-w-xl">
            A modern, full-stack admin template built on Laravel 10, React 18, and Inertia.js — styled with Bootstrap 5
            and Tailwind CSS 3.
          </p>
          <div className="tw-flex tw-flex-wrap tw-gap-3 tw-mb-8">
            <a
              href="#installation"
              className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-text-white tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 hover:tw-from-amber-600 hover:tw-to-amber-700 tw-no-underline tw-transition-all"
            >
              Get Started
              <RiArrowRightLine size={15} />
            </a>
            <a
              href={route("dashboard")}
              className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-text-slate-700 tw-border tw-border-slate-200 hover:tw-bg-slate-50 tw-no-underline tw-transition-all tw-bg-white"
            >
              Live Demo
            </a>
            <a
              href="https://github.com/genebit/xtreme-react"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-text-slate-700 tw-border tw-border-slate-200 hover:tw-bg-slate-50 tw-no-underline tw-transition-all tw-bg-white"
            >
              <RiGithubLine size={15} />
              GitHub
            </a>
          </div>
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            {["Laravel 10", "React 18", "Inertia.js", "TypeScript", "Tailwind CSS 3", "Bootstrap 5", "Vite 5"].map(
              (tech) => (
                <span
                  key={tech}
                  className="tw-text-xs tw-font-medium tw-px-2.5 tw-py-1 tw-rounded-full tw-bg-slate-100 tw-text-slate-600 tw-border tw-border-slate-200"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
        <div id="introduction">
          <SectionHeading id="introduction" title="Introduction" sub="What it is and how it works." />
          <P>
            BS5 Xtreme Admin is a full-stack admin panel starter built with Laravel 10, React 18, and Inertia.js. It
            combines Bootstrap 5 for component-level UI with Tailwind CSS 3 (using the <IC>tw-</IC> prefix to avoid
            conflicts) for utility styling — giving you the best of both ecosystems in a single coherent template.
          </P>
          <P>
            Inertia.js acts as the bridge between the Laravel backend and React frontend, eliminating the need for a
            separate REST or GraphQL API. All routing is handled by Laravel, and controllers return Inertia responses
            that render the correct React page component with server-side props.
          </P>
        </div>
        <div id="stack">
          <SectionHeading id="stack" title="Tech Stack" sub="Libraries and frameworks powering the template." />
          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-3 tw-mb-6">
            {TECH_STACK.map((t) => (
              <div
                key={t.name}
                className="tw-rounded-xl tw-border tw-border-slate-200 tw-p-4 tw-flex tw-flex-col tw-gap-2 hover:tw-shadow-sm tw-transition-shadow"
              >
                <div className="tw-flex tw-items-center tw-gap-3">
                  {t.slug ? (
                    <img src={SKILL_ICONS_BASE + t.slug} alt={t.name} className="tw-w-10 tw-h-10 tw-flex-shrink-0" />
                  ) : (
                    <div className="tw-w-10 tw-h-10 tw-rounded-lg tw-bg-slate-800 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                      <span className="tw-text-white tw-text-xs tw-font-black">{t.abbr}</span>
                    </div>
                  )}
                  <div>
                    <p className="tw-text-sm tw-font-bold tw-text-slate-900 tw-mb-0">{t.name}</p>
                    <span className="tw-text-xs tw-font-mono tw-text-slate-400">{t.version}</span>
                  </div>
                </div>
                <p className="tw-text-xs tw-text-slate-500 tw-mb-0">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="installation">
          <SectionHeading id="installation" title="Installation" sub="Get the project running locally." />
          <CodeBlock lang="bash">{`git clone https://github.com/genebit/xtreme-react.git
cd xtreme-react
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate`}</CodeBlock>
          <CodeBlock lang="bash">{`npm install
npm run dev`}</CodeBlock>
          <P>
            Visit <IC>http://localhost:8000</IC> in your browser to see the application running.
          </P>
        </div>
        <div id="project-structure">
          <SectionHeading id="project-structure" title="Project Structure" sub="Key directories and their purpose." />
          <CodeBlock lang="text">{`resources/js/
├── Components/          # Shared components (PageHero, Sheet, ScrollSpy)
├── Layouts/
│   ├── AdminLayout.tsx  # Authenticated layout wrapper
│   ├── DocsLayout.tsx   # Documentation layout
│   └── components/      # Sidebar, HeaderNavbar, Breadcrumbs, Footer
└── Pages/
    ├── Demo/            # Auth-required pages
    └── Guest/           # Public pages
app/Http/Controllers/    # Inertia page controllers
routes/web.php           # All route definitions`}</CodeBlock>
        </div>
        <div id="live-preview">
          <SectionHeading id="live-preview" title="Live Preview" sub="See the full admin panel in action." />
          <P>
            Explore the full admin panel with pre-built pages including Dashboard, Tasks, Reports, Projects, Forms,
            Notifications, and User Profile.
          </P>
          <AdminPreviewCard />
          <div className="tw-mt-4">
            <a
              href={route("dashboard")}
              className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-text-white tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 hover:tw-from-amber-600 hover:tw-to-amber-700 tw-no-underline tw-transition-all"
            >
              Open Demo
              <RiExternalLinkLine size={15} />
            </a>
          </div>
        </div>
        <div id="typography">
          <SectionHeading id="typography" title="Typography" sub="Heading scales, body text, and inline styles." />
          <P>
            The template uses the <IC>Figtree</IC> sans-serif font loaded via Laravel Breeze defaults. Heading sizes
            follow Tailwind's text scale with Bootstrap weight overrides stripped out.
          </P>
          <Preview>
            <h1 className="tw-text-4xl tw-font-black tw-text-slate-900 tw-mb-2">Heading 1</h1>
            <h2 className="tw-text-2xl tw-font-bold tw-text-slate-900 tw-mb-2">Heading 2</h2>
            <h3 className="tw-text-xl tw-font-semibold tw-text-slate-900 tw-mb-2">Heading 3</h3>
            <p className="tw-text-base tw-text-slate-700 tw-mb-1">Base body text — readable and balanced.</p>
            <p className="tw-text-sm tw-text-slate-600 tw-mb-1">Small text for secondary content.</p>
            <p className="tw-text-xs tw-text-slate-400 tw-mb-2">Caption / muted helper text.</p>
            <IC>inline code snippet</IC>
          </Preview>
          <CodeBlock lang="tsx">{`<h1 className="tw-text-4xl tw-font-black tw-text-slate-900">Heading 1</h1>
<h2 className="tw-text-2xl tw-font-bold tw-text-slate-900">Heading 2</h2>
<h3 className="tw-text-xl tw-font-semibold tw-text-slate-900">Heading 3</h3>
<p className="tw-text-base tw-text-slate-700">Base body text</p>
<p className="tw-text-sm tw-text-slate-600">Small text</p>
<p className="tw-text-xs tw-text-slate-400">Caption</p>
<code className="tw-text-xs tw-font-mono tw-bg-slate-100 tw-text-slate-700 tw-px-1.5 tw-py-0.5 tw-rounded">
  inline code
</code>`}</CodeBlock>
        </div>
        <div id="buttons">
          <SectionHeading
            id="buttons"
            title="Buttons"
            sub="Primary, secondary, ghost, danger, and disabled variants."
          />
          <P>
            The primary button uses an amber gradient that maps to the template's brand color. All variants are built
            with Tailwind utility classes — no Bootstrap button classes needed.
          </P>
          <Preview>
            <div className="tw-flex tw-flex-wrap tw-gap-3">
              <button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-white tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 hover:tw-from-amber-600 hover:tw-to-amber-700 tw-border-0 tw-transition-all">
                Primary
              </button>
              <button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-slate-700 tw-bg-white tw-border tw-border-slate-200 hover:tw-bg-slate-50 tw-transition-all">
                Secondary
              </button>
              <button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-white tw-bg-slate-800 tw-border-0 tw-bg-opacity-90 hover:tw-bg-slate-700 tw-transition-all">
                Ghost
              </button>
              <button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-red-600 tw-bg-red-50 tw-border tw-border-red-200 hover:tw-bg-red-100 tw-transition-all">
                Danger
              </button>
              <button
                disabled
                className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-slate-400 tw-bg-slate-100 tw-border-0 tw-cursor-not-allowed"
              >
                Disabled
              </button>
            </div>
          </Preview>
          <CodeBlock lang="tsx">{`<button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-white tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 hover:tw-from-amber-600 hover:tw-to-amber-700 tw-border-0 tw-transition-all">
  Primary
</button>
<button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-slate-700 tw-bg-white tw-border tw-border-slate-200 hover:tw-bg-slate-50 tw-transition-all">
  Secondary
</button>
<button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-white tw-bg-slate-800 tw-border-0 hover:tw-bg-slate-700 tw-transition-all">
  Ghost
</button>
<button className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-red-600 tw-bg-red-50 tw-border tw-border-red-200 hover:tw-bg-red-100 tw-transition-all">
  Danger
</button>
<button disabled className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-slate-400 tw-bg-slate-100 tw-border-0 tw-cursor-not-allowed">
  Disabled
</button>`}</CodeBlock>
        </div>
        <div id="icons">
          <SectionHeading
            id="icons"
            title="Icons"
            sub="RemixIcon — the primary icon library used throughout the template."
          />
          <P>
            All icons come from <IC>@remixicon/react</IC>, a set of 2,800+ open-source SVG icons available as individual
            React components. Icons follow a consistent <IC>Ri[Name]Line</IC> / <IC>Ri[Name]Fill</IC> naming convention.
          </P>
          <div className="tw-rounded-xl tw-border tw-border-slate-200 tw-p-4 tw-mb-4">
            <div className="tw-grid tw-grid-cols-4 sm:tw-grid-cols-6 tw-gap-1">
              {ICON_GRID.map((item) => (
                <div
                  key={item.name}
                  className="tw-flex tw-flex-col tw-items-center tw-gap-1.5 tw-p-2.5 tw-rounded-lg hover:tw-bg-slate-50 tw-transition-colors tw-group"
                >
                  <span className="tw-text-slate-600 group-hover:tw-text-amber-500 tw-transition-colors">
                    {item.icon}
                  </span>
                  <span className="tw-text-[10px] tw-text-slate-400 tw-text-center tw-leading-tight tw-font-mono tw-truncate tw-w-full tw-text-center">
                    {item.name.replace("Ri", "").replace("Line", "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <CodeBlock lang="tsx">{`import {
  RiBellLine,
  RiUser3Line,
  RiShoppingCartLine,
  RiDeleteBinLine,
} from "@remixicon/react";

<RiBellLine size={20} className="tw-text-slate-600" />
<RiUser3Line size={24} className="tw-text-amber-500" />`}</CodeBlock>
          <P>
            Browse the full icon set at{" "}
            <a
              href="https://remixicon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-amber-600 hover:tw-underline"
            >
              remixicon.com
            </a>
            .
          </P>
        </div>
        <div id="form-layout">
          <SectionHeading id="form-layout" title="Form Layout" sub="Consistent input styling via the FIELD token." />
          <P>
            The <IC>FIELD</IC> constant centralizes all React-Bootstrap <IC>Form.Control</IC> class names so every input
            in the app shares identical sizing, border radius, and focus styles without repetition.
          </P>
          <Preview>
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
              <Form.Group>
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John"
                  className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Doe"
                  className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none"
                />
              </Form.Group>
              <Form.Group className="sm:tw-col-span-2">
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none"
                />
              </Form.Group>
              <Form.Group className="sm:tw-col-span-2">
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write something..."
                  className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none"
                />
              </Form.Group>
            </div>
          </Preview>
          <CodeBlock lang="tsx">{`const FIELD = {
  className:
    "tw-rounded-lg tw-border-slate-200 tw-text-sm tw-text-slate-700 " +
    "focus:tw-border-amber-400 focus:tw-ring-2 focus:tw-ring-amber-100",
};

// 2-column grid form example
<Form>
  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
    <Form.Group>
      <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">
        First Name
      </Form.Label>
      <Form.Control type="text" placeholder="John" {...FIELD} />
    </Form.Group>
    <Form.Group>
      <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">
        Last Name
      </Form.Label>
      <Form.Control type="text" placeholder="Doe" {...FIELD} />
    </Form.Group>
  </div>
</Form>`}</CodeBlock>
        </div>
        <div id="form-components">
          <SectionHeading
            id="form-components"
            title="Form Components"
            sub="Inputs, textareas, selects, floating labels, and FloatingSelect."
          />
          <P>
            The <IC>FloatingSelect</IC> component lives in <IC>FormsPage</IC> and can be extracted into{" "}
            <IC>resources/js/Components/</IC> for reuse. It wraps a native <IC>{"<select>"}</IC> with a floating label
            pattern identical to Bootstrap's floating forms.
          </P>
          <Preview>
            <div className="tw-flex tw-flex-col tw-gap-4">
              <Form.Group>
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">Role</Form.Label>
                <Form.Select className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none">
                  <option value="">Choose role…</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </Form.Select>
              </Form.Group>
              <div className="form-floating">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  id="floatUsername"
                  className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none"
                />
                <label htmlFor="floatUsername" className="tw-text-sm tw-text-slate-500">
                  Floating Label
                </label>
              </div>
              <Form.Group>
                <div className="tw-flex tw-items-center tw-gap-3">
                  <Form.Check type="checkbox" id="chk1" label="Accept terms" className="tw-text-sm tw-text-slate-700" />
                  <Form.Check
                    type="radio"
                    id="rad1"
                    name="r"
                    label="Option A"
                    className="tw-text-sm tw-text-slate-700"
                  />
                  <Form.Check
                    type="radio"
                    id="rad2"
                    name="r"
                    label="Option B"
                    className="tw-text-sm tw-text-slate-700"
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label className="tw-text-sm tw-font-medium tw-text-slate-700">Upload File</Form.Label>
                <Form.Control type="file" className="!tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none" />
              </Form.Group>
            </div>
          </Preview>
          <CodeBlock lang="tsx">{`import { Form } from "react-bootstrap";

const FIELD = {
  className:
    "tw-rounded-lg tw-border-slate-200 tw-text-sm " +
    "focus:tw-border-amber-400 focus:tw-ring-2 focus:tw-ring-amber-100",
};

// Standard input
<Form.Control type="email" placeholder="you@example.com" {...FIELD} />

// Textarea
<Form.Control as="textarea" rows={3} {...FIELD} />

// FloatingSelect usage
<FloatingSelect label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="">Choose role…</option>
  <option value="admin">Admin</option>
  <option value="editor">Editor</option>
</FloatingSelect>`}</CodeBlock>
          <P>
            See the{" "}
            <a href={route("forms")} className="tw-text-amber-600 hover:tw-underline">
              Forms page
            </a>{" "}
            for live demos of every input variant.
          </P>
        </div>
        <div id="modals">
          <SectionHeading id="modals" title="Modals" sub="React-Bootstrap Modal with template styling." />
          <Preview>
            <button
              className="tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold tw-text-white tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 hover:tw-from-amber-600 hover:tw-to-amber-700 tw-border-0 tw-transition-all"
              onClick={() => setShowModal(true)}
            >
              Open Modal
            </button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton className="tw-border-b tw-border-slate-100 tw-px-5 tw-py-4">
                <Modal.Title className="tw-text-base tw-font-bold tw-text-slate-900">Confirm Action</Modal.Title>
              </Modal.Header>
              <Modal.Body className="tw-px-5 tw-py-4 tw-text-sm tw-text-slate-600">
                Are you sure you want to continue? This cannot be undone.
              </Modal.Body>
              <Modal.Footer className="tw-border-t tw-border-slate-100 tw-px-5 tw-py-3 tw-gap-2">
                <Button
                  variant="light"
                  onClick={() => setShowModal(false)}
                  className="tw-text-sm tw-rounded-lg tw-border tw-border-slate-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  className="tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 tw-border-0 tw-text-white tw-text-sm tw-rounded-lg"
                >
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </Preview>
          <CodeBlock lang="tsx">{`import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const [show, setShow] = useState(false);

<Button
  className="tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 tw-border-0 tw-text-white tw-font-semibold tw-rounded-lg"
  onClick={() => setShow(true)}
>
  Open Modal
</Button>

<Modal show={show} onHide={() => setShow(false)} centered>
  <Modal.Header
    closeButton
    className="tw-border-b tw-border-slate-100 tw-px-5 tw-py-4"
  >
    <Modal.Title className="tw-text-base tw-font-bold tw-text-slate-900">
      Confirm Action
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="tw-px-5 tw-py-4 tw-text-sm tw-text-slate-600">
    Are you sure you want to continue? This cannot be undone.
  </Modal.Body>
  <Modal.Footer className="tw-border-t tw-border-slate-100 tw-px-5 tw-py-3 tw-gap-2">
    <Button
      variant="light"
      onClick={() => setShow(false)}
      className="tw-text-sm tw-rounded-lg tw-border tw-border-slate-200"
    >
      Cancel
    </Button>
    <Button
      onClick={() => setShow(false)}
      className="tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-600 tw-border-0 tw-text-white tw-text-sm tw-rounded-lg"
    >
      Confirm
    </Button>
  </Modal.Footer>
</Modal>`}</CodeBlock>
        </div>
        <div id="react-select">
          <SectionHeading
            id="react-select"
            title="React Select"
            sub="Styled dropdown powered by react-select with floating label support."
          />
          <P>
            The template uses <IC>react-select</IC> for enhanced dropdowns with search, multi-select, and clearable
            options. A shared <IC>rsStyles</IC> config aligns its appearance with the FIELD token — same border, radius,
            and blue focus ring.
          </P>
          <Preview>
            <div className="tw-flex tw-flex-col tw-gap-3">
              <Select
                options={RS_OPTIONS}
                styles={rsStyles}
                placeholder="Select a role..."
                value={selectVal}
                onChange={(v) => setSelectVal(v as { value: string; label: string })}
              />
              <Select
                options={RS_OPTIONS}
                styles={rsStyles}
                isMulti
                isClearable
                placeholder="Pick multiple roles..."
                value={multiVal}
                onChange={(v) => setMultiVal(v as readonly { value: string; label: string }[])}
              />
            </div>
          </Preview>
          <CodeBlock lang="tsx">{`import Select from "react-select";
import type { StylesConfig } from "react-select";

interface Option { value: string; label: string; }

const rsStyles: StylesConfig<Option, boolean> = {
  control: (base, state) => ({
    ...base,
    borderRadius: "6px",
    borderColor: "rgb(226 232 240)",
    boxShadow: state.isFocused
      ? "0 0 0 2px white, 0 0 0 4px rgb(59 130 246)"
      : "none",
    "&:hover": { borderColor: "rgb(226 232 240)" },
    fontSize: "0.875rem",
    minHeight: "38px",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.875rem",
    backgroundColor: state.isSelected
      ? "rgb(59 130 246)"
      : state.isFocused ? "rgb(239 246 255)" : "white",
    color: state.isSelected ? "white" : "rgb(30 41 59)",
  }),
};

const options = [
  { value: "admin",  label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

<Select options={options} styles={rsStyles} placeholder="Select a role..." />
<Select options={options} styles={rsStyles} isMulti isClearable placeholder="Pick skills..." />`}</CodeBlock>
          <P>
            For a floating-label variant, use the <IC>FloatingSelect</IC> component defined in{" "}
            <a href={route("forms")} className="tw-text-amber-600 hover:tw-underline">
              FormsPage
            </a>
            . It wraps react-select with an animated label that floats on focus or selection.
          </P>
          <CodeBlock lang="tsx">{`<FloatingSelect
  label="Country"
  value={selected}
  onChange={(val) => setSelected(val)}
  options={countryOptions}
  isClearable
/>

<FloatingSelect
  label="Skills"
  placeholder="Choose skills..."
  value={skills}
  onChange={(val) => setSkills(val)}
  options={skillOptions}
  isMulti
  closeMenuOnSelect={false}
/>`}</CodeBlock>
        </div>
        <div id="datatables">
          <SectionHeading
            id="datatables"
            title="DataTables"
            sub="Server-side and client-side tables with Bootstrap 5 styling."
          />
          <P>
            DataTables is integrated via <IC>datatables.net-react</IC> with Bootstrap 5 styling (
            <IC>datatables.net-bs5</IC>). It supports search, pagination, sorting, responsive layout, and row selection
            out of the box.
          </P>
          <Preview>
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-3">
              <input
                type="text"
                placeholder="Search..."
                className="form-control !tw-rounded-md !tw-border-slate-200 !tw-text-sm !tw-shadow-none tw-max-w-[180px]"
                readOnly
              />
              <span className="tw-text-xs tw-text-slate-400">Showing 1–3 of 3</span>
            </div>
            <div className="tw-rounded-xl tw-border tw-border-slate-200 tw-overflow-hidden">
              <table className="tw-w-full tw-text-sm">
                <thead>
                  <tr className="tw-bg-slate-50 tw-border-b tw-border-slate-200">
                    {["Name", "Position", "Office", "Salary"].map((h) => (
                      <th
                        key={h}
                        className="tw-px-4 tw-py-2.5 tw-text-left tw-font-semibold tw-text-slate-700 tw-text-xs"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Alice Johnson", "Engineer", "Manila", "$120,000"],
                    ["Bob Martinez", "Designer", "Cebu", "$95,000"],
                    ["Carol Reyes", "Product Manager", "Makati", "$140,000"],
                  ].map((row) => (
                    <tr key={row[0]} className="tw-border-b tw-border-slate-100 last:tw-border-0 hover:tw-bg-slate-50">
                      {row.map((cell) => (
                        <td key={cell} className="tw-px-4 tw-py-2.5 tw-text-slate-700 tw-text-xs">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="tw-flex tw-justify-end tw-gap-1 tw-mt-3">
              {["«", "1", "2", "»"].map((p) => (
                <button
                  key={p}
                  className={`tw-px-2.5 tw-py-1 tw-rounded tw-text-xs tw-border tw-border-slate-200 tw-bg-transparent ${p === "1" ? "!tw-bg-amber-500 !tw-text-white !tw-border-amber-500" : "tw-text-slate-600"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Preview>
          <CodeBlock lang="tsx">{`import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

const columns = [
  { data: "name",       title: "Name" },
  { data: "position",   title: "Position" },
  { data: "office",     title: "Office" },
  { data: "start_date", title: "Start Date" },
  { data: "salary",     title: "Salary" },
];

const data = [
  { name: "Alice Johnson", position: "Engineer",  office: "Manila",   start_date: "2022-03-01", salary: "$120,000" },
  { name: "Bob Martinez",  position: "Designer",  office: "Cebu",     start_date: "2021-07-15", salary: "$95,000"  },
];

<DataTable
  data={data}
  columns={columns}
  className="table table-hover"
  options={{
    paging: true,
    searching: true,
    ordering: true,
    responsive: true,
    pageLength: 10,
  }}
>
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Office</th>
      <th>Start Date</th>
      <th>Salary</th>
    </tr>
  </thead>
</DataTable>`}</CodeBlock>
          <CodeBlock lang="tsx">{`// Ajax source (server-side)
<DataTable
  className="table table-hover"
  options={{
    serverSide: true,
    ajax: "/api/employees",
    columns: [
      { data: "name" },
      { data: "position" },
      { data: "salary" },
    ],
  }}
>
  <thead>
    <tr>
      <th>Name</th><th>Position</th><th>Salary</th>
    </tr>
  </thead>
</DataTable>`}</CodeBlock>
        </div>
        <div id="sheet">
          <SectionHeading id="sheet" title="Sidebar / Sheet" sub="Reusable slide-over panel via createPortal." />
          <P>
            The <IC>Sheet</IC> component uses <IC>ReactDOM.createPortal</IC> to render outside the current DOM tree,
            escaping any stacking contexts or overflow clipping that would otherwise hide the overlay.
          </P>
          <div className="tw-rounded-xl tw-border tw-border-slate-200 tw-overflow-hidden tw-mb-4">
            <table className="tw-w-full tw-text-sm">
              <thead>
                <tr className="tw-bg-slate-50 tw-border-b tw-border-slate-200">
                  <th className="tw-px-4 tw-py-2.5 tw-text-left tw-font-semibold tw-text-slate-700 tw-text-xs">Prop</th>
                  <th className="tw-px-4 tw-py-2.5 tw-text-left tw-font-semibold tw-text-slate-700 tw-text-xs">Type</th>
                  <th className="tw-px-4 tw-py-2.5 tw-text-left tw-font-semibold tw-text-slate-700 tw-text-xs">
                    Default
                  </th>
                  <th className="tw-px-4 tw-py-2.5 tw-text-left tw-font-semibold tw-text-slate-700 tw-text-xs">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["open", "boolean", "—", "Controls visibility"],
                  ["onClose", "() => void", "—", "Called on backdrop/✕ click"],
                  ["title", "string", "—", "Sheet header title"],
                  ["children", "ReactNode", "—", "Sheet body content"],
                  ["footer", "ReactNode", "undefined", "Optional footer slot"],
                  ["width", "string", "tw-w-80 sm:tw-w-96", "Tailwind width classes"],
                  ["side", '"right" | "left"', '"right"', "Which side it slides from"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} className="tw-border-b tw-border-slate-100 last:tw-border-0">
                    <td className="tw-px-4 tw-py-2.5">
                      <IC>{prop}</IC>
                    </td>
                    <td className="tw-px-4 tw-py-2.5 tw-text-slate-500 tw-font-mono tw-text-xs">{type}</td>
                    <td className="tw-px-4 tw-py-2.5 tw-text-slate-400 tw-text-xs">{def}</td>
                    <td className="tw-px-4 tw-py-2.5 tw-text-slate-600 tw-text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CodeBlock lang="tsx">{`import { useState } from "react";
import Sheet from "@/Components/Sheet";

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open Sheet</button>

<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="Edit Record"
  side="right"
  width="tw-w-80 sm:tw-w-96"
  footer={
    <div className="tw-flex tw-gap-2 tw-justify-end">
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button>Save</button>
    </div>
  }
>
  <p className="tw-text-sm tw-text-slate-600">Sheet body content here.</p>
</Sheet>`}</CodeBlock>
        </div>
        <div id="scroll-spy">
          <SectionHeading
            id="scroll-spy"
            title="ScrollSpy"
            sub="Highlight the active section in a right-sidebar nav as the user scrolls."
          />
          <P>
            The template uses <IC>react-ui-scrollspy</IC> to track scroll position and apply an active class to the
            corresponding link in the right sidebar. This powers the "On this Page" navigation you see on this docs
            page.
          </P>
          <Preview>
            <div className="tw-flex tw-gap-6">
              <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-2">
                {["Introduction", "Installation", "Usage"].map((label, i) => (
                  <div
                    key={label}
                    className={`tw-rounded-lg tw-border tw-p-3 tw-text-sm tw-font-medium ${i === 1 ? "tw-border-amber-300 tw-bg-amber-50 tw-text-amber-700" : "tw-border-slate-200 tw-text-slate-500"}`}
                  >
                    Section: {label}
                  </div>
                ))}
              </div>
              <div className="tw-w-36 tw-flex-shrink-0">
                <small className="tw-uppercase tw-text-[10px] tw-tracking-widest tw-text-slate-400 tw-font-semibold tw-block tw-mb-2">
                  On this Page
                </small>
                {["Introduction", "Installation", "Usage"].map((label, i) => (
                  <div
                    key={label}
                    className={`tw-block tw-px-2 tw-py-1.5 tw-rounded-lg tw-text-xs tw-mb-0.5 ${i === 1 ? "tw-border-s-4 tw-border-s-amber-500 tw-bg-slate-50 tw-text-slate-900 tw-font-semibold" : "tw-text-slate-500"}`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </Preview>
          <P>Install the package first:</P>
          <CodeBlock lang="bash">{`npm install react-ui-scrollspy`}</CodeBlock>
          <P>
            Wrap your page sections in a <IC>{"<ScrollSpy>"}</IC> component. Each scrollable section needs a unique{" "}
            <IC>id</IC>. The <IC>navContainerRef</IC> points to the container holding links with{" "}
            <IC>data-to-scrollspy-id</IC> attributes — the library adds <IC>activeClass</IC> to the matching link when
            its section enters the viewport.
          </P>
          <CodeBlock lang="tsx">{`import { useRef } from "react";
import ScrollSpy from "react-ui-scrollspy";
import { ScrollSpyLink } from "@/Components/ScrollSpy";

export default function MyPage() {
  const navRef = useRef<HTMLDivElement>(null);

  const sidebar = (
    <div ref={navRef}>
      <ScrollSpyLink.Container>
        <ScrollSpyLink.Link jumpTo="intro">Introduction</ScrollSpyLink.Link>
        <ScrollSpyLink.Link jumpTo="usage">Usage</ScrollSpyLink.Link>
        <ScrollSpyLink.Link jumpTo="api">API Reference</ScrollSpyLink.Link>
      </ScrollSpyLink.Container>
    </div>
  );

  return (
    <DocsLayout rightSidebar={sidebar}>
      <ScrollSpy
        navContainerRef={navRef}
        activeClass="active-scroll-spy"
        offsetTop={56}
        scrollThrottle={100}
      >
        <div id="intro">...</div>
        <div id="usage">...</div>
        <div id="api">...</div>
      </ScrollSpy>
    </DocsLayout>
  );
}`}</CodeBlock>
          <P>
            The active link style comes from <IC>ScrollSpy.css</IC> — a single rule that adds an amber left border:
          </P>
          <CodeBlock lang="css">{`.active-scroll-spy {
  @apply tw-border-s-4 tw-border-s-amber-500;
}`}</CodeBlock>
          <P>
            The <IC>ScrollSpyLink</IC> component in <IC>resources/js/Components/ScrollSpy.tsx</IC> handles smooth
            scroll-into-view on click (accounting for the fixed header offset), so both click navigation and
            scroll-driven highlighting stay in sync.
          </P>
        </div>
        <div id="admin-layout">
          <SectionHeading id="admin-layout" title="Admin Layout" sub="Wrap authenticated pages with AdminLayout." />
          <P>
            <IC>AdminLayout</IC> provides the full authenticated shell — collapsible sidebar, top header navbar,
            breadcrumbs, and footer. Every authenticated page is wrapped in this component.
          </P>
          <CodeBlock lang="tsx">{`import AdminLayout from "@/Layouts/AdminLayout";
import PageHero from "@/Components/PageHero";

export default function MyPage() {
  return (
    <AdminLayout
      headTitle="My Page"
      breadcrumbs={[
        { label: "Home", href: route("dashboard") },
        { label: "My Page" },
      ]}
    >
      <PageHero
        title="My Page"
        subtitle="Description of what this page does."
      />
      <div className="tw-p-6">
        {/* Page content */}
      </div>
    </AdminLayout>
  );
}`}</CodeBlock>
          <P>
            Check out the Starter page at{" "}
            <a href={route("starter")} className="tw-text-amber-600 hover:tw-underline">
              /starter
            </a>{" "}
            for a minimal boilerplate page using this layout.
          </P>
        </div>
        <div id="theme">
          <SectionHeading id="theme" title="Theme" sub="Tailwind prefix, color tokens, and Bootstrap overrides." />
          <P>
            All Tailwind utilities are prefixed with <IC>tw-</IC> in <IC>tailwind.config.js</IC> to prevent class
            collisions with Bootstrap 5. This means you can use both systems side-by-side without specificity fights.
          </P>
          <div className="tw-grid tw-grid-cols-3 tw-gap-3 tw-mb-5">
            {[
              {
                bg: "tw-bg-amber-500",
                name: "Primary",
                token: "amber-500",
              },
              {
                bg: "tw-bg-amber-600",
                name: "Primary Dark",
                token: "amber-600",
              },
              {
                bg: "tw-bg-teal-500",
                name: "Teal / Secondary",
                token: "teal-500",
              },
              {
                bg: "tw-bg-slate-800",
                name: "Dark",
                token: "slate-800",
              },
              {
                bg: "tw-bg-slate-200",
                name: "Border",
                token: "slate-200",
              },
              {
                bg: "tw-bg-white tw-border tw-border-slate-200",
                name: "Background",
                token: "white",
              },
            ].map((s) => (
              <div key={s.token}>
                <div className={`tw-h-12 tw-rounded-lg tw-mb-1.5 ${s.bg}`} />
                <p className="tw-text-xs tw-font-semibold tw-text-slate-700 tw-mb-0">{s.name}</p>
                <p className="tw-text-xs tw-text-slate-400 tw-font-mono">{s.token}</p>
              </div>
            ))}
          </div>
          <P>
            Bootstrap component colors are overridden in <IC>resources/sass/bs-scheme.scss</IC> using SCSS variables
            before Bootstrap's own variables compile.
          </P>
          <CodeBlock lang="scss">{`$primary: #f59e0b;                          // amber-500
$font-family-sans-serif: "Figtree", sans-serif;
$border-radius: 0.5rem;                     // rounded-lg equivalent`}</CodeBlock>
        </div>
        <div id="preloader">
          <SectionHeading id="preloader" title="Preloader" sub="Customize the loading animation." />
          <P>
            The preloader is powered by <IC>pace-js</IC> and configured in{" "}
            <IC>resources/js/Components/Preloader.tsx</IC>. The progress bar theme is imported via a CSS file — swap the
            import to change themes.
          </P>
          <CodeBlock lang="tsx">{`// resources/js/Components/Preloader.tsx
// Change the theme by swapping the pace CSS import:

// Minimal bar (default)
import "pace-js/themes/blue/pace-theme-minimal.css";

// Flash bar
import "pace-js/themes/orange/pace-theme-flash.css";

// Corner indicator
import "pace-js/themes/green/pace-theme-corner-indicator.css";`}</CodeBlock>
        </div>
        <div id="credits">
          <SectionHeading id="credits" title="Credits" sub="The developer behind this template." />
          <div className="tw-rounded-2xl tw-overflow-hidden tw-border tw-border-slate-200">
            <div className="tw-px-6 tw-py-8 tw-bg-slate-900 tw-flex tw-items-center tw-gap-5">
              <div className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-gradient-to-br tw-from-amber-400 tw-to-amber-600 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                <span className="tw-text-white tw-text-xl tw-font-black">JG</span>
              </div>
              <div>
                <h3 className="tw-text-lg tw-font-bold tw-text-white tw-mb-0.5">Johcel Gene T. Bitara</h3>
                <p className="tw-text-sm tw-text-amber-400 tw-font-medium">SWE / Applications Programmer</p>
                <a
                  href="https://github.com/genebit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-inline-flex tw-items-center tw-gap-1.5 tw-mt-2 tw-text-xs tw-text-slate-400 hover:tw-text-white tw-no-underline tw-transition-colors"
                >
                  <RiGithubLine size={14} /> github.com/genebit
                </a>
              </div>
            </div>
            <div className="tw-px-6 tw-py-4 tw-bg-white tw-flex tw-flex-wrap tw-gap-2">
              {["Laravel", "React", "TypeScript", "Inertia.js", "Tailwind CSS", "Bootstrap 5"].map((t) => (
                <span
                  key={t}
                  className="tw-text-xs tw-bg-slate-100 tw-text-slate-600 tw-px-2.5 tw-py-1 tw-rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollSpy>
    </DocsLayout>
  );
}
