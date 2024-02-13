import { lazy, Suspense } from 'react';
import { GlobalStyle } from '../../../../public/js/globalStyles';
const Home = lazy(() => import('@components/template5/Pages/Home'));
const Header = lazy(() =>
  import('@components/template5/components/Header')
);
const Footer = lazy(() =>
  import('@components/template5/components/Footer')
);
const ScrollToTop = lazy(() =>
  import('@components/template5/components/ScrollToTop')
);

export default function () {
  return (
    <>
      <Suspense fallback={null}>
        <GlobalStyle />

        <Header />
        <Home />
        <Footer />
        <ScrollToTop />
      </Suspense>
    </>
  );
}
