# Portfolio

Personal portfolio web application built with React, TypeScript, and Vite.

## Overview

This project is a multilingual portfolio site with a modern Fluent UI based interface.
It includes a homepage with introduction and skills tabs, a resume page, and settings for
theme and language.

## Features

- Responsive portfolio layout
- Fluent UI components and icons
- Internationalization with i18next
- Supported locales: English (`en`), Japanese (`ja`), Vietnamese (`vi`)
- Theme selection: light, dark, system
- Route based pages for home, resume, and settings

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Fluent UI
- i18next + react-i18next
- Tailwind CSS
- ESLint

## Project Routes

- `/` Home
- `/resume` Resume
- `/settings` Settings

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- pnpm

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Localization Notes

- Locale files are in `src/locales/`.
- English (`src/locales/en.ts`) is the source of truth for key structure.
- Keep keys nested by feature for clarity, for example:

```ts
home: {
  introduction: { ... },
  skills: {
    tabs: { ... },
    programming: { ... },
    frameworks: { ... },
    databases: { ... },
    languages: { ... },
  },
}
```
