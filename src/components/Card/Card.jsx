import React from 'react';
import styles from './Card.module.css';

/**
 * Card — Traveloop 2026
 * variants: 'default' | 'glass' | 'elevated' | 'outlined' | 'ocean'
 */
const Card = ({
  children,
  className = '',
  variant = 'default',
  hoverable = false,
  ...props
}) => {
  const variantClass = variant !== 'default' ? styles[variant] : '';
  return (
    <div
      className={`${styles.card} ${variantClass} ${hoverable ? styles.hoverable : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
