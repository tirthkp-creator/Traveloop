/**
 * Default map marker data — Traveloop 2026
 * Real coordinates (lat, lng) for interactive Leaflet map.
 */
export const defaultMarkers = [
  {
    id: 'm1',
    city: 'Goa',
    country: 'India',
    status: 'visited',
    lat: 15.2993,
    lng: 74.1240,
    tripName: 'Beach Chill 2024',
  },
  {
    id: 'm2',
    city: 'Manali',
    country: 'India',
    status: 'planned',
    lat: 32.2432,
    lng: 77.1892,
    tripName: 'Summer Peaks 2026',
  },
  {
    id: 'm3',
    city: 'Dubai',
    country: 'UAE',
    status: 'inProgress',
    lat: 25.2048,
    lng: 55.2708,
    tripName: 'Desert Luxe Loop',
  },
  {
    id: 'm4',
    city: 'Bali',
    country: 'Indonesia',
    status: 'wishlist',
    lat: -8.4095,
    lng: 115.1889,
    tripName: null,
  },
  {
    id: 'm5',
    city: 'Paris',
    country: 'France',
    status: 'visited',
    lat: 48.8566,
    lng: 2.3522,
    tripName: 'Art & Pastries',
  },
  {
    id: 'm6',
    city: 'Singapore',
    country: 'Singapore',
    status: 'planned',
    lat: 1.3521,
    lng: 103.8198,
    tripName: 'City of Future',
  },
  {
    id: 'm7',
    city: 'Jaipur',
    country: 'India',
    status: 'visited',
    lat: 26.9124,
    lng: 75.7873,
    tripName: 'Royal Rajasthan',
  },
];

/**
 * Default route connections — pairs of marker IDs
 */
export const defaultRoutes = [
  { from: 'm5', to: 'm1', status: 'visited' },
  { from: 'm7', to: 'm3', status: 'inProgress' },
  { from: 'm2', to: 'm6', status: 'planned' },
];

/**
 * Map summary stats computed from markers
 */
export const getMapStats = (markers) => ({
  visited:    markers.filter(m => m.status === 'visited').length,
  planned:    markers.filter(m => m.status === 'planned').length,
  inProgress: markers.filter(m => m.status === 'inProgress').length,
  wishlist:   markers.filter(m => m.status === 'wishlist').length,
  total:      markers.length,
});
