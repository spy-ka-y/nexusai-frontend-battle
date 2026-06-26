import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, Cube } from '../assets/icons';
import { prefersReducedMotion } from '../utils/motion';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'Customers',href: '#social'   },
  { label: 'Docs',     soon: true        },
];

/** Visible "Soon" pill on a plain (non-interactive) text label — no fake link, no ARIA misuse */
function SoonLabel({ label, className }) {
  return (
    <span className={className}>
      {label}
      <span className="text-[8px] font-display font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ml-1.5"
        style={{ background: 'rgba(255,200,1,0.15)', color: 'var(--c-primary)' }}>
        Soon
      </span>
    </span>
  );
}

export default function Navbar() {
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(navRef.current, { y: 0, opacity: 1 });
    } else {
      gsap.fromTo(navRef.current,
        { y: -64, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.38, ease: 'power3.out', delay: 0.04 }
      );
    }
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** Escape closes the open mobile menu and returns focus to its trigger (WAI-ARIA Disclosure pattern) */
  const handleNavKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <header role="banner">
      <nav ref={navRef} aria-label="Main navigation" onKeyDown={handleNavKeyDown}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-2xl py-3' : 'py-5'
        }`} style={{ willChange: 'transform' }}>
        <div className="container flex items-center justify-between">

          {/* Logo */}
          <a href="#home" aria-label="NexusAI Home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center glow-brand flex-shrink-0"
              style={{ background: 'var(--g-brand)' }}>
              <Cube className="w-5 h-5" style={{ color: '#172B36' }} />
            </div>
            <span className="font-display font-bold text-base tracking-tight text-[var(--c-text)]">
              NEXUS<span className="gradient-text">AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map(l => (
              <li key={l.label}>
                {l.soon ? (
                  <SoonLabel label={l.label} className="font-body text-sm font-medium text-[var(--c-text-3)] inline-flex items-center" />
                ) : (
                  <a href={l.href} className="inline-flex items-center py-2 font-body text-sm font-medium text-[var(--c-text-3)] hover:text-[var(--c-primary)] transition-colors relative group">
                    {l.label}
                    <span className="absolute bottom-1.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                      style={{ background: 'var(--g-brand)' }} />
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button aria-label="Search (coming soon)" disabled className="p-2 rounded-lg text-[var(--c-text-3)] glass-brand">
              <Search className="w-4 h-4" />
            </button>
            <SoonLabel label="Sign in" className="btn-ghost text-sm py-2 px-4 inline-flex items-center" />
            <a href="#pricing" className="btn-primary text-sm py-2 px-5">
              Get Started
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

          {/* Hamburger */}
          <button ref={hamburgerRef} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-lg glass flex flex-col gap-1.5"
            onClick={() => setMenuOpen(o => !o)}>
            {[0,1,2].map(i => (
              <span key={i} className="block w-5 h-0.5 rounded-full transition-all duration-200"
                style={{
                  background: 'var(--c-text)',
                  transform: menuOpen ? (i===0?'rotate(45deg) translateY(6px)':i===2?'rotate(-45deg) translateY(-6px)':'scale(0)') : 'none',
                  opacity: (menuOpen && i===1) ? 0 : 1
                }} />
            ))}
          </button>
        </div>

        {/* Mobile menu — inert while collapsed so its links are skipped entirely by Tab
            and assistive tech, instead of sitting invisibly in the focus order */}
        <div inert={!menuOpen} className={`md:hidden glass mx-4 mt-2 rounded-2xl overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {NAV_LINKS.map(l => (
            l.soon ? (
              <div key={l.label} className="flex items-center px-6 py-3.5 border-b border-[var(--c-border-3)] last:border-0">
                <SoonLabel label={l.label} className="text-sm text-[var(--c-text-2)] inline-flex items-center" />
              </div>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                className="block px-6 py-3.5 text-sm text-[var(--c-text-2)] hover:text-[var(--c-primary)] hover:bg-[rgba(255,200,1,0.05)] border-b border-[var(--c-border-3)] last:border-0 transition-colors">
                {l.label}
              </a>
            )
          ))}
          <div className="px-6 py-4">
            <a href="#pricing" className="btn-primary w-full justify-center text-sm">Get Started</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
