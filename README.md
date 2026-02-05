# MANAV — Premium Personal Brand Portfolio

> **Built to stand out. Not to blend in.**

A cinematic, animation-rich personal brand portfolio featuring scroll-triggered effects, frosted-glass aesthetics, and a bold Majestic color palette. This is not a generic portfolio — it's a **domain of influence** engineered for maximum visual impact.

---

## 🎨 Brand Philosophy

- **Name**: MANAV (last name "Patil" is strictly excluded)
- **Mindset**: Builder & product-oriented — emphasizing functional systems and real-world outcomes over technical stack lists
- **Aesthetic**: Animation-rich, cinematic, layered premium feel with liquid glass surfaces and symbolic imagery
- **Direction**: Desktop-first development with mobile responsiveness addressed in later phases

---

## 🎭 The Majestic Color Palette

| Token               | HSL Value          | Hex       | Usage                          |
|---------------------|-------------------|-----------|--------------------------------|
| `--background`      | 285 55% 9%        | `#1E0B24` | Midnight Aubergine (main bg)   |
| `--foreground`      | 285 60% 94%       | `#F5E6FA` | Lavender Mist (text)           |
| `--primary`         | 45 100% 60%       | `#FFD233` | Luminous Gold (accents)        |
| `--plum-shadow`     | 285 45% 19%       | `#3E1A47` | Plum Shadow (surfaces/cards)   |
| `--vault-bg`        | 285 65% 4%        | `#0F0512` | Vault section (deeper depth)   |
| `--aubergine-light` | 285 45% 15%       | —         | Lighter aubergine variant      |

---

## 🔤 Typography

| Role      | Font Family                       | Usage                              |
|-----------|-----------------------------------|-----------------------------------|
| Display   | Playfair Display, Georgia, serif  | Headlines, brand name, titles     |
| Body      | Inter, system-ui, sans-serif      | Paragraphs, UI elements, labels   |

---

## 🏗️ Project Structure

```
├── .lovable/
│   └── plan.md                    # Development plan for The Vault section
│
├── public/                        # Static assets (responsive images)
│   ├── clarity-desktop.jpg        # Manifesto Row 2 - desktop
│   ├── clarity-mobile.jpeg        # Manifesto Row 2 - mobile
│   ├── crowd-desktop.jpg          # Manifesto Row 1 - desktop
│   ├── crowd-mobile.jpeg          # Manifesto Row 1 - mobile
│   ├── hero-desktop.jpg           # Hero section - desktop
│   ├── hero-mobile.jpg            # Hero section - mobile
│   ├── shrine-deaktop.jpeg        # Manifesto Row 3 - desktop (typo in filename)
│   ├── shrine-mobile.jpeg         # Manifesto Row 3 - mobile
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── hero-golden-figure.jpg # Additional hero asset
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── highlighter.tsx    # ★ Custom: scroll-triggered text annotations
│   │   │   ├── toast.tsx
│   │   │   └── ... (50+ UI primitives)
│   │   │
│   │   ├── GradualBlur.tsx        # Frosted blur effect for header
│   │   ├── Header.tsx             # Fixed header with brand name "MANAV"
│   │   ├── HeroSection.tsx        # Full-screen cinematic hero
│   │   ├── ManifestoSection.tsx   # Editorial zig-zag with 3 rows + X-strap
│   │   ├── NavLink.tsx            # Navigation link component
│   │   └── VaultSection.tsx       # Bento grid portfolio with hover effects
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile detection hook
│   │   └── use-toast.ts           # Toast notifications hook
│   │
│   ├── lib/
│   │   └── utils.ts               # Utility functions (cn, etc.)
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Main landing page
│   │   └── NotFound.tsx           # 404 page
│   │
│   ├── test/
│   │   ├── example.test.ts        # Example test file
│   │   └── setup.ts               # Test setup configuration
│   │
│   ├── App.css                    # Global app styles
│   ├── App.tsx                    # Root application component
│   ├── index.css                  # ★ Design system tokens (HSL colors)
│   ├── main.tsx                   # Application entry point
│   └── vite-env.d.ts              # Vite type definitions
│
├── components.json                # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # ★ Tailwind with Majestic palette
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── vitest.config.ts               # Vitest test configuration
```

---

## 🧩 Component Architecture

### 1. **Header** (`src/components/Header.tsx`)
- Fixed position with `z-50`
- Brand name "MANAV" in Playfair Display, uppercase, wide letter-spacing
- `GradualBlur` overlay creates frosted glass effect at top of viewport
- Navigation placeholder for future links

### 2. **HeroSection** (`src/components/HeroSection.tsx`)
- Full-screen (`h-screen`) cinematic layout
- Responsive background images:
  - Desktop: `/hero-desktop.jpg` (cover, anchored top-right)
  - Mobile: `/hero-mobile.jpg` (contain, centered)
- Gradient overlay from transparent to Midnight Aubergine
- Staggered tagline animation: "Built to stand out. / Not to blend in."
- Pulsing gold scroll indicator with bounce animation

### 3. **ManifestoSection** (`src/components/ManifestoSection.tsx`)
**X-Strap Separator:**
- Dual crossed marquee ribbons with rotating text
- Brand messaging: "DIGITAL IDENTITY ✦ VISUAL IMPACT ✦ ENGINEER ATTENTION"

**Three Editorial Rows (zig-zag pattern):**

| Row | Headline | Subtext Highlights | Image |
|-----|----------|-------------------|-------|
| 1 | "THE INTERNET IS **DEAF**." | "visibility is a myth" (underline gold) | crowd |
| 2 | "**CLARITY** IS THE ONLY LANGUAGE." | "undeniable force" (underline gold) | clarity |
| 3 | "I ENGINEER *OBSESSION*." | "domains of influence" (underline gold) | shrine |

**Technical Features:**
- Scroll-triggered opacity and parallax using `framer-motion`
- `Highlighter` component with `rough-notation` for hand-drawn annotations
- Gradient edge bleed on images (left or right depending on layout)
- **Sticky last row** for seamless handoff to Vault section
- Mobile: stacked layout with refined `py-12` padding and `gap-6`

### 4. **VaultSection** (`src/components/VaultSection.tsx`)
**The Portfolio Grid:**
- Darker background (`#0F0512`) for visual depth
- Asymmetrical Bento grid layout:
  - Desktop: 4-column grid with variable spans
  - Mobile: single-column square stack

| Project | Span     | Category          |
|---------|----------|-------------------|
| 001     | 2×2      | Web Architecture  |
| 002     | 2×1      | Brand Identity    |
| 003     | 1×1      | Digital Product   |
| 004     | 1×1      | Experience Design |

**Tile Features:**
- Frosted glass effect (`backdrop-blur-md`)
- 1px aubergine border (`#1E0B24`)
- Mouse-follow radial gradient glow (gold)
- Hover: 1.05× scale + gold box-shadow
- Staggered scroll-reveal with `useInView`

**Manifesto → Vault Transition:**
- Last Manifesto row pins via `sticky`
- Vault rises over with `-mt-[65vh]` (mobile) / `-mt-[85vh]` (desktop)
- Dynamic `borderTopRadius` animates from `0` to `80px` during overlap

### 5. **Highlighter** (`src/components/ui/highlighter.tsx`)
- Wraps text with `rough-notation` annotations
- Supports: highlight, underline, box, circle, strike-through, bracket
- Scroll-triggered via `useInView` (fires once, persists)
- Configurable: color, strokeWidth, duration, delay, multiline

### 6. **GradualBlur** (`src/components/GradualBlur.tsx`)
- Creates stacked blur layers for frosted glass effect
- Configurable: position, height, strength, divCount, exponential falloff

---

## ⚡ Animations & Interactions

| Animation | Location | Description |
|-----------|----------|-------------|
| `animate-scale-in` | Hero | Background image subtle zoom-in on load |
| `animate-fade-in-up` | Hero | Tagline staggered entrance |
| `animate-bounce-gentle` | Hero | Scroll indicator pulse |
| `animate-marquee-left/right` | X-Strap | Infinite horizontal scroll |
| `useScroll` + `useTransform` | Manifesto | Parallax images + opacity reveal |
| `useInView` | Vault | Staggered tile entrance |
| Mouse-follow glow | Vault tiles | Radial gradient follows cursor |
| Dynamic border-radius | Vault | Top corners round during overlap |

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables (HSL) |
| UI Components | shadcn/ui (50+ primitives) |
| Animations | Framer Motion 12 |
| Annotations | rough-notation |
| Routing | React Router DOM 6 |
| State | TanStack React Query |
| Testing | Vitest |

---

## 📦 Key Dependencies

```json
{
  "framer-motion": "^12.31.0",
  "rough-notation": "^0.5.1",
  "lucide-react": "^0.462.0",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0",
  "tailwindcss-animate": "^1.0.7",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

---

## 🚀 Development Progress

### Phase 1: Foundation ✅
- [x] Project setup with Vite + React + TypeScript
- [x] Tailwind CSS with custom Majestic color palette
- [x] Design system tokens in `index.css`
- [x] shadcn/ui component library integration

### Phase 2: Hero Section ✅
- [x] Full-screen cinematic layout
- [x] Responsive hero images (desktop/mobile)
- [x] Staggered tagline animation
- [x] Gradient overlay to background color
- [x] Scroll indicator with bounce animation

### Phase 3: Header ✅
- [x] Fixed header with brand name "MANAV"
- [x] GradualBlur frosted glass effect
- [x] Z-index layering for scroll behavior

### Phase 4: Manifesto Section ✅
- [x] X-Strap crossed marquee separator
- [x] Three editorial zig-zag rows
- [x] Scroll-triggered parallax images
- [x] Highlighter component with rough-notation
- [x] Text animations on scroll
- [x] Mobile-responsive stacked layout
- [x] Refined mobile spacing (py-12, gap-6)

### Phase 5: The Vault ✅
- [x] Bento grid layout (4-col desktop, 1-col mobile)
- [x] Frosted glass tiles with hover effects
- [x] Mouse-follow radial glow
- [x] Gold border glow on hover
- [x] Staggered scroll-reveal animation
- [x] Sticky handoff transition from Manifesto
- [x] Dynamic border-radius during overlap
- [x] Semantic design tokens (HSL variables)

### Phase 6: Polish & Refinement ✅
- [x] Mobile spacing optimization
- [x] Consistent use of design tokens
- [x] Scroll architecture preservation

### Upcoming
- [ ] Click-to-open project modals in Vault
- [ ] CTA section (Book a call / Email)
- [ ] Services section
- [ ] Contact form
- [ ] Page transitions
- [ ] SEO optimization
- [ ] Performance optimization

---

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

---

## 📐 Design Constraints

1. **Desktop-First**: Primary design target is screens >768px
2. **Scroll Architecture**: No `overflow-hidden` on html/body/#root to preserve scroll-linked animations
3. **Color System**: All colors MUST use HSL format via CSS variables
4. **Brand Consistency**: Only "MANAV" branding, never include last name

---

## 📄 License

Private project — All rights reserved.

---

<p align="center">
  <em>Engineered for obsession. Built to command attention.</em>
</p>
