# Resource Hub

> This project is live and under active development — responsiveness and further content are still in progress.

**Live demo:** [resources-hub-lovat.vercel.app](https://resources-hub-lovat.vercel.app/)

---

A curated library for organizing useful tools and documentation discovered while learning, developing, or browsing the web. Built as a personal application first and a portfolio project second, the platform consists of two parts: a public, read-only gallery that anyone can browse, and a private admin panel where resources are manually added, categorized, and managed.

---

## Table of Contents

- [Preview](#preview)
- [Vision & Goals](#vision--goals)
- [Target Audience](#target-audience)
- [Features](#features)
- [Tech Stack & Tools](#tech-stack--tools)
- [Dependencies & Libraries](#dependencies--libraries)
- [Project Structure](#project-structure)
- [Access Model](#access-model)
- [Folder Architecture](#folder-architecture)
- [Installation & Setup](#installation--setup)
- [Status & Roadmap](#status--roadmap)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Preview

### Public site

Browsing, filtering by type and category, and the resource cards in action.

![Website preview](docs/readme-preview/site-preview.gif)

### Admin panel

Logging in and managing resources through the CRUD tables.

![Admin preview](docs/readme-preview/admin-preview.gif)

---

## Vision & Goals

Resource Hub was built with three goals in mind: to practice a realistic full-stack workflow; to be portfolio-worthy, backed by real architecture decisions; and to end up as a tool that's actually useful day to day, for saving and revisiting the tools and services worth remembering.

The tech stack was chosen deliberately with these goals in mind — a native PostgreSQL database and a hand-built Express API with session-based auth, instead of an all-in-one platform like Supabase, specifically to learn the backend, auth, and database fundamentals a platform like Supabase normally handles for you.

---

## Target Audience

- Anyone looking for a curated, categorized collection of dev tools, services, and learning resources
- Developers who want a quick reference instead of re-searching for the same tools repeatedly
- Other self-taught/learning developers who might find the resource list itself genuinely useful

---

## Features

### Public

- Browse the full resource collection — every saved tool and service, presented as an easily scannable list.
- Browse by type — the primary way through the collection: tools, references, extensions, and so on, each as its own gallery.
- Filter by category within a type — narrow a type's gallery further by category, since a resource can belong to several at once.
- Browse by category — a separate category-first view, useful for cutting across types.
- View resource details — title, description, pricing status (e.g. free, paid, freemium), and a direct link out to the source.
- Suggest a resource — a form with a live preview of how the suggestion would render as a resource card.

### Admin

- Add, edit, and delete resources — the entire content lifecycle happens through a private panel, no direct database editing needed day to day.
- Organize with categories — assign as many as make sense to a resource, so the same item can surface under multiple useful filters.
- Session-based login — a single hashed admin password grants access; sessions are checked on every write request via middleware, and expire rather than persisting indefinitely.

---

## Tech Stack & Tools

| Category        | Tools                               |
| --------------- | ----------------------------------- |
| Prototyping     | Figma                               |
| Frontend        | Next.js + React + TypeScript        |
| Styling         | CSS Modules + Sass (`.module.scss`) |
| Backend         | Node.js + Express + TypeScript      |
| ORM             | Prisma                              |
| Database        | PostgreSQL                          |
| DB GUI          | Prisma Studio                       |
| API testing     | Postman                             |
| Auth            | bcryptjs + express-session          |
| Email           | Resend                              |
| Version Control | Git + GitHub                        |
| Deployment      | Vercel + Render + Neon              |

---

## Dependencies & Libraries

### Frontend

#### Dependencies

| Package               | Purpose                         |
| --------------------- | ------------------------------- |
| `next`                | React framework with App Router |
| `react` / `react-dom` | UI library                      |
| `next-themes`         | Dark/light mode theming         |
| `lucide-react`        | Icon set                        |
| `sass`                | Enables `.scss` syntax          |

#### Dev dependencies

| Package                                           | Purpose          |
| ------------------------------------------------- | ---------------- |
| `typescript`                                      | Static typing    |
| `eslint`                                          | Linting          |
| `@types/node`, `@types/react`, `@types/react-dom` | Type definitions |

> `react`, `react-dom`, and `next` are pinned to exact versions, while other dependencies use `^` ranges and can update within their minor/patch range on install.

### Backend

#### Dependencies

| Package              | Purpose                             |
| -------------------- | ----------------------------------- |
| `express`            | REST API framework                  |
| `express-session`    | Server-side session handling        |
| `bcryptjs`           | Password hashing                    |
| `resend`             | Sends resource-suggestion emails    |
| `cors`               | Cross-origin request handling       |
| `@prisma/client`     | Prisma generated client             |
| `@prisma/adapter-pg` | Prisma's native `pg` driver adapter |
| `pg`                 | PostgreSQL driver                   |

#### Dev dependencies

| Package                  | Purpose                          |
| ------------------------ | -------------------------------- |
| `prisma`                 | ORM — schema, migrations, client |
| `typescript`             | Static typing                    |
| `dotenv`                 | Loads environment variables      |
| `nodemon`                | Dev server auto-restart          |
| `@types/express`         | Express type definitions         |
| `@types/express-session` | express-session type definitions |
| `@types/node`            | Node type definitions            |
| `@types/cors`            | cors type definitions            |

> The backend runs TypeScript natively with no build step (`node src/app.ts` in production, `nodemon` in development), and uses Express 5 with Prisma's `pg` adapter rather than Prisma's default driver.

---

## Project Structure

Resource Hub consists of a Next.js frontend (using the App Router) and a hand-built Express + Prisma API. The frontend is split into two sides that pull from the same backend: a public side for browsing, and an admin side for managing content. Each side has its own layout, its own metadata rules, and its own access control.

### Page structure

The public site lives under a `(site)` route group — a URL-invisible group used purely to attach a shared `Header`/`Footer` layout and site-wide metadata to the homepage, `/resources`, `/categories`, `/suggest`, and the per-type `/collections/[type]` galleries. `admin/` is a plain folder rather than a route group, since its URL segment (`/admin`) is intentional — it needs its own layout that overrides metadata with `noindex`/`nofollow` and its own login gate. `src/proxy.ts` (Next 16's middleware convention) sits in front of both: it normalizes casing on `/collections/:type`, and on `/admin` routes only, checks the session to redirect unauthenticated visitors off `/admin` and authenticated visitors off `/admin/login`.

### Component organisation

Public-facing layout pieces (`Header`, `Footer`, `GalleryGrid`) and page-level components (`Hero`, `Stats`) live under `(site)/layout/` and `(site)/components/`. The admin side follows one repeated pattern across all three of its data types: `ResourceTable`, `StatusTable`, and `CategoryTable` each fetch their full list server-side, track a single "active" row (editing, viewing, or a new draft) in client state, and conditionally render an input or plain text per cell. `AdminTabs` switches between the three client-side, without separate routes.

### Data layer

Content is defined in `backend/prisma/schema.prisma` and served through typed fetch wrappers in `frontend/src/api/` (`resources.ts`, `categories.ts`, `statuses.ts`, `auth.ts`, `suggest.ts`):

- **Resource** — `title`, `description`, `url`, `logo?`, `createdAt`, and a `type`
  - `type` — enum: `Tools | References | Libraries | Inspiration | Services | Extensions | Social`
  - `status?` — optional many-to-one relation (each resource has at most one status, e.g. "Paid" or "Freemium"; a status can apply to many resources)
  - `categories` — **many-to-many** with Category; a resource can belong to multiple categories and appears under each on the public `/categories` page
- **Category** — `id`, `name`
- **Status** — `id`, `name`

There is no separate tagging system — categories serve as the primary filtering/organizing mechanism, and a resource can carry several.

All fetch wrappers build their URLs through `lib/apiUrl.ts`: in the browser, requests go to the frontend's own `/api/*` path; on the server (server components and `proxy.ts`), they go directly to the backend via `BACKEND_URL`. See [Deployment](#deployment).

### Type sync

The frontend's `Type` is generated from the backend's Prisma schema rather than maintained by hand. `backend/scripts/generateFrontendTypes.ts` reads Prisma's generated enum and writes `frontend/src/lib/generatedType.ts`, which the frontend imports `Type` from. After changing the `Type` enum in `schema.prisma` and migrating, run `npm run generate-frontend-types` from `backend/` and commit the updated `generatedType.ts`.

`generatedType.ts` is committed on purpose: the frontend is deployed on its own and has no access to the backend's generated Prisma client, which is gitignored and only created by `prisma generate`.

### API

The Express backend (`backend/src/`) mounts one route file per resource type — `resourceRoutes.ts`, `categoryRoutes.ts`, `statusRoutes.ts` — plus `authRoutes.ts` for `/auth/login`, `/auth/logout`, and `/auth/session`, and `suggestRoutes.ts` for the public `/suggest` endpoint, which sends an email via Resend rather than writing to the database. `authMiddleware.ts` checks `req.session.isAdmin` and is applied only to write routes (POST/PATCH/DELETE); all GET routes and `/suggest` are public. `seed.ts` handles bulk-populating the database (`npm run seed`), kept private — see [Installation & Setup](#installation--setup).

### Deployment

The frontend runs on **Vercel**, the Express API on **Render**, and PostgreSQL on **Neon**.

Browser requests go to `/api/*` on the Vercel domain, which a rewrite in `next.config.ts` forwards to the Render backend. This keeps the session cookie first-party: it works with `SameSite=Lax`, and `proxy.ts` can read it to gate `/admin`. Calling the backend directly from the browser would require a cross-site `SameSite=None` cookie instead, which some browsers block by default. In production the cookie is also `Secure`, with Express set to `trust proxy` because Render terminates HTTPS in front of the app.

Public pages use incremental static regeneration (`revalidate = 60`), so visitors are served cached pages even while Render's free tier is cold-starting, and new content appears within a minute. The admin panel is fully dynamic (`force-dynamic`), so edits show immediately.

Pushes to `main` deploy both services automatically, and any pending Prisma migrations are applied to Neon during Render's build (`prisma migrate deploy`). Work happens on `dev` and is merged into `main` through pull requests, with Vercel building a preview of each one first.

### Theming and global state

Dark/light mode is handled by `next-themes`, mounted at the root layout.

---

## Access Model

The app has two sides. **Public visitors** have a read-only experience, with no login required, just browsing and filtering. A single **private account**, authenticated via a hashed password and server-side sessions (`express-session`, cookie-based, not JWT), lets the project owner manage content through a secure admin panel. There is no multi-user role system — only these two access tiers — and the admin interface is not publicly documented.

---

## Folder Architecture

```
├── 📁 backend
│   ├── 📁 prisma
│   │   ├── 📁 migrations                          → one folder per schema change
│   │   │   └── ⚙️ migration_lock.toml
│   │   ├── 📄 schema.prisma                       → source of truth: models, relations, and Type enum
│   │   └── 📄 seed.ts                              → bulk-population script
│   ├── 📁 scripts
│   │   └── 📄 generateFrontendTypes.ts             → regenerates frontend's Type from Prisma's enum (npm run generate-frontend-types)
│   ├── 📁 src
│   │   ├── 📁 generated                              → Prisma's generated client and enums (gitignored, created by prisma generate)
│   │   ├── 📄 app.ts                                  → Express app, session config, CORS, route mounting
│   │   ├── 📄 authMiddleware.ts                        → checks req.session.isAdmin, applied to write routes only
│   │   ├── 📄 authRoutes.ts                             → /auth/login, /auth/logout, /auth/session
│   │   ├── 📄 categoryRoutes.ts
│   │   ├── 📄 prisma.ts                                   → shared Prisma client
│   │   ├── 📄 resourceRoutes.ts                            → GET public; POST/PATCH/DELETE gated
│   │   ├── 📄 statusRoutes.ts
│   │   └── 📄 suggestRoutes.ts                                → public POST /suggest, sends email via Resend
│   ├── ⚙️ nodemon.json
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 prisma.config.ts                        → registers seed.ts as Prisma's seed command
│   └── ⚙️ tsconfig.json
├── 📁 docs
│   ├── 📁 readme-preview                          → screenshots/GIFs used in the README's Preview section
│   ├── 📝 auth-flow.md                             → Mermaid diagram of the login flow
│   └── 📝 schema.md                                 → Mermaid diagram of the Prisma schema
├── 📁 frontend
│   ├── 📁 public                                  → static assets
│   ├── 📁 src
│   │   ├── 📁 api                                 → typed fetch wrappers
│   │   │   ├── 📄 auth.ts
│   │   │   ├── 📄 categories.ts
│   │   │   ├── 📄 resources.ts
│   │   │   ├── 📄 statuses.ts
│   │   │   └── 📄 suggest.ts
│   │   ├── 📁 app
│   │   │   ├── 📁 (site)                          → public routes (route group)
│   │   │   │   ├── 📁 categories                    → resources grouped by category, "Other" for uncategorized
│   │   │   │   ├── 📁 collections
│   │   │   │   │   └── 📁 [type]                        → per-type gallery
│   │   │   │   │       ├── 📁 ResourceFinder            → search and multi-category filter
│   │   │   │   │       ├── 📁 ResourceGrid
│   │   │   │   │       │   └── 📁 ResourceCard                → single resource card, reused across every listing page
│   │   │   │   │       ├── 📁 ResourceHeader
│   │   │   │   │       ├── 📄 GalleryContent.tsx              → client component holding search/filter state (page.tsx stays server-side)
│   │   │   │   │       ├── 🎨 page.module.scss
│   │   │   │   │       └── 📄 page.tsx
│   │   │   │   ├── 📁 components                     → homepage pieces
│   │   │   │   │   ├── 📁 Hero
│   │   │   │   │   └── 📁 Stats
│   │   │   │   ├── 📁 layout                          → shared public-side chrome
│   │   │   │   │   ├── 📁 Footer
│   │   │   │   │   ├── 📁 GalleryGrid
│   │   │   │   │   └── 📁 Header
│   │   │   │   ├── 📁 resources                        → all-resources index (ResourceGrid)
│   │   │   │   ├── 📁 suggest                            → suggest-a-resource form with live ResourceCard preview
│   │   │   │   ├── 📄 layout.tsx                          → Header/{children}/Footer; revalidate = 60
│   │   │   │   ├── 🎨 page.module.scss
│   │   │   │   └── 📄 page.tsx                              → homepage (Hero, Stats)
│   │   │   ├── 📁 admin                             → plain folder (not a route group)
│   │   │   │   ├── 📁 components
│   │   │   │   │   ├── 📁 CategoryTable                → full CRUD table
│   │   │   │   │   ├── 📁 ResourceTable                → full CRUD table
│   │   │   │   │   └── 📁 StatusTable                    → full CRUD table
│   │   │   │   ├── 📁 layout
│   │   │   │   │   ├── 📁 AdminTabs                        → client-side tab switch, no separate routes
│   │   │   │   │   └── 📁 Header
│   │   │   │   ├── 📁 login                            → public login form (only unauthenticated page under /admin)
│   │   │   │   ├── 📄 layout.tsx                          → overrides metadata: noindex/nofollow; force-dynamic
│   │   │   │   ├── 🎨 page.module.scss
│   │   │   │   └── 📄 page.tsx                              → fetches resources/statuses/categories, renders AdminTabs
│   │   │   ├── 📄 favicon.ico
│   │   │   ├── 📄 layout.tsx                        → root: <html>/<body>/<Providers>, site-wide metadata and metadataBase
│   │   │   ├── 🖼️ opengraph-image.png                 → file-convention OG image
│   │   │   └── 📄 providers.tsx                        → next-themes Providers wrapper
│   │   ├── 📁 constants
│   │   │   ├── 📄 categoryMeta.ts                    → per-category display color
│   │   │   └── 📄 typeMeta.ts                          → per-Type label/icon/description
│   │   ├── 📁 lib
│   │   │   ├── 📄 apiUrl.ts                       → /api path in the browser, BACKEND_URL on the server
│   │   │   ├── 📄 generatedType.ts                → generated Type const/type (committed)
│   │   │   └── 📄 types.ts                           → Resource/Category/Status/Admin/Suggestion
│   │   ├── 📁 styles
│   │   │   ├── 📁 abstracts
│   │   │   │   ├── 🎨 _mixins.scss                → flex, icon, admin-table, tint-bg/tint-border, glow, etc.
│   │   │   │   └── 🎨 _variables.scss                → spacing, radius, icon-size scales
│   │   │   ├── 📁 base
│   │   │   │   ├── 🎨 _base.scss
│   │   │   │   ├── 🎨 _reset.scss
│   │   │   │   └── 🎨 _root.scss                        → theme-aware CSS custom properties, dark/light pairs
│   │   │   └── 🎨 globals.scss
│   │   └── 📄 proxy.ts                            → Next 16 middleware equivalent; normalizes /collections/:type casing, gates /admin
│   ├── 📄 eslint.config.mjs
│   ├── 📄 next.config.ts                          → /api rewrite to the backend, remote image patterns
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── ⚙️ tsconfig.json
├── ⚙️ .gitignore
├── 📄 LICENSE
└── 📝 README.md
```

---

## Installation & Setup

### Live demo

[resources-hub-lovat.vercel.app](https://resources-hub-lovat.vercel.app/)

> The backend runs on Render's free tier, so the first request after a period of inactivity can take 30–60 seconds while it wakes up.

### Local development

> For local reference only — this project isn't licensed for reuse (see [License](#license)).

> The curated resource data (`seed.ts`) is kept private and isn't included in this repo, so a fresh clone starts with an empty database.

Requires Node.js 24 (the backend runs `.ts` files directly) and a local PostgreSQL instance.

**Environment variables**

`backend/.env`:

```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/resource_hub
PORT=3002
FRONTEND_URL=http://localhost:3008
SESSION_SECRET=any-long-random-string
ADMIN_USERNAME=your-username
ADMIN_PASSWORD_HASH=your-bcrypt-hash
RESEND_API_KEY=your-resend-key
RECIPIENT_EMAIL=you@example.com
```

`frontend/.env`:

```dotenv
BACKEND_URL=http://localhost:3002
```

**Backend**

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3008` and the backend on `http://localhost:3002`.

---

## Status & Roadmap

Sprint planning and the full roadmap are tracked on Jira.

![Jira preview](docs/readme-preview/jira-preview.gif)

---

## Acknowledgements

Inspired by [Jonas Schmedtmann](https://jonas.io/)'s resource page.

---

## License

Copyright © 2026 [skorter](https://github.com/skorter). All rights reserved. This code is publicly viewable for portfolio purposes but not licensed for reuse or redistribution.
