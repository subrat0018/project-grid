import React from "react";

import Marquee from "react-fast-marquee";

import { LogoSliderImages } from "../../../assets/home/LogoSlider/LogoSliderImages";

const LogoSlider = () => {
  return (
    <section className="flex w-full items-center bg-[#ffffff]">
      <div className="w-full py-16 pt-11">
        <Marquee gradient={false} speed={30}>
          {LogoSliderImages.map((item) => (
            <div key={item.id} className="mx-14">
              <img src={item.img} alt={item.img} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default LogoSlider;
