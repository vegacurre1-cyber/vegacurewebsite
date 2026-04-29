# Vega Curre Premium Design System

## 1. Visual Theme & Atmosphere
- **Mood**: High-end medical, trustworthy, technologically advanced, and ultra-clean.
- **Style**: "Liquid Glass & Clinical Precision" — A fusion of iOS 26 dynamic glass materials with high-density medical data visualization.
- **Key Characteristics**: Liquid Glass (dynamic blur, chromatic aberration, reflections), interactive morphing containers, and CDSS-inspired data layouts (risk dials, alert severities).

## 2. Color Palette & Roles

### Dark Theme (Hero/Features)
- `--c-primary-dark`: `#022c22` (Deepest Teal/Black) - Main background for dark sections.
- `--c-primary-darker`: `#064e3b` (Deep Teal) - Secondary background or card backgrounds.
- `--c-accent-glow`: `#10b981` (Bright Emerald) - For glowing buttons, highlights, and icons on dark backgrounds.
- `--c-text-dark-primary`: `#ffffff` (Pure White) - Main text on dark backgrounds.
- `--c-text-dark-secondary`: `#9ca3af` (Cool Gray) - Secondary text on dark backgrounds.

### Light Theme (Content/Details)
- `--c-bg-light`: `#f8fafc` (Slate 50) - Page backgrounds.
- `--c-surface-white`: `#ffffff` (Pure White) - Card backgrounds.
- `--c-text-light-primary`: `#111827` (Gray 900) - Main text on light backgrounds.
- `--c-text-light-secondary`: `#4b5563` (Gray 600) - Secondary text on light backgrounds.
- `--c-border-light`: `#e5e7eb` (Gray 200) - Borders and dividers.

### Shared Colors
- `--c-red-accent`: `#ef4444` (Medical Red) - Emergency, alerts, important highlights.
- `--c-blue-accent`: `#3b82f6` (Clinical Blue) - Medical standard trust color, used sparingly.

## 3. Typography Rules
- **Primary Font Family**: `Inter`, `system-ui`, `-apple-system`, `sans-serif`.
- **Headings (h1, h2, h3)**: 
  - Weight: `800` or `900` (Extra Bold/Black).
  - Letter Spacing: `-0.02em` (tight).
  - Line Height: `1.1` to `1.2`.
- **Body Text**:
  - Weight: `400` (Regular) and `500` (Medium).
  - Line Height: `1.6` for readability.
- **Labels/Tags**:
  - Weight: `600` or `700` (SemiBold/Bold).
  - Letter Spacing: `0.05em` (uppercase).

## 4. Component Stylings

### Liquid Glass Containers
- **Material**: `rgba(255, 255, 255, 0.08)` for dark sections, `rgba(255, 255, 255, 0.7)` for light.
- **Blur**: `backdrop-filter: blur(25px) saturate(180%)`.
- **Reflections**: Use a subtle `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)` as an overlay.
- **Border**: `1px solid rgba(255, 255, 255, 0.2)` with a slight "inner glow" shadow.
- **Morphing**: Elements should blend together when they overlap, using `mix-blend-mode: plus-lighter` or SVG filters.

### Clinical Data Visualization (CDSS)
- **Risk Indicators**: Use circular "dials" for scores like NEWS2 or qSOFA.
- **Alert Colors**: 
  - `Critical`: `#ef4444` (Red) with pulse animation.
  - `Major`: `#f59e0b` (Orange) with static glow.
  - `Minor`: `#10b981` (Emerald) for safe/within-range.
- **Typography**: Use monospace fonts for clinical values (e.g., heart rate, blood pressure) to emphasize precision.

## 5. Layout Principles
- **Container Max-Width**: `1280px` for ultra-wide feels.
- **Section Padding**: Huge vertical padding (`100px` to `140px` on desktop) to let content breathe.
- **Section Transitions**: Use SVG wave borders instead of straight lines when transitioning between the dark hero and the light content sections.

## 6. Depth & Elevation
- Rely heavily on soft, diffused shadows rather than harsh dark shadows.
- Glows are used as elevation indicators in dark mode.

## 7. Do's and Don'ts
- **DO**: Use `#10b981` (Emerald) exclusively as an accent. Don't use it for large background fills.
- **DON'T**: Use standard bootstrap primary blue (`#0d6efd`). It looks cheap.
- **DO**: Add subtle entrance animations (fade up) to cards when scrolling into view.
- **DON'T**: Clutter cards with borders and shadows at the same time unless it's the premium light card spec.

## 8. Agent Prompt Guide
When generating new components for this site:
- "Create a new glassmorphic card for X feature" -> Use `background: rgba(255,255,255,0.05)` and `backdrop-filter: blur(12px)`.
- "Make a primary button" -> Check context. If in dark section, use Emerald Glow. If in light section, use Deep Teal solid.
