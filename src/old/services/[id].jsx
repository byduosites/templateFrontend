import Layouts from '@/src/layouts/Layouts';
import PageBanner from '@components/PageBanner';

import { useEffect } from 'react';

import { accordion } from '../../common/utilits';

import Link from 'next/link';

import { getAllServicesIds, getServiceData } from '@library/services';

import CallToActionSection from '@components/sections/CallToAction';
import PricingSection from '@components/sections/Pricing';

const ServiceDetail = ({ postData }) => {
  const Content = {
    title: 'Our top-quality services',
    subtitle: 'Services 1',
    description1:
      "If you're looking for top-quality content that engages, informs, and converts your audience, you've come to the right place. Our experienced team works closely with you to understand your brand and your target audience, and we create content that speaks directly to them.",
    description2:
      "At Lettery, we're committed to providing our clients with the highest level of service and support. Contact us today to learn more about how we can help you achieve your content and social media goals.",
  };

  useEffect(() => {
    accordion();
  }, []);

  return (
    <Layouts>
      <PageBanner pageImage={postData.fullImage} pageTitle={postData.title} />

      {/* service */}
      <div className="container mil-content-frame mil-appearance mil-p-120-120">
        <div className="row justify-content-between">
          <div className="col-lg-4 mil-mb-120">
            <span className="mil-link mil-softened-60 mil-appearance mil-mb-30">
              Services
            </span>
            <h3 className="mil-appearance mil-mb-30">{postData.title}</h3>

            <p className="mil-appearance mil-mb-30">{postData.description}</p>

            <Link
              href={postData.button.link}
              className="mil-button mil-button-lg mil-scale-down-trigger mil-accent-trigger"
            >
              <span>{postData.button.label}</span>
            </Link>
          </div>
          <div className="col-lg-6">
            <div className="mil-accordion">
              {postData.list.map((item, key) => (
                <div
                  className="mil-accordion-group mil-appearance"
                  key={`service-list-${key}`}
                >
                  <div className="mil-accordion-menu">
                    <h6>{item.label}</h6>

                    <div className="mil-accordion-plus">+</div>
                    <div className="mil-accordion-minus">-</div>
                  </div>
                  <div
                    className="mil-accordion-content"
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* service end */}

      <PricingSection />

      <CallToActionSection />
    </Layouts>
  );
};
export default ServiceDetail;

export async function getStaticPaths() {
  const paths = getAllServicesIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getServiceData(params.id);

  return {
    props: {
      postData,
    },
  };
}
