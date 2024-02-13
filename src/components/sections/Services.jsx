// import Data from "@data/sections/services.json";
import Link from 'next/link';

const ServicesSection = ({ Data }) => {
  return (
    <div
      className={`mil-services-1  ${
        Data.type === 'topics' && Data.index !== 0 ? '' : ''
      } mil-pseudo-hover-el`}
    >
      {/* background image */}
      <div
        className="mil-just-image mil-section-bg mil-scale-img"
        data-value-1="1"
        data-value-2="1.1"
      >
        <img src={Data.bg_image} alt="image" />
      </div>
      <div className="mil-gradient-overlay"></div>

      <div className="row ">
        {Data.items.map((item, key) => (
          <div
            className="col-12 col-sm-6 col-lg-3 p-0"
            key={`services-item-${key}`}
          >
            {/* service card */}
            <div className="mil-card-1 !min-h-[340px] lg:!min-h-0 mil-complex-hover  mil-pseudo-hover">
              <div className="mil-cover mil-long"></div>
              <div className="mil-overlay mil-inside flex !justify-between">
                <div className="mil-top-hidden mil-flex justify-content-between">
                  {/* <div className="mil-icon mil-accent">
                                <img src={item.icon} alt={item.title} />
                            </div> */}
                  {/* number */}
                  <div className="mil-text-lg mil-softened-30">{item.num}</div>
                </div>
                <div className="mil-bottom-part">
                  {/* text */}
                  <h5 className="mil-light mil-mb-20 !font-semibold">
                    {item.title}
                  </h5>
                  <p className="mil-hidden-part mil-softened-30">{item.text}</p>
                </div>
              </div>
            </div>
            {/* service card end */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
