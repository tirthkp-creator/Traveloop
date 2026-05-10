import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, GripVertical, MapPin, Calendar, Trash2, Search, DollarSign, ChevronRight, LayoutGrid } from 'lucide-react';
import Button from '../../components/Button/Button';
import { dummyActivities } from '../../data/activities';
import { dummyCities } from '../../data/cities';
import styles from './ItineraryBuilder.module.css';

const ItineraryBuilder = () => {
  const { id } = useParams();
  
  const [stops, setStops] = useState([
    { id: 's1', city: 'Paris', days: 3 },
    { id: 's2', city: 'Barcelona', days: 2 }
  ]);

  const [dayPlan, setDayPlan] = useState([
    { id: 'a1', time: '09:00 AM', activity: dummyActivities[0] },
    { id: 'a2', time: '02:00 PM', activity: dummyActivities[1] }
  ]);

  const [activeTab, setActiveTab] = useState('stops'); // mobile only

  return (
    <div className={styles.container}>
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className={styles.header}>
        <div>
          <h1>Trip Builder</h1>
          <p>Summer in Europe · 15 Days</p>
        </div>
        <div className={styles.headerActions}>
          <Link to={`/trips/${id}/view`}>
            <Button variant="outline" size="sm">Preview Plan</Button>
          </Link>
          <Button variant="primary" size="sm">Save Changes</Button>
        </div>
      </header>

      {/* ── MOBILE TABS ───────────────────────────────────── */}
      <div className={styles.mobileTabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'stops' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('stops')}
        >Stops</button>
        <button 
          className={`${styles.tab} ${activeTab === 'plan' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('plan')}
        >Day Plan</button>
        <button 
          className={`${styles.tab} ${activeTab === 'budget' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('budget')}
        >Budget</button>
      </div>

      {/* ── MAIN WORKSPACE ────────────────────────────────── */}
      <div className={styles.layout}>
        
        {/* Panel 1: Trip Stops */}
        <div className={`${styles.panel} ${styles.stopsPanel} ${activeTab !== 'stops' ? styles.hideMobile : ''}`}>
          <div className={styles.panelHeader}>
            <h2>Trip Stops</h2>
            <button className={styles.iconBtn} title="Add Stop">
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>
          <div className={styles.stopsList}>
            {stops.map((stop, index) => (
              <div key={stop.id} className={styles.stopCard}>
                <GripVertical size={16} className={styles.dragIcon} />
                <div className={styles.stopInfo}>
                  <div className={styles.stopCity}>
                    <span className={styles.stopNumber}>{index + 1}</span>
                    {stop.city}
                  </div>
                  <div className={styles.stopDates}>
                    <Calendar size={14} strokeWidth={2.5} /> {stop.days} Days
                  </div>
                </div>
                <button className={styles.deleteBtn} title="Remove Stop">
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
          <div className={styles.addStopBtn}>
            <Button variant="outline" size="sm" style={{ width: '100%' }}>
              <Plus size={18} strokeWidth={2.5} /> Add New Stop
            </Button>
          </div>
        </div>

        {/* Panel 2: Day Timeline */}
        <div className={`${styles.panel} ${styles.planPanel} ${activeTab !== 'plan' ? styles.hideMobile : ''}`}>
          <div className={styles.panelHeader}>
            <div className={styles.daySelector}>
              <select className={styles.select}>
                <option>Day 1 – Paris</option>
                <option>Day 2 – Paris</option>
                <option>Day 3 – Paris</option>
              </select>
            </div>
          </div>
          
          <div className={styles.timeline}>
            {dayPlan.map((item) => (
              <div key={item.id} className={styles.timelineItem}>
                <div className={styles.timeBlock}>{item.time}</div>
                <div className={styles.activityCard}>
                  <div className={styles.activityHeader}>
                    <h4>{item.activity.name}</h4>
                    <span className={styles.activityCost}>${item.activity.cost}</span>
                  </div>
                  <div className={styles.activityMeta}>
                    <span className={styles.activityType}>{item.activity.type}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', fontWeight: '600' }}>
                      • {item.activity.duration}
                    </span>
                  </div>
                  <p>{item.activity.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Activity Search Area */}
          <div className={styles.activitySearch}>
            <div className={styles.searchHeader}>
              <h3>Add Activity to Day 1</h3>
            </div>
            <div className={styles.searchInputWrapper}>
              <Search size={18} strokeWidth={2.5} />
              <input type="text" placeholder="Search experiences, sights, restaurants..." className={styles.searchInput} />
            </div>
            <div className={styles.suggestedActivities}>
              {dummyActivities.map(act => (
                <div key={act.id} className={styles.suggestedItem}>
                  <div>
                    <div className={styles.suggestedName}>{act.name}</div>
                    <div className={styles.suggestedType}>{act.type}</div>
                  </div>
                  <button className={styles.addBtn} title="Add to plan">
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 3: Budget Summary */}
        <div className={`${styles.panel} ${styles.budgetPanel} ${activeTab !== 'budget' ? styles.hideMobile : ''}`}>
          <div className={styles.panelHeader}>
            <h2>Budget</h2>
            <LayoutGrid size={18} strokeWidth={2.5} style={{ color: 'var(--color-ocean)' }} />
          </div>
          <div className={styles.budgetSummaryCard}>
            <div className={styles.totalCost}>
              <span className={styles.totalLabel}>Estimated Total</span>
              <span className={styles.totalAmount}>$1,240</span>
            </div>
            <div className={styles.budgetBreakdown}>
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownLabel}>Flights</span>
                <span className={styles.breakdownValue}>$450</span>
              </div>
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownLabel}>Stays</span>
                <span className={styles.breakdownValue}>$600</span>
              </div>
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownLabel}>Activities</span>
                <span className={styles.breakdownValue}>$190</span>
              </div>
            </div>
            <Link to={`/trips/${id}/budget`} style={{ display: 'block', marginTop: '24px' }}>
              <Button variant="outline" style={{ width: '100%' }} size="sm">
                Open Budget Tracker
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ItineraryBuilder;
