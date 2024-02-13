import React from 'react';
import Layouts from '../layouts/Layouts';
import dynamic from 'next/dynamic';

import { getSortedPostsData } from '@library/posts';

import HeroOneSection from '@components/sections/HeroOne';
import AboutSection from '@components/sections/About';
import ServicesSection from '@components/sections/Services';
import TeamSection from '@components/sections/Team';
import VideoSection from '@components/sections/Video';
import SubscribeSection from '@components/sections/Subscribe';
import LatestPostsSection from '@components/sections/LatestPosts';
import AboutTwoSection from '@components/sections/AboutTwo';

const TestimonialSlider = dynamic(
  () => import('@components/sliders/Testimonial'),
  { ssr: false }
);

const Home1 = props => {
  return (
    <Layouts noLinks transparent>
      <HeroOneSection />
      <AboutSection />
      <ServicesSection />
      <AboutTwoSection />
      <TeamSection />
      {/* <VideoSection /> */}
      <TestimonialSlider />
      {/* <LatestPostsSection posts={props.posts} /> */}
      {/* <SubscribeSection /> */}
    </Layouts>
  );
};
export default Home1;

export async function getStaticProps() {
  const allPosts = getSortedPostsData();

  return {
    props: {
      posts: allPosts,
    },
  };
}
