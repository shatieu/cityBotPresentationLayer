# Znojmo City Hub — Implementation Plan v2

## Strategy

Build the complete frontend against the OpenAPI spec using mock data. Every page works, every component renders, every navigation path is functional. All API calls go through a mock/live switching layer. The data layer plugs in later by flipping `USE_MOCKS=false`.

The FE is the product demo. It validates the concept with real users using realistic mock data before investing in scrapers and backend infrastructure.

---

## Platform Overview

### Domains (10)

| Domain | Route prefix | Content type | Source (future) |
|--------|-------------|--------------|-----------------|
| Gastro | `/gastro` | Daily menus, restaurants, cafés, bars | meníčka.cz scrape + owner input |
| Kino & Divadlo | `/kultura` | Cinema showtimes + theatre program | kinoznojmo.cz scrape + manual |
| Víno | `/vino` | Wineries, tastings, cellar visits | Manual + seasonal scrape |
| Události | `/udalosti` | Events from 3 sources + community | Scrape + registered user posts |
| Zájmové kroužky | `/krouzky` | Hobby/activity offers | Registered user/business posts |
| Firmy & Služby | `/firmy` | Business directory + smart search | Business registration + manual |
| Úřady | `/urady` | Government offices, úřední deska, council | Scrape město-znojmo.cz + partnership |
| Inzerce | `/inzerce` | Classifieds: offers, requests, jobs | Registered user posts |
| Zprávy | `/zpravy` | Local news aggregation | RSS feeds + manual entry |
| Mapa | `/mapa` | Unified map of all places | Aggregated from all domains |

### User Modes (3)

| Mode | Who | What they see |
|------|-----|---------------|
| **Public (Menu)** | Anyone, no login | Browsable domain pages, landing page with hero carousel + CTA |
| **Moje Znojmo** | Logged-in citizen | Configurable bento grid dashboard, personalized domain cards |
| **Business Dashboard** | Logged-in business | Manage listings, update menus/events, view profile |

### Auth Flows (2 separate)

| Flow | Method | Landing |
|------|--------|---------|
| Citizen registration | Social login (Google, Facebook) via Supabase Auth | → Moje Znojmo dashboard |
| Business registration | Dedicated form (business name, IČO, contact) | → Business dashboard |

---

## Navigation Architecture

### Design Principle: Data-Driven, Configurable

The navigation is not hardcoded. It reads from a configuration object that defines:
- Which items appear in the nav
- Their order
- Which are visible vs hidden under "Více" (More)
- Whether they're shown to public / logged-in / both

This means the nav can be reconfigured without code changes — just update the config.

### Configuration Shape

```typescript
// lib/config/navigation.ts
type NavItem = {
  id: string
  label: string           // Czech label
  href: string
  icon: string            // Lucide icon name
  visibility: 'public' | 'authenticated' | 'both'
  showInTopNav: boolean   // false = lives under "Více" dropdown
  showInDashboard: boolean // appears as bento card option in Moje Znojmo
}
```

### Default Layout

**Desktop top nav (7 visible + Více):**
Gastro · Kultura · Víno · Události · Firmy · Mapa · Zprávy · [Více ▾: Úřady, Inzerce, Kroužky]

**Right side:** Moje Znojmo (logged in) / Přihlásit se (logged out)

**Mobile:** Hamburger → full list, no "Více" nesting

This is a starting default. The config can be changed at any time.

---

## Page Inventory

### Landing & Global Pages

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 1 | `/` | **Landing page** | Hero carousel (Znojmo photos), "Co dnes ve Znojmě?", quick domain links as bento grid, today's menus preview (3-4 cards), upcoming events preview, CTA: "Vytvořte si účet a přizpůsobte si Znojmo" |
| 2 | `/mapa` | **Unified map** | Full-viewport Leaflet map, all places as markers, filter by domain type, marker click → popup with summary + link |
| 3 | `/moje-znojmo` | **Dashboard** (auth required) | Configurable bento grid, domain cards user has selected, "Co je nového" feed, settings gear to add/remove/reorder cards |
| 4 | `/moje-znojmo/nastaveni` | **Dashboard settings** | Toggle which domain cards appear, drag to reorder |
| 5 | `/prihlaseni` | **Login** | Social login buttons (Google, Facebook) |
| 6 | `/registrace` | **Registration chooser** | Two paths: "Jsem občan" → social login, "Vlastním firmu" → business registration form |
| 7 | `/registrace/firma` | **Business registration** | Form: business name, IČO, category tags, contact, address |

### Gastro (formerly Restaurace)

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 8 | `/gastro` | **Gastro home** | Subcategory filter chips (Restaurace, Kavárny, Bary, Fast food, Cukrárny), today's menus section, full place list below |
| 9 | `/gastro/denni-menu` | **Daily menus** | All restaurants with today's menu, sorted by trust tier then name |
| 10 | `/gastro/[slug]` | **Gastro place page** | Place layout: name, address, hours, photos, map pin. Today's menu as primary content. Links: delivery, website, directions. TrustBadge. |

### Kultura (Kino & Divadlo combined)

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 11 | `/kultura` | **Kultura home** | Two tabs: "Kino" and "Divadlo". Each shows what's on today. Date picker for other days. |
| 12 | `/kultura/kino` | **Cinema tab** | Films with posters, showtimes, language, ticket link to kinoznojmo.cz |
| 13 | `/kultura/divadlo` | **Theatre tab** | Theatre program, venue info, ticket links |
| 14 | `/kultura/[slug]` | **Venue place page** | Place layout for Kino Svět or theatre venue |

### Víno

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 15 | `/vino` | **Wine home** | Winery list, "open today" filter, tasting availability |
| 16 | `/vino/[slug]` | **Winery place page** | Place layout, tasting schedule, wine types, seasonal notes, upcoming events |

### Události

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 17 | `/udalosti` | **Events home** | Two tabs: "Kalendář" (scraped/official events) and "Komunitní" (user-posted events). Category filter chips. Date range navigation. |
| 18 | `/udalosti/[id]` | **Event detail** | Full event: description, date/time, place link, ticket URL, photos |
| 19 | `/udalosti/pridat` | **Submit event** (auth required) | Form for registered users/businesses to post community events |

### Zájmové kroužky

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 20 | `/krouzky` | **Hobbies home** | List of offered activities (dance, sports, crafts, music, languages). Search + filter. |
| 21 | `/krouzky/[id]` | **Activity detail** | Description, schedule, price, contact, location (linked to place) |
| 22 | `/krouzky/pridat` | **Submit activity** (auth required) | Form for businesses/individuals to post hobby offers |

### Firmy & Služby

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 23 | `/firmy` | **Directory home** | Smart search bar (prominent), flat list with tag-based filtering, category chips derived from tags, AI chatbot trigger button |
| 24 | `/firmy/[slug]` | **Business place page** | Place layout, services offered, contact, hours, reviews (future) |
| 25 | `/firmy/chat` | **Business finder chatbot** (auth required) | Chat interface, calls Anthropic API, structured for future RAG/tool use |

### Úřady

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 26 | `/urady` | **Government home** | List of offices with opening hours, search. Tabs: "Úřady" (offices), "Úřední deska" (official board), "Zastupitelstvo" (council news) |
| 27 | `/urady/[slug]` | **Office detail** | Place layout, opening hours table, services offered, contact |
| 28 | `/urady/uredni-deska` | **Official board** | List of public notices, dates, links to PDFs |
| 29 | `/urady/zastupitelstvo` | **Council** | Latest session summaries, upcoming sessions, links to minutes |

### Inzerce

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 30 | `/inzerce` | **Classifieds home** | Tabs: "Nabídky" (offers), "Poptávky" (requests), "Práce" (jobs). Search + filter. |
| 31 | `/inzerce/[id]` | **Ad detail** | Full ad: description, photos, contact, date posted |
| 32 | `/inzerce/pridat` | **Post ad** (auth required) | Form: type (offer/request/job), title, description, category, contact, photos |

### Zprávy

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 33 | `/zpravy` | **News home** | Aggregated feed from RSS sources + manual entries. Source badge on each item. |
| 34 | `/zpravy/[id]` | **News detail** | Summary + link to original source. Never full article (copyright). |

### Business Dashboard

| # | Route | Page | Key elements |
|---|-------|------|-------------|
| 35 | `/firma/dashboard` | **Business home** | Overview: your listings, recent updates, quick actions |
| 36 | `/firma/misto/[slug]/upravit` | **Edit listing** | Edit place info, hours, photos, description |
| 37 | `/firma/menu` | **Menu management** | Enter/update daily menu. This is the "one place to update" feature. |
| 38 | `/firma/udalosti` | **Manage events** | Business's posted events |
| 39 | `/firma/profil` | **Business profile** | Edit business info, contact, IČO |

**Total: 39 pages**

---

## Component Inventory

### ui/ (primitives — token-only, no hardcoded values)

| Component | Used by |
|-----------|---------|
| `Card` | Every card on the platform |
| `Button` | All buttons (primary, secondary, accent variants) |
| `Badge` | Trust tiers, categories, tags, status indicators |
| `Input` | All text inputs, search bars |
| `Textarea` | Forms (inzerce, events, kroužky) |
| `Select` | Dropdowns in forms |
| `Tooltip` | Provenance tooltips, hover info |
| `Skeleton` | Loading states |
| `Tabs` | Kultura (kino/divadlo), Události, Inzerce, Úřady |
| `Modal` | Confirmations, quick views |
| `Carousel` | Landing page hero photos |
| `Chip` | Filter chips (gastro subcategories, event categories, tags) |
| `Avatar` | User/business avatars |
| `EmptyState` | "No results" / "No data" states |
| `Dropdown` | "Více" nav dropdown, sort options |

### data-display/ (domain-aware, compose primitives)

| Component | Purpose |
|-----------|---------|
| `TrustBadge` | Trust tier dot + tooltip |
| `TimeIndicator` | Data freshness ("dnes 7:00", "před 2 dny") |
| `PriceTag` | Formatted CZK price (font-data) |
| `PlaceCard` | Generic place summary |
| `MenuCard` | Restaurant daily menu |
| `ShowtimeCard` | Cinema film + times |
| `TheatreCard` | Theatre show listing |
| `WineryCard` | Winery with tasting info |
| `EventCard` | Event summary |
| `ActivityCard` | Kroužek/hobby offer |
| `BusinessCard` | Business directory listing |
| `OfficeCard` | Government office with hours |
| `ClassifiedCard` | Inzerce ad summary |
| `NewsCard` | News item with source badge |
| `BentoCard` | Dashboard domain card (configurable) |

### layout/

| Component | Purpose |
|-----------|---------|
| `Header` | Top nav, data-driven from config |
| `Footer` | Minimal footer |
| `PageContainer` | Max-width + padding wrapper |
| `PlacePageLayout` | Shared layout for all place detail pages |
| `SectionHeading` | Consistent section headers with optional "Zobrazit vše" link |
| `HeroCarousel` | Landing page photo carousel |
| `BentoGrid` | Dashboard configurable grid layout |
| `TabLayout` | Shared tab container for tabbed pages |

### forms/ (auth-gated submission forms)

| Component | Purpose |
|-----------|---------|
| `EventForm` | Submit community event |
| `ActivityForm` | Submit hobby/kroužek offer |
| `ClassifiedForm` | Post classified ad |
| `BusinessRegistrationForm` | Business sign-up |
| `MenuEntryForm` | Daily menu input (business dashboard) |
| `PlaceEditForm` | Edit place details (business dashboard) |

### chat/

| Component | Purpose |
|-----------|---------|
| `ChatWindow` | Chat UI container |
| `ChatMessage` | Single message bubble |
| `ChatInput` | Message input with send |

### map/

| Component | Purpose |
|-----------|---------|
| `MapView` | Leaflet wrapper |
| `MapMarkerPopup` | Marker click content |
| `MapFilters` | Type filter controls on map page |

### filters/

| Component | Purpose |
|-----------|---------|
| `SearchBar` | Text search, used across multiple pages |
| `FilterChips` | Category/type filter chips |
| `DateRangePicker` | Events date navigation |
| `SortDropdown` | Sort options |

---

## Chatbot Architecture

### Current Implementation (Phase 1)

Simple chat interface that sends messages to the Anthropic API. No retrieval, no tools, no database search.

```
lib/chat/
├── client.ts          ← Anthropic API call wrapper
├── types.ts           ← Message types, conversation state
├── system-prompt.ts   ← Base system prompt about Znojmo
└── hooks/
    └── useChat.ts     ← React hook for chat state management
```

### Future Interface (designed now, implemented later)

```typescript
// lib/chat/types.ts
interface ChatConfig {
  systemPrompt: string
  tools?: ChatTool[]           // Future: search businesses, check menus, etc.
  retrievalEnabled?: boolean   // Future: RAG over business data
  maxMessages?: number         // Rate limiting
}

interface ChatTool {
  name: string
  description: string
  parameters: Record<string, unknown>
  handler: (params: unknown) => Promise<unknown>
}
```

The `ChatWindow` component doesn't know whether it's talking to a raw API call or a full RAG pipeline. The `client.ts` abstraction handles that switch.

---

## Mock Data Requirements

All mock data uses real Znojmo names, addresses, and GPS coordinates. A Znojmo resident should not be able to tell it's mocked at a glance.

| File | Records | Key realism points |
|------|---------|-------------------|
| `menus-today.json` | 10 restaurants | Real restaurant names from meníčka.cz, Czech dish names, prices 45–219 Kč |
| `places.json` | 30+ places | All types, real addresses, real GPS coords centered on Znojmo (~48.8556, 16.0488) |
| `cinema-showtimes.json` | 5 films | Mix of Czech and dubbed titles, realistic times (14:00–21:30) |
| `theatre-program.json` | 3 shows | Znojemská beseda programming style |
| `wineries.json` | 8 wineries | Znovín, Vinařský dům, real cellar names |
| `events.json` | 12 events | Mix of categories, spread over next 30 days |
| `activities.json` | 8 hobbies | Dance, yoga, language courses, art workshops |
| `businesses.json` | 20 businesses | Doctors, lawyers, plumbers, shops — tagged |
| `offices.json` | 6 government offices | Městský úřad, Finanční úřad, real hours |
| `classifieds.json` | 10 ads | Mix of offers, requests, jobs |
| `news.json` | 8 articles | Summaries + source attribution, no full text |
| `map-markers.json` | All places | Lightweight marker data for map view |
| `dashboard-config.json` | 1 user config | Example bento grid layout with preferences |

---

## Execution Order for Claude Code

### Phase A: Foundation (~6 hours)

```
A1. Scaffold Next.js 14+ project with Tailwind v4
A2. Set up globals.css with full @theme token block per VISUAL_IDENTITY.md
A3. Install and configure: openapi-typescript, lucide-react, leaflet
A4. Generate API types from openapi.yaml
A5. Build lib/api/client.ts with mock/live switching
A6. Build lib/config/navigation.ts with data-driven nav config
A7. Create all mock JSON files in mocks/
```

### Phase B: UI Primitives (~4 hours)

```
B1. Card, Button, Badge, Input, Textarea, Select
B2. Tooltip, Skeleton, Tabs, Modal
B3. Carousel, Chip, Avatar, EmptyState, Dropdown
```

### Phase C: Layout Components (~3 hours)

```
C1. Header (data-driven nav, responsive, Více dropdown)
C2. Footer
C3. PageContainer, SectionHeading
C4. PlacePageLayout
C5. HeroCarousel
C6. BentoGrid
C7. TabLayout
```

### Phase D: Data Display Components (~5 hours)

```
D1. TrustBadge, TimeIndicator, PriceTag
D2. MenuCard, PlaceCard
D3. ShowtimeCard, TheatreCard, WineryCard
D4. EventCard, ActivityCard, BusinessCard
D5. OfficeCard, ClassifiedCard, NewsCard
D6. BentoCard (dashboard domain card)
```

### Phase E: Domain API Modules (~3 hours)

```
E1. lib/api/ — one file per domain, all returning mock data
E2. Each module exports typed async functions matching openapi operations
```

### Phase F: Pages — Core (~8 hours)

```
F1. Landing page (/) — hero carousel, domain bento, menu preview, events preview, CTA
F2. Gastro home (/gastro) — subcategory chips, menu section, place list
F3. Gastro daily menus (/gastro/denni-menu)
F4. Gastro place page (/gastro/[slug])
F5. Kultura home (/kultura) — kino + divadlo tabs
F6. Kultura kino tab (/kultura/kino)
F7. Kultura divadlo tab (/kultura/divadlo)
F8. Kultura venue page (/kultura/[slug])
F9. Víno home (/vino)
F10. Víno winery page (/vino/[slug])
```

### Phase G: Pages — Community & Services (~8 hours)

```
G1. Události home (/udalosti) — kalendář + komunitní tabs
G2. Event detail (/udalosti/[id])
G3. Kroužky home (/krouzky)
G4. Activity detail (/krouzky/[id])
G5. Firmy home (/firmy) — smart search, tag filters, chatbot trigger
G6. Business page (/firmy/[slug])
G7. Úřady home (/urady) — offices + úřední deska + zastupitelstvo tabs
G8. Office detail (/urady/[slug])
G9. Úřady úřední deska (/urady/uredni-deska)
G10. Úřady zastupitelstvo (/urady/zastupitelstvo)
```

### Phase H: Pages — User Content & News (~5 hours)

```
H1. Inzerce home (/inzerce) — nabídky + poptávky + práce tabs
H2. Ad detail (/inzerce/[id])
H3. Zprávy home (/zpravy)
H4. News detail (/zpravy/[id])
H5. Mapa (/mapa) — full map with filters
```

### Phase I: Auth & Dashboard (~5 hours)

```
I1. Login page (/prihlaseni) — social login buttons (mocked)
I2. Registration chooser (/registrace)
I3. Business registration (/registrace/firma)
I4. Moje Znojmo dashboard (/moje-znojmo) — configurable bento grid
I5. Dashboard settings (/moje-znojmo/nastaveni)
```

### Phase J: Business Dashboard (~4 hours)

```
J1. Business dashboard home (/firma/dashboard)
J2. Edit listing (/firma/misto/[slug]/upravit)
J3. Menu management (/firma/menu)
J4. Manage events (/firma/udalosti)
J5. Business profile (/firma/profil)
```

### Phase K: Forms & Chatbot (~4 hours)

```
K1. Event submission form (/udalosti/pridat)
K2. Activity submission form (/krouzky/pridat)
K3. Classified posting form (/inzerce/pridat)
K4. Chat module (lib/chat/) — Anthropic API wrapper
K5. ChatWindow component + /firmy/chat page
```

### Phase L: Polish (~4 hours)

```
L1. Responsive pass on all pages (375px minimum)
L2. Loading states and skeleton screens on all pages
L3. Meta tags and OpenGraph for sharing
L4. Favicon and basic branding
L5. Navigation config tuning based on page flow testing
L6. Anti-pattern checklist pass (per VISUAL_IDENTITY.md)
```

---

## Estimated Effort

| Phase | Hours | Deliverable |
|-------|-------|-------------|
| A. Foundation | ~6 | Project scaffold, tokens, types, mocks |
| B. UI Primitives | ~4 | 15 primitive components |
| C. Layout | ~3 | Header, footer, containers, grids |
| D. Data Display | ~5 | 15 domain-aware components |
| E. API Modules | ~3 | Mock data layer complete |
| F. Core Pages | ~8 | 10 pages: landing, gastro, kultura, víno |
| G. Community Pages | ~8 | 10 pages: události, kroužky, firmy, úřady |
| H. Content & Map | ~5 | 5 pages: inzerce, zprávy, mapa |
| I. Auth & Dashboard | ~5 | 5 pages: login, registration, Moje Znojmo |
| J. Business Dashboard | ~4 | 5 pages: business management |
| K. Forms & Chat | ~4 | 3 forms + chatbot module |
| L. Polish | ~4 | Responsive, loading, meta, branding |
| **Total FE** | **~59 hours** | **39 pages, 50+ components, full mock data** |

---

## Files to Update

After this plan is approved, the following project files need updating to reflect the expanded scope:

1. **`api/openapi.yaml`** — Add endpoints for: businesses, government offices, classifieds, news, activities, theatre, dashboard config, chat, auth
2. **`AGENTS.md` (root)** — Update repo responsibilities table with new domains
3. **`znojmo-web/AGENTS.md`** — Update page structure table, add new component categories
4. **`znojmo-data/AGENTS.md`** — Add new scraper targets (RSS feeds, město-znojmo.cz), new database tables
5. **`VISUAL_IDENTITY.md`** — No changes needed (design system is domain-agnostic)
