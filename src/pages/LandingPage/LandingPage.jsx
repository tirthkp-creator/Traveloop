import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map as MapIcon, Globe2, Wallet, Share2,
  Search, ArrowRight, Sparkles, Calendar,
  Users, Check, TrendingUp, Star, ChevronRight,
  X, ChevronDown, Minus, Plus, MapPin,
} from 'lucide-react';
import Button from '../../components/Button/Button';
import TravelMap from '../../components/TravelMap/TravelMap';
import { dummyCities } from '../../data/cities';
import {
  trendingDestinations, vibes, popularCountries,
  originCountries, convertCurrency, formatCurrency,
} from '../../data/destinations';
import styles from './LandingPage.module.css';

/* ── ANIMATION VARIANTS ────────────────────────────────── */
const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
const popupVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: -8 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.96, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
};

/* ── STATIC DATA ──────────────────────────────────────── */
const features = [
  { icon: <MapIcon size={22} strokeWidth={1.8} />,  title: 'Living Travel Map',    desc: 'Every trip becomes a pin on your personal interactive globe — past, present, and future.' },
  { icon: <Globe2 size={22} strokeWidth={1.8} />,   title: 'Multi-City Itinerary', desc: 'Chain destinations with smart day-by-day timelines and drag-and-drop activities.' },
  { icon: <Wallet size={22} strokeWidth={1.8} />,   title: 'Smart Budget',         desc: 'Real-time expense tracking by category. Never go over budget on any trip again.' },
  { icon: <Share2 size={22} strokeWidth={1.8} />,   title: 'Share & Collaborate',  desc: 'Publish a beautiful public version of your route for friends or inspiration seekers.' },
];
const steps = [
  { num: '01', title: 'Create your trip',  desc: 'Set destinations, travel dates, and add your travel group in minutes.' },
  { num: '02', title: 'Build your route',  desc: 'Add cities, activities, and notes. The map updates live as you plan.' },
  { num: '03', title: 'Track everything',  desc: 'Monitor your budget, packing list, and itinerary in one clean workspace.' },
  { num: '04', title: 'Share the story',   desc: 'Publish a stunning shareable map and itinerary link for your crew.' },
];
const trustItems = ['No credit card required', 'Free to start planning', 'Routes saved automatically', 'Share with anyone'];
const tripStyles = ['Budget', 'Comfort', 'Luxury'];

/* ── HOOK: click-outside ──────────────────────────────── */
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(); };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => { document.removeEventListener('mousedown', listener); document.removeEventListener('touchstart', listener); };
  }, [ref, handler]);
}

/* ════════════════════════════════════════════════════════
   DESTINATION POPUP COMPONENT
════════════════════════════════════════════════════════ */
function DestinationPopup({ onSelect, originCurrency, originSymbol }) {
  const [query, setQuery] = useState('');
  const [activeVibe, setActiveVibe] = useState(null);

  const destCurrency = 'INR';
  const destSymbol = '₹';

  const filtered = query.trim()
    ? [...trendingDestinations, ...popularCountries.map(c => ({ id: c.id, name: c.name, country: c.name, flag: c.flag }))]
        .filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.country?.toLowerCase().includes(query.toLowerCase()))
    : null;

  return (
    <div className={styles.popup}>
      {/* Search input */}
      <div className={styles.popupSearch}>
        <Search size={15} className={styles.popupSearchIcon} strokeWidth={2.5} />
        <input
          autoFocus
          type="text"
          className={styles.popupSearchInput}
          placeholder="Search countries, cities, regions…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button className={styles.popupSearchClear} onClick={() => setQuery('')}>
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {filtered ? (
        /* Search results */
        <div className={styles.popupSection}>
          <div className={styles.popupSectionLabel}>Search Results</div>
          <div className={styles.trendingList}>
            {filtered.length ? filtered.map(d => (
              <button key={d.id} className={styles.trendingChip} onClick={() => onSelect(d.name)}>
                <span>{d.flag}</span>
                <span>{d.name}</span>
              </button>
            )) : (
              <p className={styles.popupEmpty}>No results found</p>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Trending Destinations */}
          <div className={styles.popupSection}>
            <div className={styles.popupSectionLabel}>
              <TrendingUp size={11} /> Trending Destinations
            </div>
            <div className={styles.trendingList}>
              {trendingDestinations.map(d => (
                <button key={d.id} className={styles.trendingChip} onClick={() => onSelect(d.name)}>
                  <span>{d.flag}</span>
                  <span>{d.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Browse by Vibe */}
          <div className={styles.popupSection}>
            <div className={styles.popupSectionLabel}>
              <Sparkles size={11} /> Browse by Vibe
            </div>
            <div className={styles.vibeList}>
              {vibes.map(v => (
                <button
                  key={v}
                  className={`${styles.vibeChip} ${activeVibe === v ? styles.vibeChipActive : ''}`}
                  onClick={() => setActiveVibe(v === activeVibe ? null : v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Countries */}
          <div className={styles.popupSection}>
            <div className={styles.popupSectionLabel}>
              <Globe2 size={11} /> Popular Countries
            </div>
            <div className={styles.countryList}>
              {popularCountries.map(c => {
                const convertedBudget = originCurrency !== 'INR'
                  ? formatCurrency(convertCurrency(100000, 'INR', originCurrency), originSymbol)
                  : c.budgetINR;
                return (
                  <button key={c.id} className={styles.countryCard} onClick={() => onSelect(c.name)}>
                    <span className={styles.countryFlag}>{c.flag}</span>
                    <div className={styles.countryInfo}>
                      <span className={styles.countryName}>{c.name}</span>
                      <span className={styles.countryCities}>{c.cities}</span>
                    </div>
                    <div className={styles.countryBudget}>
                      <span className={styles.countryBudgetPrimary}>{c.budgetINR}</span>
                      <span className={styles.countryBudgetSecondary}>{c.budgetUSD}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TRAVELERS POPUP COMPONENT
════════════════════════════════════════════════════════ */
function TravelersPopup({ adults, children, tripStyle, onAdultsChange, onChildrenChange, onStyleChange }) {
  return (
    <div className={`${styles.popup} ${styles.popupTravelers}`}>
      {/* Adults */}
      <div className={styles.travelerRow}>
        <div className={styles.travelerInfo}>
          <span className={styles.travelerLabel}>Adults</span>
          <span className={styles.travelerSub}>Age 13+</span>
        </div>
        <div className={styles.counter}>
          <button
            className={`${styles.counterBtn} ${adults <= 1 ? styles.counterBtnDisabled : ''}`}
            onClick={() => onAdultsChange(Math.max(1, adults - 1))}
            disabled={adults <= 1}
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>
          <span className={styles.counterVal}>{adults}</span>
          <button className={styles.counterBtn} onClick={() => onAdultsChange(adults + 1)}>
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Children */}
      <div className={styles.travelerRow}>
        <div className={styles.travelerInfo}>
          <span className={styles.travelerLabel}>Children</span>
          <span className={styles.travelerSub}>Age 2–12</span>
        </div>
        <div className={styles.counter}>
          <button
            className={`${styles.counterBtn} ${children <= 0 ? styles.counterBtnDisabled : ''}`}
            onClick={() => onChildrenChange(Math.max(0, children - 1))}
            disabled={children <= 0}
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>
          <span className={styles.counterVal}>{children}</span>
          <button className={styles.counterBtn} onClick={() => onChildrenChange(children + 1)}>
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.travelerDivider} />

      {/* Trip Style */}
      <div className={styles.travelerStyleSection}>
        <span className={styles.travelerStyleLabel}>Trip Style</span>
        <div className={styles.styleChips}>
          {tripStyles.map(s => (
            <button
              key={s}
              className={`${styles.styleChip} ${tripStyle === s ? styles.styleChipActive : ''}`}
              onClick={() => onStyleChange(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN LANDING PAGE
════════════════════════════════════════════════════════ */
const LandingPage = () => {
  /* ── State ── */
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate]     = useState('');
  const [endDate, setEndDate]         = useState('');
  const [adults, setAdults]           = useState(2);
  const [children, setChildren]       = useState(0);
  const [tripStyle, setTripStyle]     = useState('Comfort');
  const [originIdx, setOriginIdx]     = useState(0); // default India

  const [showDestPopup, setShowDestPopup]       = useState(false);
  const [showTravelerPopup, setShowTravelerPopup] = useState(false);
  const [showFromPopup, setShowFromPopup]         = useState(false);

  /* ── Refs ── */
  const destRef     = useRef(null);
  const travelerRef = useRef(null);
  const fromRef     = useRef(null);
  const endDateRef  = useRef(null); // auto-focus after start date selected

  /* ── Today as YYYY-MM-DD (local) ── */
  const today = new Date().toLocaleDateString('en-CA'); // 'en-CA' → YYYY-MM-DD

  const closeAll = useCallback(() => {
    setShowDestPopup(false);
    setShowTravelerPopup(false);
    setShowFromPopup(false);
  }, []);

  useClickOutside(destRef,     () => setShowDestPopup(false));
  useClickOutside(travelerRef, () => setShowTravelerPopup(false));
  useClickOutside(fromRef,     () => setShowFromPopup(false));

  /* ── Start date handler: clears end if now invalid, then focuses end ── */
  const handleStartDateChange = (e) => {
    const val = e.target.value;
    setStartDate(val);
    // If end date is before new start, clear it so user re-picks
    if (endDate && endDate < val) setEndDate('');
    // Smoothly guide user to pick end date next
    if (val) {
      setTimeout(() => endDateRef.current?.showPicker?.(), 80);
    }
  };

  /* ── Derived values ── */
  const origin = originCountries[originIdx];
  const travelersLabel = children > 0
    ? `${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children > 1 ? 'ren' : ''}`
    : `${adults} Adult${adults > 1 ? 's' : ''}`;

  const handleSelectDestination = (name) => {
    setDestination(name);
    setShowDestPopup(false);
  };

  const handleSearch = (e) => { e.preventDefault(); };

  return (
    <div className={styles.page}>

      {/* ════════════════════════════════════════
          SECTION 1: HERO
      ════════════════════════════════════════ */}
      <section className={styles.hero} aria-label="Hero">

        {/* LEFT */}
        <div className={styles.heroLeft}>
          <motion.div initial="initial" animate="animate" variants={stagger} className={styles.heroInner}>

            <motion.div variants={fadeUp} transition={transition} className={styles.heroBadge}>
              <Sparkles size={13} strokeWidth={2.5} />
              <span>The 2026 Travel Planning Standard</span>
            </motion.div>

            <motion.h1 variants={fadeUp} transition={transition} className={styles.heroTitle}>
              Plan the trip.<br />
              <span className={styles.heroAccent}>Keep the map.</span>
            </motion.h1>

            <motion.p variants={fadeUp} transition={transition} className={styles.heroSubtitle}>
              Traveloop turns every itinerary into a living travel map — past journeys,
              upcoming routes, budgets, notes, and plans in one clean space.
            </motion.p>

            {/* FROM SELECTOR */}
            <motion.div variants={fadeUp} transition={transition} className={styles.fromSelector} ref={fromRef}>
              <button
                className={styles.fromBtn}
                onClick={() => { setShowFromPopup(p => !p); setShowDestPopup(false); setShowTravelerPopup(false); }}
              >
                <MapPin size={12} strokeWidth={2.5} className={styles.fromIcon} />
                <span className={styles.fromLabel}>From:</span>
                <span className={styles.fromValue}>{origin.flag} {origin.name}</span>
                <ChevronDown size={12} strokeWidth={2.5} className={`${styles.fromChevron} ${showFromPopup ? styles.fromChevronOpen : ''}`} />
              </button>

              <AnimatePresence>
                {showFromPopup && (
                  <motion.div
                    className={`${styles.popup} ${styles.popupFrom}`}
                    variants={popupVariants} initial="hidden" animate="visible" exit="exit"
                  >
                    <div className={styles.popupSectionLabel}>Select your origin country</div>
                    <div className={styles.fromCountryList}>
                      {originCountries.map((c, i) => (
                        <button
                          key={c.code}
                          className={`${styles.fromCountryItem} ${i === originIdx ? styles.fromCountryItemActive : ''}`}
                          onClick={() => { setOriginIdx(i); setShowFromPopup(false); }}
                        >
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                          <span className={styles.fromCurrencyTag}>{c.currency}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* SEARCH PILL */}
            <motion.form variants={fadeUp} transition={transition} className={styles.searchPill} onSubmit={handleSearch}>

              {/* WHERE TO */}
              <div className={styles.searchFieldWrap} ref={destRef}>
                <div
                  className={`${styles.searchField} ${showDestPopup ? styles.searchFieldActive : ''}`}
                  onClick={() => { setShowDestPopup(p => !p); setShowTravelerPopup(false); setShowFromPopup(false); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setShowDestPopup(p => !p)}
                >
                  <label className={styles.fieldLabel}>Where to?</label>
                  <span className={`${styles.fieldInput} ${!destination ? styles.fieldInputPlaceholder : ''}`}>
                    {destination || 'Dubai, Paris, Bali…'}
                  </span>
                </div>

                <AnimatePresence>
                  {showDestPopup && (
                    <motion.div
                      variants={popupVariants} initial="hidden" animate="visible" exit="exit"
                      className={styles.popupWrapper}
                    >
                      <DestinationPopup
                        onSelect={handleSelectDestination}
                        originCurrency={origin.currency}
                        originSymbol={origin.symbol}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.searchDivider} />

              {/* START DATE */}
              <div className={`${styles.searchField} ${startDate ? styles.searchFieldFilled : ''}`}>
                <label className={styles.fieldLabel}>
                  <Calendar size={11} strokeWidth={2.5} style={{ display: 'inline', marginRight: 4 }} />
                  Start
                </label>
                <input
                  type="date"
                  className={styles.fieldInput}
                  value={startDate}
                  min={today}
                  onClick={() => closeAll()}
                  onChange={handleStartDateChange}
                />
              </div>

              <div className={styles.searchDivider} />

              {/* END DATE */}
              <div className={`${styles.searchField} ${endDate ? styles.searchFieldFilled : ''}`}>
                <label className={styles.fieldLabel}>
                  <Calendar size={11} strokeWidth={2.5} style={{ display: 'inline', marginRight: 4 }} />
                  End
                </label>
                <input
                  ref={endDateRef}
                  type="date"
                  className={styles.fieldInput}
                  value={endDate}
                  min={startDate || today}
                  onClick={() => closeAll()}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>

              <div className={styles.searchDivider} />

              {/* TRAVELERS */}
              <div className={styles.searchFieldWrap} ref={travelerRef}>
                <div
                  className={`${styles.searchField} ${showTravelerPopup ? styles.searchFieldActive : ''}`}
                  onClick={() => { setShowTravelerPopup(p => !p); setShowDestPopup(false); setShowFromPopup(false); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setShowTravelerPopup(p => !p)}
                >
                  <label className={styles.fieldLabel}>
                    <Users size={11} strokeWidth={2.5} style={{ display: 'inline', marginRight: 4 }} />
                    Travelers
                  </label>
                  <span className={styles.fieldInput}>{travelersLabel}</span>
                </div>

                <AnimatePresence>
                  {showTravelerPopup && (
                    <motion.div
                      variants={popupVariants} initial="hidden" animate="visible" exit="exit"
                      className={`${styles.popupWrapper} ${styles.popupWrapperRight}`}
                    >
                      <TravelersPopup
                        adults={adults}
                        children={children}
                        tripStyle={tripStyle}
                        onAdultsChange={setAdults}
                        onChildrenChange={setChildren}
                        onStyleChange={setTripStyle}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button type="submit" className={styles.searchBtn}>
                <Search size={18} strokeWidth={2.5} />
                <span>Plan Trip</span>
              </button>
            </motion.form>

            {/* CTAs */}
            <motion.div variants={fadeUp} transition={transition} className={styles.heroCtas}>
              <Link to="/signup"><Button variant="primary" size="lg">Start Planning Free</Button></Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="lg">
                  View Demo
                  <ArrowRight size={16} strokeWidth={2.5} style={{ marginLeft: 6 }} />
                </Button>
              </Link>
            </motion.div>

            {/* Trust Bar */}
            <motion.div variants={fadeUp} transition={transition} className={styles.trustRow}>
              {trustItems.map((t) => (
                <div key={t} className={styles.trustItem}>
                  <Check size={13} strokeWidth={3} className={styles.trustCheck} />
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* RIGHT: Map */}
        <div className={styles.heroRight}>
          <div className={styles.mapFrame}>
            <TravelMap mode="hero" showStats={false} showLegend={true} />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 24, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className={styles.floatingCard}
          >
            <div className={styles.floatingCardTitle}>Your travel stats</div>
            <div className={styles.floatingStats}>
              {[
                { val: '7', label: 'Places',  color: '#10B981' },
                { val: '3', label: 'Planned', color: '#006494' },
                { val: '1', label: 'Active',  color: '#F59E0B' },
              ].map((s) => (
                <div key={s.label} className={styles.floatingStat}>
                  <span style={{ color: s.color, fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#9CA3AF', marginTop: 2 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2: FEATURE STRIP
      ════════════════════════════════════════ */}
      <section className={styles.featureStrip}>
        <div className={styles.featureStripInner}>
          {features.map((f, i) => (
            <motion.div
              key={f.title} className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, ...transition }}
            >
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3: DESTINATIONS
      ════════════════════════════════════════ */}
      <section className={styles.destSection}>
        <div className={styles.destContainer}>
          <div className={styles.sectionHead}>
            <div>
              <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={transition}>
                Trending Destinations
              </motion.h2>
              <p>Where travelers are planning next</p>
            </div>
            <Link to="/cities" className={styles.viewAll}>Explore all <ChevronRight size={16} /></Link>
          </div>
          <div className={styles.destGrid}>
            {dummyCities.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, ...transition }}
              >
                <Link to={`/cities/${city.id}`} className={styles.destCard}>
                  <div className={styles.destImageWrap}>
                    <img src={city.imageUrl} alt={city.name} className={styles.destImage} loading="lazy" />
                    <div className={styles.destOverlay} />
                  </div>
                  <div className={styles.destInfo}>
                    <div className={styles.destCountry}>{city.country}</div>
                    <div className={styles.destName}>{city.name}</div>
                    <div className={styles.destMeta}>
                      <span className={styles.destTag}>{city.costIndex}</span>
                      <span className={styles.destTag}>
                        <Star size={10} strokeWidth={2.5} style={{ display: 'inline', marginRight: 3 }} />
                        {city.popularity}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4: HOW IT WORKS
      ════════════════════════════════════════ */}
      <section className={styles.howSection}>
        <div className={styles.howContainer}>
          <div className={styles.howHead}>
            <motion.div className={styles.howBadge} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <TrendingUp size={13} /> How it works
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              Your next trip deserves more than a notes app
            </motion.h2>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num} className={styles.stepCard}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, ...transition }}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 5: FINAL CTA
      ════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={transition} className={styles.ctaTitle}
          >
            Plan the trip.<br />Keep the map.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15, ...transition }} className={styles.ctaSubtitle}
          >
            Join 150,000+ travelers turning journeys into lifelong living memories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.25, ...transition }} className={styles.ctaBtns}
          >
            <Link to="/signup" className={styles.ctaBtn}>
              Start Planning Free <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <Link to="/login" className={styles.ctaSecondary}>Already have an account?</Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
