import { useEffect } from 'react';
// import Data from "@data/sections/about-2.json";
import { countersAnimation } from '@/src/common/counters';
import Link from 'next/link';

const AboutTwoSection = ({ Data }) => {
  useEffect(() => {
    countersAnimation();
  }, []);

  return (
    <div
      className={`${
        Data.type === 'image-text'
          ? 'mil-gray-bg section-bg-gray mil-p-120-120 '
          : ''
      }`}
    >
      <div
        className={`container  ${
          Data.type === 'image-text' ? 'mil-p-0-0' : 'mil-p-120-0'
        }`}
      >
        <div
          className={`row ${
            Data.type === 'image-text'
              ? Data.align === 'right'
                ? 'flex-sm-row-reverse'
                : 'flex-sm-row'
              : 'flex-sm-row-reverse'
          }  justify-content-between align-items-center`}
        >
          <div
            className={`mil-12 col-xl-6 ${
              Data.type === 'image-text'
                ? 'mil-mb-120 lg:mil-mb-0'
                : 'mil-mb-120'
            } `}
          >
            {Data.subtitle && (
              <h3 className="mil-link mil-softened-60 mil-appearance mil-mb-30">
                {Data.subtitle}
              </h3>
            )}
            <h3
              className="mil-appearance mil-mb-30 !font-semibold"
              dangerouslySetInnerHTML={{ __html: Data.title }}
            />
            <p className="mil-appearance mil-mb-30">{Data.description}</p>

            {Data.type === 'image-text' ? (
              <>
                <div className="mil-appearance">
                  <Link
                    href={Data.cta.url}
                    className="mil-button  mil-button-lg mil-scale-down-trigger mil-buttons-space"
                  >
                    <span className="text-white">{Data.cta.label}</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* counters */}
                <div className="mil-flex flex-wrap gap-[25px]">
                  {Data.numbers.map((item, key) => (
                    <div key={`number-item-${key}`} className="mil-mr-0">
                      <p className="mil-link mil-softened-60 mil-appearance align-top">
                        {item.label}
                      </p>
                      <div className="mil-h2 mil-bold mil-appearance">
                        <span className="mil-counter" data-number={item.value}>
                          0
                        </span>
                        <span className="mil-accent">+</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* counters end */}
              </>
            )}
          </div>
          <div
            className={`mil-12 col-xl-5 ${
              Data.type === 'image-text' ? '' : 'mil-mb-120'
            }`}
          >
            {/* collage */}
            <div className="mil-collage-2 mil-appearance">
              <div className="mil-just-image mil-image-square">
                <img
                  src={Data.image.url}
                  alt={Data.image.alt}
                  className="mil-scale-img"
                  data-value-1="1"
                  data-value-2="1.2"
                />
              </div>
            </div>
            {/* collage end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTwoSection;
