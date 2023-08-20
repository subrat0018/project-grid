import React, { useState } from 'react';

import Button from '../../../../components/Button';

import { FaMinus, FaPlus } from 'react-icons/fa';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddItemToCartTwo,
  setPreAdd,
  setPreDecrease,
} from '../../../../store/customer/cart/cartSlice';

import {
  ProductItemDescription,
  ProductItemShare,
} from './';
import { formatPrice } from '../../../../app/util';

const ProductItem = () => {
  const { state } = useLocation();
  
  const { item } = state;
  const { id, category, title, price, image } = item;

  const { cartItems, testQuant } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const itemIndex = cartItems.findIndex((item) => item.id === id);

  console.log('quantity', cartItems[itemIndex]?.quantity);

  console.log('testQuant', testQuant);

  console.log(cartItems);

  const handleIncrease = () => {
    dispatch(setPreAdd());
  };

  const handleDecrease = () => {
    dispatch(setPreDecrease({ id }));
  };

  const [activeSection, setActiveSection] = useState('description');
  const productNavItemClass =
    'font-urbanist font-bold text-sm md:text-base text-zinc-600 transition duration-200 ease-in-out cursor-pointer hover:text-primary';

  let detailSection;
  if (activeSection === 'description') {
    detailSection = <ProductItemDescription item={item} />;
  } else if (activeSection === 'share') {
    detailSection = <ProductItemShare />;
  }

  const handleAddToCart = () => {
    const items = { id, category, title, price, image };

    dispatch(setAddItemToCartTwo(items));
  };

  return (
    <main className="min-h-screen w-full bg-[#FFFFFF]">
      <div className="container mx-auto px-6 py-16 lg:px-16">
        <Button navigateTo="/products" btnStyle="btn-primary " text="Back" />
        <div className="mt-3 flex flex-col items-start gap-8 md:mt-20 md:flex-row">
          {/* img */}
          <div className="group relative flex h-[400px] w-full justify-center md:h-[700px]">
            <img
              className="absolute h-[50%] w-[50%] transition duration-500 ease-in-out group-hover:opacity-0"
              src={item.image}
              alt={item.name}
            />

            <img
              className="absolute h-[55%] w-[55%] rounded-lg opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100"
              src={item.image}
              alt={item.title}
            />
          </div>

          {/* name */}
          <div className="flex h-full w-full flex-col justify-center space-y-6 text-left">
            <p className="font-urbanist text-xl font-bold text-primary md:text-4xl lg:text-5xl">
              {item.title}
            </p>

            <span className="flex flex-row items-start justify-start font-gotu text-lg text-secondary md:text-2xl lg:text-3xl">
              {formatPrice(item.price * 80)} {`(10 `}
              <img
                src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692195660/Bitcoin_Cash_cpb1xm.png"
                alt="BD"
                className="h-8 w-8"
              />
              {` `}
              {`)`}
            </span>

            <div className="flex items-center justify-between space-x-4 md:justify-start">
              <div className="flex w-min items-center justify-start border border-zinc-300">
                <button
                  onClick={handleDecrease}
                  className="p-2 transition-all duration-100 ease-in-out"
                >
                  <FaMinus className="h-3 text-zinc-600" />
                </button>

                <span className="flex items-center justify-center px-4 py-0.5 text-sm font-semibold tracking-widest text-zinc-700 md:h-5 md:w-5 md:px-8 md:py-4">
                  {testQuant}
                </span>

                <button
                  onClick={handleIncrease}
                  className="p-2 transition-all duration-100 ease-in-out"
                >
                  <FaPlus className="h-3 text-zinc-600" />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-secondary">
                Add to cart
              </button>
            </div>

            <div className="space-y-5">
              <ul className="flex space-x-5 border-b border-zinc-300 pb-0.5">
                <li
                  onClick={() => setActiveSection('description')}
                  className={`${productNavItemClass} ${
                    activeSection === 'description' &&
                    'text-pink-600 underline decoration-2 underline-offset-8 hover:text-pink-600'
                  }`}
                >
                  Description
                </li>
                <li
                  onClick={() => setActiveSection('share')}
                  className={`${productNavItemClass} ${
                    activeSection === 'share' &&
                    'text-pink-600 underline decoration-2 underline-offset-8 hover:text-pink-600'
                  }`}
                >
                  Share
                </li>
              </ul>

              {detailSection}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductItem;
