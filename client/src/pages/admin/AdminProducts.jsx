/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAdminProduct,
  readAdminProducts,
  setClearErrors,
  setCurrentId,
  setFilterCategory,
} from '../../store/admin/product/productAdminSlice';
import { trimAndAddEllipsis } from '../../app/util';
import Button from '../../components/Button';

export const AdminProducts = () => {
  // const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewProduct, setViewProduct] = useState(false);
  const [viewSingleProduct, setViewSingleProduct] = useState(null);

  const [description, setDescription] = useState([]);
  const [desc, setdesc] = useState('');
  const [coins, setcoins] = useState('');
  const [coin, setcoin] = useState('');

  const dispatch = useDispatch();

  const { admin } = useSelector((store) => store.admin);

  const {
    products,
    sortOrder,
    search,
    filterCategory,
    currentId,
    // loadingDelete,
  } = useSelector((store) => store.productsAdmin);

  console.log(products);

  useEffect(() => {
    if (admin) {
      dispatch(readAdminProducts(admin));
    }
  }, [sortOrder, search, filterCategory, admin]);

  return (
    <div className="col-span-2 space-y-5 font-urbanist">
      {/*  nav */}
      <div className="space-y-5 rounded-lg border border-zinc-200 bg-[#f0e2e1] p-5 shadow-md">
        {/* filter */}
        <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
          Top customer{`(5)`}
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
      </div>

      {/* products */}
      <div className="grid max-h-[618px] w-full overflow-y-auto rounded-lg border border-zinc-200 bg-bgcolor2 p-5 shadow-md">
        <div className="flex justify-center gap-3"></div>

        <div className="space-y-6">
          <h2 className="border-b pb-2 font-urbanist text-xl font-bold text-primary md:text-2xl lg:text-3xl">
            Airdrops
          </h2>

          <div className="">
            {description.map(({ desc, coin }, i) => (
              <div className="flex w-full items-center justify-center">
                <input
                  type="text"
                  name="description"
                  value={desc}
                  placeholder="Address"
                  className="w-[50%] border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
                />
                <input
                  type="number"
                  name="coin"
                  value={coin}
                  placeholder="Coin"
                  className="w-[50%] border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
                />
              </div>
            ))}
            <div className="mb-2 flex w-full items-center justify-center">
              <input
                type="text"
                name="description"
                value={desc}
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
                placeholder="Address"
                className="w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
              />
              <input
                type="number"
                name="coin"
                value={coin}
                onChange={(e) => {
                  setcoin(e.target.value);
                }}
                placeholder="Coin"
                className="w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
              />
              <button
                onClick={() => {
                  setDescription([...description, { desc, coin }]);
                  setdesc('');
                }}
                className="btn-secondary mt-3"
              >
                Add
              </button>
            </div>
            <button className="w-full rounded-md bg-[#c6f6f8] px-5 py-2 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-[#abecee] transition duration-300 ease-in hover:bg-[#abecee] hover:text-primary md:px-6 md:py-3">
              Distribute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
