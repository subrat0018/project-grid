import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';

const AdminDistribute = () => {
  const [address, setAddress] = useState('');
  const [coins, setCoins] = useState('');


  return (
    <main className="flex min-h-screen w-full items-center bg-bgcolor2">
      <div className="container mx-auto px-6 py-6 lg:px-16">
        <div className="mt-16 flex flex-col-reverse items-center justify-center gap-5 md:flex-row">
          <form
            className="flex w-full flex-col items-center gap-5 md:mr-20 md:w-1/3"
            // onSubmit={handleSubmit}
          >
            <h3 className="mb-3 font-urbanist text-xl font-bold text-primary md:text-3xl">
              Type the address and amount
            </h3>

            <input
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Address"
              className="w-full border border-gray-300 px-5 py-3 shadow-md focus:outline-none md:px-6 md:py-4 md:text-lg"
            />

            <input
              type="number"
              name="coins"
              onChange={(e) => setCoins(e.target.value)}
              value={coins}
              placeholder="Number of Coins"
              className="w-full border border-gray-300 px-5 py-3 shadow-md focus:outline-none md:px-6 md:py-4 md:text-lg"
            />

            <button
            //   disabled={loading}
              className="w-full rounded-md bg-[#c6f6f8] px-5 py-2 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-[#abecee] transition duration-300 ease-in hover:bg-[#abecee] hover:text-primary md:px-6 md:py-3"
            >
              Distribute
            </button>
            {/* {errorLogIn && <div className="error">{errorLogIn}</div>} */}
          </form>

          <img
            className="h-64 w-64 object-cover md:h-[490px] md:w-[384px] md:border-l md:border-gray-300 md:pl-20"
            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692266519/grid/distributecoins_hybqaz.jpg"
            alt="/"
          />
        </div>
      </div>
    </main>
  );
};

export default AdminDistribute;
