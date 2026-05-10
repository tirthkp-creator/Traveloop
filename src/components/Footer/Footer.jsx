import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Map, Compass, Wallet, Share2,
  Send, ArrowRight, Globe2
} from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.inner}>

        {/* ── TOP ROW ──────────────────────────────────────── */}
        <div className={styles.topRow}>

          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoMark} style={{ background: 'transparent', width: 140, height: 32, padding: 0 }}>
                <img src="/logo.png" alt="Traveloop Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left center' }} />
              </div>
            </Link>
            <p className={styles.tagline}>
              Plan the trip. Keep the map.
            </p>
            <p className={styles.brandDesc}>
              Traveloop is your personal travel command center — turning every journey into a living, shareable map.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="X / Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className={styles.linksGrid}>

            {/* Product */}
            <div className={styles.linkGroup}>
              <h5 className={styles.groupTitle}>Product</h5>
              <ul className={styles.linkList}>
                <li><Link to="/cities" className={styles.footerLink}><ArrowRight size={12} />Explore</Link></li>
                <li><Link to="/trips" className={styles.footerLink}><ArrowRight size={12} />My Trips</Link></li>
                <li><Link to="/trips/t1/budget" className={styles.footerLink}><ArrowRight size={12} />Budget</Link></li>
                <li><Link to="/checklist" className={styles.footerLink}><ArrowRight size={12} />Packing List</Link></li>
                <li><Link to="/dashboard" className={styles.footerLink}><ArrowRight size={12} />Dashboard</Link></li>
              </ul>
            </div>

            {/* Travel */}
            <div className={styles.linkGroup}>
              <h5 className={styles.groupTitle}>Destinations</h5>
              <ul className={styles.linkList}>
                <li><Link to="/cities/c1" className={styles.footerLink}><ArrowRight size={12} />Kyoto</Link></li>
                <li><Link to="/cities/c2" className={styles.footerLink}><ArrowRight size={12} />Santorini</Link></li>
                <li><Link to="/cities/c3" className={styles.footerLink}><ArrowRight size={12} />Bali</Link></li>
                <li><Link to="/cities/c4" className={styles.footerLink}><ArrowRight size={12} />Barcelona</Link></li>
                <li><Link to="/cities" className={styles.footerLink}><ArrowRight size={12} />All Cities</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className={styles.linkGroup}>
              <h5 className={styles.groupTitle}>Company</h5>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />About</a></li>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />Blog</a></li>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />Careers</a></li>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className={styles.linkGroup}>
              <h5 className={styles.groupTitle}>Legal</h5>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />Privacy Policy</a></li>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />Terms of Service</a></li>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />Cookie Policy</a></li>
                <li><a href="#" className={styles.footerLink}><ArrowRight size={12} />Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── NEWSLETTER ────────────────────────────────────── */}
        <div className={styles.newsletterRow}>
          <div className={styles.newsletterContent}>
            <h4 className={styles.newsletterTitle}>Get travel planning ideas</h4>
            <p className={styles.newsletterDesc}>
              Destination guides, budget hacks, and route inspiration — delivered weekly.
            </p>
          </div>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className={styles.successMsg}>
                You're on the list. Happy travels!
              </div>
            ) : (
              <>
                <div className={styles.inputWrap}>
                  <Send size={16} className={styles.inputIcon} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={styles.emailInput}
                    required
                  />
                </div>
                <button type="submit" className={styles.subscribeBtn}>
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* ── BOTTOM BAR ────────────────────────────────────── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Traveloop. Built with purpose for travelers.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy</a>
            <span className={styles.bottomDot} />
            <a href="#" className={styles.bottomLink}>Terms</a>
            <span className={styles.bottomDot} />
            <a href="#" className={styles.bottomLink}>Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
