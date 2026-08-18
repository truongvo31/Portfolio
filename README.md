# Portfolio

A multilingual personal portfolio for Phong Nguyen, built with React, TypeScript, Vite,
and Fluent UI. The application includes a session-protected public portfolio and an
Azure AD-protected administration area for managing visitor sessions.

## Features

- Responsive home page with introduction, work history, skills, and education
- Session-token validation for public routes
- Azure AD authentication for administrator routes
- Admin session management: create, edit, copy visitor URLs, revoke, and remove expired sessions
- Toasts, dialogs, loading states, and API error handling
- English, Japanese, and Vietnamese translations
- Light, dark, and system theme modes
- React Query for asynchronous API requests and cache management

## Tech Stack

- React 19 and TypeScript
- Vite 8
- React Router 7
- Fluent UI React Components and icons
- Tailwind CSS 4
- TanStack React Query 5
- i18next and react-i18next
- MSAL for browser-based Azure AD authentication

## Routes

| Route             | Access           | Description                    |
| ----------------- | ---------------- | ------------------------------ |
| `/`               | Valid session    | Portfolio home page            |
| `/settings`       | Valid session    | Theme and language preferences |
| `/admin`          | Azure AD account | Administration dashboard       |
| `/admin/sessions` | Azure AD account | Visitor session management     |
| `/admin/settings` | Azure AD account | Shared settings page           |

Public routes require a session query parameter, for example `/?session=<session-id>`.
Administrators can generate and copy valid visitor URLs from `/admin/sessions`.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm
- An API that exposes the endpoints used by the application
- An Azure AD app registration for administrator access

### Install

```bash
pnpm install
```

Create a local environment file such as `.env.development` with the values required by
the API and MSAL configuration:

```env
VITE_API_URL=https://api.example.com
VITE_MSAL_TENANT_ID=your-tenant-id
VITE_MSAL_CLIENT_ID=your-client-id
VITE_MSAL_SCOPE=your-api-scope
# Optional development-only header
# VITE_DEV_ACCESS_KEY=your-development-access-key
```

`VITE_API_URL` may include the `/api` path. If it does not, the API provider appends it
automatically. Do not commit secrets or environment files containing credentials.

### Development

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Authentication

The client routes are guarded by `SessionGuard`. It reads the `session` query parameter
and validates it through `client/validate-session/{session}` before rendering the
portfolio. Missing or invalid sessions receive a `401` error page.

The admin routes are guarded by MSAL. Unauthenticated users are redirected to Azure AD;
authenticated API requests acquire a token silently and send it as a Bearer token to
protected `admin/*` endpoints. MSAL uses `sessionStorage` for its token cache and
redirects back to the `/admin` route.

## Localization and Theme

- Translation resources live in `src/locales/`.
- Supported languages are English (`en`), Japanese (`ja`), and Vietnamese (`vi`).
- i18next checks the query string, cookie, local storage, session storage, browser
  language, and document language, then falls back to English.
- The selected language is cached under `i18nextLng`.
- Theme choices are light, dark, and system, with the preference persisted locally.

When adding translations, use `src/locales/en.ts` as the source of truth for the key
structure and keep the corresponding keys aligned in `ja.ts` and `vi.ts`.

## Project Structure

```text
src/
  components/   Shared UI, guards, dialogs, and messages
  helpers/      Date, storage, string, and theme utilities
  layouts/      Default and admin layouts
  locales/      English, Japanese, and Vietnamese resources
  pages/        Route-level page components
  plugins/      i18n and React Query setup
  providers/    API, dialog, loading, sidebar, theme, and toast providers
  stores/       Hooks for application state and provider access
```

## Deployment Notes

Vite is configured with `/Portfolio/` as the base path. The deployed host must serve the
SPA entry point for client-side routes, and the MSAL redirect URI must include the
deployed `/Portfolio/admin` path.
