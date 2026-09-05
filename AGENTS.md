# AGENTS.md — cityBotPresentationLayer

## Purpose

This repo owns the user-facing Next.js application. It reads data via the API defined in `../api/openapi.yaml`. It never writes data, runs scrapers, or owns schema.

## Visual Identity

**All visual decisions are governed by `../VISUAL_IDENTITY.md`.** That file is the definitive reference for colors, typography, spacing, radii, imagery, motion, and anti-patterns. Do not make visual choices that contradict it. When in doubt, check the identity doc.

Key constraints (non-negotiable):
- Gold (primary) + wine (secondary accent) + warm stone neutrals. Green appears only as the single `success` semantic token — it is not a UI color family. No violet, blue, dark backgrounds, bleached pastels.
- Corner radius: 4px maximum everywhere.
- Real Znojmo photography only — no stock, no AI-generated images. Until real photography lands, use the quarried-stone placeholder texture system documented in `VISUAL_IDENTITY.md` §6, not flat generic swatches.
- No AI-looking design: no oversized rounded corners, no CSS-only icons, no gradient blobs, no frosted glass/`backdrop-blur`.
- Lucide React for all icons, always paired with a text label.

---

## Theming Architecture: One File to Change Everything

### The Problem This Solves

If someone decides to change the primary green to a different shade, or swap the accent color, or adjust spacing — that change should happen in **exactly one file** and propagate to the entire application with zero component edits.

### The Solution: Tailwind v4 `@theme` as Token Source

**No SCSS. No CSS modules. No `tailwind.config.js`.**

Tailwind v4 is the preprocessor. Its `@theme` directive defines design tokens as CSS variables that automatically generate utility classes.

All design tokens live in a single file:

```
app/globals.css       ← THE source of truth for all visual tokens
```

### globals.css Structure

```css
@import "tailwindcss";

@theme {
  /* --- Colors: Gold (primary) --- */
  --color-gold-900: #4A3610;
  --color-gold-700: #8A6416;
  --color-gold-500: #AD7A12;
  --color-gold-300: #D9B65C;
  --color-gold-100: #F0E0B8;
  --color-gold-50:  #FAF3E1;

  /* --- Colors: Wine (secondary accent) --- */
  --color-wine-700: #7A2E3A;
  --color-wine-500: #9C4152;
  --color-wine-300: #D99BA8;
  --color-wine-100: #F5E3E6;

  /* --- Colors: Stone (neutrals) --- */
  --color-ink-900:   #2A2018;
  --color-stone-700: #5B5039;
  --color-stone-500: #8C8064;
  --color-stone-300: #D3C4A0;
  --color-stone-100: #ECE2CC;
  --color-surface:   #F7F2E7;
  --color-white:     #FFFCF6;

  /* --- Colors: Semantic --- */
  --color-success:   #3F6B46;
  --color-warning:   #AD7A12;
  --color-error:     #B8503A;
  --color-info:      #8A6416;

  /* --- Typography --- */
  --font-heading: "Space Grotesk", system-ui, sans-serif;
  --font-body:    "Outfit", system-ui, sans-serif;
  --font-data:    "JetBrains Mono", monospace;

  /* --- Radius --- */
  --radius-sm:   2px;
  --radius-base: 4px;

  /* --- Shadows --- */
  --shadow-card:       0 1px 3px rgba(42, 32, 24, 0.10), 0 1px 2px rgba(42, 32, 24, 0.05);
  --shadow-card-hover: 0 4px 12px rgba(42, 32, 24, 0.12), 0 2px 4px rgba(42, 32, 24, 0.06);
  --shadow-nav:        0 1px 2px rgba(42, 32, 24, 0.08);
}
```

### Rules for Using Tokens in Components

**DO** use Tailwind utility classes mapped to theme tokens:
```tsx
<h1 className="font-heading text-ink-900 text-2xl">Restaurace</h1>
<div className="bg-white shadow-card rounded-base p-4">...</div>
<span className="font-data text-wine-700">149 Kč</span>
```

**DO NOT** hardcode values:
```tsx
// ❌ NEVER
<div style={{ color: '#8A6416' }}>
<div className="bg-[#8A6416]">
<div className="rounded-lg">  // lg = 8px, exceeds 4px max
```

**DO NOT** use `@apply` in component files. Shared styling = shared React components.

---

## Component Architecture

### Hierarchy

```
components/
├── ui/                        ← Primitive building blocks (token-only)
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Select.tsx
│   ├── Tooltip.tsx
│   ├── Skeleton.tsx
│   ├── Tabs.tsx
│   ├── Modal.tsx
│   ├── Carousel.tsx
│   ├── Chip.tsx
│   ├── Avatar.tsx
│   ├── EmptyState.tsx
│   └── Dropdown.tsx
│
├── data-display/              ← Domain-aware, compose primitives
│   ├── TrustBadge.tsx
│   ├── TimeIndicator.tsx
│   ├── PriceTag.tsx
│   ├── PlaceCard.tsx
│   ├── MenuCard.tsx
│   ├── ShowtimeCard.tsx
│   ├── TheatreCard.tsx
│   ├── WineryCard.tsx
│   ├── EventCard.tsx
│   ├── ActivityCard.tsx
│   ├── BusinessCard.tsx
│   ├── OfficeCard.tsx
│   ├── ClassifiedCard.tsx
│   └── NewsCard.tsx
│
├── layout/                    ← Structural
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PageContainer.tsx
│   ├── PlacePageLayout.tsx
│   ├── SectionHeading.tsx
│   ├── HeroCarousel.tsx
│   ├── DashboardGrid.tsx
│   └── TabLayout.tsx
│
├── dashboard/                 ← Widget system
│   ├── WidgetCard.tsx
│   ├── WidgetCardHeader.tsx
│   ├── widgets/               ← 13 individual widgets
│   └── settings/
│
├── forms/
├── chat/
├── map/
└── filters/
```

### Changeability Rules

1. **`ui/` components use tokens exclusively.** Card defines shadow+radius+padding once.
2. **`data-display/` components compose primitives.** MenuCard uses Card + PriceTag + TrustBadge. Never defines its own shadow.
3. **`layout/` components own structural spacing.** PageContainer owns max-width and padding.
4. **Page files contain NO visual styling.** Only composition and data flow. No `bg-*`, `shadow-*`, `rounded-*`.

---

## Data Layer Switching

| Mode | When | How |
|------|------|-----|
| **Mock** | `USE_MOCKS=true` | Returns static JSON from `mocks/` directory |
| **Live** | `USE_MOCKS=false` | Fetches from `NEXT_PUBLIC_API_BASE_URL` |

```
lib/
├── api/
│   ├── client.ts          ← Fetch wrapper, handles mock vs live
│   ├── menus.ts
│   ├── places.ts
│   ├── cinema.ts
│   ├── theatre.ts
│   ├── wineries.ts
│   ├── events.ts
│   ├── activities.ts
│   ├── businesses.ts
│   ├── government.ts
│   ├── classifieds.ts
│   ├── news.ts
│   └── map.ts
├── types/
│   └── api.ts             ← Auto-generated from ../api/openapi.yaml
├── config/
│   └── navigation.ts      ← Data-driven nav config
├── chat/
│   ├── client.ts
│   ├── types.ts
│   ├── system-prompt.ts
│   └── hooks/useChat.ts
mocks/
├── menus-today.json
├── places.json
├── cinema-showtimes.json
├── theatre-program.json
├── wineries.json
├── events.json
├── activities.json
├── businesses.json
├── offices.json
├── classifieds.json
├── news.json
├── map-markers.json
└── dashboard-config.json
```

## Page Structure

| Route | Page | Primary API call |
|-------|------|-----------------|
| `/` | Landing page | Multiple (menus preview, events preview) |
| `/gastro` | Gastro home | `GET /places?type=restaurant` |
| `/gastro/denni-menu` | Daily menus | `GET /menus/today` |
| `/gastro/[slug]` | Restaurant page | `GET /places/{slug}` |
| `/kultura` | Kultura home (tabs) | Cinema + theatre |
| `/kultura/kino` | Cinema tab | `GET /cinema/showtimes` |
| `/kultura/divadlo` | Theatre tab | `GET /theatre/shows` |
| `/kultura/[slug]` | Venue page | `GET /places/{slug}` |
| `/vino` | Wine home | `GET /wineries` |
| `/vino/[slug]` | Winery page | `GET /wineries/{slug}` |
| `/udalosti` | Events home (tabs) | `GET /events` |
| `/udalosti/[id]` | Event detail | `GET /events/{id}` |
| `/udalosti/pridat` | Submit event | `POST /events` |
| `/krouzky` | Hobbies home | `GET /activities` |
| `/krouzky/[id]` | Activity detail | `GET /activities/{id}` |
| `/krouzky/pridat` | Submit activity | `POST /activities` |
| `/firmy` | Directory home | `GET /businesses` |
| `/firmy/[slug]` | Business page | `GET /businesses/{slug}` |
| `/firmy/chat` | Business chatbot | `POST /chat/message` |
| `/urady` | Government home | `GET /government/offices` |
| `/urady/[slug]` | Office detail | `GET /government/offices/{slug}` |
| `/urady/uredni-deska` | Official board | `GET /government/notices` |
| `/urady/zastupitelstvo` | Council | `GET /government/council` |
| `/inzerce` | Classifieds home | `GET /classifieds` |
| `/inzerce/[id]` | Ad detail | `GET /classifieds/{id}` |
| `/inzerce/pridat` | Post ad | `POST /classifieds` |
| `/zpravy` | News home | `GET /news` |
| `/zpravy/[id]` | News detail | `GET /news/{id}` |
| `/mapa` | Unified map | `GET /map/places` |
| `/moje-znojmo` | Dashboard | `GET /dashboard/config` + widget data |
| `/moje-znojmo/nastaveni` | Dashboard settings | `GET/PUT /dashboard/config` |
| `/prihlaseni` | Login | Auth |
| `/registrace` | Registration chooser | — |
| `/registrace/firma` | Business registration | `POST /auth/business/register` |
| `/firma/dashboard` | Business dashboard | Business endpoints |
| `/firma/misto/[slug]/upravit` | Edit listing | `PUT /business/place` |
| `/firma/menu` | Menu management | `POST /business/menu` |
| `/firma/udalosti` | Manage events | Business events |
| `/firma/profil` | Business profile | `GET/PUT /business/profile` |

## Deployment

- Platform: Vercel
- Auto-deploy from `main`
- Preview deploys on PRs
