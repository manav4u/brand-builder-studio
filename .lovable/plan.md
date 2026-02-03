

# Hero Section Implementation Plan

## Overview
A full-screen, cinematic hero section featuring your golden figure image with an overlay tagline. No navbar yet — pure impact on first load.

---

## Visual Design

### Background & Image
- **Full viewport hero** with the uploaded image as the centerpiece
- Image positioned to highlight the golden figure (center-focused)
- Slight **dark gradient overlay** from edges to ensure text readability without dimming the figure
- **Midnight Aubergine (#1E0B24)** as the fallback/bleed color

### Typography — The Tagline
- **"Built to stand out."** on one line
- **"Not to blend in."** on the second line
- **Lavender Mist (#F5E6FA)** text color for contrast against the purple tones
- Elegant serif or display font — refined, not aggressive
- Positioned in the **lower third** of the hero (above the scroll indicator), giving the image room to breathe

### Scroll Indicator
- Subtle **animated chevron or line** at the very bottom
- Fades or pulses gently to invite scrolling
- **Luminous Gold (#FFD233)** accent color for the indicator

---

## Animations & Polish

### On Load
- Image fades in with a subtle **scale-up effect** (cinematic entrance)
- Tagline lines fade in **sequentially** — first line, then second with slight delay
- Scroll indicator appears last with a gentle fade

### Micro-Interactions
- Scroll indicator has a **soft bounce/pulse animation**
- Optional: subtle **parallax** on the image as user scrolls (adds depth)

---

## Responsive Behavior

### Desktop
- Image fills the viewport with the golden figure centered
- Tagline positioned in the lower third, comfortably sized

### Mobile
- Image scales responsively, keeping the figure as the focus
- Tagline stacks naturally, font size adjusts for readability
- Scroll indicator remains visible and functional

---

## Technical Notes
- Hero image will be optimized for web performance
- CSS-based gradient overlay for the dimming effect
- Smooth scroll behavior enabled for seamless transition to next section

