import { useRef, useEffect, useCallback } from 'react';
import { PRICING_MATRIX, computePrice, formatAmount } from '../utils/pricing';
import { Cube } from '../assets/icons';
import { prefersReducedMotion } from '../utils/motion';

const TIERS = [
  {
    id: 'starter', label: 'Starter', featured: false, cta: 'Start Free', mailSubject: 'Starter Plan Signup',
    desc: 'Perfect for small teams & MVPs',
    features: ['10M events/month','5 connectors','Community support','Basic analytics','99.5% SLA'],
  },
  {
    id: 'pro', label: 'Pro', featured: true, cta: 'Get Pro →', mailSubject: 'Pro Plan Signup', badge: 'Most Popular',
    desc: 'For growing teams that need more power',
    features: ['100M events/month','50 connectors','Priority support','AI enrichment','99.9% SLA','Custom pipelines'],
  },
  {
    id: 'scale', label: 'Scale', featured: false, cta: 'Talk to Sales', mailSubject: 'Scale Plan Inquiry',
    desc: 'Enterprise-grade for data-heavy orgs',
    features: ['Unlimited events','500+ connectors','Dedicated CSM','Custom ML models','99.99% SLA','VPC peering','Audit logs'],
  },
];

const CURRENCIES = Object.keys(PRICING_MATRIX.currencies);

export default function Pricing() {
  const sectionRef = useRef(null);
  const billingRef  = useRef('monthly');
  const currencyRef = useRef('INR');
  const priceRefs   = useRef({});
  const saveBadge   = useRef(null);

  /** Direct DOM update — zero React re-render */
  const updatePrices = useCallback(() => {
    const billing  = billingRef.current;
    const currency = currencyRef.current;
    const currCfg  = PRICING_MATRIX.currencies[currency];

    TIERS.forEach(({ id }) => {
      const { amount, symbol } = computePrice(id, billing, currency);
      const refs = priceRefs.current[id];
      if (!refs) return;
      const fmt = formatAmount(amount, currCfg.locale);
      // WAAPI fade — 150ms ease-out per spec; skipped under reduced motion, the price
      // update itself (text + aria-live announcement) is the meaningful feedback, not the fade
      if (!prefersReducedMotion()) {
        refs.amount.animate([{ opacity: 0.15 }, { opacity: 1 }], { duration: 150, easing: 'ease-out' });
      }
      refs.symbol.textContent = symbol;
      refs.amount.textContent = fmt;
      refs.period.textContent = billing === 'annual' ? '/mo · billed annually' : '/month';
    });

    if (saveBadge.current) {
      saveBadge.current.style.opacity = billing === 'annual' ? '1' : '0';
      saveBadge.current.style.transform = billing === 'annual' ? 'translateY(0)' : 'translateY(-4px)';
    }
  }, []);

  const setBilling = useCallback((val) => {
    billingRef.current = val;
    sectionRef.current?.querySelectorAll('.toggle-opt').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.billing === val);
    });
    updatePrices();
  }, [updatePrices]);

  const onCurrencyChange = useCallback((e) => {
    currencyRef.current = e.target.value;
    updatePrices();
  }, [updatePrices]);

  useEffect(() => { updatePrices(); }, [updatePrices]);

  const reg = (tierId, type) => (el) => {
    if (!priceRefs.current[tierId]) priceRefs.current[tierId] = {};
    if (el) priceRefs.current[tierId][type] = el;
  };

  return (
    <section ref={sectionRef} id="pricing" aria-labelledby="pricing-heading" className="section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label">Pricing</p>
          <h2 id="pricing-heading" className="text-4xl sm:text-5xl font-display font-black mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-[var(--c-text-2)] max-w-md mx-auto mb-8 font-body">
            No hidden fees. No surprises. Cancel anytime.
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <div className="toggle-track" role="group" aria-label="Billing cycle">
              {['monthly','annual'].map(b => (
                <button key={b} className={`toggle-opt ${billingRef.current===b?'active':''}`}
                  data-billing={b} onClick={() => setBilling(b)} aria-pressed={billingRef.current===b}>
                  {b === 'monthly' ? 'Monthly' : (
                    <>Annual <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#172B36] text-[var(--c-primary)]">−20%</span></>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="currency-sel" className="text-xs text-[var(--c-text-3)] font-semibold font-display tracking-wide">Currency</label>
              <select id="currency-sel" className="currency-select" defaultValue="INR" onChange={onCurrencyChange} aria-label="Select currency">
                {CURRENCIES.map(c => (
                  <option key={c} value={c}>{c} — {PRICING_MATRIX.currencies[c].symbol}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Annual savings badge */}
          <p ref={saveBadge} aria-live="polite"
            className="mt-3 text-xs font-semibold font-body transition-all duration-300"
            style={{ color: 'var(--c-primary)', opacity: 0, transform: 'translateY(-4px)' }}>
            🎉 You're saving 20% with annual billing
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {TIERS.map(tier => (
            <article key={tier.id} className={`pricing-card ${tier.featured ? 'featured' : ''}`} aria-label={`${tier.label} plan`}>
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-display font-bold tracking-wider"
                  style={{ background: 'var(--g-brand)', color: '#172B36' }} aria-label="Most popular">
                  {tier.badge}
                </div>
              )}

              {/* Tier header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: tier.featured ? 'var(--g-brand)' : 'rgba(255,200,1,0.1)' }}>
                  <Cube className="w-4 h-4" style={{ color: tier.featured ? '#172B36' : 'var(--c-primary)' }} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--c-text)] leading-none">{tier.label}</h3>
                  <p className="text-[11px] text-[var(--c-text-3)] mt-0.5 font-body">{tier.desc}</p>
                </div>
              </div>

              {/* Price — direct DOM refs. A single role="status"+aria-atomic region wraps
                  symbol+amount+period so updatePrices() announces one merged phrase
                  (e.g. "₹999 /month") instead of two separate/duplicate announcements. */}
              <div className="mb-5" role="status" aria-atomic="true">
                <div className="flex items-end gap-0.5">
                  <span ref={reg(tier.id,'symbol')} className="font-display text-xl font-bold text-[var(--c-text-2)] mb-1" />
                  <span ref={reg(tier.id,'amount')} className="price-amount" />
                </div>
                <p ref={reg(tier.id,'period')} className="text-[11px] text-[var(--c-text-3)] mt-1 font-body" />
              </div>

              <a href={`mailto:hello@nexusai.io?subject=${encodeURIComponent(tier.mailSubject)}`}
                className={`${tier.featured ? 'btn-primary' : 'btn-ghost'} w-full justify-center mb-5 text-sm`}
                aria-label={`${tier.cta} ${tier.label} plan`}>
                {tier.cta}
              </a>

              <ul className="space-y-2.5" role="list" aria-label={`${tier.label} features`}>
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-xs text-[var(--c-text-2)] font-body">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.5" fill="rgba(255,200,1,0.12)" stroke="rgba(255,200,1,0.35)" strokeWidth="1"/>
                      <path d="M5 8L7 10L11 6" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
