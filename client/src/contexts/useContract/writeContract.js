const purchase = async (
  contract,
  price,
  user,
  lastReturned,
  isReferred,
  referrer,
) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .purchase(price, user, lastReturned,isReferred, referrer)
    .send({ from: user });
  return res;
};
const disperseCoin = async (contract, seller, amount, userAccount, account) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .disperseCoin(contract, seller, amount, userAccount)
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

const reedem = async (contract, amount, interval, account) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .reedem(amount, interval)
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
  disperseCoin,
  cancelOrder,
  stakeTokens,
  reedem,
  socialMediaPost,
  removeSeller,
  mint
};
