# Vibrand Studio - Frontend

A modern portfolio website built with React, Redux, and Vite.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [State Management](#state-management)
6. [SVG Components](#svg-components)
7. [Scripts](#scripts)

---

## 🎯 Overview

Professional portfolio website showcasing projects, client testimonials, and contact system with global state management using Redux.

---

## 🛠 Tech Stack

**Core:**
- React 19.1.1
- React Router 7.9.3
- Redux 5.0.1 + Redux Toolkit 2.11.0
- React Redux 9.2.0

**Build & Dev:**
- Vite 7.1.14 (Rolldown)
- TypeScript 5.9.3
- ESLint 9.36.0

**HTTP & Data:**
- Axios 1.12.2
- GraphQL (via Axios)

**Plugins:**
- vite-plugin-svgr (SVG as React components)
- @vitejs/plugin-react (Fast Refresh)

## 📁 Project Structure

```
vibrandstudio.com/
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Root component with routing
│   ├── index.css             # Global styles
│   ├── svg.d.ts              # SVG type definitions
│   ├── components/           # Reusable components
│   ├── pages/                # Page components
│   ├── store/                # Redux store (clientSlice, projectSlice, store.ts)
│   ├── services/             # API services
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utilities (request.ts for GraphQL)
│   ├── types/                # TypeScript types
│   ├── svg/                  # SVG files (used as React components)
│   └── assets/               # Static assets
├── public/                   # Static files
├── dist/                     # Build output
├── vite.config.ts            # Vite config with plugins
├── tsconfig.json             # TypeScript config
├── eslint.config.js          # ESLint config
├── package.json              # Dependencies
└── index.html                # HTML entry
```

## 🚀 Getting Started

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Check code quality
npm run preview    # Preview production build
npm run push       # Push built files to git
```
