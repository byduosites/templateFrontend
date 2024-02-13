import {
  ClockIcon,
  CursorClickIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import React from "react";
import Feature from "./FeatureItem";

function Features() {
  return (
    <section className="max-w-7xl m-auto px-8 sm:px-12 mt-24 flex flex-col items-center">
      <h2 className="text-[32px] font-bold text-center sm:text-left">
        Product was Built Specifically for You
      </h2>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <Feature
          Icon={CursorClickIcon}
          title="First Click Test"
          iconBgColor="#02897A"
          description="While most people enjoy casino gambling,"
        />
        <Feature
          Icon={UsersIcon}
          iconBgColor="#4D8DFF"
          title="First Click Test"
          description="While most people enjoy casino gambling,"
        />
        <Feature
          Icon={HeartIcon}
          iconBgColor="#740A76"
          title="First Click Test"
          description="While most people enjoy casino gambling,"
        />
        <Feature
          Icon={ClockIcon}
          iconBgColor="#F03E3D"
          title="First Click Test"
          description="While most people enjoy casino gambling,"
        />
      </div>

      <button className="px-8 py-2 whitespace-nowrap font-semibold text-lg bg-[#02897A] text-white rounded-md cursor-pointer border-[#02897A] hover:bg-white border-2 hover:text-[#02897A] transition-all duration-200 active:scale-90 mt-14">
        Sign up Now
      </button>
    </section>
  );
}

export default Features;
