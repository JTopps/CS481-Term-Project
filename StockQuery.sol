pragma solidity >= 0.5.0 < 0.6.0;

import "github.com/provable-things/ethereum-api/provableAPI.sol";

contract StockPrice is usingProvable {

    string public stockResult;

    event LogNewProvableQuery(string description);
    event LogNewStock(string stock);

    constructor() public
    {
        update(); // First check at contract creation...
    }

    function __callback( bytes32 _myid, string memory _result) public
    {
        require(msg.sender == provable_cbAddress());
        stockResult = _result;
        emit LogNewStock(stockResult);
        // Do something with the temperature measure...
    }


    function update() public payable
    {
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        provable_query("URL", "json(https://financialmodelingprep.com/api/v3/company/profile/AAPL).profile.price");
    }

}