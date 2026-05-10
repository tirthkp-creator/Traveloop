/* ────────────────────────────────────────────────
   DESTINATIONS DATA — Traveloop 2026
   Static mock data for destination popup
   ──────────────────────────────────────────────── */

export const trendingDestinations = [
  { id: 'bali',      name: 'Bali',      country: 'Indonesia', flag: '🇮🇩' },
  { id: 'dubai',     name: 'Dubai',     country: 'UAE',       flag: '🇦🇪' },
  { id: 'paris',     name: 'Paris',     country: 'France',    flag: '🇫🇷' },
  { id: 'tokyo',     name: 'Tokyo',     country: 'Japan',     flag: '🇯🇵' },
  { id: 'goa',       name: 'Goa',       country: 'India',     flag: '🇮🇳' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
  { id: 'kashmir',   name: 'Kashmir',   country: 'India',     flag: '🇮🇳' },
  { id: 'bangkok',   name: 'Bangkok',   country: 'Thailand',  flag: '🇹🇭' },
];

export const vibes = [
  'Beaches', 'Mountains', 'Adventure', 'Romantic',
  'Friends Trip', 'Budget', 'Luxury', 'Nature',
];

export const popularCountries = [
  {
    id: 'japan',
    flag: '🇯🇵',
    name: 'Japan',
    cities: 'Tokyo • Kyoto • Osaka',
    budgetINR: '₹1.2L',
    budgetUSD: '≈ $1,440',
    currency: 'JPY',
    destCurrency: 'JPY',
    destSymbol: '¥',
  },
  {
    id: 'france',
    flag: '🇫🇷',
    name: 'France',
    cities: 'Paris • Nice • Lyon',
    budgetINR: '₹1.5L',
    budgetUSD: '≈ $1,800',
    currency: 'EUR',
    destCurrency: 'EUR',
    destSymbol: '€',
  },
  {
    id: 'thailand',
    flag: '🇹🇭',
    name: 'Thailand',
    cities: 'Bangkok • Phuket • Chiang Mai',
    budgetINR: '₹65,000',
    budgetUSD: '≈ $780',
    currency: 'THB',
    destCurrency: 'THB',
    destSymbol: '฿',
  },
  {
    id: 'uae',
    flag: '🇦🇪',
    name: 'UAE',
    cities: 'Dubai • Abu Dhabi • Sharjah',
    budgetINR: '₹1.0L',
    budgetUSD: '≈ $1,200',
    currency: 'AED',
    destCurrency: 'AED',
    destSymbol: 'AED',
  },
  {
    id: 'indonesia',
    flag: '🇮🇩',
    name: 'Indonesia',
    cities: 'Bali • Jakarta • Lombok',
    budgetINR: '₹55,000',
    budgetUSD: '≈ $660',
    currency: 'IDR',
    destCurrency: 'IDR',
    destSymbol: 'Rp',
  },
  {
    id: 'singapore',
    flag: '🇸🇬',
    name: 'Singapore',
    cities: 'Marina Bay • Sentosa • Orchard',
    budgetINR: '₹90,000',
    budgetUSD: '≈ $1,080',
    currency: 'SGD',
    destCurrency: 'SGD',
    destSymbol: 'S$',
  },
];

/* ── ORIGIN COUNTRIES ──────────────────────────────────── */
export const originCountries = [
  { code: 'IN', name: 'India',         flag: '🇮🇳', currency: 'INR', symbol: '₹' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$' },
  { code: 'GB', name: 'UK',            flag: '🇬🇧', currency: 'GBP', symbol: '£' },
  { code: 'AU', name: 'Australia',     flag: '🇦🇺', currency: 'AUD', symbol: 'A$' },
  { code: 'CA', name: 'Canada',        flag: '🇨🇦', currency: 'CAD', symbol: 'C$' },
  { code: 'DE', name: 'Germany',       flag: '🇩🇪', currency: 'EUR', symbol: '€' },
  { code: 'AE', name: 'UAE',           flag: '🇦🇪', currency: 'AED', symbol: 'AED' },
  { code: 'SG', name: 'Singapore',     flag: '🇸🇬', currency: 'SGD', symbol: 'S$' },
];

/* ── MOCK EXCHANGE RATES → base: INR ─────────────────────
   All rates = 1 INR → X foreign unit (mock/static)
   ──────────────────────────────────────────────────────── */
export const exchangeRates = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
  EUR: 0.011,
  AUD: 0.018,
  CAD: 0.016,
  AED: 0.044,
  SGD: 0.016,
  JPY: 1.80,
  THB: 0.42,
  IDR: 185,
};

/**
 * Convert amount in originCurrency to destCurrency
 * via INR as the base.
 */
export function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;
  const inINR = fromCurrency === 'INR' ? amount : amount / exchangeRates[fromCurrency];
  return toCurrency === 'INR' ? inINR : inINR * exchangeRates[toCurrency];
}

export function formatCurrency(amount, symbol, decimals = 0) {
  const n = Number(amount.toFixed(decimals));
  if (n >= 100000) return `${symbol}${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `${symbol}${(n / 1000).toFixed(0)}K`;
  return `${symbol}${n.toLocaleString()}`;
}
