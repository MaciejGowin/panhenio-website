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
    "id": "mozaika-tworzenie-obrazow-2026-05-19",
    "source": {
      "id": "odracentrum-org",
      "url": "https://odracentrum.org/seniorzy-w-odra-centrum/"
    },
    "title": "Mozaika – tworzenie obrazów.",
    "description": "Wspólnie tworzenie obrazów inspirowanych Odrą. To warsztat międzypokoleniowy, na który można zabrać wnuki lub dzieci, aby razem tworzyć, rozmawiać i spędzać czas w dobrym towarzystwie.",
    "location": "Odra Centrum, Wybrzeże Juliusza Słowackiego 5B, Wrocław (tuż obok Mostu Grunwaldzkiego)",
    "city": {
      "id": "wroclaw",
      "name": "Wrocław"
    },
    "date": "2026-05-19",
    "startTime": "15:00",
    "endTime": "17:00",
    "entryCost": "bezpłatne",
    "facilitator": "Jan Kowalski",
    "registration": "Obowiązują wcześniejsze zapisy. Decyduje kolejność zgłoszeń. Każde zgłoszenie jest potwierdzane – odpowiedź może zająć chwilę. Telefonicznie: 506 563 518 E-mail: michalina@onwater.pl",
    "category": {
      "id": "warsztaty",
      "name": "Warsztaty"
    },
    "createdAt": "2026-04-01T12:00:00Z"
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
  "id": "mozaika-tworzenie-obrazow-2026-05-19",
  "source": {
    "id": "odracentrum-org",
    "url": "https://odracentrum.org/seniorzy-w-odra-centrum/"
  },
  "title": "Mozaika – tworzenie obrazów.",
  "description": "Wspólnie tworzenie obrazów inspirowanych Odrą. To warsztat międzypokoleniowy, na który można zabrać wnuki lub dzieci, aby razem tworzyć, rozmawiać i spędzać czas w dobrym towarzystwie.",
  "location": "Odra Centrum, Wybrzeże Juliusza Słowackiego 5B, Wrocław (tuż obok Mostu Grunwaldzkiego)",
  "city": {
    "id": "wroclaw",
    "name": "Wrocław"
  },
  "date": "2026-05-19",
  "startTime": "15:00",
  "endTime": "17:00",
  "entryCost": "bezpłatne",
  "facilitator": "Jan Kowalski",
  "registration": "Obowiązują wcześniejsze zapisy. Decyduje kolejność zgłoszeń. Każde zgłoszenie jest potwierdzane – odpowiedź może zająć chwilę. Telefonicznie: 506 563 518 E-mail: michalina@onwater.pl",
  "category": {
    "id": "warsztaty",
    "name": "Warsztaty"
  },
  "createdAt": "2026-04-01T12:00:00Z"
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
