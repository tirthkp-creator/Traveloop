import React from 'react';
import { X } from 'lucide-react';
import styles from './FilterChips.module.css';

/**
 * FilterChips — Traveloop 2026
 * Reusable horizontal scroll filter chips.
 *
 * Props:
 *  filters:       string[]
 *  active:        string | string[]
 *  onSelect:      (filter: string) => void
 *  multiSelect:   boolean (default false)
 *  variant:       'default' | 'pill' | 'outlined'
 *  className:     string
 */
const FilterChips = ({
  filters = [],
  active,
  onSelect,
  multiSelect = false,
  variant = 'default',
  className = '',
}) => {
  const isActive = (f) => {
    if (multiSelect && Array.isArray(active)) return active.includes(f);
    return active === f;
  };

  return (
    <div className={`${styles.chips} ${styles[variant]} ${className}`} role="group" aria-label="Filters">
      {filters.map((f) => (
        <button
          key={f}
          className={`${styles.chip} ${isActive(f) ? styles.chipActive : ''}`}
          onClick={() => onSelect?.(f)}
          aria-pressed={isActive(f)}
        >
          {f}
          {multiSelect && isActive(f) && (
            <X size={12} className={styles.chipX} />
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
