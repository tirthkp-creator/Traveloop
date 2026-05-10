import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Map as MapIcon, Globe2, Wallet, Share2,
  Search, ArrowRight, Sparkles, Calendar,
  Users, Check, TrendingUp, Star, ChevronRight
} from 'lucide-react';
import Button from '../../components/Button/Button';
import TravelMap from '../../components/TravelMap/TravelMap';
import { dummyCities } from '../../data/cities';
import styles from './LandingPage.module.css';

/* ── ANIMATION VARIANTS ────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};
const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};
const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

/* ── DATA ─────────────────────────────────────────────── */
const features = [
  { icon: <MapIcon size={22} strokeWidth={1.8} />,  title: 'Living Travel Map',    desc: 'Every trip becomes a pin on your personal interactive globe — past, present, and future.' },
  { icon: <Globe2 size={22} strokeWidth={1.8} />,   title: 'Multi-City Itinerary', desc: 'Chain destinations with smart day-by-day timelines and drag-and-drop activities.' },
  { icon: <Wallet size={22} strokeWidth={1.8} />,   title: 'Smart Budget',         desc: 'Real-time expense tracking by category. Never go over budget on any trip again.' },
  { icon: <Share2 size={22} strokeWidth={1.8} />,   title: 'Share & Collaborate',  desc: 'Publish a beautiful public version of your route for friends or inspiration seekers.' },
];

const steps = [
  { num: '01', title: 'Create your trip', desc: 'Set destinations, travel dates, and add your travel group in minutes.' },
  { num: '02', title: 'Build your route', desc: 'Add cities, activities, and notes. The map updates live as you plan.' },
  { num: '03', title: 'Track everything', desc: 'Monitor your budget, packing list, and itinerary in one clean workspace.' },
  { num: '04', title: 'Share the story', desc: 'Publish a stunning shareable map and itinerary link for your crew.' },
];

const trustItems = [
  'No credit card required',
  'Free to start planning',
  'Routes saved automatically',
  'Share with anyone',
];

/* ── COMPONENT ────────────────────────────────────────── */
const LandingPage = () => {
  const [searchState, setSearchState] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Route to create trip with pre-filled data
  };

  return (
    <div className={styles.page}>

      {/* ════════════════════════════════════════
          SECTION 1: HERO — Split Map Layout
      ════════════════════════════════════════ */}
      <section className={styles.hero} aria-label="Hero">

        {/* LEFT: Content */}
        <div className={styles.heroLeft}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className={styles.heroInner}
          >
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

            {/* Search Pill */}
            <motion.form
              variants={fadeUp}
              transition={transition}
              className={styles.searchPill}
              onSubmit={handleSearch}
            >
              <div className={styles.searchField}>
                <label className={styles.fieldLabel}>Where to?</label>
                <input
                  type="text"
                  placeholder="Dubai, Paris, Bali…"
                  className={styles.fieldInput}
                  value={searchState.destination}
                  onChange={(e) => setSearchState(s => ({ ...s, destination: e.target.value }))}
                />
              </div>
              <div className={styles.searchDivider} />
              <div className={styles.searchField}>
                <label className={styles.fieldLabel}>
                  <Calendar size={11} strokeWidth={2.5} style={{ display:'inline', marginRight:4 }} />
                  Start
                </label>
                <input
                  type="date"
                  className={styles.fieldInput}
                  value={searchState.startDate}
                  onChange={(e) => setSearchState(s => ({ ...s, startDate: e.target.value }))}
                />
              </div>
              <div className={styles.searchDivider} />
              <div className={styles.searchField}>
                <label className={styles.fieldLabel}>
                  <Calendar size={11} strokeWidth={2.5} style={{ display:'inline', marginRight:4 }} />
                  End
                </label>
                <input
                  type="date"
                  className={styles.fieldInput}
                  value={searchState.endDate}
                  onChange={(e) => setSearchState(s => ({ ...s, endDate: e.target.value }))}
                />
              </div>
              <div className={styles.searchDivider} />
              <div className={styles.searchField}>
                <label className={styles.fieldLabel}>
                  <Users size={11} strokeWidth={2.5} style={{ display:'inline', marginRight:4 }} />
                  Travelers
                </label>
                <input
                  type="text"
                  placeholder="2 Adults"
                  className={styles.fieldInput}
                  value={searchState.travelers}
                  onChange={(e) => setSearchState(s => ({ ...s, travelers: e.target.value }))}
                />
              </div>
              <button type="submit" className={styles.searchBtn}>
                <Search size={18} strokeWidth={2.5} />
                <span>Plan Trip</span>
              </button>
            </motion.form>

            {/* CTAs */}
            <motion.div variants={fadeUp} transition={transition} className={styles.heroCtas}>
              <Link to="/signup">
                <Button variant="primary" size="lg">Start Planning Free</Button>
              </Link>
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

        {/* RIGHT: Real Map */}
        <div className={styles.heroRight}>
          <div className={styles.mapFrame}>
            <TravelMap mode="hero" showStats={false} showLegend={true} />
          </div>

          {/* Floating Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 24, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className={styles.floatingCard}
          >
            <div className={styles.floatingCardTitle}>Your travel stats</div>
            <div className={styles.floatingStats}>
              {[
                { val: '7',  label: 'Places',  color: '#10B981' },
                { val: '3',  label: 'Planned', color: '#006494' },
                { val: '1',  label: 'Active',  color: '#F59E0B' },
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
              key={f.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ...transition }}
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
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={transition}
              >
                Trending Destinations
              </motion.h2>
              <p>Where travelers are planning next</p>
            </div>
            <Link to="/cities" className={styles.viewAll}>
              Explore all <ChevronRight size={16} />
            </Link>
          </div>

          <div className={styles.destGrid}>
            {dummyCities.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, ...transition }}
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
                        <Star size={10} strokeWidth={2.5} style={{ display:'inline', marginRight:3 }} />
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
            <motion.div
              className={styles.howBadge}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TrendingUp size={13} />
              How it works
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Your next trip deserves more than a notes app
            </motion.h2>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ...transition }}
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
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={transition}
            className={styles.ctaTitle}
          >
            Plan the trip.<br />Keep the map.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, ...transition }}
            className={styles.ctaSubtitle}
          >
            Join 150,000+ travelers turning journeys into lifelong living memories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, ...transition }}
            className={styles.ctaBtns}
          >
            <Link to="/signup" className={styles.ctaBtn}>
              Start Planning Free
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <Link to="/login" className={styles.ctaSecondary}>
              Already have an account?
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
