import React from 'react'
import { Article } from '../../components';
// import {blog01, blog02, blog03, blog04, blog05} from '../../containers/blog/import.js'
// import blog01 from '../../../../../public/img/template2/blog01.png';
// import blog02 from '../../../../../public/img/template2/blog02.png';
// import blog03 from '../../../../../public/img/template2/blog03.png';
// import blog04 from '../../../../../public/img/template2/blog04.png';
// import blog05 from '../../../../../public/img/template2/blog05.png';
import styles from './blog.module.css';

const Blog = () => (
  <div className={styles.gpt3__blog} id="blog">
    <div className={styles.gpt3__blog_heading}>
      <h1 className={styles["gpt3__blog_heading.h1"]}>
        A lot is happening, <br /> We are blogging about it.
      </h1>
    </div>
    <div className={styles.gpt3__blog_container}>
      <div className={styles.gpt3__blog_container_groupA}>
        <Article
          imgUrl="../img/template2/blog01.png"
          date="Jan 26, 2024"
          text="GPT-3 and Open  AI is the future. Let us explore how it is?"
        />
      </div>
      <div className={styles.gpt3__blog_container_groupB}>
        <Article
          imgUrl="../img/template2/blog02.png"
          date="Jan 26, 2024"
          text="GPT-3 and Open  AI is the future. Let us explore how it is?"
        />
        <Article
          imgUrl="../img/template2/blog03.png"
          date="Jan 26, 2024"
          text="GPT-3 and Open  AI is the future. Let us explore how it is?"
        />
        <Article
          imgUrl="../img/template2/blog04.png"
          date="Jan 26, 2024"
          text="GPT-3 and Open  AI is the future. Let us explore how it is?"
        />
        <Article
          imgUrl="../img/template2/blog05.png"
          date="Jan 26, 2024"
          text="GPT-3 and Open  AI is the future. Let us explore how it is?"
        />
      </div>
    </div>
  </div>
);


export default Blog;
