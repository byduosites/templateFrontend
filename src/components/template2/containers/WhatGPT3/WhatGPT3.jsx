import React from 'react'
import styles from './whatGPT3.module.css';
import { Feature } from '../../components';

const WhatGpt3 = () => {
  return (
    <div className={styles.gpt3__whatgpt3} id="whpt3">
      <div className={styles.gpt__whatgpt3_feature}>
        <Feature
          title="What is GPT-3"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by."
        />
      </div>
      <div className={styles.gpt3__whatgpt3_heading}>
        <h1 className={styles["gpt3__whatgpt3_heading.h1"]}>
          The possibilities are beyond your imagination
        </h1>
        {/* <h1 className={styles.gradient__text}>
          The possibilities are beyond your imagination
        </h1> */}
        <p className={styles["gpt3__whatgpt3_heading.p"]}>
          Explore the Library
        </p>
      </div>
      <div className={styles.gpt3__whatgpt3_container}>
        <Feature
          title="Chatbots"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
        />
        <Feature
          title="Knowledgebase"
          text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
        />
        <Feature
          title="Education"
          text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
        />
      </div>
    </div>
  );
}

export default WhatGpt3
