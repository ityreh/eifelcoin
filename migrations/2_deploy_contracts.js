const ConvertLib = artifacts.require("ConvertLib");
const EifelCoin = artifacts.require("EifelCoin");

module.exports = function (deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, EifelCoin);
  deployer.deploy(EifelCoin);
};
