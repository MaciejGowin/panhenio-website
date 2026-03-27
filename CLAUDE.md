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

### APIs

#### Events API

To get all events for search phrase, use the following endpoint:

```
    GET https://www.panhenio.pl/api/events?phrase=Wrocław
```

API allows to search by query parameters:
- `phrase` (optional) — search phrase to filter events by `name`, `location`, `city`, etc. (case-insensitive substring match)
- `categoryId` (optional) — filter events by category id (e.g. `aktywnosc`, `kultura`, etc.)
- `cityId` (optional) — filter events by city id (e.g. `wroclaw`, `poznan`, etc.)

This endpoint returns data in the following format:

```json
[
  {
    "id": "seniorzy-2026-03-03-nordic-walking",
    "source": {
      "id": "www-seniorzy-wroclaw-pl",
      "url": "https://www.seniorzy.wroclaw.pl/Biuletyn-marzec-2026"
    },
    "name": "Nordic walking z Teresą Tadeuszyk – projekt „Opowieści ruchem pisane”",
    "description": "Spacer nordic walking dla seniorów poprawiający kondycję, koordynację ruchową oraz pamięć. Zajęcia odbywają się na świeżym powietrzu i są dostosowane do możliwości uczestników.",
    "location": "Park Szczytnicki, zbiórka przy przystanku tramwajowym Chopina",
    "city": {
      "id": "wroclaw",
      "name": "Wrocław"
    },
    "date": "2026-03-03",
    "time": "10:00",
    "cost": "bezpłatnie",
    "category": {
      "id": "aktywnosc",
      "name": "Aktywność"
    },
    "createdAt": "2026-03-11T12:13:00.123123Z"
  }
]
```

#### Latest Events API

To get latest events, use the following endpoint:

```
    GET https://www.panhenio.pl/api/events/latest
```

This endpoint returns data in the same format as the Events API, but only the 3 random events after or today.

#### Event API

To get event use the following endpoint:

```
    GET https://www.panhenio.pl/api/events/<sourceId>/<id>
```

This endpoint returns data in the following format:

```json
{
  "id": "seniorzy-2026-03-03-nordic-walking",
  "source": {
    "id": "www-seniorzy-wroclaw-pl",
    "url": "https://www.seniorzy.wroclaw.pl/Biuletyn-marzec-2026"
  },
  "name": "Nordic walking z Teresą Tadeuszyk – projekt „Opowieści ruchem pisane”",
  "description": "Spacer nordic walking dla seniorów poprawiający kondycję, koordynację ruchową oraz pamięć. Zajęcia odbywają się na świeżym powietrzu i są dostosowane do możliwości uczestników.",
  "location": "Park Szczytnicki, zbiórka przy przystanku tramwajowym Chopina",
  "city": {
    "id": "wroclaw",
    "name": "Wrocław"
  },
  "date": "2026-03-03",
  "time": "10:00",
  "cost": "bezpłatnie",
  "category": {
    "id": "aktywnosc",
    "name": "Aktywność"
  },
  "createdAt": "2026-03-11T12:13:00.123123Z"
}
```

#### Cities API

To get all cities use the following endpoint:

```
    GET https://www.panhenio.pl/api/cities
```

This endpoint returns data in the following format:

```json
[
  {
    "id": "wroclaw",
    "name": "Wrocław"
  }
]
```

#### Categories API

To get all categories use the following endpoint:

```
    GET https://www.panhenio.pl/api/categories
```

This endpoint returns data in the following format:

```json
[
  {
    "id": "aktywnosc",
    "name": "Aktywność"
  }
]
```



### Components

Each component lives in `src/components/<Name>/` with its own `.jsx` and `.module.css`. Styling uses CSS Modules throughout; global tokens (colors, font) are defined as CSS custom properties in `src/index.css`.

- **Hero** — the only stateful component; handles search input, fetches events, filters by `name`/`location`/`city` (case-insensitive substring)
- **Categories** — decorative only; category links are non-functional (`href="#"`)
- **Recommendations** — hardcoded list of three events, not driven by data

### Styling

Layout is mobile-first, max-width 480px. Key CSS variables: `--navy`, `--orange`, `--text`, `--font` (Inter). All component styles are scoped via CSS Modules.
