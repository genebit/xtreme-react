# BS5 Xtreme Admin

A modern **Laravel 10 + React 18 + Inertia.js** admin panel starter template. Combines Bootstrap 5 and Tailwind CSS (with a `tw-` prefix to avoid conflicts), ships with a live component reference, and includes full demo pages for every common admin UI pattern.

---

## Tech Stack

| Technology   | Version | Role                              |
|--------------|---------|-----------------------------------|
| Laravel      | v10     | PHP MVC backend framework         |
| React        | v18     | Component-based UI library        |
| Inertia.js   | v1      | Server-driven SPA bridge          |
| TypeScript   | v5      | Statically typed JavaScript       |
| Tailwind CSS | v3      | Utility-first CSS (`tw-` prefix)  |
| Bootstrap    | v5      | Component CSS library             |
| Vite         | v5      | Frontend build tool               |
| RemixIcon    | v4      | 2,800+ open-source SVG icons      |
| ApexCharts   | v3      | Interactive data visualization    |

---

## Requirements

- PHP >= 8.1
- Composer
- Node.js >= 18
- npm

---

## Getting Started

### Option A — Download the release (recommended for new projects)

1. Go to the [Releases](https://github.com/genebit/xtreme-react/releases) page and download the latest `Source code (.zip)` for `release/v1.1.0`.
2. Extract the archive and rename the folder to your project name.
3. Follow the **Install & Run** steps below.

### Option B — Clone the repository

Clone the `development` branch for the full source including demo pages:

```bash
git clone https://github.com/genebit/xtreme-react.git
cd xtreme-react
```

Or clone the clean release branch directly:

```bash
git clone -b release/v1.1.0 https://github.com/genebit/xtreme-react.git my-app
cd my-app
```

---

## Install & Run

### 1. Install dependencies

```bash
composer install
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

> No database is required for the template pages. Add your `DB_*` values to `.env` and run `php artisan migrate` when your app needs one.

### 3. Start the development servers

```bash
# Terminal 1 — Laravel backend
php artisan serve

# Terminal 2 — Vite frontend
npm run dev
```

Open `http://localhost:8000`. The root `/` redirects to the component reference at `/docs/ui/v1/`.

---

## Project Structure

```
xtreme-react/
├── app/
│   └── Http/Controllers/v1/Web/
│       ├── DocumentationController.php    # Docs landing page
│       ├── FormsController.php            # Form component reference
│       ├── DashboardController.php        # Demo: Dashboard
│       ├── TasksController.php            # Demo: Tasks
│       ├── ReportsController.php          # Demo: Reports
│       ├── ProjectsController.php         # Demo: Projects
│       ├── NotificationsController.php    # Demo: Notifications
│       ├── UserProfileController.php      # Demo: User Profile
│       └── StarterController.php          # Demo: Blank starter page
│
├── resources/
│   ├── css/
│   │   ├── app.css                        # Global styles entry
│   │   ├── components.css                 # Bootstrap overrides and focus ring
│   │   └── loader.css                     # Preloader animation
│   │
│   └── js/
│       ├── Components/
│       │   ├── PageHero.tsx               # Page heading component
│       │   ├── Preloader.tsx              # Full-screen loading screen
│       │   ├── ScrollSpy.tsx              # Scroll-aware section nav
│       │   └── Sheet.tsx                  # Slide-over panel (left / right)
│       │
│       ├── Layouts/
│       │   ├── AdminLayout.tsx            # Admin shell (sidebar + header)
│       │   ├── DocsLayout.tsx             # Docs layout with scroll-spy sidebar
│       │   └── GuestLayout.tsx            # Minimal guest wrapper
│       │
│       └── Pages/
│           ├── Demo/                      # Admin demo pages
│           │   ├── Dashboard/
│           │   ├── Tasks/
│           │   ├── Reports/
│           │   ├── Projects/
│           │   ├── Notifications/
│           │   ├── Profile/
│           │   └── Starter/
│           ├── Guest/
│           │   └── LandingPage.tsx        # Component reference / docs home
│           └── UI/
│               └── Forms/
│                   └── FormsPage.tsx      # Form component reference
│
└── routes/web.php
```

---

## Routes

| Path                                     | Name                  | Description               |
|------------------------------------------|-----------------------|---------------------------|
| `/`                                      | —                     | Redirects to docs         |
| `/docs/ui/v1/`                           | `landing`             | Documentation home        |
| `/docs/ui/v1/forms`                      | `forms`               | Form component reference  |
| `/docs/ui/v1/demo/u/dashboard`           | `dashboard`           | Demo: Dashboard           |
| `/docs/ui/v1/demo/u/tasks`               | `tasks`               | Demo: Tasks               |
| `/docs/ui/v1/demo/u/reports`             | `reports`             | Demo: Reports             |
| `/docs/ui/v1/demo/u/reports/export`      | `reports.export`      | Demo: Reports export      |
| `/docs/ui/v1/demo/u/projects`            | `projects`            | Demo: Projects            |
| `/docs/ui/v1/demo/u/projects/archived`   | `projects.archived`   | Demo: Archived projects   |
| `/docs/ui/v1/demo/u/profile`             | `profile`             | Demo: User profile        |
| `/docs/ui/v1/demo/u/notifications`       | `notifications`       | Demo: Notifications       |
| `/docs/ui/v1/demo/starter`               | `starter`             | Demo: Blank starter       |

---

## Building for Production

```bash
npm run build
```

---

## Author

**Johcel Gene T. Bitara** — SWE / Applications Programmer

---

## License

MIT
