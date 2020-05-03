var StockToken = artifacts.require("./StockToken.sol");
var TokenSale = artifacts.require("./TokenSale.sol");

module.exports = function(deployer) {

    deployer.then(async () => {
        await deployer.deploy(StockToken, "facebook", "fb", "2", "1000");
        await deployer.deploy(TokenSale, StockToken.address, 100000000000000, true, true); // 0.0001 eth
    });

};