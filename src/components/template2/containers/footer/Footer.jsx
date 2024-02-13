import React from 'react'
import gpt3Logo from '../../../../../public/img/template2/logo.svg';
import styles from './footer.module.css';

const Footer = () => (
  <div className={styles.gpt3__footer}>
    <div className={styles.gpt3__footer_heading}>
      <h1 className={styles["gpt3__footer_heading.h1"]}>
        Do you want to step in to the future before others
      </h1>
    </div>

    <div className={styles.gpt3__footer_btn}>
      <p className={styles["gpt3__footer_btn.p"]}>Request Early Access</p>
    </div>

    <div className={styles.gpt3__footer_links}>
      <div className={styles.gpt3__footer_links_logo}>
        {/* <img
          src={gpt3Logo}
          className={styles["gpt3__footer_links_logo.img"]}
          alt="gpt3_logo"
        /> */}
        <div className="text-4xl font-bold">ByDuo</div>
        {/* <p className={styles["gpt3__footer_links_logo.p"]}>
          Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved
        </p> */}
      </div>
      <div className={styles.gpt3__footer_links_div}>
        <h4 className={styles["gpt3__footer_links_div.h4"]}>Links</h4>
        <p className={styles["gpt3__footer_links_div.p"]}>Overons</p>
        <p className={styles["gpt3__footer_links_div.p"]}>Social Media</p>
        <p className={styles["gpt3__footer_links_div.p"]}>Counters</p>
        <p className={styles["gpt3__footer_links_div.p"]}>Contact</p>
      </div>
      <div className={styles.gpt3__footer_links_div}>
        <h4 className={styles["gpt3__footer_links_div.h4"]}>Company</h4>
        <p className={styles["gpt3__footer_links_div.p"]}>
          Terms & Conditions{" "}
        </p>
        <p className={styles["gpt3__footer_links_div.p"]}>Privacy Policy</p>
        <p className={styles["gpt3__footer_links_div.p"]}>Contact</p>
      </div>
      <div className={styles.gpt3__footer_links_div}>
        <h4 className={styles["gpt3__footer_links_div.h4"]}>Get in touch</h4>
        <p className={styles["gpt3__footer_links_div.p"]}>
          Crechterwoord K12 182 DK Alknjkcb
        </p>
        <p className={styles["gpt3__footer_links_div.p"]}>085-132567</p>
        <p className={styles["gpt3__footer_links_div.p"]}>info@payme.net</p>
      </div>
    </div>

    <div className={styles.gpt3__footer_copyright}>
      <p className={styles["gpt3__footer_copyright.p"]}>
        @2024 ByDuo. All rights reserved.
      </p>
    </div>
  </div>
);

export default Footer;
