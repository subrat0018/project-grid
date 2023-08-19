
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
const balanceOf = (contract, address) =>{
  console.log(contract);
  if(!contract)return 0;
  console.log(address);
  const res = contract.methods.balanceOf(address).call().then(res=>res);
  return res;
}

export{getOrders, balanceOf}