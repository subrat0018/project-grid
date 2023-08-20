import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../../components/Button';
const TrackCoins = () => {
  return (
    <>
      <div className='flex justify-center'>
      <Button
        navigateTo="/oldorders"
        btnStyle="btn-secondary mt-2"
        text="Track your coins here"
      />
      </div>
    </>
  );
};

export default TrackCoins;
