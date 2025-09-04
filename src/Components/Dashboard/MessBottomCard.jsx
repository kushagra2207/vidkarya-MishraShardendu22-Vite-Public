import React from 'react';
import styles from './CSS/MessSchedule.module.css';

const MessBottomCard = ({ meal }) => {
  return (
    <div className={styles.trapezoidBottom}>
      <div className={styles.MessBottomCardIcon}>
        <img src={meal.icons} alt="Icon" width="60" height="60" />
      </div>
      <div className={styles.MessBottomCardName}>{meal.description}</div>
    </div>
  );
};

export default MessBottomCard;
