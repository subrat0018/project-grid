import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

import { heroImages } from "../../../assets/home/hero/heroImages";

import Button from "../../../components/Button";

const Hero = () => {
  const [curSlideNumber, setcurSlideNumber] = useState(0);
  // const dispatch = useDispatch();
  // const { currImg } = useSelector((store) => store.brand);

  const slideNext = () => {
    curSlideNumber === heroImages.length - 1
      ? setcurSlideNumber(0)
      : setcurSlideNumber(curSlideNumber + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      slideNext();
    }, 2500);

    return () => clearTimeout(timer);
  });

  return (
    <section className="flex w-full items-center bg-bgcolor2 md:min-h-[50vh]">
      <div className="w-full">
        <div className="relative flex flex-col items-center justify-center font-urbanist">
          {/* image */}
          <div className="min-h-[50vh] w-full">
            <img
              src={heroImages[curSlideNumber].img}
              alt="heroImages"
              className="min-h-[50vh] w-full object-cover md:h-[600px]"
            />

            {/* image darker overlay */}
            <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-30"></div>
          </div>

          {/* text */}
          <div className="absolute z-10 space-y-10 px-10 text-center md:px-24 lg:px-64">
            <h1 className="text-sm font-bold uppercase tracking-widest text-white md:text-base">
              {heroImages[curSlideNumber].desc1}
            </h1>
            <p className="font-gotu text-2xl text-white lg:text-5xl lg:leading-snug">
              {heroImages[curSlideNumber].desc2}
            </p>
          </div>

          <div className="absolute bottom-32 md:bottom-43">
            <Button
              navigateTo="/products"
              btnStyle="btn-secondary"
              text={heroImages[curSlideNumber].buttonDesc}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
