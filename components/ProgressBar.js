import React from 'react';
import styles from '../styles/styles.module.css';

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
