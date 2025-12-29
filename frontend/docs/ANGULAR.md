# Angular Integration via Analog.js

## Overview

The SMS Platform uses Angular 20 through Analog.js integration to power the Analytics Dashboard component.

## Installation

```bash
pnpm add @analogjs/astro-angular @angular/core @angular/common
```

## Components

### Welcome Component (`welcome.component.ts`)
Displays real-time SMS analytics including:
- Messages sent today
- Delivery rate percentage
- Active contacts count
- Recent activity feed

### Test Component (`app/test/test.ts`)
Shows API rate limiting information:
- Remaining API calls
- Total API quota
- Visual progress bar
- Reset time countdown

## Usage in Astro

```astro
---
import AngularWelcome from '../components/angular/welcome.component';
---

<AngularWelcome client:load />
```

## Client Directives

- `client:load` - Hydrates immediately on page load
- `client:idle` - Hydrates when browser is idle
- `client:visible` - Hydrates when component enters viewport

## Styling

Angular components use:
- Component-scoped SCSS
- Tailwind CSS utility classes
- Custom gradient backgrounds

## Data Flow

Components maintain local state and can be connected to the Flask backend API for real-time data:

```typescript
// Example API integration
fetch('/api/analytics')
  .then(res => res.json())
  .then(data => this.updateStats(data));
```

## Development

```bash
cd frontend
pnpm dev
```

Angular components will hot-reload during development.

## Build

Angular components are compiled and optimized during the Astro build process:

```bash
pnpm build
```

## Learn More

- [Analog.js Documentation](https://analogjs.org/)
- [Angular Documentation](https://angular.dev/)
- [Astro + Angular](https://docs.astro.build/en/guides/integrations-guide/angular/)