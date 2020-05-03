var StockToken = artifacts.require("./StockToken.sol");
var TokenSale = artifacts.require("./TokenSale.sol");

module.exports = function(deployer) {

    deployer.then(async () => {
        await deployer.deploy(StockToken, "facebook", "fb", "2", "10");
        await deployer.deploy(TokenSale, StockToken.address, 5.00, true, true);
    });

};