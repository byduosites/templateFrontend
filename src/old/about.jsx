import Layouts from '../layouts/Layouts';

import { getSortedPostsData } from '../lib/posts';

import PageBanner from '@/src/components/PageBanner';
import SubscribeSection from '../components/sections/Subscribe';
import LatestPostsSection from '../components/sections/LatestPosts';
import CallToActionSection from '../components/sections/CallToAction';
import AwardsSection from '../components/sections/Awards';
import CountersSection from '../components/sections/Counters';

import 'photoswipe/dist/photoswipe.css';

import { Gallery, Item } from 'react-photoswipe-gallery';

const About = props => {
  const Content = {
    about: {
      subtitle: 'Our story',
      title: "Writing content like you've never had before",
      text_1:
        'Gutem temporibus quae facilis totam, dolorem laborum optio laudantium explicabo quia ea. Officia beatae excepturi adipisci? Nobis consequatur ullam officiis adipisci assumenda, voluptas optio, commodi, soluta itaque error consectetur cupiditate vero voluptatem architecto blanditiis quidem amet. Quod ipsam consequuntur distinctio velit sed ipsum quisquam, itaque placeat error non animi.',
      text_2:
        'Exercitationem voluptatibus accusamus amet ratione atque, dolor vel necessitatibus illo ipsa officia, sunt quia magni saepe velit ipsum sapiente blanditiis minima. Voluptatem odit ullam veritatis corrupti officia non aperiam eius vero amet, sed porro blanditiis, harum, quo fugit cupiditate. Maxime quaerat ratione. Nobis consequatur ullam officiis adipisci assumenda, voluptas optio, commodi. Consectetur cupiditate vero.',
    },
    gallery: [
      {
        url: 'img/content/12.jpg',
        width: 1000,
        height: 1573,
      },
      {
        url: 'img/content/13.jpg',
        width: 1000,
        height: 1065,
      },
      {
        url: 'img/content/14.jpg',
        width: 1000,
        height: 1499,
      },
      {
        url: 'img/content/15.jpg',
        width: 1000,
        height: 792,
      },
    ],
  };

  return (
    <Layouts>
      <PageBanner pageImage={'img/content/4.jpg'} pageTitle={'About'} />

      {/* about */}
      <div className="container mil-content-frame mil-appearance mil-p-120-90">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <span className="mil-link mil-softened-60 mil-appearance mil-mb-30">
              {Content.about.subtitle}
            </span>
            <h3 className="mil-appearance mil-mb-30">{Content.about.title}</h3>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <p className="mil-first-letter mil-appearance mil-mb-30">
                  {Content.about.text_1}
                </p>
              </div>
              <div className="col-lg-6">
                <p className="mil-appearance mil-mb-30">
                  {Content.about.text_2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about end */}

      {/* gallery */}
      <div className="container mil-content-frame mil-gallery-1 mil-p-0-90">
        <div className="row justify-content-between align-items-center mil-appearance">
          <Gallery>
            {Content.gallery.map((item, key) => (
              <div
                className="col-md-6 col-xl-3 mil-mb-30"
                key={`gallery-iten-${key}`}
              >
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
                      className={`mil-just-image${
                        key % 2 == 0 ? ' mil-image-vert' : ' mil-image-square'
                      } mil-icon-3-trigger`}
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
              </div>
            ))}
          </Gallery>
        </div>
      </div>
      {/* gallery end */}

      <CountersSection />
      <AwardsSection />
      <CallToActionSection />
      <LatestPostsSection posts={props.posts} />
      <SubscribeSection />
    </Layouts>
  );
};
export default About;

export async function getStaticProps() {
  const allPosts = getSortedPostsData();

  return {
    props: {
      posts: allPosts,
    },
  };
}
