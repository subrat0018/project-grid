/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from 'react-router-dom';
import { SharedLayout } from './routes/sharedLayout';
import { ProductsLayout } from './routes/ProductsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext, useState } from 'react';

import { checkCustomer } from './store/auth/customerAuthSlice';
import { CustomerSignupLayout } from './routes/CustomerSignupLayout';
import { CustomerLoginLayout } from './routes/CustomerLoginLayout';
import { HomeLayout } from './routes/HomeLayout';
import { ProductItemLayout } from './routes/ProductItemLayout';
import CustomerDashboardLayout from './routes/CustomerDashboardLayout';
import Web3Context from './contexts';
import { AdminDashboardLayout } from './routes/AdminDashboardLayout';
// import { AdminLoginLayout } from './routes/AdminLoginLayout';
import { checkAdmin } from './store/auth/adminAuthSlice';
// import AdminDistributeLayout from './routes/AdminDistributeLayout';
import CheckoutLayout from './routes/CheckoutLayout';
import SellerDashboardLayout from './routes/SellerDashboardLayout';
import axios from 'axios';
import StakeCoinsLayout from './routes/StakeCoinsLayout';
import AboutLayout from './routes/AboutLayout';

function App() {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.admin);
  const { customer } = useSelector((store) => store.customer);
  const { connectWallet, checkIfWalletIsConnected } = useContext(Web3Context);
  const [data, setdata] = useState({});
  // window.ethereum &&
  //   window.ethereum.on('accountsChanged', function () {
  //     setTimeout(window.location.reload(false), 1000);
  //   });
  useEffect(() => {
    checkIfWalletIsConnected().then((res) => {
      axios('http://localhost:5000/getdetails', {
        method: 'POST',
        data: {
          walletAddress: res,
        },
      }).then((data) => {
        setdata(data.data);
      });
    });
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

          <Route
            path="dashboard"
            element={
              data.userType === 'Seller' ? (
                <AdminDashboardLayout />
              ) : data.userType === 'User' ? (
                <CustomerDashboardLayout />
              ) : (
                <SellerDashboardLayout />
              )
            }
          />

          <Route path="/about" element={<AboutLayout />} />
          <Route path="/checkout" element={<CheckoutLayout />} />
          <Route path="/stakecoins" element={<StakeCoinsLayout />} />
          <Route path="/products/:slug" element={<ProductItemLayout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
