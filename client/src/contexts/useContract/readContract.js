const getSellerNFTs = async (contract, sellerId) => {
  if (!contract) {
    return false;
  }

  // getSellerNFTs
}

const getOrders = (contract)=>{
  if(!contract) return false;
  const res = contract.methods.orders.call().then(res=>res);
  let orders = [];
  for(let i=0;i<res;i++){
    const _orders = contract.methods.orders(i).call().then(res=>res);
    orders.push(_orders);
  }
  return orders

}

export{getSellerNFTs,getOrders}