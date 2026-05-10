import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp, MapPin } from 'lucide-react';
import styles from './SearchBar.module.css';

const recentSearches = ['Dubai Summer Trip', 'Bali Retreat', 'Paris Itinerary'];
const trendingSuggestions = ['Tokyo Cherry Blossom', 'Goa Beach Escape', 'Manali Winter Drive'];

/**
 * GlobalSearchBar — Traveloop 2026
 * Reusable premium search bar with dropdown suggestions.
 *
 * Props:
 *  placeholder: string
 *  onSearch:    (query) => void
 *  variant:     'default' | 'hero' | 'compact'
 *  className:   string
 */
const GlobalSearchBar = ({
  placeholder = 'Search trips, cities, activities…',
  onSearch,
  variant = 'default',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const showDropdown = focused && query.length === 0;
  const showResults  = focused && query.length > 0;

  const filteredSuggestions = [...recentSearches, ...trendingSuggestions].filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSelect = (term) => {
    setQuery(term);
    setFocused(false);
    onSearch?.(term);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFocused(false);
    onSearch?.(query);
  };

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${styles[variant]} ${focused ? styles.focused : ''} ${className}`}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <Search size={18} strokeWidth={2} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={placeholder}
          className={styles.input}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          autoComplete="off"
        />
        {query && (
          <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
        {variant !== 'compact' && (
          <button type="submit" className={styles.submitBtn}>
            Search
          </button>
        )}
      </form>

      {/* Dropdown */}
      {(showDropdown || showResults) && (
        <div className={styles.dropdown}>
          {showDropdown && (
            <>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownLabel}>
                  <Clock size={13} /> Recent
                </div>
                {recentSearches.map((s) => (
                  <button key={s} className={styles.dropdownItem} onClick={() => handleSelect(s)}>
                    <Clock size={14} className={styles.dropdownItemIcon} />
                    {s}
                  </button>
                ))}
              </div>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownLabel}>
                  <TrendingUp size={13} /> Trending
                </div>
                {trendingSuggestions.map((s) => (
                  <button key={s} className={styles.dropdownItem} onClick={() => handleSelect(s)}>
                    <MapPin size={14} className={styles.dropdownItemIcon} />
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {showResults && filteredSuggestions.length > 0 && (
            <div className={styles.dropdownSection}>
              {filteredSuggestions.map((s) => (
                <button key={s} className={styles.dropdownItem} onClick={() => handleSelect(s)}>
                  <Search size={14} className={styles.dropdownItemIcon} />
                  {s}
                </button>
              ))}
            </div>
          )}

          {showResults && filteredSuggestions.length === 0 && (
            <div className={styles.noResults}>
              No results for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
