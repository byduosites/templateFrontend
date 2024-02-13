import React from 'react';
import Benefits from '@components/template1/Benefits';
import Features from '@components/template1/Features';
import Header from '@components/template1/Header';
import Hero from '@components/template1/Hero';
import Footer from '@components/template1/Footer';
import OurExperts from '@components/template1/OurExperts';
import Blogs from '@components/template1/Blogs';
import PriceTable from '@components/template1/PriceTable';
import Testimonials from '@components/template1/Testimonials';
import BottomCTA from '@components/template1/BottomCTA';

export default function () {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <OurExperts />
      <Blogs />
      <PriceTable />
      <Testimonials />
      <BottomCTA />
      <Footer />
    </div>
  );
}
