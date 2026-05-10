import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup
} from 'react-simple-maps';
import { Loader2 } from 'lucide-react';
import { defaultMarkers, defaultRoutes, getMapStats } from '../../data/mapMarkers';
import { tripService, savedDestinationService } from '../../services/api';
import styles from './TravelMap.module.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ── STATUS CONFIG ──────────────────────────────────────── */
const STATUS = {
  visited:    { label: 'Visited',     color: '#10B981', bg: '#D1FAE5', pulse: false },
  planned:    { label: 'Planned',     color: '#006494', bg: '#E0F2FA', pulse: true  },
  in_progress: { label: 'In Progress', color: '#F59E0B', bg: '#FEF3C7', pulse: true  },
  wishlist:   { label: 'Wishlist',    color: '#8B7CF8', bg: '#F3F0FF', pulse: false },
};

/* ── ROUTE COLORS ────────────────────────────────────────── */
const ROUTE_COLORS = {
  visited:    '#10B981',
  in_progress: '#F59E0B',
  planned:    '#006494',
  wishlist:   '#8B7CF8',
};

/* ── MAIN COMPONENT ─────────────────────────────────────── */
const TravelMap = ({
  mode = 'dashboard',
  showStats = true,
  showLegend = true,
  className = '',
}) => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        const [trips, saved] = await Promise.all([
          tripService.getTrips(),
          savedDestinationService.getSaved()
        ]);

        const tripMarkers = [];
        trips.forEach(trip => {
          if (trip.tripStops) {
            trip.tripStops.forEach(stop => {
              if (stop.city.latitude && stop.city.longitude) {
                tripMarkers.push({
                  id: stop.id,
                  city: stop.city.name,
                  lat: stop.city.latitude,
                  lng: stop.city.longitude,
                  status: trip.status // visited, planned, in_progress
                });
              }
            });
          }
        });

        const savedMarkers = saved.map(s => ({
          id: s.id,
          city: s.city.name,
          lat: s.city.latitude,
          lng: s.city.longitude,
          status: 'wishlist'
        })).filter(m => m.lat && m.lng);

        const allMarkers = [...tripMarkers, ...savedMarkers];
        setMarkers(allMarkers.length > 0 ? allMarkers : defaultMarkers);
      } catch (err) {
        console.error('Map data fetch failed:', err);
        setMarkers(defaultMarkers);
      } finally {
        setLoading(false);
      }
    };
    fetchMapData();
  }, []);

  const stats = getMapStats(markers);
  const isHero    = mode === 'hero';
  const isCompact = mode === 'compact';

  // For react-simple-maps, coordinates are [longitude, latitude]
  const center    = [20, 20]; // Adjusted center
  const zoom      = isHero ? 1.5 : isCompact ? 1 : 1.3;

  return (
    <div className={`${styles.mapRoot} ${styles[mode]} ${className}`} style={{ background: '#E2F1F8' }}>
      
      {loading && (
        <div className={styles.mapLoading}>
          <Loader2 className={styles.spinner} />
        </div>
      )}

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

          {/* Markers */}
          {markers.map((marker) => {
            const cfg = STATUS[marker.status] || STATUS.planned;
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
            { val: stats.visited || 0,    label: 'Visited',  color: '#10B981' },
            { val: stats.planned || 0,    label: 'Planned',  color: '#006494' },
            { val: stats.in_progress || stats.inProgress || 0, label: 'Active',   color: '#F59E0B' },
            { val: stats.wishlist || 0,   label: 'Wishlist', color: '#8B7CF8' },
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
