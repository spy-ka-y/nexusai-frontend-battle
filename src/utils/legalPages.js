/**
 * In-app "Coming soon" legal/informational pages — no router, no new dependency.
 * Reached via plain URL hash (#legal/<slug>); App.jsx swaps content based on this.
 */
export const LEGAL_PAGES = {
  privacy:  { title: 'Privacy Policy' },
  terms:    { title: 'Terms of Service' },
  cookies:  { title: 'Cookie Policy' },
  security: { title: 'Security' },
  status:   { title: 'System Status' },
};

/** Returns a valid legal-page slug from a location hash, or null. */
export function getLegalSlugFromHash(hash) {
  const match = /^#legal\/([a-z]+)$/.exec(hash || '');
  const slug = match?.[1];
  return slug && LEGAL_PAGES[slug] ? slug : null;
}
