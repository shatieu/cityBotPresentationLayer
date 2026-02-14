# Znojmo City Hub — Visual Identity Guidelines

This document is the definitive reference for all visual decisions across the platform. Every component, page, and asset must conform to these rules. When in doubt, refer back here — not to personal taste, not to trends.

---

## 1. Design Philosophy

**Modern city guide, not a tech product.** The platform should feel like a well-designed travel companion that happens to know everything about Znojmo. It's confident, warm, and grounded — rooted in a real place with real sandstone, vineyards, and autumn light.

**Content is the interface.** Menus, showtimes, tasting schedules — the data IS the product. Every design decision serves readability and scannability. If a visual element doesn't help the user find or understand information faster, remove it.

**Never look AI-generated.** No oversized rounded corners. No generic gradient blobs. No CSS-only placeholder icons. No frosted glass cards. No floating orbs. If a design element could appear in a "made with AI" starter template, it doesn't belong here.

---

## 2. Color Palette

### Primary: Moss Green

A saturated, natural moss green — alive and warm, not muted or grayish. Think forest floor in afternoon light, not military surplus.

| Token | Hex | Usage |
|-------|-----|-------|
| `green-900` | `#2D3A1E` | Primary text on light backgrounds (headings, emphasis) |
| `green-700` | `#4A6B2A` | Primary buttons, active nav, links |
| `green-500` | `#5E8A35` | Hover states, secondary emphasis |
| `green-300` | `#A3C47D` | Tags, badges, light accents |
| `green-100` | `#E4EDDA` | Subtle backgrounds, selected states |
| `green-50` | `#F2F6EE` | Tinted card backgrounds |

### Accent: Golden Amber

Warm honey-gold — like late September light on Znojmo's vineyards. Used sparingly for emphasis and calls to action.

| Token | Hex | Usage |
|-------|-----|-------|
| `amber-700` | `#B8860B` | High-emphasis CTAs, price highlights |
| `amber-500` | `#D4A024` | Secondary buttons, active indicators |
| `amber-300` | `#E8C965` | Badges, rating stars, warm highlights |
| `amber-100` | `#FDF4DC` | Warm background tints, alert backgrounds |

### Neutrals: Warm Gray

Every neutral has a warm undertone. No blue-grays, no cool grays, ever.

| Token | Hex | Usage |
|-------|-----|-------|
| `gray-900` | `#2C2A26` | Body text, primary content |
| `gray-700` | `#5C5850` | Secondary text, captions |
| `gray-500` | `#8A857C` | Placeholder text, disabled states |
| `gray-300` | `#C4BFB6` | Borders (rare), dividers |
| `gray-100` | `#EDEAE5` | Card backgrounds, alternating rows |
| `surface` | `#F5F3EF` | Page background |
| `white` | `#FEFEFE` | Card surfaces, inputs |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#5E8A35` | Reuse green-500 — "open now", verified |
| `warning` | `#D4A024` | Reuse amber-500 — "closing soon", stale data |
| `error` | `#C4513A` | Warm terracotta red — errors, closed, expired. Never cold red. |
| `info` | `#5E8A35` | Reuse green-500 at lower opacity |

### Absolute Prohibitions

- **No violet, purple, or magenta** — ever, in any context
- **No blue** — not in links, not in info states, not in shadows
- **No dark backgrounds** — no dark mode, no dark hero sections, no dark nav
- **No bleached/desaturated pastels** — colors must feel alive, not washed out
- **No pure black** (`#000000`) — always use `gray-900` (`#2C2A26`)
- **No cool-toned grays** — every gray carries warmth

---

## 3. Typography

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

- **Headings are always `green-900`** unless on a green background
- **Body text is always `gray-900`** for primary, `gray-700` for secondary
- **Prices always use JetBrains Mono** — "149 Kč" should feel precise, not decorative
- **No uppercase text** except single-word labels (e.g. "POLÉVKA" as a menu category tag)
- **No letter-spacing adjustments** — let the fonts breathe naturally
- **Czech diacritics must render correctly** — test with: ř, ž, č, ň, ď, ť, ů, ú, ě, š

---

## 4. Spacing & Layout

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

**Maximum radius anywhere in the UI: 4px.** No exceptions.

### Cards

- Background: `white` (`#FEFEFE`)
- Shadow: `0 1px 3px rgba(44, 42, 38, 0.08), 0 1px 2px rgba(44, 42, 38, 0.04)`
- Hover shadow: `0 4px 12px rgba(44, 42, 38, 0.10), 0 2px 4px rgba(44, 42, 38, 0.06)`
- Border: none by default. If needed for grouping: `1px solid #EDEAE5` (`gray-100`)
- Padding: `space-4` (16px)
- Transition: `box-shadow 150ms ease`

### Buttons

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `green-700` | `white` | none |
| Primary hover | `green-500` | `white` | none |
| Secondary | `transparent` | `green-700` | `1px solid green-700` |
| Secondary hover | `green-50` | `green-700` | `1px solid green-700` |
| Accent (CTA) | `amber-700` | `white` | none |
| Accent hover | `amber-500` | `white` | none |

- Height: `40px` standard, `36px` compact, `48px` large
- Padding: `0 16px`
- Font: Outfit 500, `body-md` size
- No icons-only buttons without a visible text label (accessibility)

### Trust Badge

The TrustBadge component is a small inline element showing data provenance:

| Trust Tier | Visual |
|------------|--------|
| Owner | Small `green-700` dot + "Ověřeno majitelem" tooltip |
| Human-verified | Small `green-300` dot + "Ověřeno redaktorem" tooltip |
| AI-verified | Small `amber-300` dot + "Automaticky ověřeno" tooltip |
| Auto-scraped | Small `gray-300` dot + "Automaticky staženo" tooltip |

Always accompanied by the source name and date in `body-sm` gray-700 text.

### Navigation

- Position: sticky top
- Background: `white` with bottom shadow (`0 1px 2px rgba(44, 42, 38, 0.06)`)
- Height: `56px` mobile, `64px` desktop
- Active link: `green-700` text with `2px` bottom border in `green-700`
- Inactive link: `gray-700` text
- Mobile: hamburger menu, slide-in from right, `surface` background

---

## 6. Imagery

### Photography Rules

- **Real Znojmo photos only.** No stock photography. No AI-generated images. No generic food/wine/city imagery.
- If a real photo isn't available for a place, show **no image** — use a clean placeholder with the place's initial letter in `green-100` background with `green-700` text. Never use a generic fallback image.
- Photos should feel documentary, not commercial — natural light, real settings, actual food on actual plates.
- Aspect ratio for cards: `16:10` (landscape). Crop consistently.
- Aspect ratio for place page hero: `21:9` (cinematic wide). Full-bleed within content width.

### Icons

- **Icon set: Lucide React** — consistent, clean, line-based
- Icon size: `20px` standard, `16px` compact, `24px` emphasis
- Icon color: inherits text color of the surrounding context
- **Never use icons as primary navigation** — always pair with a text label
- **Never use CSS-drawn icons or emoji as icons**

### No Decorative Elements

- No background patterns
- No gradient overlays on images
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

### Skeleton Loading

When data is loading, show skeleton placeholders that match the exact shape of the content they replace:
- Background: `gray-100`
- Pulse animation: alternate between `gray-100` and `surface`
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

## 9. Accessibility Minimums

- All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- `green-700` on `white` = 5.2:1 ✓
- `gray-900` on `surface` = 9.8:1 ✓
- `amber-700` on `white` = 4.6:1 ✓ (use only for large text/buttons)
- All images have descriptive `alt` text in Czech
- All interactive elements are keyboard-focusable
- Focus ring: `2px solid green-500`, `2px` offset

---

## 10. Anti-Patterns Checklist

Before shipping any page or component, verify none of these are present:

- [ ] No rounded corners above 4px anywhere
- [ ] No blue, violet, or purple in any element
- [ ] No dark backgrounds (entire page is light)
- [ ] No stock photos or AI-generated images
- [ ] No CSS-only icons (use Lucide React or nothing)
- [ ] No gradient backgrounds on sections or cards
- [ ] No bounce/spring/stagger animations
- [ ] No frosted glass or glassmorphism effects
- [ ] No pure black text — always warm `gray-900`
- [ ] No decorative shapes, patterns, or blobs
- [ ] No circular avatars or thumbnails
- [ ] No icons without accompanying text labels
