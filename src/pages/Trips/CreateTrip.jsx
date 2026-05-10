import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Image as ImageIcon, Calendar, FileText, ArrowLeft, Sparkles, MapPin } from 'lucide-react';
import Button from '../../components/Button/Button';
import styles from './CreateTrip.module.css';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Dummy navigation to builder
    navigate('/trips/t1/builder');
  };

  return (
    <div className={styles.container}>
      {/* ── HEADER ────────────────────────────────────────── */}
      <div className={styles.header}>
        <h1>Plan a New Journey</h1>
        <p>Give your adventure a name and set the stage for your next map pin.</p>
      </div>

      <div className={styles.layout}>
        {/* ── FORM SECTION ────────────────────────────────── */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <form onSubmit={handleSave}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Trip Name</label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  className={styles.input}
                  placeholder="e.g. Summer in the Mediterranean"
                  value={tripData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.dateRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="startDate">Start Date</label>
                  <input 
                    id="startDate"
                    name="startDate"
                    type="date" 
                    className={styles.input}
                    value={tripData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="endDate">End Date</label>
                  <input 
                    id="endDate"
                    name="endDate"
                    type="date" 
                    className={styles.input}
                    value={tripData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="description">Short Description</label>
                <textarea 
                  id="description"
                  name="description"
                  className={styles.textarea}
                  placeholder="What's the vibe of this trip? (Optional)"
                  value={tripData.description}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Cover Image</label>
                <div className={styles.uploadPlaceholder}>
                  <ImageIcon size={32} strokeWidth={1.5} className={styles.uploadIcon} />
                  <div className={styles.uploadText}>Select a cover photo</div>
                  <div className={styles.uploadHint}>JPG, PNG or WEBP · Recommended 1200×800</div>
                </div>
              </div>

              <div className={styles.formActions}>
                <Link to="/dashboard">
                  <Button type="button" variant="outline" size="sm">
                    <ArrowLeft size={16} strokeWidth={2.5} style={{ marginRight: '8px' }} /> Cancel
                  </Button>
                </Link>
                <Button type="submit" variant="primary" size="sm">
                  Start Planning <Sparkles size={16} strokeWidth={2.5} style={{ marginLeft: '8px' }} />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* ── LIVE PREVIEW SECTION ────────────────────────── */}
        <div className={styles.previewSection}>
          <h2>Live Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewImage}>
              <MapPin size={48} strokeWidth={1} />
              <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Preview Mode
              </span>
            </div>
            <div className={styles.previewContent}>
              {tripData.name ? (
                <h3>{tripData.name}</h3>
              ) : (
                <h3 className={styles.emptyPreview}>New Adventure</h3>
              )}
              
              <div className={styles.previewMeta}>
                <span className={styles.previewMetaItem}>
                  <Calendar size={18} strokeWidth={2.5} />
                  {tripData.startDate ? new Date(tripData.startDate).toLocaleDateString() : 'Set Dates'}
                  {tripData.endDate && ` – ${new Date(tripData.endDate).toLocaleDateString()}`}
                </span>
              </div>

              {tripData.description ? (
                <p className={styles.previewDesc}>{tripData.description}</p>
              ) : (
                <p className={`${styles.previewDesc} ${styles.emptyPreview}`}>
                  Add a description to see it here on your trip card.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
