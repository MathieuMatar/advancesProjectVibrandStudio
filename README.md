# Vibrand Studio

This repository contains the API (NestJS + Prisma + GraphQL), two frontends (Vite + React) and supporting configuration for Vibrand Studio.

## Quick overview

- Backend: `api.vibrandstudio.com` — NestJS, GraphQL, Prisma (DB models), Forest Admin integration.
- Public website: `vibrandstudio.com` — React + Vite, SVGs imported as React components via SVGR.
- Web app: `web.vibrandstudio.com` — another React app (client-facing) using React Router.

JWT authentication is used for the API and the frontends. Roles are not yet implemented (phase 2). Forest Admin is used to provide an admin dashboard and full data access for now.

Entries / entities used by the backend are described in `api.vibrandstudio.com/API.md`.

## Prerequisites

- Node.js and npm installed (recommended: latest LTS).
- A database server — the backend uses Prisma and `mysql2` is listed, so create a MySQL-compatible database before running the API.
- (Optional) Forest Admin account/setup if you want to use the admin dashboard.

Before starting anything, make sure to:

1. Create the database (MySQL) and note the connection URL.
2. Edit the API `.env` file (create one if it doesn't exist) inside `api.vibrandstudio.com` and set the database connection string (commonly `DATABASE_URL` or the key used by your Prisma config). Adjust the value of the link/connection string accordingly.

## Install dependencies

Run `npm install` in the root and in each package folder. On Windows PowerShell you can run:

```powershell
# from project root
npm install

# install each package
cd api.vibrandstudio.com; npm install; cd ..
cd vibrandstudio.com; npm install; cd ..
cd web.vibrandstudio.com; npm install; cd ..
```

All three subprojects must have dependencies installed before running the monorepo concurrently.

## Available npm scripts (what they do)

Root package.json (project root)

- `dev` — Run all three services concurrently:
  - Starts `api.vibrandstudio.com` dev server, `web.vibrandstudio.com` dev server, and `vibrandstudio.com` dev server in parallel using `concurrently`.
- `api` — Run only the API dev server (same as `cd api.vibrandstudio.com && npm run dev`).
- `web` — Run only `web.vibrandstudio.com` dev server.
- `main` — Run only `vibrandstudio.com` dev server.

api.vibrandstudio.com (backend - key scripts)

- `dev` / `start:dev` — `nest start --watch` — start the NestJS server in watch mode.
- `start` / `start:prod` — start the built server (`node dist/main`).
- `build` — compile the project (`nest build`).
- `prisma:generate` — run `prisma generate` (client generation).
- `prisma:dbpush` — push Prisma schema to the database (useful for development).
- `prisma:migrate:dev` — run migrations in development.
- `test`, `lint`, `format` — test and lint utilities.

Notes: Prisma schema is at `api.vibrandstudio.com/prisma/schema.prisma`. Ensure `DATABASE_URL` in the API `.env` points to the DB you created.

vibrandstudio.com (frontend - key scripts)

- `dev` — `vite` development server.
- `build` — build the production bundle (`tsc -b && vite build`).
- `preview` — preview a built site.
- `lint` — run ESLint.

web.vibrandstudio.com (second frontend)

- Similar scripts (uses Vite + React). Use `npm run dev` inside that folder.

## How to run

Run everything together (recommended for development):

```powershell
# from project root
npm run dev
```

This will start the API, and both frontends concurrently.

Run a single service from the root (examples):

```powershell
npm run api   # run only the API dev server
npm run web   # run only 'web.vibrandstudio.com'
npm run main  # run only 'vibrandstudio.com'
```

Or run in each folder directly (useful when working on one service):

```powershell
cd api.vibrandstudio.com; npm run dev
cd vibrandstudio.com; npm run dev
cd web.vibrandstudio.com; npm run dev
```

## Environment / Database checklist

1. Create your MySQL database.
2. In `api.vibrandstudio.com`, create or edit `.env` and set the DB connection string (example key often `DATABASE_URL`).
3. Optionally run Prisma commands to prepare the database:

```powershell
cd api.vibrandstudio.com
npm run prisma:generate
# push schema (development only) or run migrations
npm run prisma:dbpush
# or
npm run prisma:migrate:dev --name init
```

Verify Prisma connects to your DB successfully before starting the API.

## Architecture notes

- Backend: NestJS + GraphQL + Prisma. Entities and API model are documented in `api.vibrandstudio.com/API.md`.
- Forest Admin is integrated for an admin dashboard that exposes the database for management.
- Frontend(s): React + Vite, `react-router-dom` for routing, and `vite-plugin-svgr` (SVGR) to import SVGs as React components.
- Authentication: JWT-based auth for API and the web frontends. Roles are planned for phase 2.

## Future improvements (planned)

- Implement roles and granular permissions so the web UI can manage projects and data without using Forest Admin.
- Improve design based on client feedback.
- Add a user dashboard with settings and UI personalization.
- Add password reset support.
- Integrate domain-based Microsoft accounts for easier sign-in.
- Implement caching and offline support for the web interface.
- Complete public data entry and improve content completeness.
- Implement mailing support with HTML-rendered emails (EJS) for contact and newsletters.

## Disclosures

All projects used are real projects for the company. Tasks and milestones in projects are AI-generated placeholder data for demonstration purposes. AI was used to assist with documentation.

Designed by Mathieu Matar | Vibrand Studio
All rights reserved
Property of Vibrand Studio, Jbeil near public garden, Al Mahatta street, Byblos 4504
Phone: 03 542 530




<p align="center">
    <img src="./vibrand logo emblem.svg" alt="Vibrand logo emblem" style="height:320px; margin-right:16px;" />
    <img src="./VIBRAND logo.svg" alt="Vibrand logo" style="height:320px;" />
</p>

<h2 align="center">here is a preview of our upcoming new logos and brand identity</h2>