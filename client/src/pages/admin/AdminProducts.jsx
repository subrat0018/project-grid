/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { readAdminProducts } from '../../store/admin/product/productAdminSlice';
import { disperseCoin } from '../../contexts/useContract/writeContract';
import Web3Context from '../../contexts';
import { balanceOf } from '../../contexts/useContract/readContract';
import { Toast, toast } from 'react-hot-toast';
// import { trimAndAddEllipsis } from '../../app/util';
// import Button from '../../components/Button';

export const AdminProducts = () => {
  // const [selectedCategory, setSelectedCategory] = useState('All');
  const {Contract, account} = useContext(Web3Context);
  const [description, setDescription] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [desc, setdesc] = useState('');
  const [coin, setcoin] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const dispatch = useDispatch();

  const { admin } = useSelector((store) => store.admin);

  const {
    // products,
    sortOrder,
    search,
    filterCategory,
    // loadingDelete,
  } = useSelector((store) => store.productsAdmin);

  // console.log(products);

  useEffect(() => {
    if (admin) {
      dispatch(readAdminProducts(admin));
      balanceOf(Contract,account.currentAccount).then(res=>{setBalance(res)});
    }
  }, [sortOrder, search, filterCategory, admin, account]);
  const users = [{add:"0x0106B72164234f8Dca99D38415Ce00C133b93B70", name: "Subrat"},{add:"0x0DEFD0996133040Be68ab5d1C73406eaf5C03ab6", name: "Gourab"},{add: "0x721d8574379BF9bB88a4Ca3442cCE095556279A7", name: "Siboshis"}, {add: "0x721d8574379BF9bB88aabb3442cCE095556279A7", name: "Aryaman"}]
  return (
    <div className="col-span-2 space-y-5 font-urbanist">
      {/*  nav */}
      <div className="space-y-5 rounded-lg border border-zinc-200 bg-[#f0e2e1] p-5 shadow-md">
        {/* filter */}
        <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
          Top customer{`(4)`}
        </h2>
        <div className="flex flex-wrap items-center justify-start">
          {users.map((i) => (
            <div
              key={i}
              className="m-1 flex flex-col items-center justify-center rounded-md bg-secondary px-8 py-2"
            >
              <p className="text-lg font-bold text-white">{i.name}</p>
              <p className="text-white">{i.add.slice(0,3)+"..."+i.add.slice(i.add.length-3)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* products */}
      <div className="grid max-h-[618px] w-full overflow-y-auto rounded-lg border border-zinc-200 bg-bgcolor2 p-5 shadow-md">
        <div className="flex justify-center gap-3"></div>

        <div className="space-y-6">
          <h2 className="border-b pb-2 font-urbanist text-xl font-bold text-primary md:text-2xl lg:text-3xl">
            Airdrops
          </h2>

          <div className="">
            {description.map(({ desc, coin }, i) => (
              <div className="flex w-full items-center justify-center">
                <input
                  type="text"
                  name="description"
                  value={desc}
                  placeholder="Address"
                  className="w-[50%] border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
                />
                <input
                  type="number"
                  name="coin"
                  value={coin}
                  placeholder="Coin"
                  className="w-[50%] border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
                />
              </div>
            ))}
            <div className="mb-2 flex w-full items-center justify-center">
              <input
                type="text"
                name="description"
                value={desc}
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
                placeholder="Address"
                className="w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
              />
              <input
                type="number"
                name="coin"
                value={coin}
                onChange={(e) => {
                  setcoin(e.target.value);
                }}
                placeholder="Coin"
                className="w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
              />
              <button
                onClick={() => {
                  setDescription([...description, { desc, coin }]);
                  setUserAccounts([...userAccounts, desc]);
                  setAmounts([...amounts, parseInt(coin)]);
                  setTotalAmount(totalAmount + parseInt(coin));
                  setdesc('');
                  setcoin('');
                }}
                className="btn-secondary mt-3"
              >
                Add
              </button>
            </div>
            <button onClick={()=>{
              if(totalAmount <= 0)
              {
                alert("The total number of FlipCoins should be greater than 0");
                return;
              }
              if(totalAmount > balance)
              {
                alert("You don't have enough FlipCoins");
                return;
              }
              disperseCoin(Contract, account.currentAccount, amounts, userAccounts, totalAmount);
              setDescription([]);
            }} className="w-full rounded-md bg-[#c6f6f8] px-5 py-2 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-[#abecee] transition duration-300 ease-in hover:bg-[#abecee] hover:text-primary md:px-6 md:py-3">
              Distribute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
