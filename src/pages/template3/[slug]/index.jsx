// import components
import About from '@components/template3/components/About';
import How from '@components/template3/components/How';
import Faq from '@components/template3/components/Faq';
import Testimonials from '@components/template3/components/Testimonials';
import Footer from '@components/template3/components/Footer';
import Copyright from '@components/template3/components/Copyright';
import Hero from '@components/template3/components/Hero';

export default function () {
  return (
    <div className="overflow-hidden max-w-[1600px] mx-auto">
      <Hero />
      <About />
      <How />
      <Faq />
      <Testimonials />
      <Footer />
      <Copyright />
    </div>
  );
}
