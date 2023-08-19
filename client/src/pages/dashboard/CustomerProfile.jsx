import React from 'react';

const CustomerProfile = (props) => {
  return (
    <>
      <div class="flex w-full flex-col items-center justify-center rounded-lg">
        <img
          class="mt-4 h-40 w-40 rounded-t-lg p-2"
          src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692216779/profilepic_ughhcq.png"
          alt="product"
        />
        <div>
          <h5 class="font-gotu text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.Name}
          </h5>
          <div className="flex items-center justify-between mt-2 mx-2">
            <p className="font-gotu text-base font-bold">30 orders</p>
            <span className="flex items-center justify-center font-gotu text-base font-bold">
              {`60 `}
              <img
                src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692195660/Bitcoin_Cash_cpb1xm.png"
                alt="BD"
                className="ml-1 h-4 w-4"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
