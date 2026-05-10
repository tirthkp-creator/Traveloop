import React from 'react';

/**
 * SVGMarker — Traveloop 2026
 * Four premium custom SVG pin markers for the Living Travel Map.
 *
 * Types:
 *  - visited    → solid jade-green filled pin + inner check stroke
 *  - planned    → ocean-blue outlined pin, semi-transparent fill
 *  - inProgress → amber glowing pin with inner dot
 *  - wishlist   → coral dashed-stroke hollow pin
 *
 * size: number (default 32) — controls overall marker height
 */

export const VisitedMarker = ({ size = 32 }) => {
  const w = size * 0.72;
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Visited destination"
    >
      {/* Drop shadow */}
      <ellipse cx="12" cy="33" rx="5" ry="1.5" fill="rgba(0,0,0,0.18)" />
      {/* Pin body */}
      <path
        d="M12 0C7.032 0 3 4.032 3 9c0 6.75 9 17 9 17s9-10.25 9-17c0-4.968-4.032-9-9-9z"
        fill="url(#visitedGrad)"
      />
      {/* Inner circle */}
      <circle cx="12" cy="9" r="5" fill="rgba(255,255,255,0.25)" />
      {/* Check mark */}
      <path
        d="M9 9.2l2 2 4-4"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="visitedGrad" x1="3" y1="0" x2="21" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const PlannedMarker = ({ size = 32 }) => {
  const w = size * 0.72;
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Planned destination"
    >
      <ellipse cx="12" cy="33" rx="5" ry="1.5" fill="rgba(0,0,0,0.14)" />
      {/* Pin outline */}
      <path
        d="M12 1C7.032 1 3.5 4.532 3.5 9c0 6.75 8.5 16.5 8.5 16.5S20.5 15.75 20.5 9c0-4.468-3.532-8-8.5-8z"
        fill="rgba(0, 100, 148, 0.12)"
        stroke="#006494"
        strokeWidth="1.6"
      />
      {/* Inner ring */}
      <circle cx="12" cy="9" r="4" stroke="#006494" strokeWidth="1.5" fill="rgba(0,100,148,0.08)" />
      {/* Center dot */}
      <circle cx="12" cy="9" r="1.5" fill="#006494" />
    </svg>
  );
};

export const InProgressMarker = ({ size = 36 }) => {
  const w = size * 0.72;
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="In progress destination"
    >
      <ellipse cx="12" cy="33" rx="5" ry="1.5" fill="rgba(0,0,0,0.18)" />
      {/* Pin glow */}
      <path
        d="M12 0C7.032 0 3 4.032 3 9c0 6.75 9 17 9 17s9-10.25 9-17c0-4.968-4.032-9-9-9z"
        fill="url(#activeGrad)"
        filter="url(#glow)"
      />
      {/* Inner white circle */}
      <circle cx="12" cy="9" r="4.5" fill="rgba(255,255,255,0.3)" />
      {/* Center pulse dot */}
      <circle cx="12" cy="9" r="2.5" fill="white" />
      <defs>
        <linearGradient id="activeGrad" x1="3" y1="0" x2="21" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export const WishlistMarker = ({ size = 30 }) => {
  const w = size * 0.72;
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Wishlist destination"
    >
      <ellipse cx="12" cy="33" rx="5" ry="1.5" fill="rgba(0,0,0,0.10)" />
      {/* Dashed pin outline */}
      <path
        d="M12 2C7.582 2 4 5.582 4 10c0 6.5 8 16 8 16s8-9.5 8-16c0-4.418-3.582-8-8-8z"
        fill="rgba(239,68,68,0.06)"
        stroke="#EF4444"
        strokeWidth="1.6"
        strokeDasharray="3 2.5"
        strokeLinecap="round"
      />
      {/* Inner heart */}
      <path
        d="M12 12.5c-.5-1.5-3-2-3-.5 0 1.5 3 4 3 4s3-2.5 3-4c0-1.5-2.5-1-3 .5z"
        fill="#EF4444"
        opacity="0.85"
      />
    </svg>
  );
};

/**
 * Convenience map for getting the correct marker by status string
 */
export const MARKER_MAP = {
  visited:    VisitedMarker,
  planned:    PlannedMarker,
  inProgress: InProgressMarker,
  wishlist:   WishlistMarker,
};
