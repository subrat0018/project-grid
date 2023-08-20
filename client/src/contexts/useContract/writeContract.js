const purchase = async (
  contract,
  price,
  user,
  lastReturned,
  isReferred,
  referrer,
  isRedeem,
  redeemAmount
) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .purchase(price, user, lastReturned,isReferred, referrer, isRedeem, redeemAmount)
    .send({ from: user });
  return res;
};
const distributeToPartners = async(contract, sellers, account) => {
  if(!contract)return false;
  const res = await contract.methods.distributeToPartners(sellers).send({from: account});
  if(res)return true;
  return false;
}
const disperseCoin = async (contract, seller, amount, userAccount,totalAmount, account) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .disperseCoin(seller, amount, userAccount, totalAmount)
    .send({ from: account });
  return res;
};
const cancelOrder = async (contract, orderId, account) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .cancleOrder(orderId)
    .send({ from: account });
  return res;
};

const stakeTokens = async (
  contract,
  amount,
  userAccount,
  interval,
  account
) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .stakeTokens(amount, userAccount, interval)
    .send({ from: account });
  return res;
};

const reedem = async (contract, amount, account) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .reedem(amount)
    .send({ from: account });
  return res;
};

const socialMediaPost = async (contract, userAccount, account) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .socialMediaPost(userAccount)
    .send({ from: account });
  return res;
};

const  removeSeller = async(contract,seller,account)=>{
  if(!contract){
    return false;
  }
  const res = await contract.methods.removeSeller(seller).send({from:account})
  return res
}

const mint = async(contract,amount,account)=>{
  if(!contract){
    return false;
  }
  const res = await contract.methods.mint(amount).send({from:account})
  return res
}
export {
  purchase,
  distributeToPartners,
  disperseCoin,
  cancelOrder,
  stakeTokens,
  reedem,
  socialMediaPost,
  removeSeller,
  mint
};
