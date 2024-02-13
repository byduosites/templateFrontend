import React from 'react'
import styles from './feature.module.css';

const Feature = ({title, text}) => {
  return (
    <div className={styles.gpt3__features_container__feature}>
      <div className={styles.gpt3__features_container__feature_title}>
        <div />
        <h1
          className={
            styles["styles.gpt3__features_container__feature_title.h1"]
          }
        >
          {title}
        </h1>
      </div>
      <div className={styles.gpt3__features_container_feature_text}>
        <p className={styles["styles.gpt3__features_container_feature_text.p"]}>
          {text}
        </p>
      </div>
    </div>
  );
}

export default Feature
