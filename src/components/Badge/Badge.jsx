import React from 'react';
import styles from './Badge.module.css';

/**
 * Badge — Traveloop 2026
 * variant: 'default' | 'visited' | 'planned' | 'inProgress' | 'wishlist' | 'draft' |
 *          'ocean' | 'success' | 'warning' | 'danger'
 * showDot: show colored dot indicator before label
 */
const Badge = ({ children, variant = 'default', showDot = false, className = '', ...props }) => {
  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${className}`}
      {...props}
    >
      {showDot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Badge;
