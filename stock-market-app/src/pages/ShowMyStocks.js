import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ShowMyStocks extends Component {
    state = {
        my_name: [],
        my_symbol: [],
        my_price: [0],
        my_total_supply: [],
        my_balance: [0],
        open: false,
        buying_amount: 1,
        loading: false,
        message: "",
        open_dialog: false,
    };

    componentDidMount = async () => {
        try {
          let my_name = [];
          let my_symbol = [];
          let my_price = [];
          let my_total_supply = [];
          let my_balance = [];

          
          let totalSupply = await this.props.state.ST.methods.totalSupply().call();
          let name = await this.props.state.ST.methods.name().call();
          let symbol = await this.props.state.ST.methods.symbol().call();
          let balance = await this.props.state.ST.methods.balanceOf(this.props.state.accounts[0]).call();
          
          let price = await this.props.state.TS.methods.price().call();
          
          my_name.push(name);
          my_symbol.push(symbol);
          my_price.push(price);
          my_total_supply.push(totalSupply);
          my_balance.push(balance);


          this.setState({my_name: my_name});
          this.setState({my_symbol: my_symbol});
          this.setState({my_price: my_price});
          this.setState({my_total_supply: my_total_supply});
          this.setState({my_balance: my_balance});

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
            );
    
            console.log(error);
        }
    };

    buy_token = async event => {
      event.preventDefault();
      this.setState({
        loading: true,
        errorMessage: "",
        message: "waiting for blockchain transaction to complete..."
      });
      try {
        await this.props.state.TS.methods.buyTokens(this.state.buying_amount).send({
          value: this.state.my_price[0]*this.state.buying_amount,
          from: this.props.state.accounts[0]
        });;
        
        localStorage.setItem("test_previous_price", this.state.my_price[0]);
        
        let balance = await this.props.state.ST.methods.balanceOf(this.props.state.accounts[0]).call();
        let b = [...this.state.my_balance];
        b[0] = balance
        this.setState({
          loading: false,
          message: "Yay!!!!  You have bought the stocks!",
          my_balance: b,
        });
      } catch (err) {
        console.log(err);
      }
    };

    sell_token = async event => {
      event.preventDefault();
      event.preventDefault();
      this.setState({
        loading: true,
        errorMessage: "",
        message: "waiting for blockchain transaction to complete..."
      });
      try {
        await this.props.state.TS.methods.sellTokens(this.state.buying_amount).send({
          from: this.props.state.accounts[0]
        });;
        let total = (parseInt(localStorage.getItem("FB_profit"))) + (parseInt(localStorage.getItem("test_previous_price"))*this.state.buying_amount) - (this.state.my_price[0]*this.state.buying_amount);
        console.log(parseInt(localStorage.getItem("test_previous_price")))
        console.log((parseInt(localStorage.getItem("test_previous_price"))*this.state.buying_amount))
        //(parseInt(localStorage.getItem("test_previous_price"))*this.state.buying_amount) -
        localStorage.setItem("FB_profit", total);

        let balance = await this.props.state.ST.methods.balanceOf(this.props.state.accounts[0]).call();
        let b = [...this.state.my_balance];
        b[0] = balance
        this.setState({
          loading: false,
          message: "Yay!!!!  You have sold the stocks!",
          my_balance: b,
        });
      } catch (err) {
        console.log(err);
      }
    };

    CapitalizeFirstLetter(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    handleOpen = () => {
      this.setState({open: true});
    }
  
    handleClose = () => {
      this.setState({open: false});
    }

    handleOpenDialog = () => {
      this.setState({open_dialog: true});
    }
  
    handleCloseDialog = () => {
      this.setState({open_dialog: false});
    }

    _handleTextFieldChange = (e) => {
      this.setState({
          buying_amount: e.target.value
      });
    }

  render() {
    return (
    <div style={{width: "100%"}}>
      <Grid style={{flexGrow: "1"}}>
        <Grid style={{textAlign: "center"}} item>
          <Typography style={{marginTop: "20px", color: "#ee6002"}} variant="h4" gutterBottom>
            MY STOCK INVENTORY
          </Typography>
        </Grid>
        <Grid style={{padding: "15px"}} item xs={12} container spacing={3}>

        {this.state.my_name.map( (company_name, index) => { if(this.state.my_balance[index] > 0 ) return (
          <Grid item xs={3}>
          <Card style={{background: "#ee6002"}}>
            <CardActionArea>
              <CardContent>
                <Typography style={{color: "#ffffff"}} gutterBottom variant="h4" component="h2">
                {this.CapitalizeFirstLetter(company_name)}
                </Typography>
                <Typography variant="p" style={{color: "#ffffff"}}>
                  <b style={{textTransform: "uppercase"}}>{this.state.my_symbol[index]}</b> <br />
                </Typography>

                <Typography variant="p" style={{color: "#ffffff", fontSize: "10px"}}>
                  <b style={{textTransform: "uppercase"}}>current price: </b> {this.state.my_price[index]} wei <br />
                </Typography>

                <Typography variant="p" style={{color: "#ffffff", fontSize: "10px"}}>
                  <b style={{textTransform: "uppercase"}}>total volume: </b> {this.state.my_total_supply[index]} <br />
                </Typography>

                <Typography variant="p" style={{color: "#ffffff", fontSize: "10px"}}>
                  <b style={{textTransform: "uppercase"}}>you own: </b> {this.state.my_balance[index]} Stocks<br />
                </Typography>

              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={this.handleOpen}>
                Buy
              </Button>

              
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Buy {this.CapitalizeFirstLetter(company_name)} Shares</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Number of Share to buy"
                      type="number"
                      value={this.state.buying_amount}
                      onChange={this._handleTextFieldChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.buy_token} color="primary" disabled={this.state.loading}>
                      Buy
                    </Button>
                  </DialogActions>
                  <Typography variant="p" style={{textAlign: "center", color: "#FF4500", fontSize: "12px", padding: "15px"}}>
                        {this.state.message} <br />
                  </Typography>
                </Dialog>


              <Button size="small" color="primary" onClick={this.handleOpenDialog}>
                Sell
              </Button>

              <Dialog open={this.state.open_dialog} onClose={this.handleCloseDialog} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Sell {this.CapitalizeFirstLetter(company_name)} Shares</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Number of Share to sell"
                      type="number"
                      value={this.state.buying_amount}
                      onChange={this._handleTextFieldChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.sell_token} color="primary" disabled={this.state.loading}>
                      Sell
                    </Button>
                  </DialogActions>
                  <Typography variant="p" style={{textAlign: "center", color: "#FF4500", fontSize: "12px", padding: "15px"}}>
                        {this.state.message} <br />
                  </Typography>
                </Dialog>


            </CardActions>
          </Card>
          </Grid>

        ) }

          
        )}
          
        </Grid>

        <Grid style={{textAlign: "center"}} item>
          <Typography style={{marginTop: "20px", color: "#ee6002"}} variant="h4" gutterBottom>
            MY STATS
          </Typography>
        </Grid>

        <Grid item xs={12} container spacing={2}>
          <Grid style={{textAlign: "center"}} item xs={4}>
            <Typography style={{marginTop: "20px", color: "#ee6002"}} variant="h6" gutterBottom>
              TOTAL STOCKS OWNED
            </Typography>
            <Typography variant="p" gutterBottom>
              {this.state.my_balance.reduce((num) => num)}
            </Typography>
          </Grid>
          <Grid style={{textAlign: "center"}} item xs={4}>
            <Typography style={{marginTop: "20px", color: "#ee6002"}} variant="h6" gutterBottom>
              CURRENT VALUE
            </Typography>
            <Typography variant="p" gutterBottom>
            {this.state.my_balance.reduce((num) => num) * this.state.my_price.reduce((num) => num)}
            </Typography>
          </Grid>
          <Grid style={{textAlign: "center"}} item xs={4}>
            <Typography style={{marginTop: "20px", color: "#ee6002"}} variant="h6" gutterBottom>
              PROFIT/LOSS
            </Typography>
            <Typography variant="p" gutterBottom>
            {localStorage.getItem("FB_profit")}
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </div>
    );

  }
}

export default (ShowMyStocks);
