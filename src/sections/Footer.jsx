import { Cube, LinkSolid } from '../assets/icons';

const LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing',  href: '#pricing' },
    { label: 'Changelog', soon: true },
    { label: 'Roadmap',   soon: true },
  ],
  Developers: [
    { label: 'Docs',          soon: true },
    { label: 'API Reference', soon: true },
    { label: 'SDKs',          soon: true },
    { label: 'Status', href: '#legal/status' },
  ],
  Company: [
    { label: 'About',   soon: true },
    { label: 'Blog',    soon: true },
    { label: 'Careers', soon: true },
    { label: 'Contact', href: 'mailto:hello@nexusai.io?subject=General%20Inquiry' },
  ],
  Legal: [
    { label: 'Privacy',  href: '#legal/privacy' },
    { label: 'Terms',    href: '#legal/terms' },
    { label: 'Security', href: '#legal/security' },
    { label: 'Cookies',  href: '#legal/cookies' },
  ],
};

/** Visible "Soon" pill on a plain (non-interactive) text label — no fake link, no ARIA misuse */
function SoonLabel({ label }) {
  return (
    <span className="text-xs text-[var(--c-text-3)] font-body inline-flex items-center gap-1.5">
      {label}
      <span className="text-[8px] font-display font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
        style={{ background: 'rgba(255,200,1,0.12)', color: 'var(--c-primary)' }}>
        Soon
      </span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t py-16" style={{ borderColor: 'var(--c-border-3)' }}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--g-brand)' }}>
                <Cube className="w-4 h-4" style={{ color: '#172B36' }} />
              </div>
              <span className="font-display font-bold text-sm text-[var(--c-text)]">NEXUS<span className="gradient-text">AI</span></span>
            </div>
            <p className="text-xs text-[var(--c-text-3)] leading-relaxed font-body max-w-[180px]">
              Next-gen AI data automation platform. Built for teams that move fast.
            </p>
          </div>
          {Object.entries(LINKS).map(([cat, links]) => (
            <nav key={cat} aria-label={`${cat} links`}>
              <p className="text-[10px] font-display font-bold text-[var(--c-text)] uppercase tracking-widest mb-4">{cat}</p>
              <ul className="space-y-2.5" role="list">
                {links.map(l => (
                  <li key={l.label}>
                    {l.soon ? (
                      <SoonLabel label={l.label} />
                    ) : (
                      <a href={l.href} className="inline-block py-1 text-xs text-[var(--c-text-3)] hover:text-[var(--c-primary)] transition-colors duration-150 font-body">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t"
          style={{ borderColor: 'var(--c-border-3)' }}>
          <p className="text-[11px] text-[var(--c-text-3)] font-body">© 2026 NexusAI, Inc. All rights reserved.</p>
          <p className="text-[11px] text-[var(--c-text-3)] font-body flex items-center gap-1.5">
            <LinkSolid className="w-3 h-3" style={{ color: 'var(--c-primary)' }} />
            Built for Frontend Battle 3.0 · WebnD, IIT Bhubaneswar
          </p>
        </div>
      </div>
    </footer>
  );
}
