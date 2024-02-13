import React from "react";
// import "../../../public/css/template1/Global.css"
import { MenuIcon } from "@heroicons/react/solid";

function Header() {
  return (
    <header className="max-w-7xl m-auto px-8 sm:px-12 flex justify-between shadow-md md:shadow-none h-20 ">
      {/* <img
        className="md:hidden lg:inline-flex"
        src="../img/template1/logo-full.svg"
        alt=""
        width="180"
      /> */}
      <div className="text-4xl py-4 font-bold">ByDuo.</div>
      <img
        className="hidden md:inline-block lg:hidden"
        src="../img/template1/logo.svg"
        alt=""
        width="45"
      />
      <div className="flex items-center">
        <MenuIcon className="h-10 md:hidden" />
        <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
          <p className="cursor-pointer px-4 hover:font-semibold hover:scale-105 transition transform active:scale-90">
            Product
          </p>
          <p className="cursor-pointer px-4 hover:font-semibold hover:scale-105 transition transform active:scale-90">
            Customers
          </p>
          <p className="cursor-pointer px-4 hover:font-semibold hover:scale-105 transition transform active:scale-90">
            Pricing
          </p>
          <p className="cursor-pointer px-4 hover:font-semibold hover:scale-105 transition transform active:scale-90">
            Resouces
          </p>
          <button className="px-8 py-2 whitespace-nowrap font-semibold text-lg border-2 border-[#BCD0E5] rounded-md cursor-pointer hover:border-[#02897A] hover:text-[#02897A] duration-200 active:scale-90">
            Sign in
          </button>
          <button className="px-8 py-2 whitespace-nowrap font-semibold text-lg bg-[#02897A] text-white rounded-md cursor-pointer border-[#02897A] hover:bg-white border-2 hover:text-[#02897A] transition-all duration-200 active:scale-90">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
