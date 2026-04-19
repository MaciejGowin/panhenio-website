# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Next.js)
npm run build     # Production build → .next/
npm run preview   # Serve the production build locally
```

No linting or test suite is configured.

## Architecture

**Pan Henio** is a senior-friendly event discovery app (Next.js 15, App Router) for Poland. SSR via server components, deployed on Lambda + CloudFront.

### Routing

App Router with file-based routing under `src/app/`:

| Route | Page |
|---|---|
| `/` | Home — Hero, Latest (today's events), Promoted, Categories |
| `/[cityId]/wydarzenia-dla-seniorow` | City events list |
| `/organizator/[organizerId]/wydarzenia-dla-seniorow` | Organizer events list + calendar view |
| `/wydarzenie/[organizerId]/[monthId]/[id]` | Event detail |
| `/szukaj-wydarzen` | Search (client component) |
| `/o-projekcie` | About |
| `/cyfrowy-henio` | Cyfrowy Henio info page |
| `/polityka-prywatnosci` | Privacy policy |

### Query parameters

**City events page** (`/[cityId]/wydarzenia-dla-seniorow`):
- `miesiac` — month filter (`YYYY-MM`), defaults to current month
- `dzien` — day filter (`YYYY-MM-DD`); when present, overrides `miesiac` and passes `dateFrom`+`dateTo` to API

**Organizer events page** (`/organizator/[organizerId]/wydarzenia-dla-seniorow`):
- `miesiac` — month filter (`YYYY-MM`)
- `dzien` — day filter (`YYYY-MM-DD`); overrides `miesiac`, passes `dateFrom`+`dateTo` to API
- `widok` — view mode: `lista` (default) or `kalendarz`

**Search page** (`/szukaj-wydarzen`):
- `miasto` — initial city filter
- `kategoria` — initial category filter
- Always sends `dateFrom=<today>` to the events API

### Data fetching

All server-component fetches use `{ cache: 'no-store' }` (Lambda has no persistent cache).

Shared fetch functions in `src/lib/api.js` are wrapped with React `cache()` to deduplicate calls within a single request (e.g. `fetchCities` used by both Navbar and the page component hits the network only once).

### Components

Each component lives in `src/components/<Name>/` with its own `.jsx` and `.module.css`. Styling uses CSS Modules; global tokens defined in `src/app/globals.css`.

- **Navbar** — async server component; fetches cities for the dropdown
- **Latest** — async server component; shows today's events for the default city
- **Promoted** — async server component; shows promoted events for the default city
- **Categories** — client component; fetches categories on mount
- **Hero** — client component; search input linking to `/szukaj-wydarzen`
- **EventCard** — renders a single event tile; formats date as `dziś/jutro, DD miesiąc` or `weekday, DD miesiąc`
- **SearchPage** — client component; filters by city, category, always with `dateFrom=today`

### Configuration

`src/config/cityTitles.js` exports:
- `cityTitles` — page heading per city (e.g. `"Wydarzenia dla seniorów we Wrocławiu"`)
- `cityAllEvents` — short label for "all events" link per city (e.g. `"Wszystkie we Wrocławiu"`)

### Styling

Mobile-first, max-width 480px. Key CSS variables: `--navy`, `--orange`, `--text`, `--font` (Inter via `next/font/google`). All component styles scoped via CSS Modules.

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
- `month` (optional) — filter events by month (e.g. `2026-04`, `2026-05`, etc.)
- `dateFrom` (optional) — filter events by date from (e.g. `2026-04-01`, `2026-05-05`, etc.), overrides `month` if both provided
- `dateTo` (optional) — filter events by date to (e.g. `2026-04-01`, `2026-05-05`, etc.)
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
- `limit` (optional) - limit number of events returned (default: 5, max: 10)

Response body format:

This endpoint returns data in the same format as the "Get all events", but only the 3 random events after or today.

#### Get promotes events

Operation:

```
GET https://www.panhenio.pl/api/events/promoted?cityId=wroclaw
```

Request query parameters:
- `cityId` (required) — filter events by city id (e.g. `wroclaw`, `poznan`, etc.)
- `limit` (optional) - limit number of events returned (default: 3, max: 5)

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
