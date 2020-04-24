pragma solidity >=0.4.22 <0.6.0;
//walkthrough from https://www.toptal.com/ethereum/create-erc20-token-tutorial
contract FacebookToken {

    string public constant name = "Facebook_Stock";
    string public constant symbol = "Facebook";
    uint8 public constant decimals = 2;
    uint256 stockPrice = 1 ether;

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_;

    using SafeMath for uint256;


   constructor(uint256 total) public {
	totalSupply_ = total;
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

    /*function buyStock(uint numTokens) payable public returns(bool){
        require(numTokens <= balances[0xcfA525c7A45c2c29B5d67365bD11d77960824933]);
        uint256 price= stockPrice * numTokens;
        require(msg.value>= price);
        address(0xcfA525c7A45c2c29B5d67365bD11d77960824933).transfer(msg.value);
        balances[0xcfA525c7A45c2c29B5d67365bD11d77960824933] = balances[0xcfA525c7A45c2c29B5d67365bD11d77960824933].sub(numTokens);
        balances[msg.sender] = balances[msg.sender].add(numTokens);
        emit Transfer(0xcfA525c7A45c2c29B5d67365bD11d77960824933, msg.sender, numTokens);
        return true;
    }
    */
    function approve(address delegate, uint numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
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
