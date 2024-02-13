import React from 'react'
import styles from './cta.module.css';

const CTA = () => (
  <div className={styles.gpt3__cta}>
    <div className={styles.gpt3__cta_content}>
      <p className={styles["gpt3__cta_content.p"]}>
        Request Early Access to Get Started
      </p>
      <h3 className={styles["gpt3__cta_content.h3"]}>
        Register Today & start exploring the endless possibilities. 
      </h3>
    </div>
    <div className={styles.gpt3__cta_btn}>
      <button type="button">Get Started</button>
    </div>
  </div>
);

export default CTA;
 