
# The Vault - Portfolio Section

## Overview
Build a premium "Vault" portfolio section with an asymmetrical Bento grid layout, frosted-glass tiles, mouse-follow glow effects, and staggered scroll-reveal animations.

---

## Visual Architecture

```text
DESKTOP (4-Column Bento Grid)
┌─────────────────┬─────────────┐
│                 │             │
│   PROJECT 1     │  PROJECT 2  │
│   (2x2 span)    │  (2x1 span) │
│                 ├──────┬──────┤
│                 │  P3  │  P4  │
└─────────────────┴──────┴──────┘

MOBILE (Single Column Stack)
┌─────────────────┐
│   PROJECT 1     │
│   (square)      │
├─────────────────┤
│   PROJECT 2     │
├─────────────────┤
│   PROJECT 3     │
├─────────────────┤
│   PROJECT 4     │
└─────────────────┘
```

---

## Files to Create/Modify

### 1. Create `src/components/VaultSection.tsx`

**Component Structure:**
- `VaultSection` - Main container with darker background (`#0F0512`)
- `VaultTile` - Individual project card with all interactive effects

**Data Structure:**
```text
projects = [
  { id: "001", title: "PROJECT NAME", category: "Web Architecture", span: "large" },
  { id: "002", title: "PROJECT NAME", category: "Brand Identity", span: "wide" },
  { id: "003", title: "PROJECT NAME", category: "Digital Product", span: "small" },
  { id: "004", title: "PROJECT NAME", category: "Experience Design", span: "small" }
]
```

**Tile Features:**
- Frosted glass effect using `backdrop-blur-md` over dark placeholder
- 1px border with `#1E0B24` color
- Gold glow on hover (`box-shadow` with `#FFD233`)
- Image scale-up on hover (`scale-105`) with reduced blur
- Mouse-follow radial gradient glow (tracked via `onMouseMove`)

**Typography:**
- Title: Bottom-left, Inter font, uppercase, `tracking-[0.1em]`
- Category: Top-right, small muted text
- Serial Number: Bottom-right, gold color, small font

---

### 2. Update `src/index.css`

Add new CSS variable for the darker vault background:
```text
--vault-bg: 285 65% 4%; /* #0F0512 */
```

---

### 3. Update `src/pages/Index.tsx`

Import and add `VaultSection` component after `ManifestoSection`.

---

## Technical Implementation Details

### Bento Grid Layout (Desktop)
```text
grid-template-columns: repeat(4, 1fr)
grid-template-rows: repeat(2, minmax(300px, 1fr))

Project 1: grid-column: span 2, grid-row: span 2
Project 2: grid-column: span 2, grid-row: span 1
Project 3: grid-column: span 1, grid-row: span 1
Project 4: grid-column: span 1, grid-row: span 1
```

### Mouse-Follow Glow Effect
- Track mouse position within tile using `onMouseMove`
- Store position in local state `{ x, y }`
- Apply radial gradient at cursor position:
  ```text
  background: radial-gradient(
    circle 200px at ${x}px ${y}px,
    rgba(255, 210, 51, 0.15),
    transparent
  )
  ```
- Only visible on hover (opacity transition)

### Hover State Transitions
- Border glow: `box-shadow: 0 0 20px rgba(255, 210, 51, 0.4)`
- Image scale: `transform: scale(1.05)`
- Blur reduction: `backdrop-blur-sm` (from `backdrop-blur-md`)
- Transition duration: `300ms ease-out`

### Scroll Animation (Framer Motion)
- Use `useInView` hook to trigger entrance
- Staggered delay: Each tile gets `index * 0.15s` delay
- Animation: Float up from bottom (`y: 50 -> 0`, `opacity: 0 -> 1`)
- Duration: `0.6s` with `easeOut`

### Mobile Responsiveness
- Switch to single column: `grid-cols-1`
- All tiles become square: `aspect-square`
- Maintain all hover effects for touch devices
- Reduce padding for compact view

---

## Placeholder Content
Since no actual project images are provided yet, tiles will use:
- Dark gradient placeholder backgrounds
- Category tags as specified
- Sequential numbering (001-004)

---

## Brand Consistency
- Background: `#0F0512` (darker than manifesto for depth)
- Border: `#1E0B24` (aubergine)
- Glow accent: `#FFD233` (luminous gold)
- Text: Lavender Mist for titles, muted for categories
- Fonts: Inter (body) for all tile typography
