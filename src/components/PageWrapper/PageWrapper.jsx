import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MobileBottomNav from '../MobileBottomNav/MobileBottomNav';
import styles from './PageWrapper.module.css';

/**
 * PageWrapper — wraps every page with Navbar + Footer + MobileNav.
 * Props:
 *  hideNav:    hide navbar (auth pages)
 *  hideFooter: hide footer (builder pages)
 */
const PageWrapper = ({ children, hideNav = false, hideFooter = false }) => {
  return (
    <div className={styles.wrapper}>
      {!hideNav && <Navbar />}
      <main className={`${styles.mainContent} ${hideNav ? styles.noNav : ''}`}>
        {children}
      </main>
      {!hideNav && !hideFooter && <Footer />}
      {!hideNav && <MobileBottomNav />}
    </div>
  );
};

export default PageWrapper;
