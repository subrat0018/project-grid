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

  const onClickCat = (cat) => {
    dispatch(setFilterCategory(cat));
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteAdminProduct(id));
      dispatch(setClearErrors());
    }
  };

  // gets the id
  const handleEdit = (id) => {
    if (currentId === id) {
      dispatch(setCurrentId(id));
    } else {
      dispatch(setClearErrors());
      dispatch(setCurrentId(id));
    }
  };

  // view product
  const handleView = (product) => {
    setViewSingleProduct(product);
    setViewProduct(true);
  };

  const { categoryCount, categoryTotal } = (
    products.productsData || []
  )?.reduce(
    (count, product) => {
      const category = product.category;
      const index = count.categoryCount.findIndex(
        (obj) => obj.category === category
      );

      if (index >= 0) {
        count.categoryCount[index].count += 1;
      } else {
        count.categoryCount.push({ category: category, count: 1 });
      }

      count.categoryTotal += 1;

      return count;
    },
    {
      categoryCount: [],
      categoryTotal: 0,
    }
  );

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
    <div className="col-span-2 space-y-5 font-urbanist">
      {/*  nav */}
      <div className="space-y-5 rounded-lg border border-zinc-200 bg-[#f0e2e1] p-5 shadow-md">
        {/* filter */}
        <ul className="flex justify-center space-x-3 text-base font-bold tracking-wide text-bgcolor3 md:text-lg lg:text-xl">
          <li
            className="cursor-pointer rounded-lg bg-all2 px-5 py-3 shadow-lg transition duration-300 ease-in-out hover:bg-all"
            onClick={() => onClickCat('All')}
          >
            All Product
          </li>

          {products.categories?.map((cat) => (
            <li
              key={cat}
              onClick={() => onClickCat(cat)}
              className={`cursor-pointer rounded-lg bg-all2 px-5 py-3 shadow-lg transition duration-300 ease-in-out hover:bg-all`}
            >
              {cat}
            </li>
          ))}
        </ul>
        {/* dropdown, seacrh, total */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <span>{products.length} Products</span> */}
            {filterCategory === 'All' ? (
              categoryCount.length > 0 ? (
                <p className="font-bold text-secondary">
                  There are a total of {categoryTotal} products.
                </p>
              ) : (
                <p className="font-bold text-secondary">
                  Product not available.
                </p>
              )
            ) : (
              <>
                {categoryCount.length > 0 ? (
                  categoryCount
                    .filter((count) => count.category === filterCategory)
                    .map((count, i) => (
                      <p key={i} className="font-bold text-secondary">
                        There are {count.count} {count.category} products.
                      </p>
                    ))
                ) : (
                  <p>Product not available.</p>
                )}
              </>
            )}
          </div>
          <Button
            navigateTo="/admin/dashboard/distribute"
            btnStyle="btn-card"
            text="Distribute Coins"
          />
        </div>
      </div>

      {/* products */}

      {!viewProduct ? (
        <div className="grid max-h-[618px] grid-cols-2 gap-9 overflow-y-auto rounded-lg border border-zinc-200 bg-bgcolor2 p-5 shadow-md md:grid-cols-3">
          {products.productsData?.map((product) => (
            <div key={product.id} className="space-y-3 text-center ">
              {/*  img */}
              <div className="group relative flex h-52 justify-center md:h-64">
                <img
                  className="absolute h-52 transition duration-500 ease-in-out group-hover:opacity-0 md:h-64"
                  src={product.image}
                  alt={product.title}
                />

                <img
                  className="absolute h-52 rounded-lg opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100 md:h-64"
                  src={product.image}
                  alt={product.title}
                />
              </div>

              {/*  name */}
              <div className="flex h-16 items-center justify-center">
                <p className="font-urbanist text-base text-secondary md:text-lg">
                  {trimAndAddEllipsis(product.title)}
                </p>
              </div>

              {/*  price */}
              <span className="font-urbanist text-base font-bold text-secondary md:text-lg">
                {formatPrice(product.price)}
              </span>

              {/*  edit & del */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleEdit(product.id)}
                  className="flex cursor-pointer items-center rounded bg-primary px-2 py-1 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
                >
                  <p className="text-base md:text-[16px]">Edit</p>

                  <AiOutlineEdit className="h-6 w-6 p-1" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="flex cursor-pointer items-center rounded bg-primary px-2 py-1 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
                >
                  <p className="text-base md:text-[16px]">Delete</p>

                  <MdOutlineDelete className="h-6 w-6 p-1" />
                </button>

                <button
                  type="button"
                  onClick={() => handleView(product)}
                  className="flex cursor-pointer items-center rounded bg-primary px-2 py-1 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
                >
                  <p className="text-base md:text-[16px]">View</p>

                  <BsArrowRight className="h-6 w-6 p-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-h-[614px] overflow-y-auto p-5">
          <div className="flex justify-center gap-3">
            <div className="group relative flex h-52 justify-center md:h-64 md:w-64">
              <img
                className="absolute h-52 object-cover transition duration-500 ease-in-out group-hover:opacity-0 md:h-64"
                src={viewSingleProduct.image}
                alt={viewSingleProduct.image}
              />

              <img
                className="absolute h-52 rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100 md:h-64"
                src={viewSingleProduct.image}
                alt={viewSingleProduct.image}
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              <p className="font-urbanist text-base text-secondary md:text-lg lg:text-xl">
                {viewSingleProduct.title}
              </p>

              <span className="font-urbanist text-base font-bold text-secondary md:text-lg lg:text-xl">
                {formatPrice(viewSingleProduct.price)}
              </span>

              <button
                type="button"
                onClick={() => setViewProduct(false)}
                className="flex cursor-pointer items-center rounded bg-primary px-2 py-1 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
              >
                <p className="text-base md:text-[16px]">Back</p>

                <BsArrowRight className="h-6 w-6 p-1" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="border-b pb-2 font-urbanist text-xl font-bold text-primary md:text-2xl lg:text-3xl">
              Description
            </h2>

            <div className="space-y-3 pl-6">
              {[viewSingleProduct.description].map((desc, i) => (
                <p
                  key={i}
                  className="text-small font-urbanist text-secondary md:text-base lg:text-lg"
                >
                  <span className="mr-1 font-semibold">{desc}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
