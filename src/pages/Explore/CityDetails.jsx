import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Plus, Heart, CloudSun, Compass, Info, Map, Star, ArrowRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import { dummyCities } from '../../data/cities';
import { dummyActivities } from '../../data/activities';
import styles from './CityDetails.module.css';

const CityDetails = () => {
  const { id } = useParams();
  const city = dummyCities.find(c => c.id === id) || dummyCities[0];

  return (
    <div className={styles.container}>
      {/* ── HERO SECTION ──────────────────────────────────── */}
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <img src={city.imageUrl} alt={city.name} />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div>
            <h1 className={styles.cityName}>{city.name}</h1>
            <div className={styles.cityCountry}>
              <MapPin size={22} strokeWidth={2.5} /> {city.country}
            </div>
          </div>
          <div className={styles.heroActions}>
            <Button 
              variant="white" 
              size="sm" 
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
            >
              <Heart size={20} strokeWidth={2.5} style={{ marginRight: '8px' }} /> Save
            </Button>
            <Link to="/trips/create">
              <Button variant="white" size="sm">
                <Plus size={20} strokeWidth={2.5} style={{ marginRight: '8px' }} /> Add to Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.contentLayout}>
        {/* ── MAIN CONTENT ────────────────────────────────── */}
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Info size={24} strokeWidth={2.5} /> About {city.name}
            </h2>
            <p className={styles.aboutText}>
              {city.name} is a vibrant destination known for its stunning architecture, rich history, and incredible culinary scene. Whether you're looking to explore world-class museums, relax by the beach, or experience the local nightlife, {city.name} offers something for every traveler. Discover the essence of {city.country} in every corner of this magnificent city.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Star size={24} strokeWidth={2.5} /> Top Attractions
            </h2>
            <div className={styles.attractionsGrid}>
              {dummyActivities.slice(0, 4).map((act) => (
                <div key={act.id} className={styles.attractionCard}>
                  <div className={styles.attractionIcon}>
                    <Compass size={24} strokeWidth={2.5} />
                  </div>
                  <div className={styles.attractionInfo}>
                    <h4>{act.name}</h4>
                    <p>{act.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── SIDE PANEL ──────────────────────────────────── */}
        <div className={styles.sidePanel}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <CloudSun size={20} strokeWidth={2.5} /> Weather & Season
            </div>
            <ul className={styles.infoList}>
              <li className={styles.infoListItem}>
                <span className={styles.infoLabel}>Peak Season</span>
                <span className={styles.infoValue}>April – Oct</span>
              </li>
              <li className={styles.infoListItem}>
                <span className={styles.infoLabel}>Average Temp</span>
                <span className={styles.infoValue}>24°C (75°F)</span>
              </li>
              <li className={styles.infoListItem}>
                <span className={styles.infoLabel}>Experience</span>
                <span className={styles.infoValue}>Summer Vibe</span>
              </li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <Map size={20} strokeWidth={2.5} /> Practical Info
            </div>
            <ul className={styles.infoList}>
              <li className={styles.infoListItem}>
                <span className={styles.infoLabel}>Currency</span>
                <span className={styles.infoValue}>Local (EUR)</span>
              </li>
              <li className={styles.infoListItem}>
                <span className={styles.infoLabel}>Language</span>
                <span className={styles.infoValue}>Local (English)</span>
              </li>
              <li className={styles.infoListItem}>
                <span className={styles.infoLabel}>Timezone</span>
                <span className={styles.infoValue}>GMT+2</span>
              </li>
            </ul>
            <Button variant="outline" size="sm" style={{ width: '100%', marginTop: '20px' }}>
              View On Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
