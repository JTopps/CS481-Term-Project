# CS481-Term-Project


## To Deploy the TokenTrader: 
### Start by deploying the StockToken.sol
- Set Name to the full name. Ex: "Facebook Stock", Symbol to something short (common rule is less than 4 chars), Decimals to 2, and total supply. NOTE: Total supply is effected by the decimal value. ex: with 2 decimals, 10 = 1000 or with 18 decimals 10=100000000000000000
- Copy the token contracts address
### Now we will deploy the token trader itself
##### USING THE SAME ACCOUNT THAT OWNS THE TOKEN CONTRACT:
- Paste the token contract address in the address line
- Set what you want each token to be sold for (This is in wei so 1 ether= 1x10^18 wei)
- Set BuyToken and SellToken to what functions you want the contract to allow
### Using the TokenTrader
- Using the owner of the tokentrader, transfer how many tokens you would like to sell to the tokentrader contract. To accomplish this, utilize the StockToken.sol transfer function or send it via MetaMask.
- If you would like the contract to buy tokens, you'll need to also supply it with ether. You can use the "Owner Deposit Ether Function".
- The rest is straight forward.

##### Text Joel if you're confused or have any questions

  
