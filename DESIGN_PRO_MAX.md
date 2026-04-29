# Vegacurre "Pro Max" Design System

Derived from [UI UX Pro Max](P:\crazy-ai-stack\ui-ux-pro-max) reasoning rules for **Medical Clinic (ID 58)** and **Liquid Glass (ID 14)**.

## Core Philosophy
**"Serenity meets Sophistication"**
Combining medical trust with premium, fluid aesthetics to create a calming yet high-end patient experience.

## 🎨 Color Palette (Pro Max)
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Medical Blue | `#0077B6` | Brand, Main CTAs, Headings |
| Secondary | Calm Green | `#10B981` | Success, Health indicators, Highlights |
| Neutral | Medical White | `#F8FAFC` | Main background, Page canvas |
| Surface | Pure White | `#FFFFFF` | Card backgrounds, Interactive surfaces |
| Glass | Translucent | `rgba(255,255,255,0.7)` | Navbar, Overlays, Floating panels |
| Text | Deep Navy | `#0F172A` | Primary readability |
| Muted | Slate Grey | `#64748B` | Secondary info, Descriptions |

## Typography
- **Headings**: `Outfit` (Weight 700-900) - Modern, clean, geometric but approachable.
- **Body**: `Inter` (Weight 400-600) - Maximum legibility for medical instructions.
- **Accents**: `JetBrains Mono` (Weight 500) - For technical details, timestamps, or "Pro" indicators.

## ✨ Visual Effects (Liquid Glass)
- **Blur**: `20px` backdrop-filter (Standard for Glassmorphism).
- **Borders**: `1px solid rgba(255,255,255,0.2)` on glass elements.
- **Shadows**: `0 10px 40px rgba(0,0,0,0.06)` - Soft, deep, premium.
- **Transitions**: `400ms cubic-bezier(0.16, 1, 0.3, 1)` (The "Apple" easing).

## 🧩 Component Guidelines
1. **Glass Cards**: Should have a subtle floating animation (`@keyframes float`).
2. **CTAs**: Large touch targets (min 48px), scale on hover (1.05), soft glow on focus.
3. **Sections**: Full-bleed with organic wave dividers (`Organic Biophilic` influence).
4. **Mobile Menu**: Full-screen glass overlay with large, legible links.

## 🚫 Anti-Patterns (To Avoid)
- **Harsh Gradients**: Avoid red-to-blue or neon-only. Use soft blends.
- **Hard Borders**: Use subtle borders or shadows for separation.
- **Clutter**: Prioritize white space. Medical sites need "breathability".
- **Generic Icons**: Use high-quality SVGs (Lucide/Heroicons) with consistent stroke widths.
