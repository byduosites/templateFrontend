import { sliderProps } from '@/src/common/sliderProps';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
// import Data from "@data/sections/hero-1.json";

const HeroOne = ({ Data }) => {
  return (
    <header>
      <div className="mil-hero-1">
        <div className="mil-image-frame">
          <img
            src={Data.bg_image}
            alt="img"
            className="mil-scale-img"
            data-value-1=".5"
            data-value-2="1.2"
            style={{ filter: 'grayscale(100%)' }}
          />
          <div className="mil-overay" />
        </div>

        <div className="container">
          <div className="row mil-p-120-0 justify-content-between">
            <div className="col-md-6 col-lg-6">
              {Data.subtitle && (
                <div className="mil-link mil-appearance mil-softened-60 mil-mb-30">
                  {Data.subtitle}
                </div>
              )}
              <h1 className="mil-light max-[375px]:!text-3xl max-[425px]:!text-4xl !text-5xl lg:!text-6xl !font-semibold !leading-none lg:!leading-tight mil-appearance mb-[30px]">
                {Data.title.before}{' '}
                <span className="mil-accent">{Data.title.accent}</span>{' '}
                {Data.title.after}
              </h1>

              <div className="mil-appearance mil-mb-120">
                <Link
                  href={Data.cta.url}
                  className="mil-button  mil-button-lg mil-scale-down-trigger mil-buttons-space"
                >
                  <span className="text-white">{Data.cta.label}</span>
                </Link>
                {/* <Link href={Data.button2.link} className="mil-link-hover">
                        {Data.button2.label}
                      </Link> */}
              </div>
            </div>
            <div className=" col-md-12 col-lg-5 mil-relative">
              <div className="mil-dots !opacity-50 mil-appearance" />

              <p
                className="mil-text-lg lg:!w-[300px] lg:!ml-auto mi-suptitle mil-appearance mil-mt-55 mil-mb-60"
                dangerouslySetInnerHTML={{ __html: Data.description }}
              />

              <div className="!hidden lg:!block mil-scroll-animation-1 mil-appearance mil-mb-60">
                <i className="fas fa-chevron-down" />
                <i className="fas fa-chevron-down" />
                <i className="fas fa-chevron-down" />
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            <div className="col-12">
              <div className="mil-appearance">
                <div className="mil-just-image">
                  <img
                    src={Data.image}
                    alt="img"
                    className="mil-scale-img"
                    data-value-1="1"
                    data-value-2="1.15"
                    style={{ objectPosition: 'center 25%' }}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 min-h-[100px]">
              {/* partners */}
              <Swiper
                {...sliderProps.milInfinitySlider}
                className="swiper-container mil-infinite-show"
                style={{ display: 'none' }}
              >
                {Data.partners.map((item, key) => (
                  <SwiperSlide
                    key={`hero1-item-${key}`}
                    className="swiper-slide"
                  >
                    <a
                      href={item.link}
                      className="mil-partner-frame mil-hidden-trigger"
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="mil-grayscale mil-opacity"
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* partners end */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeroOne;
