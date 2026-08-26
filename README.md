# My Portfolio Project - Phase 1 Foundation

A production-quality, premium, developer portfolio and digital garden foundation styled like a modern SaaS startup (reminiscent of Apple, Stripe, Linear, Vercel). This codebase is built with modular CSS3, vanilla ES6 JavaScript modules, and self-hosted fonts.

This repository serves as **Phase 1: Foundation ONLY**. No project panels, hero sections, or content blocks are included.

---

## 📁 Scalable Directory Architecture

```
assets/
    backgrounds/     - Ambient graphics, gradients
    fonts/           - Self-hosted woff2 font files
        SpaceGrotesk/
        Inter/
        JetBrainsMono/
    icons/           - SVG system assets
    images/          - Media content
    logos/           - Branding variations
    particles/       - Custom particle coordinates
    profile/         - Avatar graphics
    projects/        - Case study images
    textures/        - Noise pattern textures
    videos/          - Background motion assets
css/
    variables.css    - Design system variables & self-hosted @font-face declarations
    reset.css        - Clean modern HTML reset rules
    base.css         - Typography defaults, selections, scrollbars, A11y motion overrides
    layout.css       - Section container and background engine rules
    navbar.css       - Header styling, toggle animations, mobile nav drawer details
    footer.css       - Footer layouts
    buttons.css      - Reusable button types, active, focused, and loading states
    cards.css        - Cards types (Glass, Primary, Feature, Hover, Border, Gradient)
    forms.css        - Elegant inputs, textarea, validation, focus states
    glass.css        - Glassmorphic panels, inner border overlays
    animations.css   - CSS floating blob behaviors, noise drift keyframes
    utilities.css    - Display flex/grid shorthand, badges, chips, tooltip overlays
    responsive.css   - Standard break targets from 360px up to 1920px+
js/
    main.js          - Bootstrap initialization coordinator
    navigation.js    - Scroll header hide/reveal triggers, focus trapping drawers
    theme.js         - Three-state theme manager (Auto, Dark, Light)
    animations.js    - Lenis scroll instance, GSAP setups, Canvas particle systems
    cursor.js        - Architectural cursor hooks placeholder
    helpers.js       - Performance debouncers, selectors
    storage.js       - Safe localStorage accessor layer
    dom.js           - DOM query caching
    events.js        - Custom event emitter/bus module
data/
    portfolio.js     - Export default portfolio placeholders
    projects.js      - Export default projects placeholders
    skills.js        - Export default skills placeholders
    experience.js    - Export default experience placeholders
    certificates.js  - Export default certificates placeholders
    startup.js       - Export default startup placeholders
    blog.js          - Export default blog placeholders
docs/                - Technical architecture manuals
config/
    theme.js         - Theme settings
    site.js          - Site metadata configuration
    animation.js     - Lenis settings, particle count configurations
index.html           - Application shell wrapper
```

---

## 🎨 Design System Tokens

### Font Pairings
- **Primary Headers**: Space Grotesk (400, 500, 700)
- **Secondary Body**: Inter (400, 500, 600, 700)
- **Technical Code**: JetBrains Mono (400, 500)

### Color Schemes

| Token | Dark Theme | Light Theme |
| :--- | :--- | :--- |
| **Primary Background** | `#05070B` (Navy base) | `#F8FAFC` |
| **Secondary Background** | `#0E1320` | `#F1F5F9` |
| **Surface Element** | `#111827` | `#FFFFFF` |
| **Primary Accent Color** | `#3B82F6` (Sky Blue) | `#2563EB` |
| **Secondary Accent Color** | `#7C3AED` (Violet Purple) | `#7C3AED` |
| **Borders** | `rgba(255, 255, 255, 0.08)` | `rgba(15, 23, 42, 0.08)` |
| **Text Primary** | `#FFFFFF` | `#0F172A` |
| **Text Secondary** | `#A8B2C7` | `#475569` |

---

## 🛠 Core Architectural Features

### 1. Three-State Theme Engine
- Supports `Auto` (System preferences sync), `Dark`, and `Light`.
- Preference persists automatically to `localStorage` key `portfolio-theme`.
- Switching dispatches custom events through the shared event bus, updating elements such as background particle styles in real-time.
- Implements class switching transition locking to guarantee seamless shifts without text flashes.

### 2. High-Performance Canvas Particle System
- Employs a single `2D Canvas` overlay with GPU-accelerated canvas updates.
- Limits updates to standard requestAnimationFrame intervals.
- Dynamically responds to theme switching, matching ambient particle glow styles on the fly.

### 3. Accessible Layout Controls
- Complete keyboard focus trapping in mobile navigation drawer drawers.
- Focus-visible outline styling for focus rings.
- Strict screen-reader accessibility via `aria-hidden` and `aria-expanded` toggle mappings.
- Support for `prefers-reduced-motion` to dynamically pause scrolling and particle speeds.
