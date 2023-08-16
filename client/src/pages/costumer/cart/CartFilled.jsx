import React from 'react';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  setDecreaseItemQTY,
  setIncreaseItemQTY,
  setRemoveItemFromCart,
} from '../../../store/customer/cart/cartSlice';

const CartFilled = ({
  item: { id, category, title, price, image, quantity },
}) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(setRemoveItemFromCart({ id, title }));
  };

  const handleIncreaseItemQuantity = () => {
    dispatch(setIncreaseItemQTY({ id }));
  };

  const handleDecreaseItemQuantity = () => {
    dispatch(setDecreaseItemQTY({ id }));
  };

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
    <div className="flex-1 border-b border-zinc-300">
      <div className="grid grid-cols-5 gap-3 p-4 font-urbanist">
        {/* image */}
        <div className="group relative col-span-2 flex items-center">
          <img
            src={image}
            alt={title}
            className="absolute transition duration-500 ease-in-out group-hover:opacity-0"
          />

          <img
            src={image}
            alt={title}
            className="absolute rounded-lg opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100"
          />
        </div>

        {/* name */}
        <div className="col-span-3 space-y-3">
          <h1 className="text-base font-bold text-primary md:text-2xl">
            {title}
          </h1>

          <p className="text-base text-primary md:text-2xl">{category}</p>

          <h2 className="text-base font-bold text-primary md:text-2xl">
            {formatPrice(price * quantity)}
          </h2>

          <div className="flex space-x-3">
            <div className="flex w-min items-center justify-start border border-zinc-300">
              <button
                onClick={handleDecreaseItemQuantity}
                className="p-1 transition-all duration-100 ease-in-out md:p-2"
              >
                <FaMinus className="h-3 text-zinc-600" />
              </button>

              <span className="flex items-center justify-center px-4 py-0.5 text-xs font-semibold tracking-widest text-zinc-700 md:h-5 md:w-5 md:px-8 md:py-4 md:text-sm">
                {quantity}
              </span>

              <button
                onClick={handleIncreaseItemQuantity}
                className="p-1 transition-all duration-100 ease-in-out md:p-2"
              >
                <FaPlus className="h-3 text-zinc-600" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={handleRemoveItem}
                className="rounded bg-primary p-1.5 transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
              >
                <FaTrashAlt className="h-3 w-3 text-white md:h-4 md:w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartFilled;
