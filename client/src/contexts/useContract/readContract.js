const getSellerNFTs = async (contract, sellerId) => {
  if (!contract) {
    return false;
  }

  // getSellerNFTs
}

const getOrders = async(contract)=>{
  if(!contract) return false;
  const res = contract.methods.orders.call();

}