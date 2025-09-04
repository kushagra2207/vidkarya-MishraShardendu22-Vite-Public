import React from 'react';
import styles from './styles/myApplications.module.css';
import MyApplicationCard from './MyApplicationCard';

export default function MyApplications({ applications }) {
  return (
    <div className={styles.appPageWrapper}>
      {applications?.length != 0 ? (
        <div className={styles.appCardsWrapper}>
          {applications.map((applicationData, idx) => {
            return <MyApplicationCard key={idx} applicationData={applicationData} />;
          })}
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingText}>
            Oops ! Looks like you have not applied to any project...
          </span>
        </div>
      )}
    </div>
  );
}
