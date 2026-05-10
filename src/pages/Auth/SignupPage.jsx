import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/Button/Button';
import TravelMap from '../../components/TravelMap/TravelMap';
import styles from './Auth.module.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // ── LOGIC UNCHANGED ────────────────────────────────────
  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (email.includes('@') && password.length >= 6) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password (min 6 chars).');
    }
  };

  return (
    <div className={styles.authContainer}>

      {/* ── LEFT — VISUAL PANEL ──────────────────────── */}
      <div className={styles.visualSide}>
        {/* Map background */}
        <div className={styles.visualMapBg}>
          <TravelMap mode="hero" showStats={false} showLegend={false} />
        </div>
        <div className={styles.visualOverlay} />

        <div className={styles.visualContent}>
          {/* Logo */}
          <Link to="/" className={styles.visualLogo}>
            <div className={styles.visualLogoMark}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className={styles.visualBrandName}>Traveloop</span>
          </Link>

          {/* Main copy */}
          <div className={styles.visualMain}>
            <span className={styles.visualTag}>
              <span style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
              Free to start, always
            </span>
            <h1 className={styles.visualTitle}>
              Start your journey with us.
            </h1>
            <p className={styles.visualSubtitle}>
              Create an account to build multi-city itineraries, discover new places, track budgets, and grow your living travel map.
            </p>

            {/* Stats chips */}
            <div className={styles.visualStats}>
              <div className={styles.visualStatChip}>
                <span className={styles.visualStatValue}>Free</span>
                <span className={styles.visualStatLabel}>Always</span>
              </div>
              <div className={styles.visualStatChip}>
                <span className={styles.visualStatValue}>8+</span>
                <span className={styles.visualStatLabel}>Features</span>
              </div>
              <div className={styles.visualStatChip}>
                <span className={styles.visualStatValue}>Live</span>
                <span className={styles.visualStatLabel}>Travel Map</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer switch */}
        <div className={styles.visualFooter}>
          <span>Already have an account?</span>
          <Link to="/login">Log in</Link>
        </div>
      </div>

      {/* ── RIGHT — FORM PANEL ───────────────────────── */}
      <div className={styles.formSide}>
        <div className={styles.formWrapper}>

          {/* Mobile header */}
          <div className={styles.mobileHeader}>
            <Link to="/" className={styles.backLink}>
              <ArrowLeft size={18} />
              Back
            </Link>
            <Link to="/" className={styles.mobileLogo}>
              <div className={styles.mobileLogoMark}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className={styles.mobileBrandName}>Traveloop</span>
            </Link>
          </div>

          {/* Form header */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Create account</h2>
            <p className={styles.formSubtitle}>Start planning your next adventure today.</p>
          </div>

          <form onSubmit={handleSignup} noValidate>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Alex Wanderer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                className={styles.input}
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                className={styles.input}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={styles.submitButton}
            >
              Create my Traveloop account
            </Button>

            <div className={styles.divider}>or</div>

            {/* Bypass / Guest */}
            <div className={styles.guestBypass}>
              <Link to="/dashboard" className={styles.guestBypassBtn}>
                Continue as Guest — no account needed
              </Link>
            </div>

            <p className={styles.toggleAuth}>
              Already have an account? <Link to="/login">Log in</Link>
            </p>

            <p className={styles.termsText}>
              By creating an account you agree to our{' '}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default SignupPage;
