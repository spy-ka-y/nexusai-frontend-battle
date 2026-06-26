/**
 * PRICING MATRIX — Feature 1
 * Multi-dimensional config: tier × billing × currency
 * NO hardcoded UI values — all computed dynamically
 */

export const PRICING_MATRIX = {
  annualDiscount: 0.20,

  currencies: {
    INR: { symbol: '₹', tariff: 1.00,   code: 'INR', locale: 'en-IN' },
    USD: { symbol: '$', tariff: 0.01195, code: 'USD', locale: 'en-US' },
    EUR: { symbol: '€', tariff: 0.01098, code: 'EUR', locale: 'de-DE' },
  },

  tiers: {
    starter: { baseINR: 999,  label: 'Starter' },
    pro:     { baseINR: 2499, label: 'Pro' },
    scale:   { baseINR: 5999, label: 'Scale' },
  },
};

const DEFAULT_TIER = 'starter';
const DEFAULT_CURRENCY = 'INR';
const DEFAULT_BILLING = 'monthly';

/**
 * computePrice(tier, billing, currency) → { amount, symbol, billing, annualTotal }
 * All arithmetic here — zero hardcoding in JSX.
 * Unknown/invalid inputs fall back to safe defaults instead of throwing,
 * so a bad call site degrades gracefully rather than crashing the page.
 */
export function computePrice(tier, billing, currency) {
  const { annualDiscount, currencies, tiers } = PRICING_MATRIX;

  const tierCfg = tiers[tier] ?? tiers[DEFAULT_TIER];
  const currCfg = currencies[currency] ?? currencies[DEFAULT_CURRENCY];
  const safeBilling = billing === 'annual' ? 'annual' : DEFAULT_BILLING;

  const baseINR = tierCfg.baseINR;
  const monthlyINR = baseINR;
  const annualMonthlyINR = baseINR * (1 - annualDiscount);

  const monthly = Math.round(monthlyINR * currCfg.tariff);
  const annualMonthly = Math.round(annualMonthlyINR * currCfg.tariff);

  const displayed = safeBilling === 'annual' ? annualMonthly : monthly;

  return {
    amount: displayed,
    symbol: currCfg.symbol,
    billing: safeBilling,
    annualTotal: safeBilling === 'annual' ? Math.round(annualMonthlyINR * 12 * currCfg.tariff) : null,
  };
}

/** Format number for display — locale-aware, falls back to plain digits if the locale is malformed */
export function formatAmount(amount, locale) {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(safeAmount);
  } catch {
    return String(Math.round(safeAmount));
  }
}
