import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup
} from 'react-simple-maps';
import { defaultMarkers, defaultRoutes, getMapStats } from '../../data/mapMarkers';
import styles from './TravelMap.module.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ── STATUS CONFIG ──────────────────────────────────────── */
const STATUS = {
  visited:    { label: 'Visited',     color: '#10B981', bg: '#D1FAE5', pulse: false },
  planned:    { label: 'Planned',     color: '#006494', bg: '#E0F2FA', pulse: true  },
  inProgress: { label: 'In Progress', color: '#F59E0B', bg: '#FEF3C7', pulse: true  },
  wishlist:   { label: 'Wishlist',    color: '#8B7CF8', bg: '#F3F0FF', pulse: false },
};

/* ── ROUTE COLORS ────────────────────────────────────────── */
const ROUTE_COLORS = {
  visited:    '#10B981',
  inProgress: '#F59E0B',
  planned:    '#006494',
  wishlist:   '#8B7CF8',
};

/* ── MAIN COMPONENT ─────────────────────────────────────── */
const TravelMap = ({
  mode = 'dashboard',
  markers = defaultMarkers,
  routes = defaultRoutes,
  showStats = true,
  showLegend = true,
  className = '',
}) => {
  const stats = getMapStats(markers);
  const isHero    = mode === 'hero';
  const isCompact = mode === 'compact';

  // For react-simple-maps, coordinates are [longitude, latitude]
  const center    = [50, 30]; // Center over Europe/Middle East
  const zoom      = isHero ? 1.5 : isCompact ? 1 : 1.3;

  return (
    <div className={`${styles.mapRoot} ${styles[mode]} ${className}`} style={{ background: '#E2F1F8' }}>
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={center} zoom={zoom} minZoom={1} maxZoom={8}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover:   { fill: "#F1F5F9", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Route Polylines */}
          {routes.map((route, i) => {
            const from = markers.find(m => m.id === route.from);
            const to   = markers.find(m => m.id === route.to);
            if (!from || !to) return null;
            return (
              <Line
                key={i}
                from={[from.lng, from.lat]}
                to={[to.lng, to.lat]}
                stroke={ROUTE_COLORS[route.status] || '#006494'}
                strokeWidth={isHero ? 1.5 : 2}
                strokeLinecap="round"
                strokeDasharray={route.status === 'visited' ? 'none' : '4 4'}
              />
            );
          })}

          {/* Markers */}
          {markers.map((marker) => {
            const cfg = STATUS[marker.status];
            return (
              <Marker key={marker.id} coordinates={[marker.lng, marker.lat]}>
                <circle r={isHero ? 4 : 5} fill={cfg.color} stroke="#FFFFFF" strokeWidth={1.5} />
                <text
                  textAnchor="middle"
                  y={isHero ? -10 : -12}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: isHero ? "6px" : "8px",
                    fontWeight: 700,
                    fill: "#334155",
                    pointerEvents: "none"
                  }}
                >
                  {marker.city}
                </text>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Stats Overlay (dashboard mode) */}
      {showStats && !isHero && !isCompact && (
        <div className={styles.statsOverlay}>
          {[
            { val: stats.visited,    label: 'Visited',  color: '#10B981' },
            { val: stats.planned,    label: 'Planned',  color: '#006494' },
            { val: stats.inProgress, label: 'Active',   color: '#F59E0B' },
            { val: stats.wishlist,   label: 'Wishlist', color: '#8B7CF8' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <div className={styles.statItem}>
                <span className={styles.statValue} style={{ color: s.color }}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
              {i < arr.length - 1 && <div className={styles.statDivider} />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Legend Overlay */}
      {showLegend && !isCompact && (
        <div className={styles.legend}>
          {Object.entries(STATUS).map(([key, cfg]) => (
            <div key={key} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: cfg.color }} />
              <span>{cfg.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelMap;
