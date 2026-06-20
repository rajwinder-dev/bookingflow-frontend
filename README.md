# Booking Flow

A deom ticket booking app .

## Features
- **Seat selection** — Interactive seat map with transparent pricing
- **Authentication** — Manual auth
## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) — dev server and build tool
- [React Router 7](https://reactrouter.com/) — client-side routing
- [TanStack Query](https://tanstack.com/query) — server state management
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) — styling and components
- [Zustand](https://zustand-demo.pmnd.rs/) — client state
- [Axios](https://axios-http.com/) — HTTP client

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A running backend API (for full functionality beyond demo UI)

## Environment Variables

Copy the example env file and adjust the API URL to point at your backend:

```bash
cp .example.env .env
```

| Variable       | Description                          | Default                  |
| -------------- | ------------------------------------ | ------------------------ |
| `VITE_API_URL` | Base URL of the backend API server   | `http://localhost:3000`  |

In development, requests to `/api` are proxied to `VITE_API_URL` via Vite (see `vite.config.ts`). The app resolves API calls to `${VITE_API_URL}/api/v1` when the variable is set, or `/api/v1` (proxied) when it is not.

## Development

Install dependencies:

```bash
npm install
```

Start the dev server (binds to all network interfaces via `--host`):

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next free port Vite assigns).

Make sure your backend is running at the URL configured in `.env` before testing authenticated routes or live event data.

## Production

Build optimized static assets:

```bash
npm run build
```

Output is written to the `dist/` directory.

### Preview the production build locally

```bash
npm run preview
```

This serves the built files so you can verify the production bundle before deploying.

### Deploy

Serve the contents of `dist/` with any static file host (Nginx, Apache, Vercel, Netlify, S3 + CloudFront, etc.).

When deploying, set `VITE_API_URL` to your production backend URL **at build time** — Vite inlines env variables during `npm run build`, so rebuild after changing them.

Example:

```bash
VITE_API_URL=https://api.example.com npm run build
```

## Available Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR           |
| `npm run build`   | Type-check and build for production      |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint                               |
| `npm run shadcn:add` | Add shadcn/ui components via CLI      |

## Project Structure

```
src/
├── features/
│   ├── auth/          # Login, signup, password reset
│   ├── events/        # Event listing and detail pages
│   └── home/          # Landing page (HomePage)
├── components/ui/     # shadcn/ui components
├── config/            # API configuration
├── context/           # Global React context
├── layouts/           # App shell layout
├── hooks/             # Shared custom hooks
└── router.tsx         # Route definitions
```

## Routes

| Path                      | Page              |
| ------------------------- | ----------------- |
| `/`                       | Home              |
| `/events`                 | Event listing     |
| `/events/:eventId`        | Event detail      |
| `/login`                  | Login             |
| `/signup`                 | Sign up           |
| `/forget-password`        | Forgot password   |
| `/reset-password/:token`    | Reset password    |
