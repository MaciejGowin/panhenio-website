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

### Components

Each component lives in `src/components/<Name>/` with its own `.jsx` and `.module.css`. Styling uses CSS Modules throughout; global tokens (colors, font) are defined as CSS custom properties in `src/index.css`.

- **Hero** — the only stateful component; handles search input, fetches events, filters by `name`/`location`/`city` (case-insensitive substring)
- **Categories** — decorative only; category links are non-functional (`href="#"`)
- **Recommendations** — hardcoded list of three events, not driven by data

### Styling

Layout is mobile-first, max-width 480px. Key CSS variables: `--navy`, `--orange`, `--text`, `--font` (Inter). All component styles are scoped via CSS Modules.

## Deployment

The app runs on **serverless infrastructure (Lambda)**. Next.js data cache does not persist between Lambda invocations, so `next: { revalidate }` has no effect.

Always use `{ cache: 'no-store' }` on `fetch` calls in server components — never `{ next: { revalidate: N } }`. Page-level caching should be handled at the CDN layer (e.g. CloudFront), not inside Next.js.

## APIs

### Events API

#### Get all events by search phrase, cityId or categoryId

Operation:

```
GET https://www.panhenio.pl/api/events?phrase=Wrocław
```

Request query parameters:
- `phrase` (optional) — search phrase to filter events by `name`, `location`, `city`, etc. (case-insensitive substring match)
- `organizerId` (optional) — filter events by organizer id (e.g. `odra-centrum`, `cal-borek`, etc.)
- `month` (optional) — filter events by month id (e.g. `2026-04`, `2026-05`, etc.)
- `categoryId` (optional) — filter events by category id (e.g. `aktywnosc`, `kultura`, etc.)
- `cityId` (optional) — filter events by city id (e.g. `wroclaw`, `poznan`, etc.)

Response body format:

```json
[
  {
    "id": "mozaika-tworzenie-obrazow-2026-05-19",
    "organizer": {
      "id": "odra-centrum",
      "name": "Odra Centrum"
    },
    "month": "2026-05",
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
    "sourceUrl": "https://odracentrum.org/seniorzy-w-odra-centrum/",
    "categories": [{
      "id": "warsztaty",
      "name": "Warsztaty"
    }],
    "createdAt": "2026-04-01T12:00:00Z"
  }
]
```

#### Get latest events for today

Operation:

```
GET https://www.panhenio.pl/api/events/latest?cityId=wroclaw
```

Request query parameters:
- `cityId` (required) — filter events by city id (e.g. `wroclaw`, `poznan`, etc.)

Response body format:

This endpoint returns data in the same format as the "Get all events", but only the 3 random events after or today.

#### Get promotes events

Operation:

```
GET https://www.panhenio.pl/api/events/promoted?cityId=wroclaw
```

Request query parameters:
- `cityId` (required) — filter events by city id (e.g. `wroclaw`, `poznan`, etc.)

Response body format:

This endpoint returns data in the same format as the "Get all events", but only the 3 random events after or today.


#### Get event

```
GET https://www.panhenio.pl/api/events/:organizerId/:month/:eventId
```

Request path parameters:
- `organizerId` (string, required) — organizer ID
- `month` (string, required) — month in `YYYY-MM` format
- `eventId` (string, required) — event ID

Request query parameters:
- `previewAccessToken` (optional) — preview access token to load draft event (e.g. `123-abc`, etc.)

Response body format:

```json
{
  "id": "mozaika-tworzenie-obrazow-2026-05-19",
  "organizer": {
    "id": "odra-centrum",
    "name": "Odra Centrum"
  },
  "month": "2026-05",
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
  "sourceUrl": "https://odracentrum.org/seniorzy-w-odra-centrum/",
  "categories": [{
    "id": "warsztaty",
    "name": "Warsztaty"
  }],
  "createdAt": "2026-04-01T12:00:00Z"
}
```

### Cities API

#### Get all cities

Operation:

```
    GET https://www.panhenio.pl/api/cities
```

Response body format:

```json
[
  {
    "id": "wroclaw",
    "name": "Wrocław",
    "default": true
  },
  {
    "id": "warszawa",
    "name": "Warszawa",
    "default": false
  }
]
```

### Categories API

#### Get all categories

Operation:

```
GET https://www.panhenio.pl/api/categories
```

Response body format:

```json
[
  {
    "id": "aktywnosc",
    "name": "Aktywność"
  }
]
```

### Organizer API

#### Get all organizers

Operation:

```
GET https://www.panhenio.pl/api/organizers
```

Response body format:

```json
[
  {
    "id": "odra-centrum",
    "name": "ODRA Centrum"
  }
]
```

#### Get organizer months

Operation:

```
GET https://www.panhenio.pl/api/organizers/:organizerId/months
```

Request query parameters:
- `organizerId` (string, required) — organizer ID

Response body format:

```json
[
  "2026-04",
  "2026-05"
]
```
