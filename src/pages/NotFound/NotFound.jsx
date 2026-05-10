import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import Button from '../../components/Button/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Compass size={48} />
      </div>
      <h1 className={styles.title}>404 - Off the Map</h1>
      <p className={styles.description}>
        Looks like you've wandered into uncharted territory. The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          <Home size={20} style={{ marginRight: '8px' }} /> Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
