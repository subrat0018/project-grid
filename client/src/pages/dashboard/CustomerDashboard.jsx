import React,{useContext,useEffect,useState} from 'react';
import CustomerProfile from './CustomerProfile';
import TrackCoins from './TrackCoins';
import axios from 'axios';
import Web3Context from "../../contexts";

const CustomerDashboard = () => {
  const { checkIfWalletIsConnected,account } = useContext(Web3Context);
  const [Name,setName] = useState('')

  useEffect(()=>{
    checkIfWalletIsConnected().then((res) => {
      axios("http://localhost:5000/getdetails", {
        method: "POST",
        data: {
          walletAddress: res,
        },
      }).then(res=>{
        setName(res.data.name)
      })
    })
  },[account.currentAccount])
  return (
    <main className="flex w-full items-start justify-start bg-bgcolor md:min-h-screen">
      <div className="grid grid-cols-4 container mx-auto px-6 pt-28">
        <CustomerProfile Name={Name} />
        <TrackCoins />
      </div>
    </main>
  );
};

export default CustomerDashboard;
