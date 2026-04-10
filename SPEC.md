# Music Presentation Website

## Concept & Vision
An immersive, visually stunning music presentation website that feels like stepping into a vinyl record store. The experience centers around a spinning vinyl record that serves as a visual anchor, with sections that reveal music with theatrical flair. Each section showcases YouTube videos within a glass-morphic interface, creating depth and sophistication.

## Design Language

### Aesthetic Direction
Dark, moody atmosphere with glassmorphic surfaces floating over subtle animated gradients. Inspired by late-night listening sessions and high-end audio equipment aesthetics.

### Color Palette
- **Primary**: `#6366f1` (Indigo-500)
- **Secondary**: `#8b5cf6` (Violet-500)
- **Accent**: `#f472b6` (Pink-400)
- **Background**: `#0f0f1a` (Near-black with blue undertone)
- **Surface**: `rgba(255, 255, 255, 0.05)` (Glass surfaces)
- **Text Primary**: `#f8fafc` (Slate-50)
- **Text Secondary**: `#94a3b8` (Slate-400)

### Typography
- **Headings**: "Instrument Serif", Georgia, serif — elegant, editorial
- **Body**: "Inter", system-ui, sans-serif — clean, readable
- **Accent Text**: "JetBrains Mono", monospace — for timestamps/metadata

### Motion Philosophy
- **Vinyl**: Continuous rotation (20s per revolution), accelerates on hover, stops on video play
- **Section reveals**: Staggered fade-up on scroll (Intersection Observer), 400ms ease-out
- **Glass surfaces**: Subtle parallax tilt following cursor (max 5deg)
- **Video thumbnails**: Scale 1.02 on hover with glow intensification
- **Page load**: Hero vinyl spins in from scale 0 with bounce easing

### Visual Assets
- Lucide React icons
- Custom SVG vinyl record with realistic grooves
- Gradient mesh background (animated)
- Noise texture overlay for analog feel

## Layout & Structure

### Hero Section
- Full viewport height
- Centered animated vinyl record (300px diameter)
- Artist/album title overlay with glass effect
- Scroll indicator at bottom

### Music Sections
Each section contains:
1. **Section Header**: Title image (optional), section title, description
2. **Video Grid**: 1-3 YouTube embeds in glass cards
3. **Visual separator**: Gradient line or vinyl fragment

### Footer
- Minimal: social links, copyright
- Same glass treatment

## Features & Interactions

### Vinyl Record Component
- **Default**: Slow rotation (20s/rev), subtle shadow
- **Hover**: Rotation speeds up (5s/rev), lifts slightly
- **Playing**: Stops rotation, shows "now playing" indicator
- **Click**: Toggles play/pause state

### YouTube Embed Component
- Lazy-loaded iframe (intersection observer)
- Glass surface container with custom distortion
- Thumbnail preview until interaction
- Click to activate embed

### Section Reveal
- Sections animate in on scroll
- 100px offset from viewport bottom
- Staggered children delay (100ms between elements)

### Glass Surface Component
- Provided GlassSurface with SVG displacement filter
- Fallback backdrop-filter for unsupported browsers
- Configurable blur, opacity, distortion

## Component Inventory

### `<VinylRecord />`
- Props: size, isPlaying, onToggle, className
- States: idle (slow spin), hover (fast spin), playing (stopped)

### `<YouTubeEmbed />`
- Props: videoId, title, width, height
- States: unactivated (thumbnail), activated (iframe), loading

### `<MusicSection />`
- Props: id, title, titleImage?, description?, videos[], glassConfig?
- States: hidden (before scroll), revealing, visible

### `<GlassSurface />`
- (Provided component with all specified props)

### `<ScrollReveal />`
- Wrapper component for scroll-triggered animations

## Technical Approach

### Stack
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for complex animations
- React Intersection Observer for scroll triggers

### Architecture
```
src/
  components/
    GlassSurface.tsx
    VinylRecord.tsx
    YouTubeEmbed.tsx
    MusicSection.tsx
    ScrollReveal.tsx
    BackgroundMesh.tsx
  App.tsx
  main.tsx
  index.css
```

### Key Implementation Details
- Vinyl SVG with realistic grooves and highlights
- YouTube embeds use `youtube-nocookie.com` for privacy
- CSS custom properties for theme consistency
- Prefers-reduced-motion respected for all animations
