

# The Architect Section - Implementation Plan

## Overview
A new section between Manifesto and Vault that introduces "who is this guy" - the person behind the brand. This section uses the same scroll-over animation established between Manifesto and Vault, maintaining visual continuity while shifting focus from manifesto to personal introduction.

---

## Visual Architecture

```text
SECTION FLOW (Scroll Direction: Down)
┌────────────────────────────────────┐
│          MANIFESTO ROW 3           │  <- Pins to viewport
│           (Sticky)                 │
├────────────────────────────────────┤
│      ↓ ARCHITECT slides over ↓     │  <- No rounded corners
├────────────────────────────────────┤
│   "WHO AM I?" Marquee Strip        │  <- Scroll velocity marquee
│   (I in gold italic)               │
├────────────────────────────────────┤
│                                    │
│     ARCHITECT IMAGE                │
│     (Full-width, cinematic)        │
│                                    │
│   ┌──────────────────────────┐     │
│   │ Dark gradient overlay    │     │
│   │ "I'm Manav" (headline)   │     │
│   │ Student | 20 | Pune      │     │
│   └──────────────────────────┘     │
│                                    │
├────────────────────────────────────┤
│   More details section             │  <- Future expansion
│   (placeholder for now)            │
└────────────────────────────────────┘
        ↓ VAULT slides over ↓         <- Rounded corners (existing)
```

---

## Files to Modify

### 1. Create `src/components/ArchitectSection.tsx`

**Component Structure:**
- Main container with `vault-bg` background (same dark depth as Vault)
- NO rounded corners (unlike Vault) - sharp edges for architectural feel
- Negative top margin to scroll over pinned Manifesto row
- Shadow on top edge for depth perception

**Marquee Strip ("WHO AM I?"):**
- Rectangular box with `plum-shadow` background
- Uses existing `animate-marquee-left` animation
- Text: "WHO AM " + "I" (gold italic, using font-display) + "?" repeated
- Full-width, approximately h-12 to h-14

**Architect Image Block:**
- Full-width container with aspect ratio ~16:9 or auto height
- Uses `public/architect.webp` as source
- Dark gradient overlay from bottom (60-70% coverage)
- Overlay contains:
  - Headline: "I'm Manav" - large, bold, font-display
  - Subheadline: "Student | 20 | Pune, India" - smaller, muted, font-body

**Details Placeholder:**
- Simple container for future content
- Minimal height for now

---

### 2. Modify `src/components/ManifestoSection.tsx`

**Changes Required:**
- The last row currently pins for the Vault transition
- Need to maintain this sticky behavior for the new Architect section
- The runway height stays the same (`h-[65vh] md:h-[85vh]`)
- Architect will use this runway to slide over

---

### 3. Create `src/components/ArchitectSection.tsx` with Vault Transition

**Scroll-Over Logic:**
- Uses same negative margin approach as current Vault: `-mt-[65vh] md:-mt-[85vh]`
- z-index: 20 (same layer as Vault for proper stacking)
- Top shadow: `shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`
- NO border-radius animation (stays sharp/square)

**Internal Runway for Vault:**
- At the bottom of Architect section, add a sticky wrapper for content
- Add scroll runway (`h-[65vh] md:h-[85vh]`) so Vault can slide over Architect

---

### 4. Modify `src/components/VaultSection.tsx`

**Changes Required:**
- Remove connection to Manifesto (Architect now handles the transition)
- Keep the rounded corner animation for sliding over Architect
- Adjust `useScroll` target/offset if needed for smooth transition timing

---

### 5. Update `src/pages/Index.tsx`

**New Section Order:**
```text
Header
HeroSection
ManifestoSection
ArchitectSection  <- NEW
VaultSection
(Future sections)
```

---

## Technical Implementation Details

### Marquee Animation
The existing `animate-marquee-left` keyframe in `tailwind.config.ts` works perfectly:
```text
"marquee-left": {
  "0%": { transform: "translateX(0%)" },
  "100%": { transform: "translateX(-50%)" }
}
```

Text structure for "WHO AM I?":
- "WHO AM " (lavender/foreground)
- "I" (gold, italic, font-display)
- "?" (lavender/foreground)
- Repeated 12+ times for seamless loop

### Overlay Gradient
```text
background: linear-gradient(
  to top,
  hsl(var(--vault-bg)) 0%,
  hsl(var(--vault-bg) / 0.8) 40%,
  transparent 100%
)
```

### Typography Hierarchy
- Headline "I'm Manav": `font-display font-bold text-4xl md:text-6xl text-foreground`
- Subheadline: `font-body text-lg md:text-xl text-muted-foreground tracking-wide`
- Separator: Use " | " with slight letter-spacing

### Z-Index Stack
```text
z-10: Pinned Manifesto row
z-20: Architect section (overlays Manifesto)
z-20: Vault section (overlays Architect)
```

---

## Color Palette Usage

| Element | Color Token | Hex Value |
|---------|-------------|-----------|
| Section Background | `--vault-bg` | #0F0512 |
| Marquee Strip BG | `--plum-shadow` | #3E1A47 |
| "I" in Marquee | `--gold` | #FFD233 |
| Headline Text | `--foreground` (lavender) | #F5E6FA |
| Subheadline | `--muted-foreground` | ~65% lavender |
| Overlay Gradient | `--vault-bg` with alpha | #0F0512 |

---

## Mobile Responsiveness

- Marquee strip: Same animation, slightly smaller height (`h-10` vs `h-14`)
- Image: Full width, auto height, maintains aspect ratio
- Text overlay: Adjusted padding (`px-5` vs `px-16`)
- Font sizes: Reduced for mobile (`text-3xl` vs `text-6xl` for headline)

---

## Scroll Behavior Summary

1. User scrolls through Manifesto rows 1 & 2 normally
2. Row 3 reaches top and **pins** (sticky behavior)
3. **Architect section** rises from below, covering row 3
4. Architect marquee and image come into view
5. User scrolls through Architect content
6. Architect content pins (sticky at bottom)
7. **Vault section** rises with rounded corners, covering Architect
8. Scroll continues into Vault grid

