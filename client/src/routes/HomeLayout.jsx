import React from 'react';

// import AboutUs from "../pages/customer/home/AboutUs";
import Hero from '../pages/costumer/home/Hero';
import Trending from '../pages/costumer/home/Trending';
import LogoSlider from '../pages/costumer/home/LogoSlider';
import Collection from '../pages/costumer/home/Collection';

export const HomeLayout = () => {
  return (
    <>
      <Hero />
      <Trending />
      <Collection />
      <LogoSlider />
    </>
  );
};
