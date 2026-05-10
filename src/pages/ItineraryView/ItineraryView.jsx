import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Share2, Edit3, List, Calendar as CalendarIcon, Clock, DollarSign, ChevronRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import { dummyActivities } from '../../data/activities';
import styles from './ItineraryView.module.css';

const ItineraryView = () => {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Dummy final itinerary data
  const itineraryData = {
    name: 'Summer in Europe',
    coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop',
    startDate: '2026-07-10',
    endDate: '2026-07-25',
    totalCost: 1240,
    cities: [
      {
        id: 'c1',
        name: 'Paris',
        days: [
          {
            date: '2026-07-10',
            title: 'Day 1: Arrival & Classics',
            activities: [
              { id: 'a1', time: '10:00 AM', ...dummyActivities[0] },
              { id: 'a3', time: '04:00 PM', ...dummyActivities[2] }
            ]
          },
          {
            date: '2026-07-11',
            title: 'Day 2: Art & Food',
            activities: [
              { id: 'a2', time: '09:30 AM', ...dummyActivities[1] },
              { id: 'a4', time: '02:00 PM', ...dummyActivities[3] }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className={styles.container}>
      {/* ── HERO SECTION ──────────────────────────────────── */}
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <img src={itineraryData.coverImage} alt={itineraryData.name} />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div>
            <h1 className={styles.tripTitle}>{itineraryData.name}</h1>
            <div className={styles.tripMeta}>
              <span className={styles.metaItem}>
                <Calendar size={18} strokeWidth={2.5} />
                {new Date(itineraryData.startDate).toLocaleDateString()} – {new Date(itineraryData.endDate).toLocaleDateString()}
              </span>
              <span className={styles.metaItem}>
                <MapPin size={18} strokeWidth={2.5} />
                {itineraryData.cities.length} Cities
              </span>
            </div>
          </div>
          <div className={styles.heroActions}>
            <Button 
              variant="white" 
              size="sm" 
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
            >
              <Share2 size={18} strokeWidth={2.5} style={{ marginRight: '8px' }} /> Share
            </Button>
            <Link to={`/trips/${id}/builder`}>
              <Button variant="white" size="sm">
                <Edit3 size={18} strokeWidth={2.5} style={{ marginRight: '8px' }} /> Edit Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <div className={styles.statsContainer}>
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{itineraryData.cities.length}</span>
            <span className={styles.statLabel}>Destinations</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>15</span>
            <span className={styles.statLabel}>Days</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>${itineraryData.totalCost}</span>
            <span className={styles.statLabel}>Est. Budget</span>
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA ──────────────────────────────────── */}
      <div className={styles.contentArea}>
        <div className={styles.controlsRow}>
          <h2>Itinerary Details</h2>
          <div className={styles.viewToggles}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} strokeWidth={2.5} /> List
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'calendar' ? styles.active : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon size={16} strokeWidth={2.5} /> Calendar
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className={styles.timeline}>
            {itineraryData.cities.map(city => (
              <div key={city.id} className={styles.cityBlock}>
                <div className={styles.cityHeader}>
                  <MapPin size={24} strokeWidth={2.5} />
                  <h2>{city.name}</h2>
                </div>
                
                <div className={styles.daysContainer}>
                  {city.days.map((day, dIdx) => (
                    <div key={dIdx} className={styles.dayBlock}>
                      <div className={styles.dayHeader}>
                        <span>{day.title}</span>
                        <span className={styles.dayDate}>• {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      
                      <div className={styles.activityList}>
                        {day.activities.map(act => (
                          <div key={act.id} className={styles.activityItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.activityCard}>
                              <div className={styles.activityTime}>
                                <Clock size={14} strokeWidth={3} style={{ marginRight: '6px' }}/>
                                {act.time}
                              </div>
                              <div className={styles.activityHeader}>
                                <h3 className={styles.activityName}>{act.name}</h3>
                                <span className={styles.activityCost}>${act.cost}</span>
                              </div>
                              <p>{act.description}</p>
                              <div className={styles.activityMeta}>
                                <span className={styles.activityType}>{act.type}</span>
                                <span className={styles.activityDuration}>• {act.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.calendarView}>
            <CalendarIcon size={48} strokeWidth={1.5} style={{ opacity: 0.2, marginBottom: '16px' }} />
            <h3>Calendar View</h3>
            <p>Interactive calendar visualization is coming soon to your travel maps.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryView;
