/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Web3Context from '../../contexts';
import { balanceOf } from '../../contexts/useContract/readContract';
import Button from '../../components/Button';
const CustomerProfile = (props) => {
  const { Contract, account } = useContext(Web3Context);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    balanceOf(Contract, account.currentAccount).then((res) => setBalance(res));
  }, [account]);
  return (
    <>
      <div class="col-span-1 flex w-full flex-col items-center justify-start rounded-lg">
        <img
          class="mt-4 h-40 w-40 rounded-t-lg p-2"
          src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692216779/profilepic_ughhcq.png"
          alt="product"
        />
        <div>
          <h5 class="font-gotu text-3xl font-semibold tracking-tight text-gray-900">
            {props.Name}
          </h5>
          <div className=" mx-2 mt-2 flex w-full items-center justify-center">
            <span className="flex items-center justify-center font-gotu text-base font-bold">
              {balance}
              <img
                src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692528950/fccoin_emuzu6.png"
                alt="BD"
                className="ml-1 h-4 w-4"
              />
            </span>
          </div>
        </div>
        <Button
          navigateTo="/stakecoins"
          btnStyle="btn-secondary mt-2"
          text="Stake your coins here"
        />
      </div>
    </>
  );
};

export default CustomerProfile;
