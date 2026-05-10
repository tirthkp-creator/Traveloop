import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/Button/Button';
import TravelMap from '../../components/TravelMap/TravelMap';
import styles from './Auth.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ── LOGIC UNCHANGED ────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
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
              Your travel map awaits
            </span>
            <h1 className={styles.visualTitle}>
              Welcome back to your adventures.
            </h1>
            <p className={styles.visualSubtitle}>
              Log in to manage your itineraries, check your budgets, and keep planning your next big trip.
            </p>

            {/* Stats chips */}
            <div className={styles.visualStats}>
              <div className={styles.visualStatChip}>
                <span className={styles.visualStatValue}>8+</span>
                <span className={styles.visualStatLabel}>Destinations</span>
              </div>
              <div className={styles.visualStatChip}>
                <span className={styles.visualStatValue}>3</span>
                <span className={styles.visualStatLabel}>Active trips</span>
              </div>
              <div className={styles.visualStatChip}>
                <span className={styles.visualStatValue}>24</span>
                <span className={styles.visualStatLabel}>Routes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer switch */}
        <div className={styles.visualFooter}>
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up free</Link>
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
            <h2 className={styles.formTitle}>Log in</h2>
            <p className={styles.formSubtitle}>Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <Link to="#" className={styles.forgotPassword}>Forgot password?</Link>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={styles.submitButton}
            >
              Log in to Traveloop
            </Button>

            <div className={styles.divider}>or</div>

            {/* Bypass / Guest */}
            <div className={styles.guestBypass}>
              <Link to="/dashboard" className={styles.guestBypassBtn}>
                Continue as Guest — no account needed
              </Link>
            </div>

            <p className={styles.toggleAuth}>
              Don't have an account? <Link to="/signup">Sign up free</Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
