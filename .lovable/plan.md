

# Animation Enhancement & Typography Refinement Plan

## Overview
Elevating the Manifesto and Architect sections with world-class animations, refined typography using Inter + Helvetica + Apple Garamond, slower marquee effects, adjusted overlay gradients, and increased headline sizing - all while maintaining harmony with existing Highlighter animations.

---

## Changes Summary

### 1. Typography System Update

**Files:** `index.html`, `tailwind.config.ts`

**New Font Stack:**
- **Display (Headlines):** Apple Garamond → Playfair Display fallback
- **Body (Text):** Inter → Helvetica Neue → system-ui

```text
Google Fonts Update:
- Add: EB Garamond (closest to Apple Garamond available on Google Fonts)
- Keep: Inter, Playfair Display

Font Family Config:
- font-display: ["EB Garamond", "Playfair Display", "Georgia", "serif"]
- font-body: ["Inter", "Helvetica Neue", "Helvetica", "system-ui", "sans-serif"]
```

---

### 2. Marquee Speed Reduction

**File:** `tailwind.config.ts`

Current speed: `15s` (too fast)
New speed: `30s` (slower, more elegant)

```text
Keyframe Updates:
- animate-marquee-left: 15s → 30s
- animate-marquee-right: 15s → 30s
```

This affects:
- X-Strap separator in ManifestoSection
- "WHO AM I?" marquee in ArchitectSection

---

### 3. Architect Section Enhancements

**File:** `src/components/ArchitectSection.tsx`

**Overlay Gradient Reduction (60-70% → 50-60%):**
```text
Current:
  hsl(var(--vault-bg)) 0%,
  hsl(var(--vault-bg) / 0.85) 25%,
  hsl(var(--vault-bg) / 0.4) 50%,
  transparent 100%

New:
  hsl(var(--vault-bg)) 0%,
  hsl(var(--vault-bg) / 0.7) 20%,
  hsl(var(--vault-bg) / 0.3) 45%,
  transparent 85%
```

**Headline Size Increase:**
```text
Current: text-4xl md:text-6xl lg:text-7xl
New: text-5xl md:text-7xl lg:text-8xl xl:text-9xl
```

**World-Class Animations:**

Image Animation:
- Scale reveal from 1.1 to 1.0 with opacity fade
- Subtle parallax maintained
- Smooth cubic-bezier easing

Text Animations (staggered):
- Headline: Fade up + slight blur clear effect
- Subheadline: Delayed fade up with tracking animation
- Character-by-character reveal for "Manav" using Framer Motion

```text
Animation Sequence (on scroll into view):
1. 0ms - Image scales in with opacity (1s duration)
2. 400ms - "I'm" fades up smoothly
3. 600ms - "Manav" reveals with gold glow pulse
4. 800ms - Subheadline fades up with subtle tracking expand
```

---

### 4. Manifesto Section Animation Enhancements

**File:** `src/components/ManifestoSection.tsx`

**Image Animations (coordinated with text, not conflicting with Highlighter):**

Current: Simple opacity + parallax
Enhanced:
- Scale from 1.05 → 1.0 during scroll reveal
- Mask reveal effect (image unveils from edge)
- Smooth parallax maintained

**Text Animations (compatible with Highlighter):**

The Highlighter already handles underline/highlight animations on specific words. We need to animate the TEXT CONTAINER, not individual words, so there's no conflict.

```text
Animation Strategy:
- Container-level animations (opacity, y-translate)
- Highlighter handles word-level decorations
- No interference between the two

Enhanced Text Animation:
- Headline: Fade up with slight overshoot easing
- Subtext: Staggered fade up (200ms delay after headline)
- Smooth cubic-bezier curve for premium feel
```

**Keyframe Updates for Premium Motion:**

```text
New Easing Curves:
- "ease-out-expo": cubic-bezier(0.16, 1, 0.3, 1)
- "ease-out-quart": cubic-bezier(0.25, 1, 0.5, 1)

New Keyframes:
- "reveal-up": translateY(40px) + opacity(0) → translateY(0) + opacity(1)
- "scale-reveal": scale(1.08) + opacity(0) → scale(1) + opacity(1)
- "blur-in": blur(8px) + opacity(0) → blur(0) + opacity(1)
```

---

### 5. Framer Motion Integration

Both sections already import Framer Motion. We'll enhance the motion values:

**ManifestoRow Enhanced Transforms:**
```text
Current:
- opacity: [0, 0.15] → [0, 1]
- yHeadline: [0, 0.15] → [24, 0]
- yBody: [0, 0.15] → [32, 0]

Enhanced:
- opacity: smoother curve with [0, 0.2] → [0, 1]
- yHeadline: [0, 0.2] → [50, 0] (more dramatic)
- yBody: [0.05, 0.25] → [60, 0] (staggered start)
- imageScale: [0, 0.3] → [1.08, 1] (scale reveal)
- imageOpacity: [0, 0.25] → [0, 1]
```

**ArchitectSection Enhanced Animations:**
```text
Image Block:
- initial: { scale: 1.15, opacity: 0 }
- animate: { scale: 1, opacity: 1 }
- transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }

Headline "I'm Manav":
- initial: { opacity: 0, y: 60, filter: "blur(10px)" }
- animate: { opacity: 1, y: 0, filter: "blur(0px)" }
- transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }

"Manav" Gold Text:
- Additional subtle glow pulse on reveal

Subheadline:
- initial: { opacity: 0, y: 40, letterSpacing: "0.05em" }
- animate: { opacity: 1, y: 0, letterSpacing: "0.1em" }
- transition: { duration: 0.7, delay: 0.5, ease: "easeOut" }
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add EB Garamond font import |
| `tailwind.config.ts` | Update font families, slow marquee, add new keyframes/easings |
| `src/components/ArchitectSection.tsx` | Reduce overlay, increase headline, add premium animations |
| `src/components/ManifestoSection.tsx` | Add image scale reveal, enhance text motion curves |

---

## Animation Philosophy

The animations follow these principles to match the brand identity:

1. **Deliberate Pacing** - Slower, more intentional reveals that demand attention
2. **Layered Motion** - Image first, then headline, then body text
3. **Smooth Easing** - Exponential ease-out for luxury feel
4. **Subtle Scale** - Micro-animations that add depth without distraction
5. **Scroll-Linked** - All reveals tied to scroll position for control

---

## Technical Notes

- All animations use `useTransform` from Framer Motion for scroll-linked effects
- Highlighter component remains untouched - it handles its own scroll-triggered decoration
- Container animations won't conflict with inline Highlighter effects
- Mobile receives same animations with adjusted values for performance
- GPU-accelerated properties (transform, opacity, filter) used for smooth 60fps

