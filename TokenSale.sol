pragma solidity >=0.4.22 <0.6.0;

import "./StockPrice.sol";

interface IERC20Token {
    function balanceOf(address owner) external returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function decimals() external returns (uint256);
    function transferFrom(address owner, address buyer, uint numTokens) external returns (bool);
    function approve(address delegate, uint numberOfTokens) external returns(bool);
}

contract TokenSale {
    IERC20Token public tokenContract;  // the token being sold
    uint256 public price;              // the price, in wei, per token
    address owner;
    bool buysTokens;
    uint256 public contractTokens;
    bool sellsTokens;
    uint256 public tokensSold;

    event Sold(address buyer, uint256 amount);
    event MakerDepositedEther(uint256 amount);
    event TokensSoldToContract(address seller, uint256 amount);
    event ActivatedEvent(bool buys, bool sells);
    event PriceUpdatedbyOracle(IERC20Token tokenContract, uint256 newPrice);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

    constructor (IERC20Token _tokenContract, uint256 _price, bool _buysTokens, bool _sellsTokens) public {
        owner = msg.sender;
        tokenContract = _tokenContract;
        price = _price;
        buysTokens = _buysTokens;
        sellsTokens = _sellsTokens;
        emit ActivatedEvent(buysTokens, sellsTokens);
    }

    modifier onlyOwner {
         require (msg.sender == owner);
        _;
    }

    // Guards against integer overflows
    function safeMultiply(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        } else {
            uint256 c = a * b;
            assert(c / a == b);
            return c;
        }
    }

    function grantContractPermission(uint256 amountOfTokens) public returns (bool){
        tokenContract.approve(address(this), amountOfTokens);
        emit Approval(msg.sender, address(this), amountOfTokens);
        return true;
    }
    function activate (bool _buysTokens, bool _sellsTokens) public onlyOwner {
        buysTokens  = _buysTokens;
        sellsTokens = _sellsTokens;
        emit ActivatedEvent(buysTokens, sellsTokens);
    }

    function buyTokens(uint256 numberOfTokens) public payable {
        if (sellsTokens || msg.sender == owner) {
            require(msg.value == safeMultiply(numberOfTokens, price));
            require(tokenContract.balanceOf(address(this)) >= numberOfTokens);
            emit Sold(msg.sender, numberOfTokens);
            tokensSold += numberOfTokens;
            require(tokenContract.transfer(msg.sender, numberOfTokens));
    }
        else {
            msg.sender.transfer(msg.value);
        }
    }
    
    function sellTokens(uint256 amountOfTokensToSell) public {
        if (buysTokens || msg.sender == owner) {
            // Note that buyPrice has already been validated as > 0
            uint256 can_buy = address(this).balance /price;
            // Adjust order for funds available
            require(amountOfTokensToSell <= can_buy);

            // Extract user tokens
            require(tokenContract.transferFrom(msg.sender, address(this), amountOfTokensToSell));
            // Pay user
            uint256 ethOwed= safeMultiply(amountOfTokensToSell, price);
            msg.sender.transfer(ethOwed);

            emit TokensSoldToContract(msg.sender, amountOfTokensToSell);
        }
    }


    function endSale() public {
        require(msg.sender == owner);

        // Send unsold tokens to the owner.
        require(tokenContract.transfer(owner, tokenContract.balanceOf(address(this))));

        msg.sender.transfer(address(this).balance);
    }

    function ownerDepositEther() payable public onlyOwner {
        emit MakerDepositedEther(msg.value);
    }

    function oracleUpdateStockPrice(string memory _symbol) public onlyOwner{
        //price=newPrice;
        StockPrice priceGetter;
        priceGetter.update(_symbol);
        price = priceGetter.price();
        //price = uint256(priceGetter.stockResult);
        emit PriceUpdatedbyOracle(tokenContract, price);
    }

    function contractWeiBalance() external view returns (uint256){
        return address(this).balance;
    }

    function updateContractsTokenBalance() external returns (uint256){
        return contractTokens= tokenContract.balanceOf(address(this));
    }
}
