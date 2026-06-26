import { LEGAL_PAGES } from '../utils/legalPages';

/** Lightweight "coming soon" placeholder for legal/informational pages (Privacy, Terms, etc.) */
export default function LegalPage({ slug }) {
  const page = LEGAL_PAGES[slug];
  if (!page) return null;

  return (
    <section className="section" aria-labelledby="legal-heading">
      <div className="container max-w-2xl mx-auto text-center">
        <p className="section-label">{page.title}</p>
        <h1 id="legal-heading" className="text-3xl sm:text-4xl font-display font-black mb-4">
          Coming <span className="gradient-text">Soon</span>
        </h1>
        <p className="text-[var(--c-text-2)] font-body leading-relaxed mb-8">
          We're still finalizing our {page.title.toLowerCase()}. Check back shortly, or head back to the homepage in the meantime.
        </p>
        <a href="#home" className="btn-primary justify-center">Back to Home</a>
      </div>
    </section>
  );
}
