import React from 'react';
import CustomerProfile from './CustomerProfile';
import TrackCoins from './TrackCoins';

const CustomerDashboard = () => {
  return (
    <main className="flex w-full items-start bg-bgcolor md:min-h-screen">
      <div className="container mx-auto px-6 py-16 lg:px-16">
        <CustomerProfile />
        <TrackCoins />
      </div>
    </main>
  );
};

export default CustomerDashboard;
