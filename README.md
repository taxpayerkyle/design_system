# Accountable Design System

Lightweight, code-ready component library for Accountable v1 — **React + TypeScript**, styled with **CSS Modules** driven by **CSS-variable design tokens**. Mirrors the Figma "Tax-filing experience" foundations and the Accountable design spec.

## Getting started

```bash
npm install
npm run dev        # live gallery at http://localhost:5173
npm run typecheck  # tsc, no emit
npm run build      # type-check + production build
```

## Architecture

```
src/
  styles/
    tokens.css        # :root design tokens (color, space, radius, elevation, motion)
    typography.css    # role-based type classes (.text-heading-lg, .text-body-md, …)
    global.css        # reset + Material Symbols config
  lib/
    <Component>/       # one folder per component: .tsx + .module.css
    index.ts           # public API barrel
  gallery/             # live documentation / preview page
```

**Consuming the tokens** — import the three stylesheets once at your app root, then import components from `lib`:

```tsx
import "accountable-design-system/src/styles/tokens.css";
import "accountable-design-system/src/styles/typography.css";
import "accountable-design-system/src/styles/global.css";
import { Button, Card, LineItem } from "accountable-design-system/src/lib";
```

Everything reads from CSS variables — never hardcode a color, space, or radius. Override a token by redefining the variable on any scope.

## Components (v1 core kit)

| Component | Notes |
|-----------|-------|
| `Button` | primary / secondary / negative · lg / md / sm / xs · loading / disabled · glass bevel |
| `Card` + `LineItem` | compact / standard / large · flat or elevated · 49px financial rows |
| `TextInput` | label, helper, error, leading/trailing icon · focus / filled / error / disabled |
| `Checkbox` `Radio` `Toggle` | yellow-accent checkbox, filled radio, segmented toggle |
| `Banner` | neutral / success / error / warning · dismissible |
| `Pill` | status capsule with optional dot |
| `ListItem` | leading media, title/subtitle, trailing value or chevron |
| `IOSHeader` `AppHeader` `SectionLabel` `LockedFooter` | mobile navigation chrome |
| `Modal` `BottomSheet` | centered dialog + slide-up sheet, shared scrim |
| `Icon` | Material Symbols Rounded (the only icon set) |

## Design rules baked in

- **White background always**, near-black text, monochrome + semantic accents only. No blue.
- **Brand red is `#FE4F40`** — the single red across the system.
- **The 32px rhythm** — the gap between every major content block.
- **0.6px hairline borders** in `--color-border-card` everywhere.
- **Pill buttons**, two font weights (400 / 500) only.
- No dark mode.

See `references/` in the Accountable UI skill for the full token + component spec.
