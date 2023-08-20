
const getOrders = async (contract)=>{
  if(!contract) return false;
  const res = await contract.methods.currentOrder().call();
  let orders = [];
  for(let i=0;i<res;i++){
    const _orders = await contract.methods.orders(i).call();
    orders.push(_orders);
  }
  return orders;

}
const balanceOf = async(contract, address) =>{
  // console.log(contract);
  if(!contract)return 0;
  // console.log(address);
  const res = await contract.methods.balanceOf(address).call();
  return res;
}
const totalSupply = async(contract)=>{
  if(!contract) return 0;

  const res = await contract.methods.totalSupply().call()
  return res
}

export{getOrders, balanceOf,totalSupply}