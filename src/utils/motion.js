/**
 * Single source of truth for the OS-level reduced-motion preference.
 * CSS transitions/keyframes are handled globally via a media query in globals.css —
 * this is only needed for GSAP/WAAPI tweens, which set styles directly and bypass CSS.
 */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
