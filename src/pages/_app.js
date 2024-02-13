import React from "react";
import Head from "next/head";

import "../styles/globals.css";
import "../styles/scss/style.scss";

import dynamic from "next/dynamic";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <Head>
          {/* seo begin */}
          <title>Lettery</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* seo end */}
        </Head>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
