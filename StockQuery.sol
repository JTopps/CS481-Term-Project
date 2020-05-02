pragma solidity >= 0.5.0 < 0.6.0;

import "github.com/provable-things/ethereum-api/provableAPI.sol";

contract StockPrice is usingProvable {
    
    string public stockResult;
    string private api;
    string private query;
    
    event LogNewProvableQuery(string description);
    event LogNewStock(string stock);
    
    constructor() public
    {
        //update(string); // First check at contract creation...
    }
    
    function concatenate(string memory a, string memory b) private pure returns(string memory)
    {
        return string(abi.encodePacked(a,b));
    }
    
    function __callback(bytes32 _myid, string memory _result) public
    {
        require(msg.sender == provable_cbAddress());
        stockResult = _result;
        emit LogNewStock(stockResult);
    }
    
    
    function update(string memory _symbol) public payable
    {
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        api = concatenate("json(https://financialmodelingprep.com/api/v3/company/profile/", _symbol);
        query = concatenate(api, ").profile.price");
        provable_query("URL", query); 
    }
    
}
