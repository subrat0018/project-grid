import { useDispatch, useSelector } from 'react-redux';
import {
  createAdminProduct,
  setClearErrors,
  setClearInputs,
  setCurrentId,
  setProductData,
  updateAdminProduct,
} from '../../store/admin/product/productAdminSlice';

import { ImSpinner2 } from 'react-icons/im';
import { useEffect, useState } from 'react';

export const AdminAddForm = () => {
  const dispatch = useDispatch();
  const {
    emptyFields,
    error,
    loadingCreate,
    loadingUpdate,
    productData,
    currentId,
  } = useSelector((store) => store.productsAdmin);

  // fetch the data that will be edited
  // will populate the form with the data
  // image OnChange
  const handleFileInputChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0 && files[0] instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        dispatch(setProductData({ ...productData, [name]: reader.result }));
      };
    } else {
      dispatch(setProductData({ ...productData, [name]: '' }));
    }
  };

  // inputs OnChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProductData({ ...productData, [name]: value }));
  };

  // desc OnChange
  const handleDescriptionChange = (e, index) => {
    const { name, value } = e.target;
    const newDescription = productData.description.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }

      return item;
    });

    dispatch(setProductData({ ...productData, description: newDescription }));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateAdminProduct({ currentId, productData })).then(
        (response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            console.log('Updated');

            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach((input) => {
              input.value = '';
            });
          }
        }
      );
    } else {
      dispatch(createAdminProduct(productData)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log('Created');

          const fileInputs = document.querySelectorAll('input[type="file"]');
          fileInputs.forEach((input) => {
            input.value = '';
          });
        }
      });
    }
  };

  // clearing input fileds
  const onClear = () => {
    dispatch(setClearInputs());
    dispatch(setClearErrors());

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = '';
    });
  };

  const onCancel = () => {
    dispatch(setClearInputs());
    dispatch(setClearErrors());
    dispatch(setCurrentId(null));

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = '';
    });
  };

  const [categories, setcategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => setcategories(json));
  }, []);

  return (
    <div className="max-h-[820px] overflow-y-auto rounded-lg border border-zinc-200 bg-green-200 p-5 shadow-md">
      <form
        className="col-span-1 flex flex-col items-center gap-5 font-urbanist"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
          Add a New Product
        </h2>

        {/* Product Category */}
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className={
            emptyFields.includes('category')
              ? 'w-full border-2 border-rose-500 shadow-lg focus:outline-none md:px-3 md:py-2'
              : 'w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2'
          }
        >
          <option value="">Product Category</option>
          {categories.map((cat) => {
            return (
              <option key={cat} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>

        {/* Product Name */}
        <input
          type="text"
          name="name"
          value={productData.title}
          onChange={handleInputChange}
          placeholder="Product Name"
          className={
            emptyFields.includes('name')
              ? 'w-full border-2 border-rose-500 shadow-lg focus:outline-none md:px-3 md:py-2'
              : 'w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2'
          }
        />

        {/* Product Price */}
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className={
            emptyFields.includes('price')
              ? 'w-full border-2 border-rose-500 shadow-lg focus:outline-none md:px-3 md:py-2'
              : 'w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2'
          }
        />

        {/* Coins Price */}
        <input
          type="number"
          name="coin"
          value={productData.coins}
          onChange={handleInputChange}
          placeholder="Product Coins"
          className={
            emptyFields.includes('coins')
              ? 'w-full border-2 border-rose-500 shadow-lg focus:outline-none md:px-3 md:py-2'
              : 'w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2'
          }
        />

        <input
          type="file"
          name="imgOne"
          onChange={handleFileInputChange}
          className={
            emptyFields.includes('image')
              ? 'block w-full text-sm text-gray-900 file:m-3 file:rounded-full file:border-none file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 file:shadow-lg file:ring-2 file:ring-rose-500 hover:file:bg-violet-100'
              : 'block w-full text-sm text-gray-900 file:m-3 file:rounded-full file:border-none file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 file:shadow-lg file:ring-2 file:ring-transparent hover:file:bg-violet-100'
          }
        />

        <div className="mb-2 w-full space-y-6">
          {/* Detail One*/}
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={(e) => handleDescriptionChange}
            placeholder="Description"
            className={
              emptyFields.includes(`description`)
                ? 'w-full border-2 border-rose-500 shadow-lg focus:outline-none md:px-3 md:py-2'
                : 'w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2'
            }
          />
        </div>

        {currentId ? (
          <>
            {loadingUpdate ? (
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-blue-500 px-5 py-2 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:px-6 md:py-3"
                disabled
              >
                <ImSpinner2 className="mr-3 h-5 w-5 animate-spin" />
                Updating...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 px-5 py-2 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:px-6 md:py-3"
              >
                Update Product
              </button>
            )}

            <button
              type="button"
              onClick={() => onCancel()}
              className="w-full rounded-md bg-red-500 px-5 py-2 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-red-400 md:px-6 md:py-3"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {loadingCreate ? (
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-blue-500 px-5 py-2 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:px-6 md:py-3"
                disabled
              >
                <ImSpinner2 className="mr-3 h-5 w-5 animate-spin" />
                Creating...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 px-5 py-2 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:px-6 md:py-3"
              >
                Ceate Product
              </button>
            )}

            <button
              type="button"
              onClick={() => onClear()}
              className="w-full rounded-md bg-blue-500 px-5 py-2 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:px-6 md:py-3"
            >
              Clear
            </button>
          </>
        )}

        {error && (
          <div className="text-sm font-bold text-rose-500">{error}</div>
        )}
      </form>
    </div>
  );
};
