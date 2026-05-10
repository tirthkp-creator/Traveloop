import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Compass, Map, CheckSquare, TrendingUp,
  Calendar, MapPin, ArrowRight, Search, Wallet, Loader2
} from 'lucide-react';
import Button from '../../components/Button/Button';
import TravelMap from '../../components/TravelMap/TravelMap';
import GlobalSearchBar from '../../components/SearchBar/GlobalSearchBar';
import { dummyTrips } from '../../data/trips';
import { dummyCities } from '../../data/cities';
import { tripService, savedDestinationService, cityService } from '../../services/api';
import styles from './Dashboard.module.css';

const quickActions = [
  { to: '/trips/create', icon: <Plus size={22} strokeWidth={2.5} />,       label: 'Plan Trip',  color: 'ocean'   },
  { to: '/trips',        icon: <Map size={22} strokeWidth={2.5} />,         label: 'My Trips',   color: 'jade'    },
  { to: '/cities',       icon: <Compass size={22} strokeWidth={2.5} />,     label: 'Explore',    color: 'amber'   },
  { to: '/checklist',    icon: <CheckSquare size={22} strokeWidth={2.5} />, label: 'Checklist',  color: 'lavender'},
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState([]);
  const [saved, setSaved] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tripsData, savedData, citiesData] = await Promise.all([
          tripService.getTrips(),
          savedDestinationService.getSaved(),
          cityService.searchCities({ limit: 3 })
        ]);
        
        setTrips(tripsData);
        setSaved(savedData);
        setRecommendations(citiesData.length > 0 ? citiesData : dummyCities.slice(0, 3));
      } catch (err) {
        console.error('Dashboard data fetch failed:', err);
        setTrips(dummyTrips);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const upcomingTrip = trips.find(t => t.status === 'planned' || t.status === 'Upcoming') || (trips.length > 0 ? trips[0] : null);
  
  const spentPct = upcomingTrip && upcomingTrip.budget
    ? Math.min(100, Math.round(((upcomingTrip.spent || 0) / upcomingTrip.budget.totalEstimatedCost) * 100))
    : 0;

  const stats = [
    { val: trips.filter(t => t.status === 'visited' || t.status === 'Completed').length, label: 'Places Visited', color: '#10B981', bg: '#D1FAE5' },
    { val: trips.filter(t => t.status === 'planned' || t.status === 'Upcoming').length, label: 'Trips Planned',  color: '#006494', bg: '#E0F2FA' },
    { val: saved.length, label: 'Wishlist Items', color: '#8B7CF8', bg: '#F3F0FF' },
    { val: trips.filter(t => t.status === 'in_progress').length, label: 'Active Now', color: '#F59E0B', bg: '#FEF3C7' },
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 size={40} className={styles.spinner} />
        <p>Building your travel world...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* ── WELCOME BAR ─────────────────────────────────── */}
      <div className={styles.welcomeBar}>
        <div className={styles.welcomeText}>
          <h1>Where are we going next?</h1>
          <p>Your living travel map and next adventures await.</p>
        </div>
        <div className={styles.welcomeSearch}>
          <GlobalSearchBar
            placeholder="Search trips, cities, activities…"
            onSearch={setSearchQuery}
            variant="default"
          />
        </div>
      </div>

      {/* ── MAP HERO ─────────────────────────────────────── */}
      <div className={styles.mapHero}>
        <TravelMap mode="dashboard" showStats showLegend />
      </div>

      {/* ── DASHBOARD GRID ───────────────────────────────── */}
      <div className={styles.grid}>

        {/* MAIN COLUMN */}
        <div className={styles.mainCol}>

          {/* Quick Actions */}
          <section className={styles.section}>
            <div className={styles.quickActions}>
              {quickActions.map((a) => (
                <Link key={a.to} to={a.to} className={`${styles.actionBtn} ${styles[`action_${a.color}`]}`}>
                  {a.icon}
                  <span>{a.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming Trip */}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Up Next</h2>
              <Link to="/trips" className={styles.viewAll}>
                All trips <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>

            {upcomingTrip ? (
              <div className={styles.upcomingCard}>
                <div className={styles.upcomingImg}>
                  <img src={upcomingTrip.coverPhoto || upcomingTrip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop'} alt={upcomingTrip.title} />
                  <div className={styles.upcomingOverlay} />
                  <div className={styles.upcomingBadge}>Upcoming</div>
                </div>
                <div className={styles.upcomingBody}>
                  <h3 className={styles.upcomingName}>{upcomingTrip.title || upcomingTrip.name}</h3>
                  <div className={styles.upcomingMeta}>
                    <span><Calendar size={14} strokeWidth={2.5} /> {new Date(upcomingTrip.startDate).toLocaleDateString()} – {new Date(upcomingTrip.endDate).toLocaleDateString()}</span>
                    <span><MapPin size={14} strokeWidth={2.5} /> {upcomingTrip.tripStops ? upcomingTrip.tripStops.map(s => s.city.name).join(', ') : upcomingTrip.destinations?.join(', ')}</span>
                  </div>
                  {/* Budget mini bar */}
                  <div className={styles.miniBar}>
                    <div className={styles.miniBarFill} style={{ width: `${spentPct}%` }} />
                  </div>
                  <div className={styles.miniBarLabel}>
                    <span>${(upcomingTrip.spent || 0).toLocaleString()} spent</span>
                    <span>${(upcomingTrip.budget?.totalEstimatedCost || upcomingTrip.budget || 0).toLocaleString()} budget</span>
                  </div>
                  <div className={styles.upcomingActions}>
                    <Link to={`/trips/${upcomingTrip.id}/view`}>
                      <Button variant="primary" size="sm">View Itinerary</Button>
                    </Link>
                    <Link to={`/trips/${upcomingTrip.id}/builder`}>
                      <Button variant="outline" size="sm">Edit Plan</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.emptyCard}>
                <p>No upcoming trips on your map yet.</p>
                <Link to="/trips/create">
                  <Button variant="outline" size="sm">Plan a New Trip</Button>
                </Link>
              </div>
            )}
          </section>

          {/* Recommended Destinations */}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Recommended for you</h2>
              <Link to="/cities" className={styles.viewAll}>
                Explore all <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
            <div className={styles.cityGrid}>
              {recommendations.slice(0, 3).map((city) => (
                <Link to={`/cities/${city.id}`} key={city.id} className={styles.cityCard}>
                  <img src={city.imageUrl} alt={city.name} className={styles.cityImg} loading="lazy" />
                  <div className={styles.cityGrad} />
                  <div className={styles.cityInfo}>
                    <div className={styles.cityName}>{city.name}</div>
                    <div className={styles.cityCountry}>{city.country}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <div className={styles.sideCol}>

          {/* Travel Stats */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Travel Stats</h2>
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statCard} style={{ background: s.bg }}>
                  <span style={{ color: s.color, fontWeight: 800, fontSize: 28, lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.color, opacity: 0.8, marginTop: 4 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Budget Widget */}
          {upcomingTrip && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Budget Overview</h2>
              <div className={styles.budgetWidget}>
                <div className={styles.budgetTop}>
                  <Wallet size={18} strokeWidth={2} className={styles.budgetIcon} />
                  <span>{upcomingTrip.title || upcomingTrip.name}</span>
                </div>
                <div className={styles.budgetAmount}>${(upcomingTrip.budget?.totalEstimatedCost || upcomingTrip.budget || 0).toLocaleString()}</div>
                <div className={styles.budgetBar}>
                  <div className={styles.budgetFill} style={{ width: `${spentPct}%`, background: spentPct > 80 ? '#EF4444' : '#10B981' }} />
                </div>
                <div className={styles.budgetRow}>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>Spent: ${(upcomingTrip.spent || 0).toLocaleString()}</span>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{spentPct}% used</span>
                </div>
                <Link to={`/trips/${upcomingTrip.id}/budget`}>
                  <Button variant="outline" size="sm" style={{ marginTop: 12, width: '100%' }}>View Full Budget</Button>
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
