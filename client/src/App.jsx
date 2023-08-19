/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from 'react-router-dom';
import { SharedLayout } from './routes/sharedLayout';
import { ProductsLayout } from './routes/ProductsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';

import { checkCustomer } from './store/auth/customerAuthSlice';
import { CustomerSignupLayout } from './routes/CustomerSignupLayout';
import { CustomerLoginLayout } from './routes/CustomerLoginLayout';
import { HomeLayout } from './routes/HomeLayout';
import { ProductItemLayout } from './routes/ProductItemLayout';
import CustomerDashboardLayout from './routes/CustomerDashboardLayout';
import Web3Context from './contexts';
import { AdminDashboardLayout } from './routes/AdminDashboardLayout';
import { AdminLoginLayout } from './routes/AdminLoginLayout';
import { checkAdmin } from './store/auth/adminAuthSlice';
import AdminDistributeLayout from './routes/AdminDistributeLayout';
import CheckoutLayout from './routes/CheckoutLayout';

function App() {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.admin);
  const { customer } = useSelector((store) => store.customer);
  // window.ethereum &&
  //   window.ethereum.on('accountsChanged', function () {
  //     setTimeout(window.location.reload(false), 1000);
  //   });
  useEffect(() => {
    dispatch(checkAdmin());
    dispatch(checkCustomer());
  }, []);
  const { checkIfWalletIsConnected } = useContext(Web3Context);
  useEffect(() => {
    checkIfWalletIsConnected();
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
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboardLayout />}
          />
          <Route path="/checkout" element={<CheckoutLayout />} />
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
          <Route
            path="/admin/dashboard/distribute"
            element={<AdminDistributeLayout />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
