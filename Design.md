# Design System — Ssenkoma Eric Blessings Portfolio

**Type:** Static React SPA (no backend, no CMS, no API calls)
**Layout:** Multi-page (React Router) — Home / About / Projects / Contact
**Mood:** Light, clean, professional — with a neon purple signature accent
**Motion:** Rich — scroll-triggered reveals, parallax, micro-interactions

---

## 1. Brand Concept

Eric is an entry-level full-stack developer (React on the frontend, Express.js
and Spring Boot on the backend). The design should read as **credible and
polished, not flashy** — a light, professional canvas that lets one strong
accent color (neon purple) do the "wow" work through motion rather than
color noise. Think: a clean SaaS product page that happens to be a resume.

Design pillars:
- **Clarity first** — generous white space, strong hierarchy, one accent color
- **Confidence, not chaos** — animation used to guide attention, never to distract
- **Full-stack duality** — subtle visual motifs that nod to "frontend polish +
  backend structure" (e.g. terminal-style tags for backend stack, grid/card
  layouts for structured data like projects & skills)

---

## 2. Color System

Light theme as the base; neon purple is the *only* saturated color in the
palette so it stays special.

### 2.1 Core palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FAFAFC` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, nav, panels |
| `--color-surface-alt` | `#F2F1F8` | Section alternation, subtle panels |
| `--color-border` | `#E6E4F0` | Hairlines, card borders |
| `--color-text-primary` | `#15121F` | Headings, body copy |
| `--color-text-secondary` | `#5B5770` | Supporting text, captions |
| `--color-text-muted` | `#8B87A0` | Placeholders, meta info |

### 2.2 Signature accent — Neon Purple

| Token | Hex | Usage |
|---|---|---|
| `--color-accent` | `#8B2FF0` | Primary accent — CTAs, links, active states |
| `--color-accent-bright` | `#B24BFF` | Glow/hover state, gradient end |
| `--color-accent-deep` | `#5E17B8` | Pressed state, gradient start |
| `--color-accent-tint-10` | `#8B2FF01A` | Chip/badge backgrounds |
| `--color-accent-tint-06` | `#8B2FF00F` | Hover backgrounds on light cards |

**Signature effect:** a soft neon glow (`box-shadow: 0 0 24px var(--color-accent-tint-10), 0 0 48px #8B2FF014`)
used sparingly on primary buttons, the active nav pill, and hero highlight
text — this is what gives a *light* UI a "neon" feel without going dark-mode.

### 2.3 Semantic colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#1FAA6E` | Success states, "available for work" badge |
| `--color-warning` | `#D98A1F` | Warnings (rare) |
| `--color-error` | `#E14B5A` | Form validation errors |

### 2.4 Gradients (used sparingly — hero blob, section dividers, skill bars)

```css
--gradient-accent: linear-gradient(135deg, #8B2FF0 0%, #B24BFF 50%, #6F2FE0 100%);
--gradient-mesh-bg: radial-gradient(circle at 20% 20%, #8B2FF01A, transparent 40%),
                     radial-gradient(circle at 80% 70%, #B24BFF14, transparent 45%);
```

Dark mode is **out of scope for v1**, but tokens above are named so a
`data-theme="dark"` override could be added later without refactoring.

---

## 3. Typography

Two-font pairing: a distinct, slightly technical display font for headings,
and a highly legible workhorse for body copy.

| Role | Font | Fallback stack |
|---|---|---|
| Headings / display | **"Space Grotesk"** | `system-ui, -apple-system, sans-serif` |
| Body / UI | **"Inter"** | `system-ui, -apple-system, sans-serif` |
| Code / tech tags | **"JetBrains Mono"** | `ui-monospace, "SFMono-Regular", monospace` |

Load via `@fontsource` packages (no backend/CDN dependency) or self-hosted
`.woff2` in `src/assets/fonts`.

### Type scale (fluid, `clamp()`-based)

| Token | Size (clamp) | Weight | Line-height | Usage |
|---|---|---|---|---|
| `--font-display-xl` | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` | 600 | 1.05 | Hero name/headline |
| `--font-display-lg` | `clamp(2rem, 3vw + 1rem, 3rem)` | 600 | 1.1 | Section titles |
| `--font-display-md` | `clamp(1.5rem, 2vw + 1rem, 2rem)` | 600 | 1.2 | Card/project titles |
| `--font-body-lg` | `1.125rem` | 400 | 1.6 | Lead paragraphs |
| `--font-body-md` | `1rem` | 400 | 1.6 | Standard body |
| `--font-body-sm` | `0.875rem` | 400 | 1.5 | Captions, meta |
| `--font-mono-sm` | `0.8125rem` | 500 | 1.4 | Tech-stack tags, code snippets |

Rules:
- Headings use `Space Grotesk`, tracking `-0.02em`.
- Never more than 2 weights per screen (600 for emphasis, 400 for body).
- Tech/stack labels (React, Express.js, Spring Boot, etc.) always render in
  `JetBrains Mono` inside a pill — this is a recurring signature detail.

---

## 4. Layout & Spacing

- **Grid:** 12-column, max content width `1200px`, gutter `24px` (`16px` on mobile)
- **Spacing scale (8pt system):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` (px) → tokens `--space-1` … `--space-10`
- **Section rhythm:** every page section gets `padding-block: clamp(64px, 8vw, 128px)`
- **Radii:** `--radius-sm: 8px` (chips), `--radius-md: 16px` (cards), `--radius-lg: 28px` (hero panels/images)
- **Elevation:** flat by default; on hover, cards lift with `translateY(-4px)` + soft shadow + accent glow — never a heavy drop shadow at rest (keeps it "light and clean")

### Breakpoints

| Name | Width |
|---|---|
| `sm` | 480px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

---

## 5. Core Components (style guide)

- **Navbar:** sticky, translucent white (`backdrop-filter: blur(12px)`), active
  route indicated by a small neon-purple underline/pill that slides between
  links (shared-layout animation).
- **Buttons:**
  - Primary: solid `--gradient-accent` fill, white text, neon glow on hover, `radius-sm`
  - Secondary: outline `1px solid var(--color-border)`, fills with `--color-accent-tint-06` on hover
- **Tech tag / pill:** mono font, `--color-accent-tint-10` background, `--color-accent-deep` text, used for every stack badge (React, Express.js, Spring Boot, Java, etc.)
- **Project card:** white surface, `radius-md`, thumbnail with subtle zoom-on-hover (`scale(1.04)`), tag row in mono pills, "View Project" link with arrow that slides right on hover
- **Skill bar / meter:** thin track (`--color-surface-alt`) filled with `--gradient-accent`, animates width from 0 on scroll-into-view
- **Section heading:** small mono eyebrow label in `--color-accent` (e.g. `// 02. Projects`) above the display heading — reinforces the dev identity without relying on a dark theme

---

## 6. Motion System (Rich)

Motion library: **Framer Motion** (React-native, no backend). Respect
`prefers-reduced-motion` everywhere — provide a static fallback for every
animation described below.

### 6.1 Page transitions
- Route changes cross-fade + slight vertical slide (`opacity 0→1`, `y: 16→0`, `240ms ease-out`) using `AnimatePresence`.

### 6.2 Scroll-triggered reveals
- Sections and cards animate in on `whileInView` (`opacity 0→1`, `y: 24→0`, staggered `60–80ms` per child) — using `viewport={{ once: true, amount: 0.2 }}`.
- Skill bars and stat counters animate their fill/number only once, on first entry into view.

### 6.3 Parallax
- Hero background mesh-gradient blob moves at a slower scroll speed than foreground content (`useScroll` + `useTransform` from Framer Motion) for depth.
- Subtle parallax (max 20–30px shift) on decorative shapes in About/Projects sections — kept light so it stays "professional," not gimmicky.

### 6.4 Micro-interactions
- Buttons: scale `1 → 1.02` + glow intensifies on hover; `0.97` on tap (springy, `stiffness: 300`)
- Nav link underline: shared-layout `layoutId` animation sliding between active items
- Project cards: image zoom + border color shift to `--color-accent` on hover
- Cursor-follow subtle glow blob in the hero (optional, desktop only, disabled on touch)
- Form inputs: label floats up, border transitions to accent on focus, success/error states animate in with a small icon pop

### 6.5 Timing & easing tokens

```css
--ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 150ms;
--duration-base: 240ms;
--duration-slow: 500ms;
```

---

## 7. Iconography & Imagery

- Icons: `lucide-react` (consistent stroke-based icon set, matches clean/light aesthetic)
- Tech logos: simple monochrome or brand-colored SVGs for stack badges, stored locally (no external CDN — keeps site fully static)
- Photography/illustration: prefer a soft mesh-gradient/blob decoration over stock imagery; if a headshot is used, treat it with a subtle neon-purple glow ring rather than a hard border

---

## 8. Accessibility

- Minimum contrast: body text `#15121F` on `#FAFAFC` = AAA; ensure accent-on-white text usage stays ≥ 4.5:1 (use `--color-accent-deep` for small text, reserve bright accent for large text/backgrounds)
- All interactive elements have visible focus rings (`2px solid var(--color-accent)` with `2px` offset)
- Respect `prefers-reduced-motion: reduce` — disable parallax, shorten/skip reveal transitions, keep simple opacity fades only
- Semantic HTML landmarks (`nav`, `main`, `section`, `footer`) on every page

---

## 9. Project Folder Structure (feature-based, for scalability)

```
portfolio/
├── public/
│   └── favicon, static og-image, resume.pdf
├── src/
│   ├── app/
│   │   ├── App.jsx                # Router + layout shell
│   │   ├── routes.jsx             # Route definitions
│   │   └── AppProviders.jsx       # Theme/context providers
│   │
│   ├── features/
│   │   ├── home/
│   │   │   ├── components/        # Hero, IntroHighlights, CTASection
│   │   │   ├── Home.jsx
│   │   │   └── home.module.css
│   │   │
│   │   ├── about/
│   │   │   ├── components/        # BioSection, EducationTimeline, SkillsGrid
│   │   │   ├── About.jsx
│   │   │   └── about.module.css
│   │   │
│   │   ├── projects/
│   │   │   ├── components/        # ProjectCard, ProjectFilterBar, TechTag
│   │   │   ├── data/
│   │   │   │   └── projects.js    # Static project data (no backend)
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   └── projects.module.css
│   │   │
│   │   └── contact/
│   │       ├── components/        # ContactForm, SocialLinks
│   │       ├── Contact.jsx
│   │       └── contact.module.css
│   │
│   ├── components/                # Shared/dumb UI components
│   │   ├── layout/                # Navbar, Footer, PageWrapper
│   │   ├── ui/                    # Button, Card, Badge, Input, SectionHeading
│   │   └── motion/                # RevealOnScroll, ParallaxLayer, PageTransition
│   │
│   ├── hooks/                     # useScrollProgress, useReducedMotion, useActiveRoute
│   ├── styles/
│   │   ├── tokens.css             # CSS custom properties (color/type/space)
│   │   ├── global.css             # Resets, base typography
│   │   └── animations.css         # Keyframes, easing/duration tokens
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── utils/                     # formatDate, classNames helper, etc.
│   └── main.jsx
│
├── Design.md
└── package.json
```

**Rationale:** each route/page is a self-contained "feature" owning its own
components and styles (scales cleanly as pages grow), while `components/`,
`hooks/`, `styles/`, and `utils/` hold everything reusable across features —
a standard, scalable pattern for a static React app with no backend.

---

## 10. Tech Stack Notes

- **Styling:** CSS Modules (co-located per feature) + a global `tokens.css` design-token layer — no CSS-in-JS runtime needed for a static site
- **Animation:** Framer Motion
- **Routing:** React Router v6
- **Icons:** lucide-react
- **Fonts:** self-hosted via `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono`
- **Data:** all content (projects, skills, experience) lives in static JS/JSON files under each feature's `data/` folder — no API calls, fully static-hostable (Vercel/Netlify/GitHub Pages)
