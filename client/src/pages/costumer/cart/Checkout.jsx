import React, { useEffect } from 'react';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setGetTotals } from '../../../store/customer/cart/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems, cartTotalAmount } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);

  function formatPrice(price) {
    // Get the user's locale from the browser
    const userLocale = navigator.language || 'en-US';

    // Format the price value using the user's locale and currency
    const formattedPrice = Number(price).toLocaleString(userLocale, {
      style: 'currency',
      currency: 'INR',
    });

    return formattedPrice;
  }

  return (
    <main className="flex w-full items-start bg-bgcolor md:min-h-[80vh]">
      <div className="container mx-auto px-6 pt-16 lg:px-16">
        <div className="flex h-full min-h-[80vh] w-full items-start justify-center">
          <div className="h-full min-h-[80vh] w-[60%] bg-white p-4">
            <div className="pb-3 font-urbanist text-2xl font-bold">
              Selected Items
            </div>
            <div className="min-h-[70vh] overflow-y-auto bg-bgcolor">
              {cartItems &&
                cartItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-center border-b-2 border-black"
                  >
                    <div className="grid grid-cols-5 gap-3 p-4 font-urbanist">
                      {/* image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="col-span-1 h-full w-full"
                      />

                      {/* name */}
                      <div className="col-span-4">
                        <h1 className="text-base font-bold text-primary md:text-2xl">
                          {item.title}
                        </h1>

                        <p className="mt-2 text-base text-primary md:text-xl">
                          {item.category}
                        </p>

                        <h2 className="mt-5 text-base font-bold text-primary md:text-xl">
                          {formatPrice(item.price)}
                        </h2>

                        <div className="mt-2 flex space-x-3">
                          <div className="flex w-min items-center justify-start border border-black">
                            <button
                              //   onClick={handleDecreaseItemQuantity}
                              className="p-1 transition-all duration-100 ease-in-out md:p-1"
                            >
                              <FaMinus className="h-3 text-zinc-600" />
                            </button>

                            <span className="flex items-center justify-center px-4 py-0.5 text-xs font-semibold tracking-widest text-zinc-700 md:h-5 md:w-5 md:px-8 md:py-4 md:text-sm">
                              {/* {quantity} */}1
                            </span>

                            <button
                              //   onClick={handleIncreaseItemQuantity}
                              className="p-1 transition-all duration-100 ease-in-out md:p-2"
                            >
                              <FaPlus className="h-3 text-zinc-600" />
                            </button>
                          </div>

                          <div className="flex items-center justify-center">
                            <button
                              //   onClick={handleRemoveItem}
                              className="rounded bg-primary p-1.5 transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
                            >
                              <FaTrashAlt className="h-3 w-3 text-white md:h-4 md:w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 flex items-center justify-start text-base text-primary md:text-lg">
                          This product can give 8{' '}
                          <img
                            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692195660/Bitcoin_Cash_cpb1xm.png"
                            alt="BD"
                            className="ml-1 h-5 w-5"
                          />
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="h-full min-h-[80vh] w-[30%] bg-secondary p-4">
            <h3 className="mb-3 font-urbanist text-xl font-bold text-white md:text-2xl">
              Please fill in the fields below
            </h3>

            <input
              type="text"
              name="delivery"
              //   value={firstName}
              //   onChange={(e) => setFirstName(e.target.value)}
              placeholder="Delivery Adress 1"
              className="w-full border border-gray-300 px-3 py-3 shadow-md focus:outline-none md:px-3 md:py-3 md:text-lg"
            />

            <input
              type="text"
              name="delivery2"
              //   value={firstName}
              //   onChange={(e) => setFirstName(e.target.value)}
              placeholder="Delivery Adress 2"
              className="mt-1 w-full border border-gray-300 px-3 py-3 shadow-md focus:outline-none md:px-3 md:py-3 md:text-lg"
            />

            <div className="mt-5 rounded-lg bg-white p-3">
              <p className="mt-2 flex items-center justify-start font-gotu text-base font-bold text-primary md:text-xl">
                Total: {formatPrice(cartTotalAmount)} {`(`}25{' '}
                <img
                  src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692195660/Bitcoin_Cash_cpb1xm.png"
                  alt="BD"
                  className="ml-1 h-6 w-6"
                />
                {`)`}
              </p>
              <div className="mt-3 bg-teal-100 p-2">
                <h3 className="mb-3 font-urbanist text-sm font-bold text-primary underline md:text-base">
                  Use your BD coins
                </h3>
                <p className="mt-2 flex items-center justify-start font-gotu text-base font-bold text-primary md:text-lg">
                  <span className="mr-2 font-bold">Total:</span>{' '}
                  <span className="mr-2 line-through">
                    {formatPrice(cartTotalAmount)}
                  </span>{' '}
                  {formatPrice(cartTotalAmount - 30)} {`(-`}40{' '}
                  <img
                    src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692195660/Bitcoin_Cash_cpb1xm.png"
                    alt="BD"
                    className="ml-1 h-6 w-6"
                  />
                  {`)`}
                </p>
                <p className="mt-2 flex items-center justify-start text-sm text-primary md:text-base">
                  You have currently 100{' '}
                  <img
                    src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692195660/Bitcoin_Cash_cpb1xm.png"
                    alt="BD"
                    className="ml-1 h-5 w-5"
                  />
                  .
                </p>

                <button className="mt-4 w-full rounded-md bg-[#c6f6f8] px-4 py-1 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-black transition duration-300 ease-in hover:bg-black hover:text-white md:px-4 md:py-2">
                  Use coins
                </button>
              </div>
            </div>
            <button className="mt-8 w-full rounded-md bg-[#c6f6f8] px-4 py-1 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-[#abecee] transition duration-300 ease-in hover:bg-[#abecee] hover:text-primary md:px-4 md:py-2">
              Add more items
            </button>
            <button className="mt-4 w-full rounded-md bg-[#c6f6f8] px-4 py-1 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-[#abecee] transition duration-300 ease-in hover:bg-[#abecee] hover:text-primary md:px-4 md:py-2">
              Proceed with Payment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;