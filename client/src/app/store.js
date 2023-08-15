import { configureStore } from "@reduxjs/toolkit";
// import sliderReducer from "../features/customer/slider/sliderSlice";
// import brandReducer from "../features/customer/slider/brandSlice";
import cartReducer from "../store/customer/cart/cartSlice";
// import productAdminReducer from "../features/admin/product/productAdminSlice";
import productCustomerReducer from "../store/customer/product/productCustomerSlice";

// import adminAuthReducer from "../features/auth/adminAuthSlice";
import customerAuthReducer from "../store/auth/customerAuthSlice";

export const store = configureStore({
  reducer: {
    // slider: sliderReducer,
    // brand: brandReducer,
    cart: cartReducer,
    // productsAdmin: productAdminReducer,
    productsCustomer: productCustomerReducer,
    // admin: adminAuthReducer,
    customer: customerAuthReducer,
  },
});
