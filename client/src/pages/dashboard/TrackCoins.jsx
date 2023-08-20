import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
const TrackCoins = () => {
  return (
    <>
      <div className="flex justify-center">
        <Button
          navigateTo="/oldorders"
          btnStyle="btn-secondary mt-2"
          text="Track your coins here"
        />
        <h5 className="mt-5 font-urbanist text-2xl font-bold">
          Track your coins here
        </h5>
        <div class="mt-2 w-full rounded-md border-2 border-black bg-white font-gotu text-sm font-semibold text-gray-900">
          <div class="flex w-full cursor-pointer items-center justify-between border-b-2 border-black px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 ">
            <p className="text-lg">1. Shirt</p>
            <span className="flex items-center justify-center font-gotu text-base font-bold">
              <span className="text-lime-600">+ 10</span>
              <img
                src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692528950/fccoin_emuzu6.png"
                alt="BD"
                className="ml-1 h-5 w-5"
              />
            </span>
          </div>
          <div class="flex w-full cursor-pointer items-center justify-between border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700">
            <p className="text-lg">2. Stake</p>
            <span className="flex items-center justify-center font-gotu text-base font-bold">
              <span className="text-red-600">- 5</span>
              <img
                src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692528950/fccoin_emuzu6.png"
                alt="BD"
                className="ml-1 h-5 w-5"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackCoins;
