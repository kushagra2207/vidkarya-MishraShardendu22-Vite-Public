import React from 'react';
import styles from './warning.module.css';

function Warning() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <span className={styles.head}> Please use Desktop Version </span>
        <hr className={styles.hr} />
        <span className={styles.desc}>
          Thank you for your interest in Vidkarya.
          <br />
          The mobile version of the platform is still under development.
          <br />
          We are as excited as you to launch the mobile version and appreciate your patience.
          <br />
          <b> Coming soon ... </b>
        </span>
        <hr className={styles.hr} />
        <span className={styles.footer}>
          Team <b>Vidkarya</b>
        </span>
      </div>
    </div>
  );
}

export default Warning;
