import Link from 'next/link';

import { useEffect } from 'react';

import { accordion } from '../../common/utilits';

const Faq = ({ Data }) => {
  useEffect(() => {
    accordion();
  }, []);

  return (
    <div className="mil-gray-bg mil-content-frame mil-appearance mil-p-120-90 -mb-[50px] lg:-mb-[120px]">
      <div className="container">
        <div className="">
          <div className="flex items-center flex-col mil-mb-120">
            <span className="mil-link mil-softened-60 mil-appearance mil-mb-30">
              FAQ
            </span>
            <h3 className="mil-appearance mil-mb-30 text-center !font-semibold">
              {Data?.title}
            </h3>

            <p className="mil-appearance mil-mb-30 text-center">
              Caso ainda tenha alguma dúvida, entre em contato:
            </p>

            <Link
              href={`https://wa.me/${Data.phone}`}
              target="_blank"
              className="mil-button mil-button-lg mil-scale-down-trigger mil-accent-trigger"
            >
              <span>CONTATO</span>
            </Link>
          </div>
          <div className="w-full mil-mb-120">
            <div className="mil-accordion !border-b-0">
              {Data.faq_items.map((item, key) => (
                <div
                  className="mil-accordion-group  mil-appearance"
                  key={`service-list-${key}`}
                >
                  <div className="mil-accordion-menu">
                    <h6 className="pr-[45px] !font-semibold">{item.label}</h6>

                    <div className="mil-accordion-plus">+</div>
                    <div className="mil-accordion-minus text-white">-</div>
                  </div>
                  <div
                    className="mil-accordion-content "
                    dangerouslySetInnerHTML={{
                      __html: `<p>${item.value}</p><br/>`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
