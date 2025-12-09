# Vibrand Studio Web Application

A modern, full-featured project management and task tracking web application built with **React**, **TypeScript**, and **Vite**. The application supports offline functionality through Progressive Web App (PWA) technologies and real-time updates via WebSockets.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Reusable Utilities & Services](#reusable-utilities--services)
- [Real-time Features](#real-time-features)
- [Offline Support](#offline-support)
- [Progressive Web App (PWA)](#progressive-web-app-pwa)
- [Service Worker & Caching](#service-worker--caching)
- [App Manifest](#app-manifest)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [Configuration](#configuration)

## Features

- ✅ **User Authentication** - Secure login/logout with JWT tokens
- ✅ **Project Management** - Create, view, edit, and manage projects
- ✅ **Task Management** - Add, edit, reorder, and complete tasks with real-time updates
- ✅ **Team Collaboration** - Manage project team members and assign tasks
- ✅ **Milestones Tracking** - Create and manage project milestones with due dates
- ✅ **Services Management** - Associate services/tools with projects
- ✅ **Offline Support** - Full offline capability with automatic sync when online
- ✅ **Real-time Updates** - Socket.IO integration for live task updates
- ✅ **Responsive Design** - Mobile-friendly UI that works on all devices
- ✅ **PWA Ready** - Installable web app with offline caching
- ✅ **Error Handling** - Comprehensive error notifications and recovery

## Tech Stack

### Frontend
- **React** 18+ - UI library with Hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with custom CSS files
- **Socket.IO Client** - Real-time WebSocket communication

### State Management & Storage
- **React Context API** - Authentication state management
- **localStorage** - User session persistence
- **IndexedDB (via idb)** - Offline query caching and mutation queuing

### Build & Development
- **Vite PWA Plugin** - Progressive Web App setup with Workbox
- **Service Workers** - Offline functionality and auto-updates
- **ESLint** - Code linting and quality checks

### Backend Communication
- **GraphQL** - Query language for API requests
- **Fetch API** - HTTP requests with offline support

## Project Architecture

### Directory Structure

```
src/
├── components/           # Reusable React components
│   ├── Authenticated.tsx    # Auth wrapper component
│   ├── ErrorNotification.tsx # Error notification display
│   ├── Header.tsx           # Navigation header
│   ├── Login.tsx            # Login form
│   ├── Milestones.tsx       # Milestones timeline
│   ├── ProjectServices.tsx  # Project services management
│   ├── ProjectUsers.tsx     # Project team members
│   ├── Task.tsx             # Individual task card
│   ├── Tasks.tsx            # Tasks container
│   └── *.css                # Component-specific styles
├── contexts/            # React Context providers
│   └── AuthContext.tsx      # Authentication context
├── hooks/               # Custom React hooks
│   ├── useApp.ts           # Global app state
│   ├── useHeader.ts        # Header state
│   ├── useLogin.ts         # Login logic
│   ├── useMilestones.ts    # Milestone management
│   ├── useProject.ts       # Project data fetching
│   ├── useProjectServices.ts # Services management
│   ├── useProjectUsers.ts  # Team management
│   ├── useTask.ts          # Single task editing
│   └── useTasks.ts         # Task list management
├── lib/                 # Utility libraries
│   └── offline-db.ts       # IndexedDB operations
├── pages/               # Page components
│   ├── AddProject.tsx      # Create project page
│   ├── ChangePassword.tsx  # Change password page
│   ├── Project.tsx         # Project detail page
│   └── *.css               # Page-specific styles
├── services/            # API service layer
│   ├── loginService.ts     # Authentication GraphQL
│   ├── milestoneService.ts # Milestone operations
│   ├── projectService.ts   # Project operations
│   └── taskService.ts      # Task operations
├── utils/               # Reusable utilities
│   ├── dateUtils.ts        # Date formatting utilities
│   ├── request.ts          # GraphQL request handler
│   ├── storage.ts          # localStorage management
│   ├── upload.ts           # File upload utility
│   └── urlUtils.ts         # URL configuration
├── App.tsx              # Root component
├── main.tsx             # Application entry point
├── index.css            # Global styles
└── vite-plugin-pwa.d.ts # PWA type definitions
```

## Getting Started

### Prerequisites

- **Node.js** 16+ and **npm** (or **yarn**)
- **Git** for version control
- A backend GraphQL API server (configured in `urlUtils.ts`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MathieuMatar/advancesProjectVibrandStudio.git
   cd "web.vibrandstudio.com"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the backend URL** (if needed)
   - Edit `src/utils/urlUtils.ts`
   - Update `API_BASE_URL` to point to your backend server
   ```typescript
   export const API_BASE_URL = 'http://localhost:3000'; // Change as needed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Available Scripts

### `npm run dev`
Starts the development server with hot module reloading (HMR).
- **Command**: `vite`
- **URL**: `http://localhost:5173`
- **Features**: Instant code reload on file changes, source maps for debugging

### `npm run build`
Creates an optimized production build with code splitting and minification.
- **Command**: `vite build`
- **Output**: `dist/` directory
- **Size**: Optimized with tree-shaking and minification
- **PWA**: Includes service worker and manifest

### `npm run preview`
Preview the production build locally before deployment.
- **Command**: `vite preview`
- **URL**: `http://localhost:4173`
- **Use Case**: Test the built app locally to verify it works as expected

### `npm run lint`
Runs ESLint to check code quality and identify issues.
- **Command**: `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`
- **Fixes**: Use `npm run lint -- --fix` to auto-fix issues

## Project Structure Details

### Components Layer (`src/components/`)

Components are organized by feature and follow React best practices:

- **Authenticated.tsx** - HOC wrapper ensuring only authenticated users see the app
- **Header.tsx** - Navigation header with project selector and user menu
- **Login.tsx** - Login form with email/password fields
- **ErrorNotification.tsx** - Toast-like error display with auto-dismiss
- **Tasks.tsx** / **Task.tsx** - Task management with add/edit/delete/reorder
- **Milestones.tsx** - Timeline view of project milestones
- **ProjectUsers.tsx** - Team member management
- **ProjectServices.tsx** - Associated services/tools management

### Hooks Layer (`src/hooks/`)

Custom hooks provide reusable logic and state management:

- **useLogin** - Handles login/logout and auth state
- **useApp** - Global app navigation and error state
- **useHeader** - Fetches projects and current user
- **useProject** - Fetches and manages single project
- **useTasks** - Manages task list with real-time updates
- **useTask** - Manages single task editing
- **useMilestones** - CRUD operations for milestones
- **useProjectUsers** - Manages project team members
- **useProjectServices** - Manages project services

### Services Layer (`src/services/`)

Services handle all GraphQL API communication:

- **loginService.ts** - User login and password change
- **projectService.ts** - Projects, users, services CRUD
- **taskService.ts** - Task creation, updates, deletion
- **milestoneService.ts** - Milestone operations

## Reusable Utilities & Services

### Request Utility (`src/utils/request.ts`)

**Purpose**: Centralized GraphQL request handler with offline support

**Features**:
- **Query Caching**: Queries are cached in IndexedDB when online
- **Mutation Queuing**: Mutations are queued in IndexedDB when offline
- **Auto-sync**: Queued mutations sync automatically when connection restores
- **Token Management**: Automatically includes JWT token in all requests
- **Error Handling**: Handles 401 responses by logging out user
- **Offline Detection**: Checks navigator.onLine for offline status

**Usage**:
```typescript
import request from '../utils/request';

// Execute a query
const projects = await request('query { projects { id name } }');

// Execute a mutation with variables
const result = await request(
  'mutation Login($input: LoginInput!) { login(input: $input) { token } }',
  { input: { email: 'user@example.com', password: 'pass123' } }
);
```

**Key Functions**:
- `request(query, variables)` - Main request handler
- `setTokenExpiredCallback(callback)` - Register token expiration handler
- `syncOfflineMutations()` - Manually trigger mutation sync

### URL Utilities (`src/utils/urlUtils.ts`)

**Purpose**: Centralized URL configuration for easy deployment

**Constants**:
- `API_BASE_URL` - Base URL for backend (default: `http://localhost:3000`)

**Functions**:
- `getApiUrl(endpoint)` - Get full API endpoint URL
- `getImageUrl(imagePath)` - Get full image upload URL

**Benefits**:
- Single point of configuration for all URLs
- Easy to switch between local/staging/production
- Prevents hardcoded URLs throughout codebase

**Usage**:
```typescript
import { getApiUrl, getImageUrl } from '../utils/urlUtils';

const apiEndpoint = getApiUrl('/graphql'); // → http://localhost:3000/graphql
const imageUrl = getImageUrl('/avatar.jpg'); // → http://localhost:3000/uploads/avatar.jpg
```

### Storage Utility (`src/utils/storage.ts`)

**Purpose**: Unified interface for managing user authentication data

**Features**:
- In-memory caching for fast access
- localStorage persistence
- Automatic error handling for corrupted data

**Key Methods**:
- `setUser(user)` - Store user and token
- `getUser()` - Retrieve stored user
- `getToken()` - Get JWT token
- `clearUser()` - Clear all user data on logout
- `addLatestProject(id)` - Remember last opened project
- `getLatestProject()` - Retrieve last opened project

**Usage**:
```typescript
import Storage from '../utils/storage';

// Save login data
await Storage.setUser({ id: 1, name: 'Alice', token: 'jwt_token' });

// Retrieve user
const user = await Storage.getUser();

// Get token for API calls
const token = await Storage.getToken();

// Logout
await Storage.clearUser();
```

### Date Utilities (`src/utils/dateUtils.ts`)

**Purpose**: Consistent date formatting and conversion

**Functions**:
- `dateInputToISO(dateInput)` - Convert HTML date input to ISO string
- `formatDateComponents(timestamp)` - Format date into components (month, day, year)
- `isValidDate(dateString)` - Validate date strings

**Usage**:
```typescript
import { dateInputToISO, formatDateComponents, isValidDate } from '../utils/dateUtils';

const iso = dateInputToISO('2025-12-01'); // → 2025-12-01T00:00:00.000Z
const components = formatDateComponents(1701388800000);
// → { month: 'Dec', day: '01', year: '2025' }

const valid = isValidDate('2025-12-01'); // → true
```

### Upload Utility (`src/utils/upload.ts`)

**Purpose**: File upload handling with error management

**Class**: `Upload`

**Methods**:
- `static async upload(file: File)` - Upload file to backend

**Returns**: `{ path: string }` - Server path to uploaded file

**Usage**:
```typescript
import { Upload } from '../utils/upload';

const file = fileInput.files[0];
const result = await Upload.upload(file);
console.log('File uploaded to:', result.path); // /uploads/1764357163890-525509.png
```

### Offline Database (`src/lib/offline-db.ts`)

**Purpose**: IndexedDB management for offline support

**Features**:
- Query caching in IndexedDB
- Mutation queuing for offline actions
- Automatic sync when online

**Key Functions**:
- `saveQuery(key, data)` - Cache query results
- `getQuery(key)` - Retrieve cached query
- `queueMutation(mutation)` - Queue mutation for later
- `getQueuedMutations()` - Get all queued mutations
- `clearQueuedMutations()` - Clear mutation queue

**Constants**:
- `DB_NAME` - 'vibrand-offline-db'
- `DB_VERSION` - 1
- `QUERIES_STORE` - 'queries'
- `MUTATIONS_STORE` - 'mutations'

## Real-time Features

### Socket.IO Integration (`src/hooks/useTasks.ts`)

**Purpose**: Real-time task updates across multiple clients

**Implementation**:
```typescript
import { io } from "socket.io-client";
import { API_BASE_URL } from '../utils/urlUtils';

const socket = io(API_BASE_URL);

// Listen for task updates
socket.on("taskUpdated", (updatedTask) => {
  if (updatedTask.projectId !== projectId) return; // Only handle this project's tasks
  
  setTasks(prev => ({
    ...prev,
    [updatedTask.id]: {
      ...prev[updatedTask.id],
      ...updatedTask
    }
  }));
});

// Cleanup on unmount
return () => {
  socket.off("taskUpdated");
};
```

**Benefits**:
- **Live Collaboration** - Team members see task updates instantly
- **No Polling** - Efficient WebSocket connection instead of repeated API calls
- **Conflict-free** - Server-driven updates prevent conflicts
- **Project Scoped** - Only updates for the current project

**Events Monitored**:
- `taskUpdated` - Task has been modified by another user

## Progressive Web App (PWA)

The Vibrand Studio web application is built as a **Progressive Web App (PWA)**, enabling installation and offline functionality.

### Installation
1. Visit the app in your browser
2. Click the **Install** button in the address bar
3. Choose "Install" in the popup
4. App appears in your applications menu

The service worker allow the app to work offline by caching assets and API responses.

## App Manifest

This app use a mainifest to enable better PWA integration.



## Error Handling

### Comprehensive Error Management Strategy

#### 1. **Global Error Notifications**

```typescript
// Display errors globally
<ErrorNotification 
  error={globalError}
  onClose={() => setGlobalError(null)}
/>
```

**Features**:
- Auto-dismiss after 5 seconds (configurable)
- Manual close button
- Fixed position on screen
- Styled for visibility

#### 2. **Service Layer Error Handling**

All service methods include error handling:

```typescript
try {
  const result = await projectService.updateProject(id, changes);
  // Success handling
} catch (err: any) {
  let message = 'Error updating project';
  if (err?.message) message += `: ${err.message}`;
  setError(message);
  throw err; // Re-throw for caller to handle
}
```

#### 3. **Hook-level Error State**

Most hooks provide error state management:

```typescript
const { data, error, setError } = useHook();

// Handle errors
if (error) {
  return <ErrorNotification error={error.message} onClose={() => setError(null)} />;
}
```

#### 4. **Request Handler Error Recovery**

```typescript
// In request.ts
if (response.status === 401) {
  await Storage.clearUser();
  if (onTokenExpired) onTokenExpired(); // Notify listeners
  throw new Error('Session expired. Please login again.');
}

// GraphQL errors
if (data.errors && data.errors.length) {
  throw new Error(data.errors.map((e: any) => e.message).join('\n'));
}
```

#### 5. **Offline Error Handling**

```typescript
try {
  // Online: attempt fetch
  const data = await fetchGraphQL();
  return data;
} catch {
  // Check cache before failing
  const cached = await getQuery(key);
  if (cached) return cached;
  throw new Error('Network error and no cached data available.');
}
```

#### 6. **Specific Error Messages**

- **Network errors**: "Network error. Please check your connection."
- **Session expiration**: "Session expired. Please login again."
- **Invalid responses**: "Invalid login response"
- **Operation failures**: "Error adding user to project: {detail}"
- **Offline fallback**: "Offline and no cached data available."

### Error Flow Diagram

```
User Action
    ↓
Service Layer (catches and formats errors)
    ↓
Hook Layer (manages error state)
    ↓
Component Layer (displays via ErrorNotification)
    ↓
User sees actionable error message
```

## Authentication

### Login Flow

1. **User enters credentials** → Login component
2. **Submit to GraphQL** → LoginService
3. **Validate credentials** → Backend
4. **Receive token + user** → LoginService
5. **Persist to storage** → Storage utility
6. **Update auth context** → AuthProvider
7. **Unlock app** → Authenticated wrapper

### Session Management

- **Token Storage**: JWT stored in localStorage and memory
- **Auto-expiration**: 401 response triggers logout
- **Token Injection**: Automatically added to all requests
- **Memory Cache**: In-memory copy for fast access

### Protected Routes

```typescript
<Authenticated>
  <App />
</Authenticated>
```

The `Authenticated` component:
- Checks authentication status
- Shows Login if not authenticated
- Shows loading state while checking
- Renders children if authenticated

## Configuration

### Backend URL

Edit `src/utils/urlUtils.ts`:
```typescript
export const API_BASE_URL = 'http://localhost:3000'; // Change to your backend
```

### Service Worker Auto-update

The service worker automatically updates in the background. Configure in `vite.config.ts`:
```typescript
VitePWA({
  registerType: 'autoUpdate', // Auto-update SW
  // ...
})
```

### Workbox Caching Strategies

Configured in `vite.config.ts`:
- **CacheFirst**: Google Fonts (cache for 1 year)
- **NetworkFirst**: API calls (try network, fallback to cache)
- **StaleWhileRevalidate**: Static assets

### PWA Manifest

Customize app appearance in `vite.config.ts`:
- App name: "Vibrand Studio"
- Theme color: `#DB5349` (Vibrand red)
- Background color: `#F5F5F5` (Light gray)
- Display mode: "standalone" (full-screen app experience)

## Performance Optimizations

- **Code Splitting**: Vite automatically splits code per route
- **Lazy Loading**: Components load on demand
- **Query Caching**: Reduce API calls with IndexedDB cache
- **Image Optimization**: Efficient asset serving
- **Service Worker**: Static asset caching and offline support
- **Minification**: Production builds are heavily optimized

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Make Changes
- Edit components, hooks, or services
- Changes hot-reload automatically

### 3. Test Locally
- Navigate to `http://localhost:5173`
- Test features and check console for errors

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Build
```bash
npm run preview
```

### 6. Deploy
- Upload `dist/` directory to production server
- Configure backend URL for production environment

## Troubleshooting

### "Network error. Please check your connection."
- Verify backend server is running
- Check `API_BASE_URL` in `urlUtils.ts`
- Check browser console for CORS errors

### "Offline and no cached data available."
- First load must be online to cache data
- Use offline-first approach for subsequent loads

### Service Worker Not Updating
- Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- Clear browser cache and reload

### Tasks Not Updating in Real-time
- Verify Socket.IO connection is active
- Check backend is sending `taskUpdated` events
- Verify project scope matches in event handler

### Login Not Working
- Clear browser storage: `localStorage.clear()`
- Check backend is accessible
- Verify credentials are correct

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
