/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Web3Context from '../../contexts';
import { distributeToPartners } from '../../contexts/useContract/writeContract';
import { totalSupply } from '../../contexts/useContract/readContract';
import { mint } from '../../contexts/useContract/writeContract';
const SellerDashboard = () => {
  const {Contract, account} = useContext(Web3Context);
  // const [supplycoins, setsupplycoins] = useState();
  const [mintCoins, setMintCoins] = useState();
  const [sellers, setSellers] = useState([]);
  const [sellerAddress,setSellerAddress] = useState([])
  const [Supply,setTotalSupply] = useState();
  useEffect(()=>{
    axios("http://localhost:5000/getsellers",{
      method: "GET"
    }).then(res=>{
      setSellers([...res.data])
      let addr= [];
      for(let i=0;i<res.data.length;i++){
        // console.log(res.data)
        addr.push(res.data[i].walletAddress)
      }
      setSellerAddress([...addr])
    });
totalSupply(Contract).then(res=>    setTotalSupply(res))
  },[account])
  return (
    <main className="flex w-full items-center bg-bgcolor md:min-h-screen">
      <div className="container mx-auto px-6 py-16 lg:px-16">
        <div className="space-y-5 rounded-lg border border-zinc-200 bg-[#f0e2e1] p-5 shadow-md">
          {/* filter */}
          <p className="mt-3 flex items-center justify-start text-base text-primary md:text-xl">
            <span className="mr-1 font-bold">Total Supply:</span> {Supply}{' '}
            <img
              src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692528950/fccoin_emuzu6.png"
              alt="BD"
              className="ml-1 h-6 w-6"
            />
          </p>
          <div className="flex items-center justify-center">
            <input
              type="number"
              name="description"
              value={mintCoins}
              onChange={(e) => {
                setMintCoins(e.target.value);
              }}
              placeholder="Add coins to mint"
              className="w-full border-2 border-transparent shadow-lg focus:outline-none md:px-3 md:py-2"
            />
            <button onClick={()=>{
              mint(Contract, mintCoins, account.currentAccount);
            }}
             className="btn-secondary ml-2">Mint</button>
          </div>
          <h2 className="text-lg font-bold text-primary md:text-xl lg:text-2xl">
            Platform Sellers and Partners
          </h2>
          <div className="flex flex-wrap items-center justify-start">
            {sellers.map((i) => (
              <div
                key={i._id}
                className="m-1 flex flex-col items-center justify-center rounded-md bg-secondary px-8 py-2"
              >
                <p className="text-lg font-bold text-white">{i.name}</p>
                <p className="text-white">{i.walletAddress.slice(0,9)}....</p>
              </div>
            ))}
          </div>
          <button onClick={()=>{
            // console.log(sellerAddress)
            distributeToPartners(Contract, sellerAddress, account.currentAccount);
          }} className='btn-secondary w-full'>Distribute</button>
        </div>
      </div>
    </main>
  );
};

export default SellerDashboard;
