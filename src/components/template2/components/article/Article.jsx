import React from "react";
import styles from "./article.module.css";

const Article = ({ imgUrl, date, text }) => (
  <div className={styles.gpt3__blog_container_article}>
    <div className={styles.gpt3__blog_container_article_image}>
      <img
        src={imgUrl}
        className={styles.gpt3__blog_container_article_image.img}
        alt="blog_image"
      />
    </div>
    <div className={styles.gpt3__blog_container_article_content}>
      <div>
        <p className={styles["gpt3__blog_container_article_content.p"]}>
          {date}
        </p>
        <h3 className={styles["gpt3__blog_container_article_content.h3"]}>
          {text}
        </h3>
      </div>
      <p>Read Full Article</p>
    </div>
  </div>
);

export default Article;
