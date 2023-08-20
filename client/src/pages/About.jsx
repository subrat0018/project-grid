import React from 'react';
import { about } from '../assets/about';
import Table from '../components/Table';

const About = () => {
  return (
    <main className="min-h-screen w-full bg-bgcolor2">
      <div className="container mx-auto space-y-16 px-6 py-6 md:space-y-32 md:pb-32 lg:px-16">
        {/* header */}
        <div className="mt-20 flex flex-col items-center space-y-8">
          <h1 className="font-raleway text-xl font-bold text-primary md:text-2xl lg:text-4xl">
            blockducts
          </h1>
          <p className="flex w-4/5 flex-col space-y-6 text-center font-gotu text-lg text-secondary md:text-xl">
            <span>Buy products using FlipCoins</span>
            <span> 
"Elevate Your Loyalty Experience: Where Tokens Fuel Rewards and Trust is Transparent."
            </span>
          </p>
        </div>

        {/* grid container */}
        <div className="grid gap-8 p-6 pt-3 md:grid-cols-2 md:gap-24">
          <div className="space-y-4 self-center">
            <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              {about[0].name}
            </h2>
            <ul className="list-disc font-gotu text-base text-secondary md:text-lg lg:text-xl">
              {about[0].desc.map((des) => (
                <li>{des}</li>
              ))}
            </ul>
          </div>

          <img
            className="h-64 w-full overflow-hidden rounded-lg object-cover md:h-96"
            src={about[0].img}
            alt="/"
          />

          <div className="space-y-4 self-center md:col-start-2 md:row-start-2">
            <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              {about[1].name}
            </h2>
            <p className="font-gotu text-base text-secondary md:text-lg lg:text-xl">
              {about[1].desc.map((des) => (
                <li>{des}</li>
              ))}
            </p>
          </div>

          <img
            className="h-64 w-full overflow-hidden rounded-lg object-cover md:h-96"
            src={about[1].img}
            alt="/"
          />

          {/* <div className="space-y-4 self-center">
            <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              {about[2].name}
            </h2>
            <p className="font-gotu text-base text-secondary md:text-lg lg:text-xl">
              {about[2].desc.map((des) => (
                <li>{des}</li>
              ))}
            </p>
          </div> */}

          {/* <img
            className="h-64 w-full overflow-hidden rounded-lg object-cover md:h-96"
            src={about[2].img}
            alt="/"
          /> */}
        </div>
        <Table/>
        <img src="https://res.cloudinary.com/doybtqm8h/image/upload/v1692561108/WhatsApp_Image_2023-08-21_at_01.21.23_kuh77a.jpg" alt="" />
      </div>
    </main>
  );
};

export default About;
