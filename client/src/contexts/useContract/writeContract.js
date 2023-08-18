// createSeller
const createSeller = async (sellerId, contract, account) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .createSeller(sellerId)
    .send({ from: account });
  return res;
};



export { createSeller };
