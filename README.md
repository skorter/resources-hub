# Resource Hub

> This project is under active development — some sections below are still being written, and the stack described reflects current plans, which may change as the project progresses.

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

### Admin

- Add, edit, and delete resources — the entire content lifecycle happens through a private panel, no direct database editing needed day to day.
Organize with categories — assign as many as make sense to a resource, so the same item can surface under multiple useful filters.
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
| Version Control | Git + GitHub                        |
| Deployment      | Vercel + Render + Neon              |

---

## Dependencies & Libraries

### Frontend

#### Dependencies

| Package        | Purpose                         |
| -------------- | ------------------------------- |
| `next`                     | React framework with App Router     |
| `react` / `react-dom`         | UI library                             |
| `next-themes`                    | Dark/light mode theming                  |
| `lucide-react`                      | Icon set                                   |
| `sass`                                   | Enables `.scss` syntax                          |

#### Dev dependencies

| Package      | Purpose       |
| ------------ | ------------- |
| `typescript` | Static typing |
| `eslint`     | Linting       |
| `@types/node`, `@types/react`, `@types/react-dom` | Type definitions |

> `react`, `react-dom`, and `next` are pinned to exact versions, while other dependencies use `^` ranges and can update within their minor/patch range on install.

### Backend

#### Dependencies

| Package           | Purpose                       |
| ----------------- | ----------------------------- |
| `express`         | REST API framework            |
| `express-session` | Server-side session handling  |
| `bcryptjs`        | Password hashing              |
| `cors`            | Cross-origin request handling |
| `@prisma/client`                     | Prisma generated client                    |
| `@prisma/adapter-pg`                    | Prisma's native `pg` driver adapter          |
| `pg`                                       | PostgreSQL driver                              |

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

> Backend runs TypeScript natively (no build step in dev) via `nodemon`, and uses Express 5 with Prisma's `pg` adapter rather than Prisma's default driver.

---

## Project Structure

Resource Hub consists of a Next.js frontend (using the App Router) and a hand-built Express + Prisma API. The frontend is split into two sides that pull from the same backend: a public side for browsing, and an admin side for managing content. Each side has its own layout, its own metadata rules, and its own access control.

### Page structure

The public site lives under a `(site)` route group — a URL-invisible group used purely to attach a shared `Header`/`Footer` layout and site-wide metadata to the homepage, `/resources`, `/categories`, and the per-type `/collections/[type]` galleries. `admin/` is a plain folder rather than a route group, since its URL segment (`/admin`) is intentional — it needs its own layout that overrides metadata with `noindex`/`nofollow` and its own login gate. `src/proxy.ts` (Next 16's middleware convention) sits in front of both: it normalizes casing on `/collections/:type` and redirects unauthenticated visitors off `/admin` and authenticated visitors off `/admin/login`.
 
### Component organisation
 
Public-facing layout pieces (`Header`, `Footer`, `GalleryGrid`) and page-level components (`Hero`, `Stats`) live under `(site)/layout/` and `(site)/components/`. The admin side follows one repeated pattern across all three of its data types: `ResourceTable`, `StatusTable`, and `CategoryTable` each fetch their full list server-side, track a single "active" row (editing, viewing, or a new draft) in client state, and conditionally render an input or plain text per cell. `AdminTabs` switches between the three client-side, without separate routes.
 
### Data layer
 
Content is defined in `backend/prisma/schema.prisma` and served through typed fetch wrappers in `frontend/src/api/` (`resources.ts`, `categories.ts`, `statuses.ts`, `auth.ts`):
 
- **Resource** — `title`, `description`, `url`, `logo?`, `createdAt`, and a `type`
  - `type` — enum: `Tools | References | Libraries | Inspiration | Services | Extensions | Social`
  - `status?` — optional one-to-many relation (e.g. "Paid", "Freemium")
  - `categories` — **many-to-many** with Category; a resource can belong to multiple categories and appears under each on the public `/categories` page
- **Category** — `id`, `name`
- **Status** — `id`, `name`
 
### API
 
The Express backend (`backend/src/`) mounts one route file per resource type — `resourceRoutes.ts`, `categoryRoutes.ts`, `statusRoutes.ts` — plus `authRoutes.ts` for `/auth/login`, `/auth/logout`, and `/auth/session`. `authMiddleware.ts` checks `req.session.isAdmin` and is applied only to write routes (POST/PATCH/DELETE); all GET routes are public. `seed.ts` handles bulk-populating the database (`npm run seed`).
 
### Theming and global state
 
Dark/light mode is handled by `next-themes`, mounted at the root layout.

---

## Access Model

The app has two sides. **Public visitors** have a read-only experience, with no login required, just browsing and filtering. A single **private account**, authenticated via a hashed password and server-side sessions (`express-session`, cookie-based, not JWT), lets the project owner to manage content through a secure admin panel. There is no multi-user role system — only these two access tiers — and the admin interface is not publicly documented.

---

## Folder Architecture

---


## Installation & Setup

> To be finalized once hosting is set up. Local development, in the meantime:
 
**Backend**
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```
 
**Frontend**
```bash
cd frontend
npm install
npm run dev
```
 
Requires a local PostgreSQL instance and a `.env` in `backend/` with your database URL and hardcoded admin credentials (bcrypt-hashed password + username).

---

## Status & Roadmap

---

## Acknowledgements

Inspired by [Jonas Schmedtmann](https://jonas.io/)'s resource page

---

## License

Copyright © 2026 [skorter](https://github.com/skorter). All rights reserved. This code is publicly viewable for portfolio purposes but not licensed for reuse or redistribution.
