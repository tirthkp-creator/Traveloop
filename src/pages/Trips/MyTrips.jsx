import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Edit2, Trash2, Eye, Loader2 } from 'lucide-react';
import Button from '../../components/Button/Button';
import GlobalSearchBar from '../../components/SearchBar/GlobalSearchBar';
import FilterChips from '../../components/SearchBar/FilterChips';
import { dummyTrips } from '../../data/trips';
import { tripService } from '../../services/api';
import styles from './MyTrips.module.css';

const STATUS_FILTERS = ['All', 'Upcoming', 'Draft', 'Completed'];

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await tripService.getTrips();
        // Map backend data to frontend structure
        const mappedTrips = data.map(t => ({
          id: t.id,
          name: t.title,
          startDate: t.startDate,
          endDate: t.endDate,
          status: t.status === 'planned' ? 'Upcoming' : 
                  t.status === 'in_progress' ? 'Upcoming' : 
                  t.status === 'visited' ? 'Completed' : 'Draft',
          destinations: t.tripStops ? t.tripStops.map(s => s.city.name) : [],
          coverImage: t.coverPhoto || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
          budget: t.budget ? t.budget.totalEstimatedCost : 0,
          spent: 0 // We'll need a way to track actual spent in future phases
        }));
        setTrips(mappedTrips.length > 0 ? mappedTrips : dummyTrips);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch trips:', err);
        setTrips(dummyTrips); // Fallback to dummy data
        setError('Using offline/preview mode');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filtered = trips.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.destinations.some(d => d.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = activeFilter === 'All' || t.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1>My Trips</h1>
          <p>All your adventures — past, planned, and dreamed.</p>
        </div>
        <Link to="/trips/create">
          <Button variant="primary" size="md">
            <Plus size={18} strokeWidth={2.5} /> New Trip
          </Button>
        </Link>
      </div>

      {/* SEARCH + FILTERS */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <GlobalSearchBar
            placeholder="Search by trip name, city…"
            onSearch={setSearch}
            variant="compact"
          />
        </div>
        <FilterChips
          filters={STATUS_FILTERS}
          active={activeFilter}
          onSelect={setActiveFilter}
        />
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {/* TRIPS GRID */}
      {loading ? (
        <div className={styles.loadingState}>
          <Loader2 size={40} className={styles.spinner} />
          <p>Loading your adventures...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((trip) => (
            <div key={trip.id} className={styles.tripCard}>
              <div className={styles.cardImage}>
                <img src={trip.coverImage} alt={trip.name} loading="lazy" />
                <div className={styles.cardOverlay} />
                <div className={`${styles.statusBadge} ${styles[`status_${trip.status.toLowerCase()}`]}`}>
                  {trip.status}
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.tripName}>{trip.name}</h3>
                <div className={styles.tripMeta}>
                  <span>
                    <Calendar size={13} strokeWidth={2.5} />
                    {new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}
                  </span>
                  <span>
                    <MapPin size={13} strokeWidth={2.5} />
                    {trip.destinations.length > 0 ? trip.destinations.join(' · ') : 'No destinations set'}
                  </span>
                </div>

                {/* Budget bar */}
                <div className={styles.budgetRow}>
                  <div className={styles.budgetBar}>
                    <div
                      className={styles.budgetFill}
                      style={{ width: trip.budget > 0 ? `${Math.min(100, (trip.spent / trip.budget) * 100)}%` : '0%' }}
                    />
                  </div>
                  <span className={styles.budgetLabel}>
                    ${trip.spent.toLocaleString()} / ${trip.budget.toLocaleString()}
                  </span>
                </div>

                <div className={styles.cardActions}>
                  <Link to={`/trips/${trip.id}/view`}>
                    <Button variant="primary" size="sm">
                      <Eye size={14} /> View
                    </Button>
                  </Link>
                  <Link to={`/trips/${trip.id}/builder`}>
                    <Button variant="outline" size="sm">
                      <Edit2 size={14} /> Edit
                    </Button>
                  </Link>
                  <button className={styles.deleteBtn} aria-label="Delete trip">
                    <Trash2 size={15} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* New Trip placeholder card */}
          <Link to="/trips/create" className={styles.newCard}>
            <div className={styles.newCardInner}>
              <div className={styles.newIcon}>
                <Plus size={28} strokeWidth={2} />
              </div>
              <span>Plan a New Trip</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.empty}>
          <MapPin size={40} strokeWidth={1.5} />
          <h3>No trips found</h3>
          <p>Try a different search or filter, or start planning a new adventure.</p>
          <Link to="/trips/create">
            <Button variant="primary" size="md">Plan a Trip</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
