import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MoreQPC.module.css';

function MoreQPaperCard({ paper }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/qp/preview/${paper._id}`);
    window.location.reload();
  }

  return (
    <div className={styles.wrapper} onClick={handleNavigate}>
      <div className={styles.leftDiv}>
        <img
          className={styles.coverImg}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSj0-soo67_L3xcoMuUB6Mnu4FPYiFCHBtw&usqp=CAU"
          alt=""
        />
        <div className={styles.desc}>
          <p className={styles.subjectName}>{paper.subjectName}</p>
          <p className={styles.collegeName}> IIIT Dharwad </p>
        </div>
      </div>

      <div className={styles.rightDiv}>
        <p className={styles.faculty}>{paper.faculty}</p>
        <p className={styles.year}>{paper.year}</p>
        <p className={styles.year}>{paper.type}</p>
      </div>
    </div>
  );
}

export default MoreQPaperCard;
