/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from 'react-router-dom';
// import { HomeLayout } from './routes/HomeLayout';
import { SharedLayout } from './routes/sharedLayout';
import { ProductsLayout } from './routes/ProductsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { checkCustomer } from './store/auth/customerAuthSlice';
import { CustomerSignupLayout } from './routes/CustomerSignupLayout';
import { CustomerLoginLayout } from './routes/CustomerLoginLayout';
import { HomeLayout } from './routes/HomeLayout';
import { ProductItemLayout } from './routes/ProductItemLayout';

import { AdminDashboardLayout } from './routes/AdminDashboardLayout';
import { AdminLoginLayout } from './routes/AdminLoginLayout';
import { checkAdmin } from './store/auth/adminAuthSlice';

function App() {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.admin);
  const { customer } = useSelector((store) => store.customer);

  useEffect(() => {
    dispatch(checkAdmin());
    dispatch(checkCustomer());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomeLayout />} />
          <Route path="/products" element={<ProductsLayout />} />
          <Route
            path="/customer/signup"
            element={!customer ? <CustomerSignupLayout /> : <Navigate to="/" />}
          />
          <Route
            path="/customer/login"
            element={!customer ? <CustomerLoginLayout /> : <Navigate to="/" />}
          />
          <Route path="/products/:slug" element={<ProductItemLayout />} />
        </Route>

        <Route path="/" element={<SharedLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              admin ? <AdminDashboardLayout /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/login"
            element={
              !admin ? <AdminLoginLayout /> : <Navigate to="/admin/dashboard" />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
