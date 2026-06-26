import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LegalPage from './components/LegalPage';
import Hero from './sections/Hero';
import BentoFeatures from './sections/BentoFeatures';
import Pricing from './sections/Pricing';
import SocialProof from './sections/SocialProof';
import Footer from './sections/Footer';
import { getLegalSlugFromHash } from './utils/legalPages';
import './styles/globals.css';

export default function App() {
  const [legalSlug, setLegalSlug] = useState(() => getLegalSlugFromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setLegalSlug(getLegalSlugFromHash(window.location.hash));
      // Snap to top on every legal-page transition (entering or returning home) so the
      // content swap never leaves the user scrolled past the new, much shorter page.
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        {legalSlug ? (
          <LegalPage slug={legalSlug} />
        ) : (
          <>
            <Hero />
            <BentoFeatures />
            <Pricing />
            <SocialProof />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
