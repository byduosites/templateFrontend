import React from 'react'
import styles from './possibility.module.css';

const Possibility = () => (
  <div className={styles.gpt3__possibility} id="possibility">
    <div className={styles.gpt3__possibility_image}>
      <img
        src="../img/template2/possibility.png"
        className={styles["gpt3__possibility_image.img"]}
        alt="possibility"
      />
    </div>
    <div className={styles.gpt3__possibility_content}>
      <h4 className={styles["gpt3__possibility_content.h4"]}>
        Request Early Access to Get Started
      </h4>
      <h1 className={styles["gpt3__possibility_content.h1"]}>
        The possibilities are <br /> beyond your imagination
      </h1>
      <p className={styles["gpt3__possibility_content.p"]}>
        Yet bed any for travelling assistance indulgence unpleasing. Not
        thoughts all exercise blessing. Indulgence way everything joy alteration
        boisterous the attachment. Party we years to order allow asked of.
      </p>
      <h4 className={styles["gpt3__possibility_content.h4"]}>
        Request Early Access to Get Started
      </h4>
    </div>
  </div>
);

export default Possibility;
