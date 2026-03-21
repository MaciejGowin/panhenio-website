# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Serve the production build locally
```

No linting or test suite is configured.

## Architecture

**Pan Henio** is a senior-friendly event discovery SPA (React + Vite) for Wrocław, Poland. It is entirely client-side with no backend.

### Routing

`App.jsx` implements hash-based routing manually using `window.location.hash` and a `hashchange` event listener. Currently two routes:
- Default (`/`) → Home page (Navbar + Hero + Categories + Recommendations + Illustration + Footer)
- `#o-projekcie` → About page (Navbar + OProjekcie + Footer)

### Data

Events live in `/public/data/events.json` and are fetched at runtime by the Hero component (`fetch('/data/events.json')`). The file at `/src/data/events.json` is a seed/reference copy — it is **not** imported by any component.

Event shape:
```json
{ "name": "", "location": "", "city": "", "date": "YYYY-MM-DD", "time": "HH:MM" }
```

### Components

Each component lives in `src/components/<Name>/` with its own `.jsx` and `.module.css`. Styling uses CSS Modules throughout; global tokens (colors, font) are defined as CSS custom properties in `src/index.css`.

- **Hero** — the only stateful component; handles search input, fetches events, filters by `name`/`location`/`city` (case-insensitive substring)
- **Categories** — decorative only; category links are non-functional (`href="#"`)
- **Recommendations** — hardcoded list of three events, not driven by data

### Styling

Layout is mobile-first, max-width 480px. Key CSS variables: `--navy`, `--orange`, `--text`, `--font` (Inter). All component styles are scoped via CSS Modules.
