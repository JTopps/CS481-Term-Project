pragma solidity >=0.4.22 <0.6.0;
//walkthrough from https://www.toptal.com/ethereum/create-erc20-token-tutorial
contract StockToken {

    string public name = "";
    string public symbol = "";
    uint256 stockPrice = 0;
    uint256 totalSupply_= 0;
    uint8 public decimals = 0;

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    using SafeMath for uint256;


   constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _total) public {
	totalSupply_ = _total;
	name = _name;
	symbol = _symbol;
	decimals=_decimals;
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    //changed msg.sender to tx.origin
    function approve(address delegate, uint numTokens) public returns (bool) {
        allowed[tx.origin][delegate] = numTokens;
        emit Approval(tx.origin, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}
