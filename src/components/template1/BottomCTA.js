import React from "react";

function BottomCTA() {
  return (
    <div className="max-w-7xl m-auto px-8 sm:px-12 mt-28">
      <div className="max-w-[968px] m-auto p-5 rounded-[32px] bg-primary flex items-center flex-col md:flex-row justify-between">
        <div className="text-center md:text-left md:max-w-[55%] md:mx-6 lg:mx-10">
          <h3 className="text-[32px] font-semibold leading-[150%] text-white">
            Join 100 Compannies who boost their business with Product
          </h3>
          <button className="px-8 py-2 whitespace-nowrap font-semibold text-lg bg-[#02897A] text-white rounded-md cursor-pointer border-[#02897A] hover:bg-white border-2 hover:text-[#02897A] transition-all duration-200 active:scale-90 mt-12 md:mt-8 lg:mt-12 ">
            Get This
          </button>
        </div>
        <img
          className="mt-6 w-[90%] md:mt-0 md:w-[40%] sm:w-[80%] drop-shadow-2xl"
          src="../img/template1/product-screens-2.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default BottomCTA;
