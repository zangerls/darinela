# Darinela Vangelova — Portfolio

Personal portfolio of [Darinela Vangelova](https://darinela.com), a Bulgarian soprano based in Vienna. Built with Next.js, Tailwind CSS, shadcn/ui, and Motion.

## [Visit the site](https://darinela.com)

## Features

- Built with Next.js (App Router) and TypeScript
- Styled with Tailwind CSS v4
- Component system powered by shadcn/ui
- Smooth animations with [Motion](https://motion.dev/)
- Smooth scrolling via Lenis
- Dark / light mode via next-themes
- i18n for English, German, and Bulgarian using next-intl
- Fully responsive, accessible, SEO-friendly
- Deployed on Vercel

---

## Project Structure

```bash
app/            # App router pages & layouts (locale-scoped)
components/     # Reusable components
components/ui/  # shadcn/ui components
lib/            # Utility functions / helpers
i18n/           # next-intl routing & request config
messages/       # next-intl translation dictionaries (en, de, bg)
providers/      # Lenis smooth-scroll provider
public/         # Static assets (images, audio)
hooks/          # Shared hooks
types/          # Global types
proxy.ts        # next-intl middleware (locale routing)
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/zangerls/darinela.git
cd darinela
```

### 2. Install dependencies

```bash
npm i
```

### 3. Start the development server

```bash
npm run dev
```

Visit:

```txt
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Deployment

Deployed on Vercel. To deploy your own version:

1. Fork this repository
2. Import the project into Vercel
3. Deploy

---

## Design Philosophy

- Minimal, purposeful design
- Smooth and meaningful motion
- Strong typography hierarchy
- Performance-first interactions
- Accessibility and responsiveness

---

## Contact

- Website: https://darinela.com
- Instagram: https://www.instagram.com/darinela_vangelova
- YouTube: https://youtube.com/@darinelavangelova268
