# Resource Hub

> This project is under active development — some sections below are still being written, and the stack described reflects current plans, which may change as the project progresses.

---

A curated, tag-based library for organizing useful tools and documentation discovered while learning, developing, or browsing the web. Inspired by [Jonas Schmedtmann](https://jonas.io/)'s /resource page, it was built as a personal application first and a portfolio project second. The platform consists of two parts: a public, read-only gallery that anyone can browse, and a private admin panel where resources are manually added, tagged, and managed.

---

## Table of Contents

- [Preview](#preview)
- [Vision & Goals](#vision--goals)
- [Target Audience](#target-audience)
- [Tech Stack & Tools](#tech-stack--tools)
- [Dependencies & Libraries](#dependencies--libraries)
- [Project Structure](#project--structure)
- [Folder Architecture](#folder-architecture)
- [Access Model](#access-model)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Status & Roadmap](#status--roadmap)
- [License](#license)

---

## Vision & Goals

Resource Hub was built with three goals in mind: to practice a realistic full-stack workflow; to be portfolio-worthy, backed by real architecture decisions; and to end up as a tool that's actually useful day to day, for saving and tagging the tools and docs worth revisiting later.

The stack was chosen deliberately with these goals in mind — a native PostgreSQL install and a hand-built Express API with session-based auth, instead of an all-in-one platform like Supabase, specifically to learn the backend, auth, and database fundamentals a platform like Supabase normally handles for you.

---

## Target Audience

- Anyone looking for a curated, tagged collection of dev tools and learning resources
- Developers who want a quick reference instead of re-searching for the same tools repeatedly
- Other self-taught/learning developers who might find the resource list itself genuinely useful

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
| DB GUI          | pgAdmin                             |
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
| `next`         | React framework with App Router |
| `lucide-react` | Icon set                        |
| `sass`         | Enables .scss syntax            |

#### Dev dependencies

| Package      | Purpose       |
| ------------ | ------------- |
| `typescript` | Static typing |
| `eslint`     | Linting       |

> **Note:** `react`, `react-dom`, and their `@types` are omitted here as implicit — they ship as part of Next.js itself

### Backend

#### Dependencies

| Package           | Purpose                       |
| ----------------- | ----------------------------- |
| `express`         | REST API framework            |
| `express-session` | Server-side session handling  |
| `bcryptjs`        | Password hashing              |
| `cors`            | Cross-origin request handling |

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

---

## Project Structure

---

## Folder Architecture

---

## Access Model

The app has two sides. **Public visitors** have a read-only experience, with no login required, just browsing and filtering. A single **private account**, authenticated via a hashed password and server-side sessions, allows the project owner to manage content through a secure admin panel. There is no multi-user role system—only these two access tiers—and the admin interface is not publicly documented.

---

## Features

### Public

- Browse the full resource collection — every saved tool and doc, presented as a scannable list.
- Browse by category — every resource belongs to exactly one category, so categories work as the primary way to navigate the collection.
- Refine with tags — layer tag filters on top to narrow further, since a resource can carry several.
- View resource details — title, description, type (tool or doc), and a direct link out to the original source.

### Admin

- Add, edit, and delete resources — the entire content lifecycle happens through a private panel, no direct database editing needed day to day.
- Organize with categories and tags — each resource gets exactly one category and any number of tags, so the same item can surface under multiple useful filters and sorting.
- Session-based login — a single hashed admin password grants access; sessions are checked on every write request via middleware, and expire rather than persisting indefinitely.

---

## Installation & Setup

---

## Status & Roadmap

---

## License

---
