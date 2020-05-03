import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import StockToken from './contracts/StockToken'
import TokenSale from './contracts/TokenSale'

import { HashRouter, Route } from "react-router-dom";

import TopBar from "./components/TopBar.js";

import Greeting from "./pages/Greeting.js";
import ShowMyStocks from "./pages/ShowMyStocks.js";
import ShowAllStocks from "./pages/ShowAllStocks.js";

function withProps(Component, props) {
  return function(matchProps) {
    return <Component {...props} {...matchProps} />
  }
}
//localStorage.setItem("FB_profit", 0);
//localStorage.setItem("test_previous_price", 0);
if (localStorage.getItem("test_previous_price") === null) {
  localStorage.setItem("test_previous_price", 0);
}

if (localStorage.getItem("FB_profit") === null) {
  localStorage.setItem("FB_profit", 0);
}

class App extends Component {
  // define a state variable for important connectivity data to the blockchain
  // this will then be put into the REDUX store for retrieval by other pages


  // **************************************************************************
  //
  // React will call this routine only once when App page loads; do initialization here
  //
  // **************************************************************************

  state = {
    web3: null,
    accounts: null,
    ST: {},
    TS: {},
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      const purchaserAddress = accounts[0];

      // Get 3 contract instances

      const networkId = await web3.eth.net.getId();

      const stock_token_deployedNetwork = StockToken.networks[networkId];
      const ST = new web3.eth.Contract(
        StockToken.abi,
        stock_token_deployedNetwork && stock_token_deployedNetwork.address
      );

      const token_sale_deployedNetwork = TokenSale.networks[networkId];
      const TS = new web3.eth.Contract(
        TokenSale.abi,
        token_sale_deployedNetwork && token_sale_deployedNetwork.address
      );

      this.setState({
        web3: web3,
        accounts: accounts,
        ST,
        TS,
      });
      

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );

      console.log(error);
    }
  };

  // **************************************************************************
  //
  // main render routine for App component;
  //      contains route info to navigate between pages
  //
  // **************************************************************************

  render() {
    return (
        <HashRouter>
          <TopBar state={this.state} />
            <div>
              <Route exact path="/" component={Greeting} />
              <Route exact path="/show-my-stocks" component={withProps(ShowMyStocks, { state: this.state })} />
              <Route exact path="/show-all-stocks" component={withProps(ShowAllStocks, { state: this.state })} />
            </div>
        </HashRouter>
    );
  }
}

export default App;