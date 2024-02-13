import React from "react";
import styles from "./brand.module.css";

const Brand = () => (
  <div className={styles.gpt3__brand}>
    <div>
      <img src="../img/template2/google.png" alt="google" />
    </div>
    <div>
      <img src="../img/template2/slack.png" alt="slack" />
    </div>
    <div>
      <img src="../img/template2/atlassian.png" alt="atlassian" />
    </div>
    <div>
      <img src="../img/template2/dropbox.png" alt="dropbox" />
    </div>
    <div>
      <img src="../img/template2/shopify.png" alt="shopify" />
    </div>
  </div>
);

export default Brand;
