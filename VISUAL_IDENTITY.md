# Znojmo City Hub — Visual Identity Guidelines

This document is the definitive reference for all visual decisions across the platform. Every component, page, and asset must conform to these rules. When in doubt, refer back here — not to personal taste, not to trends, not to what a generic "civic app" looks like.

**Status:** v2 — full repaint of the predecessor identity (moss green + amber). See §0 for why.

---

## 0. Why this repaint happened

The v1 identity (`green-900` #2D3A1E, `amber-700` #B8860B, warm gray neutrals) was competently executed but generic: it read as "any Central European eco-conscious city app," not specifically Znojmo. Nothing in the palette, type, or imagery direction referenced anything you could only find in Znojmo.

This version starts from the town's actual material world instead:

- **The Town Hall Tower and the Renaissance burgher houses** ringing Horní/Masarykovo náměstí — Znojmo has the most complete collection of Renaissance townhouse façades in the Czech Republic, in warm ochres and antique golds, not the pastel mint of a generic "old town" illustration.
- **The Znojmo Catacombs** — 27 km of sandstone/limestone cellars and corridors under the old town, the largest underground system in the country. Cool stone, warm lantern light, vaulted arches.
- **Znojmo Castle and the Rotunda of St. Catherine**, a Romanesque rotunda with 11th-century frescoes, perched over the Dyje river gorge.
- **VOC Znojmo**, the wine sub-region's own appellation (Ryzlink rýnský, Sauvignon, Veltlínské zelené) — terraced vineyards on the valley slopes, cellar culture, harvest light.

Everything below is derived from those four things, not from "what city apps usually look like."

---

## 1. Design Philosophy

**A stone town, not a tech product.** The palette reads like sandstone and antique gold in raking light, not like a SaaS dashboard. Confident, warm, grounded in one specific place.

**Content is the interface.** Menus, showtimes, tasting schedules — the data IS the product. Every design decision serves readability and scannability. If a visual element doesn't help the user find or understand information faster, remove it.

**Never look AI-generated.** No oversized rounded corners. No gradient blobs. No CSS-only placeholder icons. No frosted glass. No floating orbs. If a design element could appear in a "made with AI" starter template, it doesn't belong here.

**One deliberate simplification from v1:** headings are no longer a separate brand color from body text. Both use the same warm near-black ink (`ink-900`). Color is reserved for things you can *act on* — links, buttons, active states, tags — never spent on decorating a heading. This makes the gold and wine accents mean something when they do appear.

---

## 2. Color Palette

### Primary: Gold (sandstone + Renaissance ochre + vineyard light)

The town's own stone and its most famous façades. Warm antique gold, not lemon-yellow, not a honey/amber accent color — this is now the primary interactive color: buttons, links, active nav, selected states.

| Token | Hex | Usage |
|-------|-----|-------|
| `gold-900` | `#4A3610` | Rare, heaviest emphasis only |
| `gold-700` | `#8A6416` | Primary buttons, links, active nav, `info` semantic |
| `gold-500` | `#AD7A12` | Hover states, `warning` semantic |
| `gold-300` | `#D9B65C` | Tag/badge accents |
| `gold-100` | `#F0E0B8` | Subtle backgrounds, selected states |
| `gold-50`  | `#FAF3E1` | Tinted card backgrounds |

### Secondary accent: Wine (Znojmo cellar burgundy)

VOC Znojmo is a real, specific wine appellation, not a generic "wine app red." This is a **restrained secondary accent** — used for wine-domain tags, ratings, price emphasis, and the odd high-emphasis CTA. It is not a second primary color; if a screen needs a second color at the same weight as gold, that's a sign something else should carry it (an icon, a label, a badge) instead.

| Token | Hex | Usage |
|-------|-----|-------|
| `wine-700` | `#7A2E3A` | Price/rating emphasis, `/vino` accents, accent CTA |
| `wine-500` | `#9C4152` | Hover state for the above |
| `wine-300` | `#D99BA8` | Badge accents |
| `wine-100` | `#F5E3E6` | Warm background tints, alert backgrounds |

### Neutrals: Stone (limestone/sandstone scale)

Every neutral carries the same warm, slightly golden undertone as quarried local stone. No blue-grays, no cool grays, ever — that was true in v1 and remains non-negotiable.

| Token | Hex | Usage |
|-------|-----|-------|
| `ink-900` | `#2A2018` | **All** primary text — headings and body alike |
| `stone-700` | `#5B5039` | Secondary text, captions |
| `stone-500` | `#8C8064` | Placeholder text, disabled states |
| `stone-300` | `#D3C4A0` | Borders, dividers |
| `stone-100` | `#ECE2CC` | Card alt backgrounds, alternating rows |
| `surface` | `#F7F2E7` | Page background ("limestone paper") |
| `white` | `#FFFCF6` | Card surfaces, inputs (a warm paper white, never pure `#FFFFFF`) |

### Semantic colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#3F6B46` | Podyjí gorge forest green — used **only** as a small state indicator ("open now", "verified"). It is not a UI color family; there is no `success-100`/`success-300` scale. If you need a light tint for a success badge, use `stone-100` with a `success`-colored dot, not a green background. |
| `warning` | `#AD7A12` | = `gold-500` |
| `error` | `#B8503A` | Terracotta roof-tile red. Warm, never a cold red. |
| `info` | `#8A6416` | = `gold-700` |

A `terracotta` scale (`terracotta-700/500/100`, same values as `error`) exists for the handful of dashboard contexts that need a light/dark pair rather than a single semantic token.

### Absolute Prohibitions

- **No violet, purple, or magenta** — ever, in any context
- **No blue** — not in links, not in info states, not in shadows
- **No dark backgrounds** — no dark mode, no dark hero sections, no dark nav (see §6 for how the catacombs are depicted *within* this constraint)
- **No bleached/desaturated pastels** — colors must feel alive, not washed out
- **No pure black** (`#000000`) — always `ink-900` (`#2A2018`)
- **No cool-toned grays** — every neutral carries warmth (this was a real bug in v1: several components fell back to Tailwind's stock cool gray, e.g. `text-gray-400`, because it was never added to the token scale. Fixed in this pass — if you need a shade the scale doesn't have, add it to `@theme`, don't reach for a default Tailwind color.)
- **Green is not a brand color.** It appears exactly once, as the `success` token, in a single weight. Do not create `green-100`, do not use it for icons or illustration fills beyond the one placeholder texture noted in §6.

---

## 3. Typography

Kept from v1 — the pairing was never the generic part of the old identity, and it still earns its place: a geometric, slightly architectural display face (echoes the tower's verticals) over a warm, humanist body face, with a mono face for anything numeric.

### Font Stack

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Headings | **Space Grotesk** | 500, 600, 700 | system-ui, sans-serif |
| Body | **Outfit** | 300, 400, 500 | system-ui, sans-serif |
| Monospace (data, prices) | **JetBrains Mono** | 400 | monospace |

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `heading-xl` | 32px / 2rem | Space Grotesk 700 | 1.2 | Page titles |
| `heading-lg` | 24px / 1.5rem | Space Grotesk 600 | 1.25 | Section headings |
| `heading-md` | 20px / 1.25rem | Space Grotesk 600 | 1.3 | Card titles, place names |
| `heading-sm` | 16px / 1rem | Space Grotesk 500 | 1.35 | Subsection headings |
| `body-lg` | 16px / 1rem | Outfit 400 | 1.6 | Primary body text |
| `body-md` | 14px / 0.875rem | Outfit 400 | 1.5 | Secondary text, descriptions |
| `body-sm` | 12px / 0.75rem | Outfit 400 | 1.4 | Captions, timestamps, provenance |
| `data` | 16px / 1rem | JetBrains Mono 400 | 1.4 | Prices, times, numerical data |

### Typography Rules

- **All text — headings and body — is `ink-900`** for primary content, `stone-700` for secondary. Color is not used to distinguish a heading from a paragraph; weight and size do that job. (This is the one rule that changed from v1, see §1.)
- **Prices always use JetBrains Mono** — "149 Kč" should feel precise, not decorative
- **No uppercase text** except single-word labels (e.g. "POLÉVKA" as a menu category tag)
- **No letter-spacing adjustments** — let the fonts breathe naturally
- **Czech diacritics must render correctly** — test with: ř, ž, č, ň, ď, ť, ů, ú, ě, š. (v1 shipped with mojibake in two component files where Czech text had been mis-encoded upstream — `MapMarkerPopup.tsx` and `Footer.tsx`. Fixed in this pass. If you ever see `Ă`, `Ĺ`, or `Ĺ™` in a string, that's double-encoded UTF-8 — fix the source, don't patch around it.)

---

## 4. Spacing & Layout

Unchanged from v1 — this was never the generic part.

### Grid

- Max content width: `1120px`
- Page horizontal padding: `16px` mobile, `24px` tablet, `32px` desktop
- Card grid: CSS Grid, `gap: 16px` mobile, `gap: 20px` desktop
- Columns: 1 on mobile, 2 on tablet (768px+), 3 on desktop (1024px+)

### Spacing Scale (rem-based)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Inline padding, tight gaps |
| `space-2` | 8px | Icon-to-text gaps, compact lists |
| `space-3` | 12px | Card internal padding (compact) |
| `space-4` | 16px | Standard card padding, section gaps |
| `space-6` | 24px | Between card groups, section padding |
| `space-8` | 32px | Between major sections |
| `space-12` | 48px | Page section separators |

---

## 5. Components

### Corner Radius

| Element | Radius |
|---------|--------|
| Buttons | `4px` |
| Cards | `4px` |
| Inputs | `4px` |
| Tags / badges | `2px` |
| Images inside cards | `2px` or `0px` (flush) |
| Modals / overlays | `4px` |
| Avatars / thumbnails | `4px` — **never circular** |

**Maximum radius anywhere in the UI: 4px.** No exceptions. Stone is cut, not molded — sharp-ish corners are part of the material logic, not just an arbitrary rule.

### Cards

- Background: `white` (`#FFFCF6`)
- Border: `1px solid stone-100` **by default** (new in this pass — a hairline edge like a cut stone tile; v1 left cards borderless by default and this reads flatter/more generic)
- Shadow: `0 1px 3px rgba(42, 32, 24, 0.10), 0 1px 2px rgba(42, 32, 24, 0.05)`
- Hover shadow: `0 4px 12px rgba(42, 32, 24, 0.12), 0 2px 4px rgba(42, 32, 24, 0.06)`
- Padding: `space-4` (16px)
- Transition: `box-shadow 150ms ease`

### Buttons

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `gold-700` | `white` | none |
| Primary hover | `gold-500` | `white` | none |
| Secondary | `transparent` | `gold-700` | `1px solid gold-700` |
| Secondary hover | `gold-50` | `gold-700` | `1px solid gold-700` |
| Accent (CTA) | `wine-700` | `white` | none |
| Accent hover | `wine-500` | `white` | none |

- Height: `40px` standard, `36px` compact, `48px` large
- Padding: `0 16px`
- Font: Outfit 500, `body-md` size
- No icons-only buttons without a visible text label (accessibility)

### Trust Badge

The TrustBadge component is a small inline element showing data provenance:

| Trust Tier | Visual |
|------------|--------|
| Owner | Small `gold-700` dot + "Ověřeno majitelem" tooltip |
| Human-verified | Small `gold-300` dot + "Ověřeno redaktorem" tooltip |
| AI-verified | Small `wine-300` dot + "Automaticky ověřeno" tooltip |
| Auto-scraped | Small `stone-300` dot + "Automaticky staženo" tooltip |

Always accompanied by the source name and date in `body-sm` `stone-700` text.

### Navigation

- Position: sticky top
- Background: `white` with bottom shadow (`shadow-nav`)
- Height: `56px` mobile, `64px` desktop
- Active link: `gold-700` text with `2px` bottom border in `gold-700`
- Inactive link: `stone-700` text
- Mobile: hamburger menu, slide-in from right, `surface` background

---

## 6. Imagery

### Photography Rules

- **Real Znojmo photos only.** No stock photography. No AI-generated images. No generic food/wine/city imagery.
- Photos should feel documentary, not commercial — natural light, real settings, actual food on actual plates.
- Aspect ratio for cards: `16:10` (landscape). Crop consistently.
- Aspect ratio for place page hero: `21:9` (cinematic wide). Full-bleed within content width.

### The placeholder/texture system (this pass has no licensed photography yet)

v1's fallback for "no photo" was a flat tint + initial letter. That's fine as a *last resort* but isn't a texture system — it's just a flat swatch, and flat swatches are what every placeholder-driven app defaults to. This pass replaces it with a **quarried-stone coursing** motif:

- A placeholder surface is `stone-100` (or `gold-50` for wine-domain contexts) with a set of very faint (`opacity: 0.5`), evenly spaced horizontal `stone-300` hairlines — 34–40px apart — suggesting coursed masonry / cut stone blocks. This is a **flat, tonal, textural device**, not a decorative color gradient, and not photographic.
- The place's initial letter sits in a small `gold-100` tile (max `4px` radius) with `gold-700` text, same as v1's letter treatment, on top of the stone coursing.
- The three homepage hero placeholders (`public/placeholders/hero-*.svg`) extend the same idea into full illustrations, each grounded in one real Znojmo thing, built entirely from flat shapes (no gradients, no photography):
  - `hero-1.svg` — a flat skyline silhouette: the Town Hall Tower + the Rotunda of St. Catherine + the castle wall, on the stone-coursing background.
  - `hero-2.svg` — terraced vineyard hillside: stacked flat color bands (not a blended gradient) representing terraces, with short `wine-700` strokes as vine rows.
  - `hero-3.svg` — receding stone arches (a nod to the catacombs' vaults and, doubling, to a cinema/theatre proscenium), rendered as **light**, line-only arches — see the callout below.

**Why `hero-3` isn't dark, even though the real catacombs are:** the "no dark hero sections" rule (§2) is absolute. Depicting the underground corridors literally (as a dark scene) would violate it. Instead the arches are drawn as outlines on the normal light `surface` background with a warm `gold-100` glow at the vanishing point — evocative of "looking into" the vaulted stone without ever putting a dark section on the page.

**What "texture, not gradient" means in practice**, since both use CSS/SVG color transitions and it would be easy to blur the line:
- Allowed: flat repeated shapes in two or three fixed tones (stripes, bands, a repeating arch) — the color never blends between the shapes.
- Allowed: a single flat scrim (`ink-900` at 60% opacity, straight or `to-transparent`) laid over a **photo** specifically to keep hero text legible — this is a functional legibility device, not decoration, and only ever appears over real photography once it exists.
- Not allowed: a `linear-gradient`/`radial-gradient` used as a section or card *background* to add visual interest (the classic "AI template" mint-to-lavender blob). None of the tokens above are ever blended into each other as a fill.

### Icons

- **Icon set: Lucide React** — consistent, clean, line-based
- Icon size: `20px` standard, `16px` compact, `24px` emphasis
- Icon color: inherits text color of the surrounding context
- **Never use icons as primary navigation** — always pair with a text label
- **Never use CSS-drawn icons or emoji as icons**

### Wordmark

`public/brand/znojmo-mark.svg` (icon only, favicon-scale) and `public/brand/znojmo-wordmark.svg` (icon + logotype, used in `Header.tsx`) — a minimal two-color (`ink-900` + `gold-700`) silhouette of the Town Hall Tower and the Rotunda of St. Catherine on a gold baseline. No gradients, no photographic detail, works at 24px.

### No Decorative Elements

- No background patterns beyond the stone-coursing texture defined above
- No gradient overlays on images except the legibility scrim defined above
- No floating shapes or blobs
- No animated decorations
- No parallax effects
- No confetti, sparkles, or celebration animations

---

## 7. Motion & Interaction

### Allowed Animations

| What | How | Duration |
|------|-----|----------|
| Card hover | Shadow deepens | `150ms ease` |
| Page transitions | Subtle opacity fade | `200ms ease` |
| Content loading | Skeleton pulse | `1.5s ease-in-out infinite` |
| Toast notifications | Slide in from top | `200ms ease-out` |
| Tooltip appear | Opacity 0→1 | `100ms ease` |

### Prohibited Animations

- No bounce effects
- No spring physics
- No staggered card entrance animations
- No sliding/zooming page transitions
- No hover scale transforms on cards
- No pulsing buttons or attention-seeking animations
- No scroll-triggered reveals
- No `backdrop-blur` / frosted-glass hover states (v1's dashboard widget system used `backdrop-blur-sm` + translucent white + `scale-[1.008]` on hover — a glassmorphism + hover-scale combo that directly contradicted its own anti-patterns list. Removed in this pass; `WidgetCard` now uses the same flat `Card` treatment as everything else.)

### Skeleton Loading

When data is loading, show skeleton placeholders that match the exact shape of the content they replace:
- Background: `stone-100`
- Pulse animation: alternate between `stone-100` and `surface`
- Shape: rectangular blocks with `2px` radius, matching text line heights and card dimensions

---

## 8. Responsive Behavior

| Breakpoint | Width | Columns | Notes |
|------------|-------|---------|-------|
| Mobile | < 768px | 1 | Full-width cards, hamburger nav |
| Tablet | 768–1023px | 2 | Side padding increases |
| Desktop | 1024px+ | 3 | Max-width container centers |

- Touch targets: minimum `44px × 44px` on mobile
- Font sizes do not change between breakpoints — the scale is designed to work at all sizes
- Cards stack vertically on mobile, grid on wider screens
- Map is full-viewport on its dedicated page, not embedded inline on other pages

---

## 9. Accessibility Minimums (WCAG AA)

All pairs below are computed against their actual backgrounds, not assumed:

| Pair | Contrast | Passes |
|------|----------|--------|
| `ink-900` on `white` | 14.3:1 | AAA |
| `ink-900` on `surface` | 14.3:1 | AAA |
| `stone-700` on `surface` | 7.1:1 | AAA |
| `gold-700` on `white` (buttons, links) | 5.4:1 | AA (normal text) |
| `wine-700` on `white` | 9.2:1 | AAA |
| `success` (`#3F6B46`) on `white` | 6.2:1 | AAA |
| `error` (`#B8503A`) on `white` | 4.9:1 | AA (normal text) |
| white text on `gold-700` button fill | 5.4:1 | AA |
| white text on `wine-700` button fill | 9.2:1 | AAA |

Rules:
- All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- All images have descriptive `alt` text in Czech
- All interactive elements are keyboard-focusable
- Focus ring: `2px solid gold-500`, `2px` offset
- `gold-500` is intentionally not used for body text on light backgrounds (its contrast is closer to 3.9:1) — reserve it for hover states on already-large/bold elements, or on top of a dark fill

---

## 10. Anti-Patterns Checklist

Before shipping any page or component, verify none of these are present:

- [ ] No rounded corners above 4px anywhere
- [ ] No blue, violet, or purple in any element
- [ ] No dark backgrounds (entire page is light) — including hero illustrations; depict dark subjects (the catacombs) with light-background line art instead, see §6
- [ ] No stock photos or AI-generated images
- [ ] No CSS-only icons (use Lucide React or nothing)
- [ ] No gradient backgrounds on sections or cards — texture (flat repeated tonal shapes) is fine, color blending is not, see §6
- [ ] No bounce/spring/stagger animations
- [ ] No frosted glass, `backdrop-blur`, or glassmorphism effects, including on hover
- [ ] No pure black text — always warm `ink-900`
- [ ] No decorative shapes, patterns, or blobs beyond the documented stone-coursing texture
- [ ] No circular avatars or thumbnails
- [ ] No icons without accompanying text labels
- [ ] No cool-toned gray falling through from Tailwind's default palette (e.g. bare `text-gray-400`) — every neutral used must resolve to a token defined in `@theme`
- [ ] Green is not used as a general brand/UI color — only as the single `success` token
- [ ] No hardcoded hex values in component files — everything traces back to `app/globals.css`
