import React from 'react'
import styles from './header.module.css';
import people from '../../../../../public/img/template2/people.png';
import ai from '../../../../../public/img/template2/ai.png';

const Header = () => {
  return (
    <div className={styles.gpt3__header} id="home">
      <div className={styles.gpt3__header_content}>
        <h1 className={styles["gpt3__header_content.h1"]}>
          Let's Build Something amazing with GPT-3 OpenAI
        </h1>
        <p className={styles["gpt3__header_content.p"]}>
          Yet bed any for travelling assistance indulgence unpleasing. Not
          thoughts all exercise blessing. Indulgence way everything joy
          alteration boisterous the attachment. Party we years to order allow
          asked of.
        </p>

        <div className={styles.gpt3__header_content__input}>
          <input
            type="email"
            className={styles["gpt3__header_content__input.input"]}
            placeholder="Your Email Address"
          />
          <button
            type="button"
            className={styles["gpt3__header_content__input.button"]}
          >
            Get Started
          </button>
        </div>

        <div className={styles.gpt3__header_content__people}>
          <img
            src="../img/template2/people.png"
            className={styles["gpt3__header_content__people.img"]}
            alt="people"
          />
          <p className={styles["gpt3__header_content__people.p"]}>
            1,600 people requested access a visit in last 24 hours
          </p>
        </div>
      </div>
      <div className={styles.gpt3__header_image}>
        <img
          src="../img/template2/ai.png"
          className={styles["gpt3__header_image.img"]}
          alt="ai"
        />
      </div>
    </div>
  );
}

export default Header
