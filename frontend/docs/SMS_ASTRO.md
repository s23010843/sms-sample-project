# SMS Platform - Astro Setup

## Overview

This SMS Platform uses Astro as the meta-framework to integrate multiple frontend frameworks (Vue, React, Angular, Svelte) into a unified application.

## 🚀 Project Structure

```text
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── angular/     # Angular SMS Analytics
│   │   ├── astro/       # Astro components
│   │   ├── react/       # React Contact Management
│   │   ├── svelte/      # Svelte Message Scheduler
│   │   └── vue/         # Vue Quick Send
│   ├── layouts/
│   │   └── Layout.astro # Main layout with SEO
│   ├── pages/
│   │   └── index.astro  # SMS Platform homepage
│   └── styles/
│       └── global.css   # Tailwind CSS
└── astro.config.mjs    # Astro configuration
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`      |
| `pnpm build`              | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm astro add`          | Add new integrations                             |

## 🔧 Configuration

### API Proxy
The Astro config includes a proxy to forward `/api` requests to the Flask backend at `http://localhost:5000`.

### Framework Integration
- **Vue**: Used for the Quick Send SMS form
- **React**: Powers the Contact Management interface
- **Angular**: Renders the Analytics Dashboard
- **Svelte**: Handles Message Scheduling

## 📦 Key Features

- **Islands Architecture**: Components are hydrated only when needed
- **Multi-Framework**: Use the best tool for each feature
- **Optimized Builds**: Astro generates highly optimized static files
- **SEO Friendly**: Server-side rendering with proper meta tags

## 🎨 Styling

The project uses Tailwind CSS v4 with the Vite plugin for instant styling updates.

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- [Framework Integrations](https://docs.astro.build/en/guides/integrations-guide/)
