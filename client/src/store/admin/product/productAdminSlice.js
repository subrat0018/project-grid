import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  productData: {
    category: '',
    title: '',
    price: '',
    image: '',
    description: '',
  },
  filterCategory: 'All',
  currentId: null,

  productsStatus: 'idle',
  loadingCreate: false, //  for create button in AdminAddForm
  loadingUpdate: false, //  for create button in AdminAddForm
  loadingDelete: false, // for delete button in AdminProducts
  products: [],
  error: null, // for errors
  emptyFields: [], // for input fields in AdminAddForm
};

// CREATE product
export const createAdminProduct = createAsyncThunk(
  'productsAdmin/createAdminProduct',
  async (product, thunkAPI) => {
    const { admin } = thunkAPI.getState().admin;

    if (!admin) {
      return thunkAPI.rejectWithValue({
        error: 'User is not logged in.',
        emptyFields: [],
      });
    }

    try {
      // create the product
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// READ products
export const readAdminProducts = createAsyncThunk(
  'productsAdmin/readAdminProducts',
  async (admin, thunkAPI) => {
    const { filterCategory } = thunkAPI.getState().productsAdmin;

    let product_url;

    try {
      product_url = `https://fakestoreapi.com/products`;
      let category_url = `https://fakestoreapi.com/products/categories`;

      // console.log(product_url);

      const product_response = await fetch(product_url);
      let product_data = await product_response.json();

      const category_response = await fetch(category_url);
      const category_data = await category_response.json();

      // console.log(filterCategory);

      if (filterCategory !== 'All')
        product_data = product_data.filter(
          (product) => product.category === filterCategory
        );

      if (product_response.ok && category_response.ok) {
        return {
          categories: category_data,
          productsData: product_data,
          total: product_data.length,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// UPDATE product
export const updateAdminProduct = createAsyncThunk(
  'productsAdmin/updateAdminProduct',
  async (dataObj, thunkAPI) => {
    const { admin } = thunkAPI.getState().admin;

    if (!admin) {
      return thunkAPI.rejectWithValue({
        error: 'User is not logged in.',
      });
    }

    try {
      // update the product
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// DELETE product
export const deleteAdminProduct = createAsyncThunk(
  'productsAdmin/deleteAdminProduct',
  async (id, thunkAPI) => {
    const { admin } = thunkAPI.getState().admin;

    if (!admin) {
      return;
    }

    try {
      // delete the product
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const productAdminSlice = createSlice({
  initialState,
  name: 'productsAdmin',
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
    setClearErrors: (state) => {
      state.error = null;
      state.emptyFields = [];
    },
    setClearInputs: (state) => {
      state.productData = initialState.productData;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE product
      .addCase(createAdminProduct.pending, (state) => {
        state.productsStatus = 'loading';
        state.loadingCreate = true;
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.loadingCreate = false;
        state.products.productsData = [
          action.payload,
          ...state.products.productsData,
        ];
        state.error = null;
        state.emptyFields = [];
      })
      .addCase(createAdminProduct.rejected, (state, action) => {
        state.productsStatus = 'failed';
        state.loadingCreate = false;
        state.error = action.payload.error;
        state.emptyFields = action.payload.emptyFields;
      })

      // READ products
      .addCase(readAdminProducts.pending, (state) => {
        state.productsStatus = 'loading';
      })
      .addCase(readAdminProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(readAdminProducts.rejected, (state, action) => {
        state.productsStatus = 'failed';
        state.error = action.payload.error;
      })

      // UPDATE product
      .addCase(updateAdminProduct.pending, (state) => {
        state.productsStatus = 'loading';
        state.loadingUpdate = true;
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.loadingUpdate = false;
        state.products.productsData = state.products.productsData.map(
          (product) =>
            product.id === action.payload.id ? action.payload : product
        );
        state.currentId = null;
        state.error = null;
        state.emptyFields = [];
      })
      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.productsStatus = 'failed';
        state.loadingUpdate = false;
        state.error = action.payload.error;
        state.emptyFields = action.payload.emptyFields;
      })

      // DELETE product
      .addCase(deleteAdminProduct.pending, (state) => {
        state.productsStatus = 'loading';
        state.loadingDelete = true;
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.loadingDelete = false;
        state.products.productsData = state.products.productsData.filter(
          (product) => product.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteAdminProduct.rejected, (state, action) => {
        state.productsStatus = 'failed';
        state.loadingDelete = false;
        state.error = action.payload.error;
      });
  },
});

export const {
  setFilterCategory,
  setCurrentId,
  setProductData,
  setClearErrors,
  setClearInputs,
} = productAdminSlice.actions;
export default productAdminSlice.reducer;
