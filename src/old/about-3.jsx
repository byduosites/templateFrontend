import Layouts from '../layouts/Layouts';

import { getSortedPostsData } from '@library/posts';

import PageBanner from '@components/PageBanner';
import SubscribeSection from '@components/sections/Subscribe';
import LatestPostsSection from '@components/sections/LatestPosts';
import CallToActionSection from '@components/sections/CallToAction';
import CountersSection from '@components/sections/Counters';

import 'photoswipe/dist/photoswipe.css';

import { Gallery, Item } from 'react-photoswipe-gallery';

const About3 = props => {
  const Content = {
    about1: {
      title: 'My story.',
      text_1:
        'Quo, laborum, dicta! Nobis iure odit recusandae explicabo error.',
      text_2:
        'Lorem ipsum dolor sit amet, consectetur adipisicing. Perspiciatis ipsum vero optio rerum molestiae, sintory ducimus, rem labore et delectus aspernatur! Sequi debitis vero, molestiae tempore eligendi quam sit repudiandae deleniti alias quority accusamus.',
      name: 'Paul Trueman:',
      signature:
        'https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Michael-Jordan-personal-autograph.png',
      image1: '/img/content/21.jpg',
      image2: '/img/content/22.jpg',
      text_3:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate molestias repellat autem accusantium iure facere odit.',
    },
    about2: {
      subtitle: 'Our story',
      title: 'Writing content like you’ve never had before',
      text: 'Exercitationem voluptatibus accusamus amet ratione atque, dolor vel necessitatibus illo ipsa officia, sunt quia magni saepe velit ipsum sapiente blanditiis minima. Voluptatem odit ullam veritatis corrupti officia non aperiam eius vero amet, sed porro blanditiis, harum, quo fugit cupiditate. Maxime quaerat ratione. Nobis consequatur ullam officiis adipisci assumenda, voluptas optio, commodi. Consectetur cupiditate vero.',
    },
    gallery: [
      {
        url: '/img/content/17.jpg',
        width: 1000,
        height: 1500,
      },
      {
        url: '/img/content/20.jpg',
        width: 1000,
        height: 667,
      },
      {
        url: '/img/content/19.jpg',
        width: 1000,
        height: 1500,
      },
      {
        url: '/img/content/18.jpg',
        width: 1000,
        height: 1243,
      },
    ],
  };

  return (
    <Layouts>
      <PageBanner pageImage={'img/content/2.jpg'} pageTitle={'About 2'} />

      {/* about */}
      <div className="container mil-content-frame mil-p-120-90">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-3">
            <h4 className="mil-bold mil-appearance mil-mb-30">
              {Content.about1.title}
            </h4>
            <p className="mil-appearance mil-mb-15">{Content.about1.text_1}</p>
            <p className="mil-appearance mil-mb-10">{Content.about1.text_2}</p>
            <div className="mil-flex mil-appearance align-items-center mil-mb-30">
              <h6 className="mil-mr-30">{Content.about1.name}</h6>
              <img
                src={Content.about1.signature}
                alt="signature"
                className="mil-signature"
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mil-just-image mil-appearance mil-image-vert mil-mb-30">
              <img
                src={Content.about1.image1}
                alt="img"
                className="mil-scale-img"
                data-value-1="1"
                data-value-2="1.2"
                style={{ objectPosition: 'top' }}
              />
            </div>
          </div>

          <div className="col-lg-3 mil-mb-30">
            <div className="mil-just-image mil-image-hori mil-appearance mil-mb-30">
              <img src={Content.about1.image2} alt="img" />
            </div>

            <p className="mil-appearance mil-text-sm mil-mb-30">
              {Content.about1.text_3}
            </p>
          </div>
        </div>
      </div>
      {/* about end */}

      <CountersSection />

      {/* about */}
      <div className="container mil-appearance mil-p-0-90">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <span className="mil-link mil-softened-60 mil-appearance mil-mb-30">
              {Content.about2.subtitle}
            </span>
            <h3 className="mil-appearance mil-mb-30">{Content.about2.title}</h3>
          </div>
          <div className="col-lg-6">
            <p className="mil-appearance mil-mb-30 mil-mt-55-adapt">
              {Content.about2.text}
            </p>
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
                key={`gallery-item-${key}`}
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

      <CallToActionSection bg={'gray'} />
      <LatestPostsSection posts={props.posts} layout={2} imageHorizontal />
      <SubscribeSection />
    </Layouts>
  );
};
export default About3;

export async function getStaticProps() {
  const allPosts = getSortedPostsData();

  return {
    props: {
      posts: allPosts,
    },
  };
}
