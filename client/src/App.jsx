import { Routes, Route, Navigate } from 'react-router-dom';
// import { HomeLayout } from './routes/HomeLayout';
import { SharedLayout } from './routes/sharedLayout';
import { ProductsLayout } from './routes/ProductsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { checkCustomer } from "./store/auth/customerAuthSlice";
import { CustomerSignupLayout } from './routes/CustomerSignupLayout';
import { CustomerLoginLayout } from './routes/CustomerLoginLayout';
import { HomeLayout } from './routes/HomeLayout';

function App() {
  const dispatch = useDispatch();
  const { customer } = useSelector((store) => store.customer);

  useEffect(() => {
    dispatch(checkCustomer());
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<CustomerSignupLayout />} />
          <Route path="/products" element={<ProductsLayout />} />
          <Route
            path="/customer/signup"
            element={!customer ? <CustomerSignupLayout /> : <Navigate to="/" />}
          />
          <Route
            path="/customer/login"
            element={!customer ? <CustomerLoginLayout /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
