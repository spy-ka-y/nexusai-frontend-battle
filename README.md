# NexusAI

A single-page marketing site for a fictional AI data-automation platform, built for **Frontend Battle 3.0** (a vibe coding competition run by the Web & Design Society, IIT Bhubaneswar).

**Live demo:** https://nexusai-frontend-battle.vercel.app

> **NexusAI is not a real product.** The company, the customer quotes, the logo wall, the statistics and the compliance claims on the page (for example "SOC 2 Type II" and "99.9% uptime") are placeholder copy written for the demo. Nothing here is a real endorsement or a real certification.

## What is in it

- **Hero** with a staged GSAP entrance timeline and a short stats strip.
- **Bento feature grid** with scroll-triggered reveals and hover-linked highlights.
- **Pricing section** driven by a single config object (see below) with a monthly/annual toggle and an INR/USD/EUR currency selector.
- **Social proof** section with a logo marquee and testimonial cards.
- **Legal and status pages** (Privacy, Terms, Cookies, Security, System Status) reached through the URL hash, for example `#legal/privacy`, with no router dependency.

## Engineering notes

**Pricing is computed, not hardcoded.** `src/utils/pricing.js` holds one matrix of tier x billing cycle x currency. `computePrice(tier, billing, currency)` does all the arithmetic (20% annual discount, per-currency tariff, rounding) and falls back to safe defaults on bad input instead of throwing. `formatAmount` formats numbers with `Intl.NumberFormat` and degrades gracefully on a malformed locale. The JSX contains no price literals.

**Accessibility was treated as a feature.**
- Skip link to the main content, landmark roles, and labelled controls throughout.
- The price area is a live region, so screen readers announce changes when the billing cycle or currency changes.
- The mobile menu follows the WAI-ARIA disclosure pattern: Escape closes it and returns focus to the trigger, and the collapsed menu is `inert` so Tab skips it.
- Every GSAP animation checks `prefers-reduced-motion` (`src/utils/motion.js`), and CSS motion is switched off globally by a media query.

**SEO basics are in place.** Title and description, Open Graph and Twitter card tags, `robots.txt`, a sitemap, and JSON-LD `SoftwareApplication` markup with the three plans.

## Tech stack

| Area | Choice |
|---|---|
| UI | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 with a small custom token layer in `src/styles/globals.css` |
| Animation | GSAP 3 and ScrollTrigger |
| Lint | Oxlint |
| Fonts | Inter and JetBrains Mono |
| Hosting | Vercel |

## Run it locally

You need Node.js 20.19 or newer (or 22.12+), which is what Vite 8 requires.

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # Oxlint
```

## Project structure

```
src/
  main.jsx            entry point
  App.jsx             page composition and hash-based legal page switch
  components/         Navbar, LegalPage
  sections/           Hero, BentoFeatures, Pricing, SocialProof, Footer
  utils/              pricing.js, motion.js, legalPages.js
  styles/globals.css  design tokens and global styles
  assets/icons.jsx    inline SVG icon set
public/               favicon, icon sprite, robots.txt, sitemap.xml
```

## Known limitations

- The search button in the navbar is intentionally disabled ("coming soon").
- The legal pages are placeholders, not real policies.
- The canonical and Open Graph URLs in `index.html` point at `nexusai.vercel.app`, and `og-image.png` is not in the repository, so link previews will not show an image yet.

## Credits

Designed and built by Yash Mehta for Frontend Battle 3.0.
