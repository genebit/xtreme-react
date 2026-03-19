import { useRef, useState } from "react";
import Select from "react-select";
import type { StylesConfig } from "react-select";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import ScrollSpy from "react-ui-scrollspy";
import DocsLayout from "@/Layouts/DocsLayout";
import Sheet from "@/Components/Sheet";
import {
  RiCheckLine,
  RiCodeSSlashLine,
  RiFileCopyLine,
  RiGlobalLine,
  RiLockPasswordLine,
  RiMailLine,
  RiPhoneLine,
  RiSearchLine,
  RiUser3Line,
  RiWindowLine,
  RiLayoutLine,
} from "@remixicon/react";

// ── Shared tokens ─────────────────────────────────────────────────────────────
const FIELD =
  "!tw-rounded-md !tw-border-slate-200 !tw-bg-white !tw-text-sm !tw-text-slate-800 " +
  "!tw-shadow-none focus:!tw-ring-2 focus:!tw-ring-blue-500 focus:!tw-ring-offset-2 " +
  "!tw-transition-all placeholder:!tw-text-slate-400";

const ADDON = "!tw-bg-slate-50 !tw-border-slate-200 !tw-text-slate-500 !tw-text-sm";

// ── react-select theme ────────────────────────────────────────────────────────
type Option = { value: string; label: string };

const rsStyles: StylesConfig<Option, boolean> = {
  control: (base, state) => ({
    ...base,
    borderRadius: "6px",
    borderColor: "rgb(226 232 240)",
    boxShadow: state.isFocused
      ? "0 0 0 2px white, 0 0 0 4px rgb(59 130 246)"
      : "none",
    fontSize: "0.875rem",
    minHeight: "38px",
    backgroundColor: "white",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    "&:hover": { borderColor: "rgb(226 232 240)" },
  }),
  placeholder: (base) => ({ ...base, color: "rgb(148 163 184)", fontSize: "0.875rem" }),
  singleValue: (base) => ({ ...base, color: "rgb(30 41 59)", fontSize: "0.875rem" }),
  input: (base) => ({ ...base, fontSize: "0.875rem" }),
  option: (base, state) => ({
    ...base,
    borderRadius: "4px",
    backgroundColor: state.isSelected
      ? "rgb(59 130 246)"
      : state.isFocused
      ? "rgb(239 246 255)"
      : "white",
    color: state.isSelected ? "white" : "rgb(30 41 59)",
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "background-color 0.1s ease",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
    border: "1px solid rgb(226 232 240)",
    overflow: "hidden",
    zIndex: 50,
    animation: "rsMenuIn 0.15s ease",
  }),
  menuList: (base) => ({ ...base, padding: "4px" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "rgb(59 130 246)" : "rgb(148 163 184)",
    padding: "0 8px",
    transition: "transform 0.2s ease, color 0.15s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "rgb(148 163 184)",
    padding: "0 4px",
    "&:hover": { color: "rgb(239 68 68)" },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgb(239 246 255)",
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "rgb(29 78 216)",
    fontSize: "0.75rem",
    fontWeight: 600,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "rgb(29 78 216)",
    borderRadius: "0 4px 4px 0",
    "&:hover": { backgroundColor: "rgb(59 130 246)", color: "white" },
  }),
};

// ── Static data ───────────────────────────────────────────────────────────────
const COUNTRY_OPTIONS: Option[] = [
  { value: "ph", label: "Philippines" },
  { value: "us", label: "United States" },
  { value: "jp", label: "Japan" },
  { value: "de", label: "Germany" },
  { value: "au", label: "Australia" },
  { value: "gb", label: "United Kingdom" },
];

const ROLE_OPTIONS: Option[] = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "developer", label: "Developer" },
  { value: "viewer", label: "Viewer" },
];

const SKILL_OPTIONS: Option[] = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "php", label: "PHP" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

// ── Section nav ───────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "basic-inputs",    label: "Basic Inputs",              accent: "tw-border-blue-500" },
  { id: "input-groups",    label: "Input Groups",              accent: "tw-border-indigo-500" },
  { id: "floating-labels", label: "Floating Labels",           accent: "tw-border-violet-500" },
  { id: "floating-select", label: "Floating Select",           accent: "tw-border-purple-500" },
  { id: "select-dropdowns",label: "Select Dropdowns",          accent: "tw-border-teal-500" },
  { id: "checks-radios",   label: "Checkboxes & Radios",       accent: "tw-border-emerald-500" },
  { id: "validation",      label: "Validation States",         accent: "tw-border-rose-500" },
  { id: "horizontal",      label: "Horizontal Layout",         accent: "tw-border-amber-500" },
  { id: "file-range",      label: "File & Range",              accent: "tw-border-orange-500" },
  { id: "modals",          label: "Modals",                    accent: "tw-border-slate-500" },
  { id: "sheet",           label: "Sheet / Drawer",            accent: "tw-border-slate-700" },
];

// ── Code snippets ─────────────────────────────────────────────────────────────
const CODE_BASIC = `<div class="mb-3">
  <label class="form-label fw-medium">Full Name</label>
  <input type="text" class="form-control" placeholder="John Doe">
  <div class="form-text">Enter your first and last name.</div>
</div>

<div class="mb-3">
  <label class="form-label fw-medium">Email Address</label>
  <input type="email" class="form-control" placeholder="john@example.com">
</div>

<div class="mb-3">
  <label class="form-label fw-medium">Password</label>
  <input type="password" class="form-control" placeholder="••••••••">
</div>

<div class="mb-3">
  <label class="form-label fw-medium">Bio</label>
  <textarea class="form-control" rows="3" placeholder="Write a short bio..."></textarea>
</div>`;

const CODE_INPUT_GROUPS = `<!-- Icon prefix -->
<div class="input-group mb-3">
  <span class="input-group-text"><i class="ri-search-line"></i></span>
  <input type="search" class="form-control" placeholder="Search...">
</div>

<!-- Button suffix -->
<div class="input-group mb-3">
  <input type="email" class="form-control" placeholder="Enter email">
  <button class="btn btn-warning" type="button">Subscribe</button>
</div>

<!-- Both prefix & suffix -->
<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" placeholder="0.00">
  <span class="input-group-text">USD</span>
</div>

<!-- Multi-button suffix -->
<div class="input-group">
  <input type="text" class="form-control" placeholder="Search...">
  <button class="btn btn-outline-secondary" type="button">Clear</button>
  <button class="btn btn-warning" type="button">Search</button>
</div>`;

const CODE_FLOATING = `<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatEmail" placeholder="name@example.com">
  <label for="floatEmail">Email address</label>
</div>

<div class="form-floating mb-3">
  <input type="password" class="form-control" id="floatPass" placeholder="Password">
  <label for="floatPass">Password</label>
</div>

<div class="form-floating mb-3">
  <select class="form-select" id="floatSelect">
    <option selected>Choose...</option>
    <option value="1">Administrator</option>
    <option value="2">Editor</option>
  </select>
  <label for="floatSelect">Select a role</label>
</div>

<div class="form-floating">
  <textarea class="form-control" id="floatMsg" style="height:100px" placeholder="Comments"></textarea>
  <label for="floatMsg">Comments</label>
</div>`;

const CODE_SELECT = `<!-- Native select -->
<select class="form-select mb-3">
  <option value="">Select country...</option>
  <option value="ph">Philippines</option>
  <option value="us">United States</option>
  <option value="jp">Japan</option>
</select>

<!-- Datalist autocomplete -->
<input class="form-control" list="browsers" placeholder="Type to search...">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>

<!-- react-select (animated, searchable, multi) — install: npm i react-select -->
import Select from "react-select";
<Select options={options} isMulti isClearable placeholder="Pick skills..." />`;

const CODE_CHECKS = `<!-- Checkboxes -->
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" id="chk1" checked>
  <label class="form-check-label" for="chk1">Dashboard access</label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" id="chk2" disabled>
  <label class="form-check-label" for="chk2">Billing access (disabled)</label>
</div>

<!-- Radio buttons -->
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="role" id="r1" checked>
  <label class="form-check-label" for="r1">Administrator</label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="role" id="r2">
  <label class="form-check-label" for="r2">Editor</label>
</div>

<!-- Toggle switches -->
<div class="form-check form-switch mb-2">
  <input class="form-check-input" type="checkbox" role="switch" id="sw1" checked>
  <label class="form-check-label" for="sw1">Email notifications</label>
</div>`;

const CODE_VALIDATION = `<!-- Valid input -->
<div class="mb-3">
  <label class="form-label">Username</label>
  <input type="text" class="form-control is-valid" value="johndoe">
  <div class="valid-feedback">Looks good!</div>
</div>

<!-- Invalid input -->
<div class="mb-3">
  <label class="form-label">Email</label>
  <input type="email" class="form-control is-invalid" value="not-an-email">
  <div class="invalid-feedback">Please enter a valid email address.</div>
</div>

<!-- Invalid select -->
<div class="mb-3">
  <label class="form-label">Country</label>
  <select class="form-select is-invalid">
    <option value="">Select a country...</option>
  </select>
  <div class="invalid-feedback">Please select a country.</div>
</div>`;

const CODE_HORIZONTAL = `<form>
  <div class="row mb-3 align-items-center">
    <label class="col-sm-2 col-form-label fw-medium">Full Name</label>
    <div class="col-sm-10">
      <div class="input-group">
        <span class="input-group-text"><i class="ri-user-3-line"></i></span>
        <input type="text" class="form-control" placeholder="John Doe">
      </div>
    </div>
  </div>
  <div class="row mb-3 align-items-center">
    <label class="col-sm-2 col-form-label fw-medium">Email</label>
    <div class="col-sm-10">
      <div class="input-group">
        <span class="input-group-text"><i class="ri-mail-line"></i></span>
        <input type="email" class="form-control" placeholder="john@example.com">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10 offset-sm-2">
      <button type="submit" class="btn btn-warning me-2">Save Changes</button>
      <button type="reset" class="btn btn-light">Reset</button>
    </div>
  </div>
</form>`;

const CODE_FILE_RANGE = `<!-- File input -->
<div class="mb-3">
  <label class="form-label">Upload File</label>
  <input class="form-control" type="file">
  <div class="form-text">Accepted: .jpg, .png, .pdf (max 10 MB)</div>
</div>

<!-- Multiple files -->
<div class="mb-3">
  <label class="form-label">Multiple Files</label>
  <input class="form-control" type="file" multiple>
</div>

<!-- Range slider -->
<div class="mb-3">
  <label class="form-label">Brightness</label>
  <input type="range" class="form-range" value="60">
</div>

<!-- Disabled range -->
<div>
  <label class="form-label text-muted">Disabled Range</label>
  <input type="range" class="form-range" disabled>
</div>`;

const CODE_FLOATING_SELECT = `import FloatingSelect from "@/Components/FloatingSelect";
// or define it inline — see below

// Usage
<FloatingSelect
  label="Country"
  value={country}
  onChange={(val) => setCountry(val as Option | null)}
  options={COUNTRY_OPTIONS}
  isClearable
/>

<FloatingSelect
  label="Skills"
  value={skills}
  onChange={(val) => setSkills(val as readonly Option[])}
  options={SKILL_OPTIONS}
  isMulti
  closeMenuOnSelect={false}
/>`;

const CODE_MODALS = `<!-- Trigger buttons -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#basicModal">
  Open Modal
</button>
<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">
  Delete
</button>

<!-- Basic Modal -->
<div class="modal fade" id="basicModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Modal body content goes here.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;

const CODE_SHEET = `import Sheet from "@/Components/Sheet";
import { useState } from "react";

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open Sheet</button>

<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="Sheet Title"
  side="right"
  width="tw-w-80 sm:tw-w-96"
  footer={
    <div className="d-flex gap-2">
      <button className="btn btn-sm btn-warning">Save</button>
      <button className="btn btn-sm btn-light" onClick={() => setOpen(false)}>
        Cancel
      </button>
    </div>
  }
>
  <p>Sheet body content here.</p>
</Sheet>`;

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionCard({
  id,
  title,
  description,
  code,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  code?: string;
  children: React.ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id={id} className="tw-scroll-mt-20 tw-mb-5">
      <div className="tw-rounded-xl tw-border tw-border-slate-200 tw-bg-white tw-overflow-hidden tw-shadow-sm">
        <div className="tw-px-6 tw-pt-5 tw-pb-6">
          <div className="tw-flex tw-items-start tw-justify-between tw-mb-5 tw-pb-4 tw-border-b tw-border-slate-100">
            <div>
              <h2 className="tw-text-sm tw-font-bold tw-text-slate-800 tw-uppercase tw-tracking-wide tw-mb-0">{title}</h2>
              {description && (
                <p className="tw-text-xs tw-text-slate-400 tw-mt-0.5 tw-mb-0">{description}</p>
              )}
            </div>
            {code && (
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="tw-flex tw-items-center tw-gap-1.5 tw-shrink-0 tw-ml-4 tw-text-xs tw-font-semibold tw-px-3 tw-py-1.5 tw-rounded-md tw-transition-all tw-whitespace-nowrap tw-border tw-border-slate-200 tw-bg-white tw-text-slate-500 hover:tw-bg-slate-50 hover:tw-text-slate-700"
              >
                <RiCodeSSlashLine size={13} />
                {showCode ? "Hide code" : "View code"}
              </button>
            )}
          </div>
          {children}
          {showCode && code && (
            <div className="tw-mt-5 tw-rounded-xl tw-overflow-hidden tw-border tw-border-slate-700">
              <div className="tw-flex tw-items-center tw-justify-between tw-bg-slate-800 tw-px-4 tw-py-2">
                <span className="tw-text-xs tw-text-slate-400 tw-font-mono">html</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs tw-font-medium tw-text-slate-400 hover:tw-text-white tw-bg-slate-700/60 hover:tw-bg-slate-600 tw-transition-colors tw-px-2.5 tw-py-1.5 tw-rounded"
                >
                  {copied ? <RiCheckLine size={12} /> : <RiFileCopyLine size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="tw-bg-slate-900 tw-text-slate-300 tw-px-5 tw-py-4 tw-text-xs tw-leading-relaxed tw-overflow-x-auto tw-font-mono tw-m-0 tw-whitespace-pre">
                <code>{code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="tw-block tw-text-sm tw-font-medium tw-text-slate-700 tw-mb-1.5">
      {children}
    </label>
  );
}

function HelperText({ children }: { children: React.ReactNode }) {
  return <p className="tw-text-xs tw-text-slate-400 tw-mt-1.5">{children}</p>;
}

interface FloatingSelectProps {
  label: string;
  value: Option | readonly Option[] | null;
  onChange: (val: Option | readonly Option[] | null) => void;
  options: Option[];
  isMulti?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  closeMenuOnSelect?: boolean;
}

function FloatingSelect({
  label,
  value,
  onChange,
  options,
  isMulti = false,
  isClearable = false,
  placeholder = "",
  closeMenuOnSelect = true,
}: FloatingSelectProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = isMulti
    ? Array.isArray(value) && (value as readonly Option[]).length > 0
    : value != null;
  const floated = focused || hasValue || !!placeholder;

  const floatingControlStyles: StylesConfig<Option, boolean>["control"] = (base, state) => ({
    ...rsStyles.control!(base, state),
    minHeight: "58px",
    paddingTop: floated ? "20px" : "0",
    paddingBottom: floated ? "4px" : "0",
    alignItems: floated ? "flex-end" : "center",
  });

  return (
    <div className="tw-relative">
      <label
        style={{
          position: "absolute",
          left: "12px",
          zIndex: 1,
          pointerEvents: "none",
          transition: "all 0.15s ease",
          top: floated ? "10px" : "50%",
          transform: floated ? "none" : "translateY(-50%)",
          fontSize: floated ? "0.7rem" : "0.875rem",
          color: focused ? "rgb(59 130 246)" : floated ? "rgb(100 116 139)" : "rgb(148 163 184)",
          fontWeight: floated ? 600 : 400,
          lineHeight: 1,
        }}
      >
        {label}
      </label>
      <Select
        options={options}
        value={value}
        onChange={onChange as (val: unknown) => void}
        isMulti={isMulti}
        isClearable={isClearable}
        placeholder={placeholder}
        closeMenuOnSelect={closeMenuOnSelect}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        styles={{ ...rsStyles, control: floatingControlStyles }}
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FormsPage() {
  const [country, setCountry] = useState<Option | null>(null);
  const [role, setRole] = useState<Option | null>(null);
  const [skills, setSkills] = useState<readonly Option[]>([]);

  const [floatCountry, setFloatCountry] = useState<Option | null>(null);
  const [floatRole, setFloatRole] = useState<Option | null>(null);
  const [floatSkills, setFloatSkills] = useState<readonly Option[]>([]);

  const [phCountry, setPhCountry] = useState<Option | null>(null);
  const [phRole, setPhRole] = useState<Option | null>(null);
  const [phSkills, setPhSkills] = useState<readonly Option[]>([]);

  const [basicModal, setBasicModal] = useState(false);
  const [centeredModal, setCenteredModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  const [rightSheet, setRightSheet] = useState(false);
  const [leftSheet, setLeftSheet] = useState(false);
  const [formSheet, setFormSheet] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const rightSidebar = (
    <>
      <small className="tw-uppercase tw-font-light tw-tracking-widest tw-mb-3 tw-block tw-px-3">
        On this page
      </small>
      <div ref={navRef} className="tw-flex tw-flex-col">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-to-scrollspy-id={s.id}
            onClick={(e) => onNavClick(e, s.id)}
            className="tw-px-3 tw-py-2 tw-text-slate-600 hover:tw-text-slate-900 tw-no-underline tw-transition-all"
          >
            {s.label}
          </a>
        ))}
      </div>
    </>
  );

  return (
    <DocsLayout headTitle="Form Layouts" rightSidebar={rightSidebar}>
      <style>{`
        @keyframes rsMenuIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="tw-pb-6 tw-mb-6 tw-border-b tw-border-slate-100">
        <h1 className="tw-text-3xl tw-font-black tw-text-slate-900 tw-mb-2">Form Layouts</h1>
        <p className="tw-text-sm tw-text-slate-500">All Bootstrap 5 form components — inputs, selects, validation, modals, sheets, and more.</p>
      </div>

      <ScrollSpy navContainerRef={navRef} activeClass="active-scroll-spy" offsetTop={56} scrollThrottle={100}>
          <SectionCard
            id="basic-inputs"
            title="Basic Inputs"
            description="Standard text fields with labels and helper text."
            code={CODE_BASIC}
          >
            <Row className="g-4">
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>Full Name</FieldLabel>
                  <Form.Control type="text" placeholder="John Doe" className={FIELD} />
                  <HelperText>Enter your first and last name.</HelperText>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>Email Address</FieldLabel>
                  <Form.Control type="email" placeholder="john@example.com" className={FIELD} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>Password</FieldLabel>
                  <Form.Control type="password" placeholder="••••••••" className={FIELD} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Form.Control type="tel" placeholder="+1 (555) 000-0000" className={FIELD} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <FieldLabel>Bio</FieldLabel>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write a short bio about yourself..."
                    className={FIELD}
                  />
                </Form.Group>
              </Col>
            </Row>
          </SectionCard>

          <SectionCard
            id="input-groups"
            title="Input Groups"
            description="Inputs augmented with icons, text add-ons, and buttons."
            code={CODE_INPUT_GROUPS}
          >
            <Row className="g-4">
              <Col md={6}>
                <FieldLabel>Search</FieldLabel>
                <InputGroup>
                  <InputGroup.Text className={ADDON}>
                    <RiSearchLine size={15} />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search..."
                    className={`${FIELD} !tw-rounded-l-none`}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <FieldLabel>Email with Button</FieldLabel>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className={`${FIELD} !tw-rounded-r-none`}
                  />
                  <button className="tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-text-sm tw-font-semibold tw-px-4 tw-rounded-r-md tw-transition-all">
                    Subscribe
                  </button>
                </InputGroup>
              </Col>
              <Col md={6}>
                <FieldLabel>Website URL</FieldLabel>
                <InputGroup>
                  <InputGroup.Text className={ADDON}>https://</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="example.com"
                    className={`${FIELD} !tw-rounded-l-none`}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <FieldLabel>Price</FieldLabel>
                <InputGroup>
                  <InputGroup.Text className={ADDON}>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    className={`${FIELD} !tw-rounded-none`}
                  />
                  <InputGroup.Text className={ADDON}>USD</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col md={6}>
                <FieldLabel>Username</FieldLabel>
                <InputGroup>
                  <InputGroup.Text className={ADDON}>
                    <RiUser3Line size={15} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="johndoe"
                    className={`${FIELD} !tw-rounded-l-none`}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <FieldLabel>Search with Actions</FieldLabel>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    className={`${FIELD} !tw-rounded-r-none`}
                  />
                  <button className="tw-border tw-border-l-0 tw-border-slate-200 tw-bg-slate-50 hover:tw-bg-slate-100 tw-text-slate-500 tw-text-sm tw-font-medium tw-px-3 tw-transition-colors">
                    Clear
                  </button>
                  <button className="tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-text-sm tw-font-semibold tw-px-3 tw-rounded-r-md tw-transition-all">
                    Search
                  </button>
                </InputGroup>
              </Col>
            </Row>
          </SectionCard>

          <SectionCard
            id="floating-labels"
            title="Floating Labels"
            description="Labels that animate above the input on focus or fill."
            code={CODE_FLOATING}
          >
            <Row className="g-4">
              <Col md={6}>
                <Form.FloatingLabel label="Email address">
                  <Form.Control type="email" placeholder="name@example.com" className={FIELD} />
                </Form.FloatingLabel>
              </Col>
              <Col md={6}>
                <Form.FloatingLabel label="Password">
                  <Form.Control type="password" placeholder="Password" className={FIELD} />
                </Form.FloatingLabel>
              </Col>
              <Col md={6}>
                <Form.FloatingLabel label="Select a role">
                  <Form.Select className={FIELD}>
                    <option value="">Choose...</option>
                    <option value="admin">Administrator</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </Form.Select>
                </Form.FloatingLabel>
              </Col>
              <Col md={6}>
                <Form.FloatingLabel label="Comments">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment"
                    style={{ height: "100px" }}
                    className={FIELD}
                  />
                </Form.FloatingLabel>
              </Col>
            </Row>
          </SectionCard>

          <SectionCard
            id="floating-select"
            title="Floating Select"
            description="react-select with a floating label or inline placeholder — two styles for every context."
            code={CODE_FLOATING_SELECT}
          >
            <p className="tw-text-xs tw-font-semibold tw-text-slate-400 tw-uppercase tw-tracking-wide tw-mb-3">
              Floating label
            </p>
            <Row className="g-4 tw-mb-6">
              <Col md={4}>
                <FloatingSelect
                  label="Country"
                  value={floatCountry}
                  onChange={(val) => setFloatCountry(val as Option | null)}
                  options={COUNTRY_OPTIONS}
                  isClearable
                />
              </Col>
              <Col md={4}>
                <FloatingSelect
                  label="Role"
                  value={floatRole}
                  onChange={(val) => setFloatRole(val as Option | null)}
                  options={ROLE_OPTIONS}
                />
              </Col>
              <Col md={4}>
                <FloatingSelect
                  label="Skills"
                  value={floatSkills}
                  onChange={(val) => setFloatSkills(val as readonly Option[])}
                  options={SKILL_OPTIONS}
                  isMulti
                  closeMenuOnSelect={false}
                />
              </Col>
            </Row>
            <div className="tw-border-t tw-border-slate-100 tw-pt-5">
              <p className="tw-text-xs tw-font-semibold tw-text-slate-400 tw-uppercase tw-tracking-wide tw-mb-3">
                Floating label with placeholder
              </p>
              <Row className="g-4">
                <Col md={4}>
                  <FloatingSelect
                    label="Country"
                    value={phCountry}
                    onChange={(val) => setPhCountry(val as Option | null)}
                    options={COUNTRY_OPTIONS}
                    placeholder="Select a country..."
                    isClearable
                  />
                </Col>
                <Col md={4}>
                  <FloatingSelect
                    label="Role"
                    value={phRole}
                    onChange={(val) => setPhRole(val as Option | null)}
                    options={ROLE_OPTIONS}
                    placeholder="Assign a role..."
                  />
                </Col>
                <Col md={4}>
                  <FloatingSelect
                    label="Skills"
                    value={phSkills}
                    onChange={(val) => setPhSkills(val as readonly Option[])}
                    options={SKILL_OPTIONS}
                    placeholder="Pick skills..."
                    isMulti
                    closeMenuOnSelect={false}
                  />
                </Col>
              </Row>
            </div>
          </SectionCard>

          <SectionCard
            id="select-dropdowns"
            title="Select Dropdowns"
            description="Custom react-select dropdowns with animated open/close, search, and multi-select."
            code={CODE_SELECT}
          >
            <Row className="g-4">
              <Col md={4}>
                <FieldLabel>Country</FieldLabel>
                <Select
                  options={COUNTRY_OPTIONS}
                  value={country}
                  onChange={(val) => setCountry(val as Option | null)}
                  styles={rsStyles}
                  placeholder="Select country..."
                  isClearable
                />
              </Col>
              <Col md={4}>
                <FieldLabel>Role</FieldLabel>
                <Select
                  options={ROLE_OPTIONS}
                  value={role}
                  onChange={(val) => setRole(val as Option | null)}
                  styles={rsStyles}
                  placeholder="Select role..."
                />
              </Col>
              <Col md={4}>
                <FieldLabel>Skills (multi-select)</FieldLabel>
                <Select
                  isMulti
                  options={SKILL_OPTIONS}
                  value={skills}
                  onChange={(val) => setSkills(val as readonly Option[])}
                  styles={rsStyles}
                  placeholder="Pick skills..."
                  closeMenuOnSelect={false}
                />
              </Col>
              <Col md={6}>
                <FieldLabel>Datalist (native autocomplete)</FieldLabel>
                <Form.Control
                  list="browsers-dl"
                  placeholder="Type to search a browser..."
                  className={FIELD}
                />
                <datalist id="browsers-dl">
                  <option value="Chrome" />
                  <option value="Firefox" />
                  <option value="Safari" />
                  <option value="Edge" />
                  <option value="Opera" />
                </datalist>
              </Col>
              <Col md={6}>
                <FieldLabel>Searchable select</FieldLabel>
                <Select
                  options={[...COUNTRY_OPTIONS, ...ROLE_OPTIONS]}
                  styles={rsStyles}
                  placeholder="Type to filter..."
                  isSearchable
                />
                <HelperText>Start typing to narrow down options.</HelperText>
              </Col>
            </Row>
          </SectionCard>

          <SectionCard
            id="checks-radios"
            title="Checkboxes, Radios & Switches"
            description="Standard and inline option selectors."
            code={CODE_CHECKS}
          >
            <Row className="g-5">
              <Col md={4}>
                <p className="tw-text-xs tw-text-slate-500 tw-uppercase tw-font-semibold tw-tracking-wide tw-mb-3">
                  Checkboxes
                </p>
                <Form.Check type="checkbox" label="Dashboard access" defaultChecked id="chk1" className="tw-mb-2" />
                <Form.Check type="checkbox" label="Reports access" id="chk2" className="tw-mb-2" />
                <Form.Check type="checkbox" label="User management" id="chk3" className="tw-mb-2" />
                <Form.Check type="checkbox" label="Billing access" disabled id="chk4" />
              </Col>
              <Col md={4}>
                <p className="tw-text-xs tw-text-slate-500 tw-uppercase tw-font-semibold tw-tracking-wide tw-mb-3">
                  Radio Buttons
                </p>
                <Form.Check type="radio" name="role" label="Administrator" defaultChecked id="rad1" className="tw-mb-2" />
                <Form.Check type="radio" name="role" label="Editor" id="rad2" className="tw-mb-2" />
                <Form.Check type="radio" name="role" label="Viewer" id="rad3" className="tw-mb-2" />
                <Form.Check type="radio" name="role" label="Guest (disabled)" disabled id="rad4" />
              </Col>
              <Col md={4}>
                <p className="tw-text-xs tw-text-slate-500 tw-uppercase tw-font-semibold tw-tracking-wide tw-mb-3">
                  Toggle Switches
                </p>
                <Form.Check type="switch" label="Email notifications" defaultChecked id="sw1" className="tw-mb-2" />
                <Form.Check type="switch" label="Push notifications" id="sw2" className="tw-mb-2" />
                <Form.Check type="switch" label="Dark mode" defaultChecked id="sw3" className="tw-mb-2" />
                <Form.Check type="switch" label="Beta features (disabled)" disabled id="sw4" />
              </Col>
            </Row>
          </SectionCard>

          <SectionCard
            id="validation"
            title="Validation States"
            description="Valid, invalid, and error feedback on inputs."
            code={CODE_VALIDATION}
          >
            <Row className="g-4">
              <Col md={4}>
                <Form.Group>
                  <FieldLabel>
                    Username <span className="tw-text-slate-400 tw-font-normal">(valid)</span>
                  </FieldLabel>
                  <Form.Control type="text" defaultValue="johndoe" isValid className={FIELD} />
                  <Form.Control.Feedback type="valid" className="tw-text-xs">
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <FieldLabel>
                    Email <span className="tw-text-slate-400 tw-font-normal">(invalid)</span>
                  </FieldLabel>
                  <Form.Control type="email" defaultValue="not-an-email" isInvalid className={FIELD} />
                  <Form.Control.Feedback type="invalid" className="tw-text-xs">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <FieldLabel>
                    Password <span className="tw-text-slate-400 tw-font-normal">(too short)</span>
                  </FieldLabel>
                  <Form.Control type="password" defaultValue="1234" isInvalid className={FIELD} />
                  <Form.Control.Feedback type="invalid" className="tw-text-xs">
                    Password must be at least 8 characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>Country</FieldLabel>
                  <Form.Select isInvalid className={FIELD}>
                    <option value="">Select a country...</option>
                    <option>Philippines</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="tw-text-xs">
                    Please select a country.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>Website</FieldLabel>
                  <Form.Control
                    type="url"
                    defaultValue="https://example.com"
                    isValid
                    className={FIELD}
                  />
                  <Form.Control.Feedback type="valid" className="tw-text-xs">
                    URL looks great!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </SectionCard>

          <SectionCard
            id="horizontal"
            title="Horizontal Layout"
            description="Label and field aligned side by side."
            code={CODE_HORIZONTAL}
          >
            <Form>
              {[
                { label: "Full Name", icon: <RiUser3Line size={15} />, type: "text", placeholder: "John Doe" },
                { label: "Email", icon: <RiMailLine size={15} />, type: "email", placeholder: "john@example.com" },
                { label: "Phone", icon: <RiPhoneLine size={15} />, type: "tel", placeholder: "+1 (555) 000-0000" },
                { label: "Website", icon: <RiGlobalLine size={15} />, type: "url", placeholder: "https://example.com" },
                { label: "Password", icon: <RiLockPasswordLine size={15} />, type: "password", placeholder: "••••••••" },
              ].map(({ label, icon, type, placeholder }) => (
                <Form.Group as={Row} key={label} className="tw-mb-4 tw-items-center">
                  <Form.Label column sm={2} className="tw-text-sm tw-font-medium tw-text-slate-700">
                    {label}
                  </Form.Label>
                  <Col sm={10}>
                    <InputGroup>
                      <InputGroup.Text className={ADDON}>{icon}</InputGroup.Text>
                      <Form.Control
                        type={type}
                        placeholder={placeholder}
                        className={`${FIELD} !tw-rounded-l-none`}
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
              ))}
              <Row>
                <Col sm={{ offset: 2 }}>
                  <button
                    type="submit"
                    className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-transition-all tw-text-white tw-text-sm tw-font-semibold tw-px-5 tw-py-2 tw-rounded-md tw-shadow-sm tw-mr-2"
                  >
                    Save Changes
                  </button>
                  <button
                    type="reset"
                    className="tw-inline-flex tw-items-center tw-bg-slate-100 hover:tw-bg-slate-200 tw-transition-colors tw-text-slate-700 tw-text-sm tw-font-semibold tw-px-5 tw-py-2 tw-rounded-md"
                  >
                    Reset
                  </button>
                </Col>
              </Row>
            </Form>
          </SectionCard>

          <SectionCard
            id="file-range"
            title="File Input & Range Slider"
            description="File uploads and range controls."
            code={CODE_FILE_RANGE}
          >
            <Row className="g-5 tw-pb-2">
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>Upload File</FieldLabel>
                  <Form.Control type="file" className={FIELD} />
                  <HelperText>Accepted: .jpg, .png, .pdf (max 10 MB)</HelperText>
                </Form.Group>
                <Form.Group className="tw-mt-4">
                  <FieldLabel>Multiple Files</FieldLabel>
                  <Form.Control type="file" multiple className={FIELD} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FieldLabel>
                    Brightness <span className="tw-text-slate-400 tw-font-normal">— drag to adjust</span>
                  </FieldLabel>
                  <Form.Range defaultValue={60} />
                </Form.Group>
                <Form.Group className="tw-mt-4">
                  <FieldLabel>Volume</FieldLabel>
                  <Form.Range defaultValue={35} />
                </Form.Group>
                <Form.Group className="tw-mt-4">
                  <p className="tw-block tw-text-sm tw-font-medium tw-text-slate-700/50 tw-mb-1.5">
                    Disabled Range
                  </p>
                  <Form.Range disabled defaultValue={50} />
                </Form.Group>
              </Col>
            </Row>
          </SectionCard>

          <SectionCard
            id="modals"
            title="Modals"
            description="Dialog overlays — basic, centered, confirm, and form variants."
            code={CODE_MODALS}
          >
            <div className="tw-flex tw-flex-wrap tw-gap-3 tw-items-center">
              <div className="tw-flex tw-items-center tw-gap-2 tw-mr-2 tw-text-slate-400">
                <RiWindowLine size={16} />
                <span className="tw-text-xs tw-font-medium tw-text-slate-500">Live demos:</span>
              </div>
              <button
                type="button"
                onClick={() => setBasicModal(true)}
                className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-800 tw-text-white hover:tw-bg-slate-700 tw-transition-colors"
              >
                Basic
              </button>
              <button
                type="button"
                onClick={() => setCenteredModal(true)}
                className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 tw-transition-colors"
              >
                Centered Info
              </button>
              <button
                type="button"
                onClick={() => setConfirmModal(true)}
                className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-rose-500 tw-text-white hover:tw-bg-rose-600 tw-transition-colors"
              >
                Confirm Delete
              </button>
              <button
                type="button"
                onClick={() => setFormModal(true)}
                className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-transition-all tw-shadow-sm"
              >
                Form Modal
              </button>
            </div>

            <Modal show={basicModal} onHide={() => setBasicModal(false)}>
              <Modal.Header closeButton className="tw-border-b tw-border-slate-100">
                <Modal.Title className="tw-text-base tw-font-bold tw-text-slate-800">
                  Modal Title
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="tw-text-sm tw-text-slate-600">
                <p className="tw-mb-0">
                  This is a standard modal. You can place any content here — forms, alerts, images, or rich text.
                </p>
              </Modal.Body>
              <Modal.Footer className="tw-border-t tw-border-slate-100">
                <button
                  type="button"
                  onClick={() => setBasicModal(false)}
                  className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-100 hover:tw-bg-slate-200 tw-text-slate-700 tw-transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-800 tw-text-white hover:tw-bg-slate-700 tw-transition-colors"
                >
                  Save changes
                </button>
              </Modal.Footer>
            </Modal>

            <Modal show={centeredModal} onHide={() => setCenteredModal(false)} centered>
              <Modal.Body className="tw-text-center tw-px-6 tw-py-8">
                <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
                  <svg className="tw-w-6 tw-h-6 tw-text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                </div>
                <h5 className="tw-font-bold tw-text-slate-800 tw-mb-2">Heads up!</h5>
                <p className="tw-text-sm tw-text-slate-500 tw-mb-5">
                  Your session will expire in 5 minutes. Save your work to avoid losing changes.
                </p>
                <div className="tw-flex tw-justify-center tw-gap-2">
                  <button
                    type="button"
                    onClick={() => setCenteredModal(false)}
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-100 hover:tw-bg-slate-200 tw-text-slate-700 tw-transition-colors"
                  >
                    Dismiss
                  </button>
                  <button
                    type="button"
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 tw-transition-colors"
                  >
                    Save now
                  </button>
                </div>
              </Modal.Body>
            </Modal>

            <Modal show={confirmModal} onHide={() => setConfirmModal(false)} centered size="sm">
              <Modal.Body className="tw-text-center tw-px-6 tw-py-8">
                <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-rose-50 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
                  <svg className="tw-w-6 tw-h-6 tw-text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 00-3.42 0z" />
                  </svg>
                </div>
                <h5 className="tw-font-bold tw-text-slate-800 tw-mb-1">Delete this item?</h5>
                <p className="tw-text-xs tw-text-slate-500 tw-mb-5">This action cannot be undone.</p>
                <div className="tw-flex tw-justify-center tw-gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmModal(false)}
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-100 hover:tw-bg-slate-200 tw-text-slate-700 tw-transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-rose-500 tw-text-white hover:tw-bg-rose-600 tw-transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </Modal.Body>
            </Modal>

            <Modal show={formModal} onHide={() => setFormModal(false)}>
              <Modal.Header closeButton className="tw-border-b tw-border-slate-100">
                <Modal.Title className="tw-text-base tw-font-bold tw-text-slate-800">
                  Invite Team Member
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <FieldLabel>First Name</FieldLabel>
                    <Form.Control type="text" placeholder="John" className={FIELD} />
                  </Col>
                  <Col md={6}>
                    <FieldLabel>Last Name</FieldLabel>
                    <Form.Control type="text" placeholder="Doe" className={FIELD} />
                  </Col>
                  <Col md={12}>
                    <FieldLabel>Email Address</FieldLabel>
                    <Form.Control type="email" placeholder="john@example.com" className={FIELD} />
                  </Col>
                  <Col md={12}>
                    <FieldLabel>Role</FieldLabel>
                    <Form.Select className={FIELD}>
                      <option value="">Assign a role...</option>
                      <option value="admin">Administrator</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer className="tw-border-t tw-border-slate-100">
                <button
                  type="button"
                  onClick={() => setFormModal(false)}
                  className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-100 hover:tw-bg-slate-200 tw-text-slate-700 tw-transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-transition-all tw-shadow-sm"
                >
                  Send Invite
                </button>
              </Modal.Footer>
            </Modal>
          </SectionCard>

          <SectionCard
            id="sheet"
            title="Sheet / Drawer"
            description="Reusable slide-over panel from the right or left. Drop-in component ready for production."
            code={CODE_SHEET}
          >
            <div className="tw-flex tw-flex-wrap tw-gap-3 tw-items-center">
              <div className="tw-flex tw-items-center tw-gap-2 tw-mr-2 tw-text-slate-400">
                <RiLayoutLine size={16} />
                <span className="tw-text-xs tw-font-medium tw-text-slate-500">Live demos:</span>
              </div>
              <button
                type="button"
                onClick={() => setRightSheet(true)}
                className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-800 tw-text-white hover:tw-bg-slate-700 tw-transition-colors"
              >
                Right Sheet
              </button>
              <button
                type="button"
                onClick={() => setLeftSheet(true)}
                className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-800 tw-text-white hover:tw-bg-slate-700 tw-transition-colors"
              >
                Left Sheet
              </button>
              <button
                type="button"
                onClick={() => setFormSheet(true)}
                className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-transition-all tw-shadow-sm"
              >
                Sheet with Form
              </button>
            </div>

            <Sheet
              open={rightSheet}
              onClose={() => setRightSheet(false)}
              title="Right Sheet"
              footer={
                <div className="tw-flex tw-gap-2">
                  <button
                    type="button"
                    onClick={() => setRightSheet(false)}
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-transition-all tw-shadow-sm"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setRightSheet(false)}
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-100 hover:tw-bg-slate-200 tw-text-slate-700 tw-transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              }
            >
              <p className="tw-text-sm tw-text-slate-600 tw-mb-4">
                This sheet slides in from the right. Pass <code className="tw-bg-slate-100 tw-px-1 tw-rounded tw-text-xs">side="left"</code> to flip it.
              </p>
              <p className="tw-text-sm tw-text-slate-400">
                Use the <strong className="tw-text-slate-600">footer</strong> prop for action buttons and the <strong className="tw-text-slate-600">title</strong> prop for the header label. The body scrolls independently.
              </p>
            </Sheet>

            <Sheet
              open={leftSheet}
              onClose={() => setLeftSheet(false)}
              title="Left Sheet"
              side="left"
            >
              <p className="tw-text-sm tw-text-slate-600">
                Slides in from the left. Great for navigation menus or filter panels.
              </p>
            </Sheet>

            <Sheet
              open={formSheet}
              onClose={() => setFormSheet(false)}
              title="Edit Profile"
              width="tw-w-full sm:tw-w-[420px]"
              footer={
                <div className="tw-flex tw-gap-2">
                  <button
                    type="button"
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-gradient-to-r tw-from-amber-500 tw-to-amber-400 hover:tw-from-amber-600 hover:tw-to-amber-500 tw-text-white tw-transition-all tw-shadow-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormSheet(false)}
                    className="tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-md tw-bg-slate-100 hover:tw-bg-slate-200 tw-text-slate-700 tw-transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              }
            >
              <Row className="g-3">
                <Col xs={6}>
                  <FieldLabel>First Name</FieldLabel>
                  <Form.Control type="text" defaultValue="John" className={FIELD} />
                </Col>
                <Col xs={6}>
                  <FieldLabel>Last Name</FieldLabel>
                  <Form.Control type="text" defaultValue="Doe" className={FIELD} />
                </Col>
                <Col xs={12}>
                  <FieldLabel>Email</FieldLabel>
                  <Form.Control type="email" defaultValue="john@example.com" className={FIELD} />
                </Col>
                <Col xs={12}>
                  <FieldLabel>Role</FieldLabel>
                  <Form.Select className={FIELD}>
                    <option>Developer</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </Form.Select>
                </Col>
                <Col xs={12}>
                  <FieldLabel>Bio</FieldLabel>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue="Full-stack developer passionate about clean UIs."
                    className={FIELD}
                  />
                </Col>
              </Row>
            </Sheet>
          </SectionCard>
      </ScrollSpy>
    </DocsLayout>
  );
}
