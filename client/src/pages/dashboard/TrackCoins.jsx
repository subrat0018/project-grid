import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import OldOrders from './OldOrders';
const TrackCoins = () => {
  return (
    <>
      <div className="col-span-3 flex justify-center">
        <OldOrders />
      </div>
    </>
  );
};

export default TrackCoins;
