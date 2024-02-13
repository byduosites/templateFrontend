import { useEffect } from 'react';
import Layouts from '../layouts/Layouts';

import { sliderProps } from '@/src/common/sliderProps';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getSortedPostsData } from '@library/posts';

import PageBanner from '@components/PageBanner';
import SubscribeSection from '@components/sections/Subscribe';
import LatestPostsSection from '@components/sections/LatestPosts';
import CallToActionSection from '@components/sections/CallToAction';
import CountersSection from '@components/sections/Counters';

import 'photoswipe/dist/photoswipe.css';

import { Gallery, Item } from 'react-photoswipe-gallery';

import { cursorSwiperAnimation } from '@/src/common/cursor';

const About2 = props => {
  useEffect(() => {
    cursorSwiperAnimation();
  }, []);

  const Content = {
    about1: {
      subtitle: 'Our story.',
      title: 'A professional writer makes a big difference.',
      text_1:
        'Lorem ipsum dolor sit amet, consectetur adipisicing. Perspiciatis ipsum vero optio rerum molestiae, sintory ducimus, rem labore et delectus aspernatur! Sequi debitis vero, molestiae tempore eligendi quam sit repudiandae deleniti alias quority accusamus.',
      text_2:
        'Sequi debitis dolor sit amet, consectetur adipisicing. Perspiciatis ipsum vero optio rerum molestiae, sintory ducimus, rem labore et delectus aspernatur! Sequi debitis vero.',
      image1: '/img/content/1.jpg',
      image2: '/img/content/2.jpg',
      rotateText: 'About us - About us - about us - ',
    },
    about2: {
      subtitle: 'Our story',
      title: 'Writing content like you’ve never had before',
      text_1:
        'Gutem temporibus quae facilis totam, dolorem laborum optio laudantium explicabo quia ea. Officia beatae excepturi adipisci? Nobis consequatur ullam officiis adipisci assumenda, voluptas optio, commodi, soluta itaque error consectetur cupiditate vero voluptatem architecto blanditiis quidem amet. Quod ipsam consequuntur distinctio velit sed ipsum quisquam, itaque placeat error non animi.',
      text_2:
        'Exercitationem voluptatibus accusamus amet ratione atque, dolor vel necessitatibus illo ipsa officia, sunt quia magni saepe velit ipsum sapiente blanditiis minima. Voluptatem odit ullam veritatis corrupti officia non aperiam eius vero amet, sed porro blanditiis, harum, quo fugit cupiditate. Maxime quaerat ratione. Nobis consequatur ullam officiis adipisci assumenda, voluptas optio, commodi. Consectetur cupiditate vero.',
    },
    gallery: [
      {
        url: '/img/content/8.jpg',
        width: 1000,
        height: 1500,
      },
      {
        url: '/img/content/9.jpg',
        width: 1920,
        height: 1280,
      },
      {
        url: '/img/content/10.jpg',
        width: 1000,
        height: 1500,
      },
      {
        url: '/img/content/11.jpg',
        width: 1920,
        height: 1440,
      },
    ],
  };

  return (
    <Layouts>
      <PageBanner pageImage={'img/content/2.jpg'} pageTitle={'About 2'} />

      {/* about */}
      <div className="container mil-content-frame mil-p-120-0">
        <div className="row justify-content-between align-items-center">
          <div className="mil-12 col-xl-5 mil-mb-120">
            <div className="mil-link mil-softened-60 mil-appearance mil-mb-30">
              {Content.about1.subtitle}
            </div>
            <h3 className="mil-appearance mil-mb-30">{Content.about1.title}</h3>
            <p className="mil-appearance mil-mb-30">{Content.about1.text_1}</p>
            <p className="mil-appearance mil-mb-30">{Content.about1.text_2}</p>
          </div>
          <div className="mil-12 col-xl-6 mil-mb-120">
            {/* collage */}
            <div className="mil-collage-1">
              <div
                className="mil-circle-text-position"
                style={{ bottom: '62%', left: '-75px' }}
              >
                <div
                  className="mil-circle-text mil-rotate mil-accent-inside mil-appearance"
                  data-value="360"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 300 300"
                    enableBackground="new 0 0 300 300"
                    xmlSpace="preserve"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
                      />
                    </defs>
                    <circle cx="150" cy="100" r="75" fill="none" />
                    <g>
                      <use xlinkHref="#circlePath" fill="none" />
                      <text
                        className="mil-link mil-dark"
                        style={{ letterSpacing: '5.5px' }}
                      >
                        {/* circle text */}
                        <textPath xlinkHref="#circlePath"></textPath>
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mil-image-1 mil-appearance">
                <div className="mil-just-image mil-image-square">
                  {/* back image */}
                  <img
                    src={Content.about1.image1}
                    alt="img"
                    className="mil-scale-img"
                    data-value-1="1"
                    data-value-2="1.2"
                  />
                </div>
              </div>
              <div className="mil-image-2 mil-appearance">
                <div className="mil-just-image">
                  {/* front image */}
                  <img
                    src={Content.about1.image2}
                    alt="img"
                    style={{ objectPosition: 'right' }}
                  />
                </div>
              </div>
            </div>
            {/* collage end */}
          </div>
        </div>
      </div>
      {/* about end */}

      {/* about */}
      <div className="container mil-content-frame mil-appearance mil-p-0-90">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <span className="mil-link mil-softened-60 mil-appearance mil-mb-30">
              {Content.about2.subtitle}
            </span>
            <h3 className="mil-appearance mil-mb-30">{Content.about2.title}</h3>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <p className="mil-first-letter mil-appearance mil-mb-30">
                  {Content.about2.text_1}
                </p>
              </div>
              <div className="col-lg-6">
                <p className="mil-appearance mil-mb-30">
                  {Content.about2.text_2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about end */}

      {/* gallery */}
      <div className="container mil-p-0-120">
        <Gallery>
          <Swiper
            {...sliderProps.milGallerySlider}
            className="swiper-container mil-gallery-slider mil-appearance"
          >
            {Content.gallery.map((item, key) => (
              <SwiperSlide className="swiper-slide" key={`gallery-item-${key}`}>
                <Item
                  original={item.url}
                  thumbnail={item.url}
                  width={item.width}
                  height={item.height}
                >
                  {({ ref, open }) => (
                    <a
                      data-fancybox="gallery"
                      data-no-swup
                      ref={ref}
                      onClick={open}
                      className="mil-just-image mil-image-hori mil-icon-3-trigger"
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={item.url}
                        alt="img"
                        className="mil-scale-img"
                        data-value-1="1"
                        data-value-2="1.2"
                      />
                    </a>
                  )}
                </Item>
              </SwiperSlide>
            ))}
          </Swiper>
        </Gallery>
      </div>
      {/* gallery end */}

      <CountersSection />
      <CallToActionSection />
      <LatestPostsSection posts={props.posts} layout={2} />
      <SubscribeSection />
    </Layouts>
  );
};
export default About2;

export async function getStaticProps() {
  const allPosts = getSortedPostsData();

  return {
    props: {
      posts: allPosts,
    },
  };
}
