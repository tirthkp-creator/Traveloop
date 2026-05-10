import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, SlidersHorizontal } from 'lucide-react';
import GlobalSearchBar from '../../components/SearchBar/GlobalSearchBar';
import FilterChips from '../../components/SearchBar/FilterChips';
import { dummyCities } from '../../data/cities';
import styles from './Explore.module.css';

const REGION_FILTERS = ['All', 'Asia', 'Europe', 'Middle East', 'Americas', 'Oceania'];
const BUDGET_FILTERS = ['Any Budget', '$', '$$', '$$$', '$$$$'];

const Explore = () => {
  const [search, setSearch]       = useState('');
  const [region, setRegion]       = useState('All');
  const [budget, setBudget]       = useState('Any Budget');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = dummyCities.filter((city) => {
    const q = search.toLowerCase();
    const matchSearch = city.name.toLowerCase().includes(q) || city.country.toLowerCase().includes(q);
    const matchBudget = budget === 'Any Budget' || city.costIndex === budget;
    return matchSearch && matchBudget;
  });

  return (
    <div className={styles.page}>
      {/* HERO SEARCH HEADER */}
      <div className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find Your Next Journey</h1>
          <p className={styles.heroSubtitle}>
            Discover handpicked destinations, hidden gems, and iconic cities.
          </p>
          <div className={styles.searchRow}>
            <div className={styles.searchWrap}>
              <GlobalSearchBar
                placeholder="Search destinations, countries, vibes…"
                onSearch={setSearch}
                variant="hero"
              />
            </div>
            <button
              className={`${styles.filterToggle} ${showFilters ? styles.filterToggleActive : ''}`}
              onClick={() => setShowFilters(f => !f)}
            >
              <SlidersHorizontal size={18} strokeWidth={2} />
              Filters
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className={styles.filterPanel}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Region</span>
                <FilterChips filters={REGION_FILTERS} active={region} onSelect={setRegion} variant="outlined" />
              </div>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Budget Level</span>
                <FilterChips filters={BUDGET_FILTERS} active={budget} onSelect={setBudget} variant="outlined" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RESULTS */}
      <div className={styles.container}>
        <div className={styles.resultsBar}>
          <span className={styles.resultsCount}>
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''}
          </span>
          <div className={styles.activeFilters}>
            {region !== 'All' && <span className={styles.activeChip}>{region}</span>}
            {budget !== 'Any Budget' && <span className={styles.activeChip}>{budget}</span>}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((city, i) => (
              <Link to={`/cities/${city.id}`} key={city.id} className={styles.card}>
                <div className={styles.cardImg}>
                  <img src={city.imageUrl} alt={city.name} loading="lazy" />
                  <div className={styles.cardGrad} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardCountry}>
                    <MapPin size={12} strokeWidth={2.5} />
                    {city.country}
                  </div>
                  <h3 className={styles.cardName}>{city.name}</h3>
                  <p className={styles.cardDesc}>{city.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.costBadge}>{city.costIndex}</span>
                    <span className={styles.popularBadge}>
                      <Star size={11} strokeWidth={2.5} />
                      {city.popularity}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <MapPin size={40} strokeWidth={1.5} />
            <h3>No destinations found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
