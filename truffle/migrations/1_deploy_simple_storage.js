const FlipCoin = artifacts.require("FlipCoin");

module.exports = function (deployer) {
  deployer.deploy(FlipCoin,"FlipCoin","FC");
};
