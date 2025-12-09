# Vibrand Studio

This repository contains a complete full-stack application with NestJS GraphQL API, two React frontends, and supporting infrastructure for Vibrand Studio project management platform.

## Quick Overview

- **Backend**: `api.vibrandstudio.com` — NestJS GraphQL API with Prisma ORM, PostgreSQL database, Socket.IO for real-time updates, JWT authentication, REST upload endpoint, and Forest Admin integration
- **Public Website**: `vibrandstudio.com` — React portfolio website with Redux state management, SVG components via SVGR, and GraphQL integration showcasing projects and client testimonials
- **Web Application**: `web.vibrandstudio.com` — Full-featured project management PWA with offline support, real-time task updates via Socket.IO, IndexedDB caching, and service worker for offline-first functionality

## Key Features Across the Platform

### Backend (api.vibrandstudio.com)
- GraphQL API with code-first schema generation
- JWT authentication with access level control via custom decorators (`@Public()`, `@Access()`)
- Real-time task updates via Socket.IO gateway
- Nodemailer integration with EJS templates for contact forms and newsletters
- REST file upload endpoint with Multer (200MB max, stored in `/uploads`)
- Forest Admin mounted for back-office management
- PostgreSQL database with Prisma ORM

### Frontend - Portfolio (vibrandstudio.com)
- Redux Toolkit for global state management (clients, projects)
- GraphQL integration via Axios
- SVG components loaded via vite-plugin-svgr
- React Router for navigation
- Optimized build with Vite + Rolldown

### Frontend - Web App (web.vibrandstudio.com)
- **Progressive Web App (PWA)** - Installable with offline support
- **Real-time Collaboration** - Socket.IO integration for live task updates
- **Offline-First** - IndexedDB for query caching and mutation queuing with automatic sync
- **Service Worker** - Workbox-powered caching strategies
- **Comprehensive Features**: Project management, task tracking with drag-and-drop reordering, milestone timeline, team member management, and service association

## Prerequisites

- **Node.js** 16+ and npm (recommended: latest LTS)
- **PostgreSQL** database server (backend uses Prisma ORM with PostgreSQL)
- **(Optional)** Forest Admin account for admin dashboard

### Environment Setup

Before starting, configure the backend environment:

1. **Create a PostgreSQL database** and note the connection URL
2. **Create `.env` file** in `api.vibrandstudio.com` with required variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/vibrand_db"
   JWT_SECRET="your-secret-key"
   MAIL_HOST="smtp.example.com"
   MAIL_PORT="587"
   MAIL_USER="your-email@example.com"
   MAIL_PASS="your-password"
   FOREST_AUTH_SECRET="forest-secret"
   FOREST_ENV_SECRET="forest-env-secret"
   ```
3. **(Optional)** Configure frontend API URLs in:
   - `vibrandstudio.com/src/utils/request.ts`
   - `web.vibrandstudio.com/src/utils/urlUtils.ts` (default: `http://localhost:3000`)

## Installation

Run `npm install` in the root and in each package folder. On Windows PowerShell:

```powershell
# Install root dependencies
npm install

# Install each package
cd api.vibrandstudio.com; npm install; cd ..
cd vibrandstudio.com; npm install; cd ..
cd web.vibrandstudio.com; npm install; cd ..
```

### Backend Setup (api.vibrandstudio.com)

After installing dependencies, initialize the database:

```powershell
cd api.vibrandstudio.com
npx prisma generate          # Generate Prisma client
npx prisma db push           # Push schema to database (development)
# OR for production migrations:
npx prisma migrate dev --name init
cd ..
```

All three subprojects must have dependencies installed before running the monorepo concurrently.

## Available npm Scripts

### Root Package Scripts

- **`npm run dev`** — Run all three services concurrently (API + both frontends) using `concurrently`
- **`npm run api`** — Run only the API dev server
- **`npm run web`** — Run only `web.vibrandstudio.com` dev server
- **`npm run main`** — Run only `vibrandstudio.com` dev server

### API Scripts (api.vibrandstudio.com)

**Development:**
- `npm run start:dev` — Start NestJS in watch mode (`nest start --watch`)
- `npm run start:prod` — Start production server (`node dist/main`)
- `npm run build` — Build the project (`nest build`)

**Prisma:**
- `npx prisma generate` — Generate Prisma client
- `npx prisma db push` — Sync schema to database (non-migration, for dev)
- `npx prisma migrate dev --name <change>` — Create and apply migration
- `npx prisma migrate deploy` — Apply migrations (production)
- `npx prisma studio` — Open Prisma Studio for database browsing

**Testing & Quality:**
- `npm run test` — Run unit tests
- `npm run lint` — Run ESLint
- `npm run format` — Format code

**Note:** Prisma schema is located at `api.vibrandstudio.com/prisma/schema.prisma`. GraphQL schema is auto-generated at `src/schema.gql`.

### Frontend Scripts (vibrandstudio.com)

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production (`tsc -b && vite build`)
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
- `npm run push` — Push built files to git

### Web App Scripts (web.vibrandstudio.com)

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Build production bundle with PWA support
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run lint -- --fix` — Auto-fix linting issues

## How to Run

### Run Everything Together (Recommended for Development)

```powershell
# From project root
npm run dev
```

This starts the API, portfolio site, and web app concurrently. Access points:
- **API**: `http://localhost:3000` (GraphQL endpoint: `/graphql`)
- **Portfolio**: `http://localhost:5173` (or next available port)
- **Web App**: `http://localhost:5174` (or next available port)

### Run Individual Services

Run a single service from the root:

```powershell
npm run api   # API only
npm run web   # Web app only
npm run main  # Portfolio only
```

Or run directly in each folder:

```powershell
cd api.vibrandstudio.com; npm run start:dev
cd vibrandstudio.com; npm run dev
cd web.vibrandstudio.com; npm run dev
```

## Architecture & Technical Details

### Backend Architecture (api.vibrandstudio.com)

**Technology Stack:**
- NestJS with GraphQL (Apollo driver, code-first schema)
- Prisma ORM with PostgreSQL
- Passport JWT strategy for authentication
- Socket.IO for real-time updates
- Multer for file uploads (disk storage, served from `/uploads`)
- Nodemailer with EJS templates for email
- Forest Admin agent for back-office management

**Authentication & Authorization:**
- Global `GqlAuthGuard` (JWT validation) + `AccessGuard` (access level enforcement)
- `@Public()` decorator to bypass auth for specific resolvers
- `@Access(level: number)` decorator to enforce minimum access level
- JWT tokens stored client-side, included in all authenticated requests

**GraphQL API Entities:**
- **Auth**: `login`, `signup`, `changePassword` → returns `AuthResponse { token, user }`
- **Users**: CRUD operations with access level control
- **Services**: Business services with rate and duration tracking
- **Clients**: Client management with types, images, and public/active flags
- **ClientTypes**: Categorization for clients
- **Employees**: Employee profiles linked to users
- **Projects**: Full project management with services, users, milestones, and tasks
- **Milestones**: Project milestones with dates and status
- **Tasks**: Task management with real-time Socket.IO updates (`taskUpdated`, `taskDeleted` events)
- **Mail**: Public mutations for newsletter signup and contact form

**File Upload (REST):**
- Endpoint: `POST /upload` (public)
- Max size: 200MB
- Returns: `{ path: "/uploads/<filename>" }`
- Files served statically from `/uploads`

**Real-time Updates:**
- `TaskGateway` broadcasts via Socket.IO
- Events: `taskUpdated` (full task payload), `taskDeleted` (task ID)
- CORS: Open (`origin: *`)

### Frontend - Portfolio (vibrandstudio.com)

**Technology Stack:**
- React 19.1.1 + React Router 7.9.3
- Redux 5.0.1 + Redux Toolkit 2.11.0
- Vite 7.1.14 with Rolldown
- TypeScript 5.9.3
- Axios for HTTP/GraphQL requests
- vite-plugin-svgr for SVG-as-components

**State Management:**
- Redux store with slices: `clientSlice`, `projectSlice`
- Actions for fetching and managing clients and projects
- Centralized state for portfolio data

**Key Features:**
- Portfolio showcase with project galleries
- Client testimonials and case studies
- Contact form integration with backend
- Newsletter signup
- Responsive design
- SVG assets imported as React components

**Build Output:**
- Optimized production bundle in `dist/`
- Static assets for CDN deployment

### Frontend - Web App (web.vibrandstudio.com)

**Technology Stack:**
- React 18+ with TypeScript
- Vite build tool + dev server
- Socket.IO Client for real-time updates
- IndexedDB (via `idb`) for offline storage
- Vite PWA Plugin + Workbox for service workers
- CSS3 for styling

**Progressive Web App Features:**
- **Installable**: Manifest file for add-to-homescreen
- **Offline-First**: Service worker with Workbox caching strategies
- **Background Sync**: Queued mutations sync when connection restores
- **App Shell**: Cached core UI for instant offline loading

**Real-time Features:**
- Socket.IO connection to backend
- Live task updates broadcast to all connected clients
- Automatic UI updates without page refresh
- Event filtering by project ID

**Offline Support:**
- **Query Caching**: GraphQL query results cached in IndexedDB
- **Mutation Queue**: Failed/offline mutations queued for later
- **Auto-Sync**: Queued mutations automatically retry when online
- **Offline Indicator**: UI feedback for connection status

**Project Management Features:**
- Create, edit, and view projects
- Task management with drag-and-drop reordering
- Mark tasks as complete with completion tracking
- Assign tasks to team members
- Track milestones with due dates
- Associate services/tools with projects
- Team member management
- File upload for project assets

**Utilities & Services:**
- `request.ts`: GraphQL client with offline queue and cache
- `urlUtils.ts`: Centralized URL configuration
- `storage.ts`: localStorage wrapper for auth persistence
- `dateUtils.ts`: Date formatting and validation
- `upload.ts`: File upload handler
- `offline-db.ts`: IndexedDB management for offline data

## API Examples

### Authentication

```graphql
# Login
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user { id name email accessLevel }
  }
}
```
```json
{
  "input": {
    "email": "user@example.com",
    "password": "SecurePass123"
  }
}
```

### Project Management

```graphql
# Get all projects
query {
  projects {
    id name code status public
    client { id name }
    milestones { id name status dueDate }
    tasks { id title important completedById }
  }
}
```

```graphql
# Create project
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id name status
  }
}
```
```json
{
  "input": {
    "name": "Website Redesign",
    "code": "WR-2024",
    "clientId": 1,
    "status": "InProgress",
    "public": false
  }
}
```

### Task Management

```graphql
# Create task
mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id title projectId assignedToId important
  }
}
```
```json
{
  "input": {
    "projectId": 5,
    "createdById": 1,
    "assignedToId": 2,
    "title": "Draft wireframes",
    "details": "Homepage + pricing",
    "important": true,
    "dueDate": "2024-03-10"
  }
}
```

For complete API documentation with all entities and operations, see `api.vibrandstudio.com/README.md`.

## Deployment

### Backend Deployment

1. Set environment variables in production
2. Run migrations: `npx prisma migrate deploy`
3. Build: `npm run build`
4. Start: `npm run start:prod`
5. Ensure `/uploads` directory exists and is writable
6. Configure reverse proxy (nginx/Apache) for static file serving

### Frontend Deployments

Both frontends are static sites after build:

```powershell
# Build each frontend
cd vibrandstudio.com; npm run build
cd web.vibrandstudio.com; npm run build
```

Deploy `dist/` folders to:
- Static hosting (Netlify, Vercel, Cloudflare Pages)
- CDN (AWS S3 + CloudFront, Azure Blob Storage)
- Traditional web server (nginx, Apache)

**Important**: Update API URLs in:
- `vibrandstudio.com/src/utils/request.ts`
- `web.vibrandstudio.com/src/utils/urlUtils.ts`

## Development Workflow

1. **Start backend first**: `cd api.vibrandstudio.com && npm run start:dev`
2. **Verify GraphQL**: Open `http://localhost:3000/graphql` (if playground enabled)
3. **Start frontends**: Run `npm run dev` from root or individually
4. **Make changes**: Hot reload works in all three projects
5. **Test offline**: Use DevTools to simulate offline mode in web app
6. **Check real-time**: Open web app in multiple tabs to see live updates

## Troubleshooting

### Backend Issues
- **Database connection fails**: Check `DATABASE_URL` in `.env`
- **GraphQL errors**: Ensure Prisma client is generated: `npx prisma generate`
- **File upload fails**: Check `/uploads` directory exists and is writable

### Frontend Issues
- **API connection fails**: Verify API URL in utils files
- **Auth issues**: Clear localStorage and try logging in again
- **PWA not installing**: Check manifest.json and ensure HTTPS in production
- **Offline sync not working**: Check IndexedDB in DevTools Application tab

### Development Tips
- Use `npx prisma studio` to browse database visually
- Check browser console for GraphQL errors
- Monitor network tab for failed requests
- Use React DevTools for component debugging
- Check Application > Service Workers in DevTools for PWA issues

## Repository Structure

```
vibrand-new/
├── api.vibrandstudio.com/          # Backend (NestJS + GraphQL)
│   ├── prisma/schema.prisma        # Database schema
│   ├── src/                        # Source code
│   │   ├── auth/                   # Authentication module
│   │   ├── users/                  # User management
│   │   ├── projects/               # Project CRUD
│   │   ├── tasks/                  # Tasks + Socket.IO gateway
│   │   ├── mail/                   # Email service
│   │   └── ...                     # Other modules
│   └── uploads/                    # File storage
├── vibrandstudio.com/              # Portfolio website
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── store/                  # Redux store
│   │   ├── services/               # API services
│   │   └── utils/                  # Utilities
│   └── dist/                       # Build output
├── web.vibrandstudio.com/          # Web app (PWA)
│   ├── src/
│   │   ├── components/             # UI components
│   │   ├── pages/                  # Page routes
│   │   ├── hooks/                  # Custom hooks
│   │   ├── services/               # API layer
│   │   ├── utils/                  # Utilities
│   │   ├── lib/offline-db.ts       # IndexedDB
│   │   └── contexts/               # React contexts
│   ├── public/manifest.json        # PWA manifest
│   └── dist/                       # Build output
├── package.json                    # Root package (concurrently scripts)
├── database.sql                    # Database dump/schema
└── README.md                       # This file
```

## Contributing

1. Create a feature branch from `main`
2. Make changes in the appropriate subproject
3. Test locally with `npm run dev`
4. Run linting: `npm run lint` in the affected folder
5. Commit with descriptive messages
6. Push and create a pull request

## License

Proprietary - Vibrand Studio

---

For detailed documentation on each part:
- **API**: See `api.vibrandstudio.com/README.md`
- **Portfolio**: See `vibrandstudio.com/README.md`
- **Web App**: See `web.vibrandstudio.com/README.md`

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