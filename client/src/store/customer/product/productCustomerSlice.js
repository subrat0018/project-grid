import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  sortOrder: '',
  search: '',
  filterCategory: 'All',
  page: 1,

  productsStatus: 'idle',
  products: {},
  error: null, // for errors
};

// READ products
export const readCustomerProducts = createAsyncThunk(
  'productsCustomer/readCustomerProducts',
  async (_, thunkAPI) => {
    const { filterCategory, page } =
      thunkAPI.getState().productsCustomer;

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

      const end =
        page * 9 > product_data.length ? product_data.length - 1 : page * 9;
      const productPagedData = product_data.slice((page - 1) * 9, end);

      if (product_response.ok && category_response.ok) {
        return {
          categories: category_data,
          limit: 9,
          page,
          productsData: productPagedData,
          total: product_data.length,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const productCustomerSlice = createSlice({
  initialState,
  name: 'productsCustomer',
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // READ products
      .addCase(readCustomerProducts.pending, (state) => {
        state.productsStatus = 'loading';
      })
      .addCase(readCustomerProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(readCustomerProducts.rejected, (state, action) => {
        state.productsStatus = 'failed';
        state.error = action.payload.error;
      });
  },
});

export const { setSortOrder, setSearch, setFilterCategory, setPage } =
  productCustomerSlice.actions;
export default productCustomerSlice.reducer;
