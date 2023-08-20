/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGetTotals } from '../../store/customer/cart/cartSlice';
// import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Button from '../../components/Button';
import { getOrders } from '../../contexts/useContract/readContract';
import Web3Context from '../../contexts/index';

const OldOrders = () => {
  const dispatch = useDispatch();
  const { Contract, account } = useContext(Web3Context);
  const { cartItems } = useSelector((store) => store.cart);
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    dispatch(setGetTotals());
    getOrders(Contract).then((res) => {
      setOrders([...res]);
    });
  }, [cartItems, dispatch, account]);
  useEffect(() => {
    // console.log("Orders" , orders)
    const userRecord = orders.length?orders.filter((item)=> {return (item.userAccount.toLowerCase() === account.currentAccount.toLowerCase())}):[];
    // console.log("Before", userRecord);
    userRecord.sort((a, b) => {
      return parseInt(b.lastReturnDate) - parseInt(a.lastReturnDate);
    });
    // console.log("After", userRecord);
    setUserOrders([ ...userRecord]);
    
  },[orders,account])
  function formatDateAndTime(date) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }
  function checkItem(item)
  {
    if(item.status === "3")return false;
    if(item.productName === "Referral Expired" || item.productName === "Referral Reward" || item.productName === "Redeem" || item.productName === "Stake Credit" || item.productName === "Stake Debit" || item.productName === "AirDrop" || item.productName === "Social Media Interaction")return false;
    return true;
  }
  return (
    // <main className="flex w-full items-start bg-bgcolor md:min-h-[80vh]">
      <div className="container mx-auto px-6">
        <div className="flex w-full items-start justify-center">
          <div className="h-full w-full bg-white p-4">
            <div className="pb-3 font-urbanist text-2xl font-bold">
              FlipCoin History
            </div>
            <div className="min-h-[70vh] overflow-y-auto bg-bgcolor">
              {userOrders &&
                userOrders.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-center border-b-2 border-black"
                  >
                    <div className="grid grid-cols-5 gap-3 p-4 font-urbanist">
                      {/* image */}
                      <img
                        src={item.imgUrl}
                        alt={item.productName}
                        className="col-span-1 h-full w-full"
                      />

                      {/* name */}
                      <div className="col-span-4">
                        <h1 className="mt-5 text-base font-bold text-primary md:text-xl">
                          {item.status !== "3"?"Credit: ": "Debit: "}{item.productName}
                        </h1>
                        <p className="mt-2 text-base text-primary md:text-xl">
                          {item.category}
                        </p>

                        <h2 className="mt-5 flex items-center justify-start text-base font-bold text-primary md:text-xl">
                          {item.status === '3' && <p className=' text-red-500'>-{item.flipCoin}</p>}
                          {item.status === '2' && <p className=' text-green-500'>+{item.flipCoin}</p>}
                          {' '}
                          <img
                            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692528950/fccoin_emuzu6.png"
                            alt="BD"
                            className="ml-1 h-5 w-5"
                          />
                        </h2>
                        <h3>
                          Date: {formatDateAndTime(new Date(parseInt(item.lastReturnDate * 1000)))}
                        </h3>

                        {/* <p className="mt-1 flex items-center justify-start text-base text-primary md:text-lg">
                          {calculate(item.price) ? (
                            <>
                              You will got {calculate(item.price)}{' '}
                              <img
                                src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692528950/fccoin_emuzu6.png"
                                alt="BD"
                                className="ml-1 h-5 w-5"
                              />
                              from this order.
                            </>
                          ) : (
                            <></>
                          )}
                        </p> */}
                        {checkItem(item) && (
                          <>
                            {' '}
                            <p className="mt-1 text-base text-primary md:text-lg">
                              The product is delivered to NIT Rourkela, Odisha,
                              India
                            </p>
                            <p className="mt-2 text-base text-primary md:text-lg">
                              Could you like to rate the product?
                            </p>
                          </>
                        )}
                        {checkItem(item) && (
                          <div class="flex cursor-pointer items-center space-x-1">
                            <svg
                              class="h-4 w-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                              class="h-4 w-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                              class="h-4 w-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                              class="h-4 w-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                              class="h-4 w-4 text-gray-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          </div>
                        )}
                        {checkItem(item) && (
                          <Button
                            navigateTo="/products"
                            btnStyle="btn-secondary mt-2"
                            text="Rebuy this product"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    // </main>
  );
};

export default OldOrders;
