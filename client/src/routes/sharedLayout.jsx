import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/navbarCustomer/Navbar';

export const SharedLayout = () => {
  return (
    <div className='w-full'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
