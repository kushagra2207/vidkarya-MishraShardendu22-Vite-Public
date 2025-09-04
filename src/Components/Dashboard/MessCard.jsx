import React from 'react';
import styles from './CSS/MessSchedule.module.css';

const MessCard = ({ meal }) => {
  return (
    <div className={styles.MessCardContainer}>
      <div className={styles.icon}>
        <img src={meal.icons} alt="Icon" width="60" height="60" />
      </div>
      <div className={styles.name}>{meal.description}</div>
    </div>
  );
};

export default MessCard;
