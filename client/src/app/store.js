import { configureStore } from "@reduxjs/toolkit";
// import sliderReducer from "../features/customer/slider/sliderSlice";
// import brandReducer from "../features/customer/slider/brandSlice";
import cartReducer from "../store/customer/cart/cartSlice";
import productAdminReducer from "../store/admin/product/productAdminSlice";
import productCustomerReducer from "../store/customer/product/productCustomerSlice";

import adminAuthReducer from "../store/auth/adminAuthSlice";
import customerAuthReducer from "../store/auth/customerAuthSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productsAdmin: productAdminReducer,
    productsCustomer: productCustomerReducer,
    admin: adminAuthReducer,
    customer: customerAuthReducer,
  },
});
