// import React from "react";
// //rotas
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// //pages
// import Home from "@components/template4/pages/Home";
// import About from "@components/template4/pages/About";
// import Contact from "@components/template4/pages/Contact";
// //componentes
// import Navbar from "@components/template4/components/Navbar";
// import Footer from "@components/template4/components/Footer/Footer";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/template4" element={<Home />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </BrowserRouter>
//       <Footer />
//     </>
//   );
// }

// export default App;

import React from 'react';
import GetInTouch from '@components/template4/components/GetInTouch';
import GetStarted from '@components/template4/components/GetStarted';
import Header from '@components/template4/components/Header';
import Details from '@components/template4/components/Details';
import Content from '@components/template4/components/Content';
import Navbar from '@components/template4/components/Navbar';
import Footer from '@components/template4/components/Footer/Footer';

export default function () {
  return (
    <>
      <Navbar />
      <Header />
      <GetStarted />
      <Content />
      <Details />
      <GetInTouch />
      <Footer />
    </>
  );
}
