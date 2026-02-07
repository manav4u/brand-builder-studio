

# Typography, Animation & Visual Polish Plan
## Strictly Following the Majestic Color Palette

---

## Official Color Palette (STRICT ADHERENCE)

| Token               | HSL Value          | Hex       | Usage                          |
|---------------------|-------------------|-----------|--------------------------------|
| `--background`      | 285 55% 9%        | `#1E0B24` | Midnight Aubergine (main bg)   |
| `--foreground`      | 285 60% 94%       | `#F5E6FA` | Lavender Mist (primary text)   |
| `--gold`            | 45 100% 60%       | `#FFD233` | Luminous Gold (accents)        |
| `--plum-shadow`     | 285 45% 19%       | `#3E1A47` | Plum Shadow (surfaces)         |
| `--vault-bg`        | 285 65% 4%        | `#0F0512` | Deep Vault (section depth)     |
| `--muted-foreground`| 285 30% 65%       | —         | Subtle text (body copy)        |

**Tailwind Classes (ONLY THESE for text):**
- `text-foreground` → Lavender Mist #F5E6FA (headlines, primary)
- `text-lavender` → Same as foreground (headlines)
- `text-gold` → Luminous Gold #FFD233 (accents, emphasis)
- `text-muted-foreground` → 65% Lavender (body, subtitles)

---

## Issues & Solutions

| Issue | Current State | Solution |
|-------|--------------|----------|
| No text line animations in Manifesto | Only container-level fade | Add staggered line reveals with blur-clear effect |
| Architect fade-in too fast | 0.7-0.9s duration | Increase to 1.2-1.5s for cinematic feel |
| Architect subtext too large/positioned wrong | Inline flow, large text | Smaller, left-aligned below headline with proper spacing |
| Colors not from palette | Some inconsistencies | Strict use of palette tokens only |
| X-strap looks 3D tilted | Uses `rotate-[6deg]` | Change to `skewY(3deg)` for flat X-axis angle |
| X-strap text not centered | Flex without proper centering | Add `h-full justify-center items-center` |

---

## 1. Brand Typography System

```text
BRAND TYPOGRAPHY HIERARCHY
══════════════════════════════════════════════════════════════

DISPLAY HEADLINES (Hero, Section Titles)
────────────────────────────────────────
Font:   EB Garamond (Primary) / Playfair Display (Fallback)
Weight: 700 (Bold)
Color:  text-foreground (#F5E6FA Lavender Mist)
Style:  Uppercase for impact, mixed case for elegance

ACCENT TEXT (Names, Keywords, CTAs)
────────────────────────────────────────
Font:   EB Garamond Italic (font-display italic)
Color:  text-gold (#FFD233 Luminous Gold)
Usage:  "Manav", "OBSESSION", "I" in marquee

BODY TEXT (Paragraphs, Descriptions)
────────────────────────────────────────
Font:   Inter (Primary) / Helvetica Neue (Fallback)
Weight: 400-500
Color:  text-muted-foreground (65% Lavender)

UI TEXT (Labels, Navigation, Small)
────────────────────────────────────────
Font:   Inter
Weight: 500-600
Color:  text-foreground or text-muted-foreground
Style:  Uppercase with tracking-widest for labels
```

---

## 2. X-Strap Fix (ManifestoSection)

**Problem:** Current `rotate-[6deg]` creates a 3D perspective effect.

**Solution:** Use `skewY` transform for flat X-axis angle only.

```text
Current (3D looking - WRONG):
┌───────────────────────────────────────────┐
│      ╱─────────────────────────╲          │  <- rotate causes perspective
└───────────────────────────────────────────┘

Fixed (Flat X pattern - CORRECT):
┌───────────────────────────────────────────┐
│     ═══════════════════════════           │  <- skewY: flat angle
│     ═══════════════════════════           │  <- -skewY: opposite angle
└───────────────────────────────────────────┘
```

**Code Changes:**
- Replace `-rotate-[6deg]` with `style={{ transform: "skewY(-3deg)" }}`
- Replace `rotate-[6deg]` with `style={{ transform: "skewY(3deg)" }}`
- Add `h-full flex items-center justify-center` for proper text centering

---

## 3. Manifesto Section Text Animations

**Current:** Only container-level opacity/translate  
**Enhanced:** Staggered line-by-line reveals with premium motion

```text
ANIMATION SEQUENCE (per row)
════════════════════════════════════════════
0.00s: Image begins scale reveal (1.08 → 1.0)
0.05s: Headline starts fade-up with blur clear
0.15s: Headline blur clears completely
0.20s: Body text begins staggered fade-up
0.40s: Highlighter animations trigger (existing)
```

**Technical Implementation:**
- Add `filter` transform for blur-clearing headline effect
- Use `useTransform` with staggered input ranges
- Extend animation duration from 0.2 → 0.35 range for premium pacing

**New Motion Values:**
```text
headlineBlur: [0, 0.25] → ["blur(8px)", "blur(0px)"]
opacity:      [0, 0.25] → [0, 1]
yHeadline:    [0, 0.25] → [60, 0]
yBody:        [0.1, 0.35] → [50, 0]
bodyOpacity:  [0.1, 0.35] → [0, 1]
```

---

## 4. Architect Section Refinements

### Animation Speed (Slower for Cinematic Feel)

```text
Element          Current    →    New (Slower)
─────────────────────────────────────────────
Headline "I'm"   0.8s           1.2s, delay 0.3s
"Manav" gold     0.9s           1.4s, delay 0.5s
Subheadline      0.7s           1.0s, delay 0.8s
```

### Subtext Positioning & Size

```text
BEFORE (Current - Wrong):
┌─────────────────────────────────────────┐
│ I'm Manav                               │
│ Student | 20 | Pune, India              │  <- Too large, too close
└─────────────────────────────────────────┘

AFTER (Fixed):
┌─────────────────────────────────────────┐
│ I'm Manav                               │
│                                         │
│ Student  ·  20  ·  Pune, India          │  <- Smaller, more spacing
└─────────────────────────────────────────┘
```

**Changes:**
- Font size: `text-lg md:text-xl lg:text-2xl` → `text-sm md:text-base lg:text-lg`
- Add `mt-4 md:mt-6` for proper spacing below headline
- Use `·` (middle dot) instead of `|` for refined separators
- Left-aligned (already correct)

### Strict Color Enforcement

```text
Element              Current              →    Fixed
──────────────────────────────────────────────────────
Headline "I'm"       text-foreground           ✓ Correct
"Manav"              text-gold italic          ✓ Correct
Subheadline          text-muted-foreground     ✓ Correct
Separators           text-gold/60              text-muted-foreground/50
Marquee "WHO AM"     text-foreground           ✓ Correct
Marquee "I"          text-gold italic          ✓ Correct
Marquee ✦            text-gold/60              text-muted-foreground/60
```

---

## Files to Modify

### `src/components/ManifestoSection.tsx`

**X-Strap Changes (lines 186-204):**
```text
- Remove: -rotate-[6deg] and rotate-[6deg] classes
- Add: style={{ transform: "skewY(-3deg)" }} and style={{ transform: "skewY(3deg)" }}
- Add: h-full flex items-center justify-center to inner flex container
```

**Text Animation Enhancements (lines 30-60):**
```text
- Add headlineBlur transform with useTransform
- Increase animation range from [0, 0.2] to [0, 0.25]
- Add filter: headlineBlur to headline motion.h2 style
- Stagger body animation to [0.1, 0.35] for offset
```

**Color Audit:**
- Line 49: `text-foreground` ✓
- Line 55: `text-muted-foreground` ✓
- Line 162: `text-gold` ✓
- Line 189: `text-gold/80` → Keep (palette compliant)
- Line 199: `text-foreground/70` → Keep (palette compliant)

---

### `src/components/ArchitectSection.tsx`

**Animation Timing (lines 100-139):**
```text
Headline h2:
- duration: 0.8 → 1.2
- delay: 0.2 → 0.3

"Manav" span:
- duration: 0.9 → 1.4
- delay: 0.4 → 0.5

Subheadline p:
- duration: 0.7 → 1.0
- delay: 0.5 → 0.8
```

**Subtext Refinement (lines 126-139):**
```text
- Change: text-lg md:text-xl lg:text-2xl
- To: text-sm md:text-base lg:text-lg

- Add: mt-4 md:mt-6 for spacing

- Change separators from | to ·
- Change: text-gold/60 mx-2
- To: text-muted-foreground/50 mx-3
```

**Marquee Color Fix (lines 40):**
```text
- Change: text-gold/60 
- To: text-muted-foreground/60
```

---

## Animation Philosophy

```text
WORLD-CLASS ANIMATION PRINCIPLES
════════════════════════════════════════════════════════════

1. DELIBERATE PACING
   Slower = more luxurious
   Target: 1.0-1.5s for major reveals
   Never rush premium moments

2. STAGGERED REVEALS
   Image → Headline → Body → Details
   200-400ms stagger between elements
   Creates depth and hierarchy

3. PREMIUM EASING
   easeOutExpo: [0.16, 1, 0.3, 1]
   Quick start, graceful settle
   Signature luxury motion curve

4. SUBTLE BLUR EFFECT
   blur(8px) → blur(0px) on headlines
   Creates focus-in effect
   Cinematic text reveals

5. SCROLL-LINKED MOTION
   All reveals tied to scroll position
   User controls the pace
   No jarring auto-plays
```

---

## Expected Outcome

After implementation:
- Manifesto headlines animate with premium blur-clearing reveals
- Body text follows with staggered fade-up motion
- X-strap creates clean flat X pattern (no 3D perspective)
- Architect animations feel slower, more cinematic (1.2-1.5s)
- Subtext is smaller, properly spaced, perfectly left-aligned
- All colors strictly follow the Majestic palette
- Overall feel: World-class, luxury brand portfolio

