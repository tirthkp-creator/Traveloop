import React from 'react';
import styles from './EmptyState.module.css';

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action && (
        <div className={styles.actionContainer}>
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
