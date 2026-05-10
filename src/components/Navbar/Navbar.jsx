import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Map, Compass, Briefcase, Wallet } from 'lucide-react';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

const NavLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <Map size={16} /> },
  { to: '/trips',     label: 'My Trips',  icon: <Briefcase size={16} /> },
  { to: '/cities',    label: 'Explore',   icon: <Compass size={16} /> },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoMark}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className={styles.brandName}>Travel<span>oop</span></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className={styles.navLinks}>
            {NavLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className={styles.authButtons}>
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/trips/create">
              <Button variant="primary" size="sm">Plan a Trip</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        {NavLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}

        <div className={styles.mobileNavDivider} />

        <div className={styles.mobileAuthButtons}>
          <Link to="/login">
            <Button variant="outline" size="md" style={{ width: '100%' }}>Log in</Button>
          </Link>
          <Link to="/trips/create">
            <Button variant="primary" size="md" style={{ width: '100%' }}>Plan a Trip</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
