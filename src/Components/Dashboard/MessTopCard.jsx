import React from 'react';
import styles from './CSS/MessSchedule.module.css';

const MessTopCard = ({ meal }) => {
  return (
    <div className={styles.trapezoidTopCard}>
      <div className={styles.MessTopCardIcon}>
        <img src={meal.icons} alt="Icon" width="60" height="60" />
      </div>
      <div className={styles.MessTopCardName}>{meal.description}</div>
    </div>
  );
};

export default MessTopCard;
