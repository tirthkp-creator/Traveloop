import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Compass, ClipboardList } from 'lucide-react';
import styles from './MobileBottomNav.module.css';

const navItems = [
  { to: '/dashboard',  label: 'Home',     icon: <LayoutDashboard size={22} /> },
  { to: '/trips',      label: 'Trips',    icon: <Map size={22} /> },
  { to: '/cities',     label: 'Explore',  icon: <Compass size={22} /> },
  { to: '/checklist',  label: 'Checklist',icon: <ClipboardList size={22} /> },
];

const MobileBottomNav = () => {
  return (
    <nav className={styles.bottomNav} aria-label="Mobile navigation">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
          aria-label={label}
        >
          <div className={styles.icon}>{icon}</div>
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileBottomNav;
