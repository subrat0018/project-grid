import React, { useState } from 'react';

const SellerDashboard = () => {
  const [supplycoins, setsupplycoins] = useState();
  return (
    <main className="flex w-full items-center bg-bgcolor md:min-h-screen">
      <div className="container mx-auto px-6 py-16 lg:px-16">
        <div className="space-y-5 rounded-lg border border-zinc-200 bg-[#f0e2e1] p-5 shadow-md">
          {/* filter */}
          <p className="mt-3 flex items-center justify-start text-base text-primary md:text-xl">
            <span className="mr-1 font-bold">Total Supply:</span> 100{' '}
            <img
              src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692195660/Bitcoin_Cash_cpb1xm.png"
              alt="BD"
              className="ml-1 h-6 w-6"
            />
          </p>
          <div className="flex items-center justify-center">
            <input
              type="number"
              name="description"
              value={supplycoins}
              onChange={(e) => {
                setsupplycoins(e.target.value);
              }}
              placeholder="Add coins to mint"
              className="w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
            />
            <button className="btn-secondary ml-2">Mint</button>
          </div>
          <h2 className="text-lg font-bold text-primary md:text-xl lg:text-2xl">
            Current Seller/Products{`(5)`}
          </h2>
          <div className="flex flex-wrap items-center justify-start">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="m-1 flex flex-col items-center justify-center rounded-md bg-secondary px-8 py-2"
              >
                <p className="text-lg font-bold text-white">Sambit Sankalp</p>
                <p className="text-white">0xshdfusdvbdsyvb</p>
              </div>
            ))}
          </div>
          <button className='btn-secondary w-full'>Distribute</button>
        </div>
      </div>
    </main>
  );
};

export default SellerDashboard;
