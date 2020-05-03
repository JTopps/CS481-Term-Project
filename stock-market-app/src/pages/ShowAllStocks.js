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

export default class ShowAllStocks extends Component {
    state = {
        all_name: [],
        all_symbol: [],
        all_price: [],
        all_total_supply: [],
        all_balance: [],
        open: false,
        buying_amount: 1,
        loading: false,
        message: "",
        open_dialog: false,
    };

    componentDidMount = async () => {
        try {
            let all_name = [];
            let all_symbol = [];
            let all_price = [];
            let all_total_supply = [];
            let all_balance = [];

            
            let totalSupply = await this.props.state.ST.methods.totalSupply().call();
            let name = await this.props.state.ST.methods.name().call();
            let symbol = await this.props.state.ST.methods.symbol().call();
            let balance = await this.props.state.ST.methods.balanceOf(this.props.state.accounts[0]).call();
            
            let price = await this.props.state.TS.methods.price().call();
            all_name.push(name);
            all_symbol.push(symbol);
            all_price.push(price);
            all_total_supply.push(totalSupply);
            all_balance.push(balance);


            this.setState({all_name: all_name});
            this.setState({all_symbol: all_symbol});
            this.setState({all_price: all_price});
            this.setState({all_total_supply: all_total_supply});
            this.setState({all_balance: all_balance});

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
          value: this.state.all_price[0]*this.state.buying_amount,
          from: this.props.state.accounts[0]
        });;
        localStorage.setItem("test_previous_price", this.state.all_price[0]);
        this.setState({
          loading: false,
          message: "Yay!!!!  You have sold the stocks!",
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
              ALL AVAILABLE STOCKS
            </Typography>
          </Grid>
          <Grid style={{padding: "15px"}} item xs={12} container spacing={2}>

          {this.state.all_name.map( (company_name, index) =>  (
            <Grid item xs={3}>
              <Card style={{background: "#ee6002"}}>
                <CardActionArea>
                  <CardContent>
                    <Typography style={{color: "#ffffff"}} gutterBottom variant="h4" component="h2">
                    {this.CapitalizeFirstLetter(company_name)}
                    </Typography>
                    <Typography variant="p" style={{color: "#ffffff"}}>
                      <b style={{textTransform: "uppercase"}}>{this.state.all_symbol[index]}</b> <br />
                    </Typography>

                    <Typography variant="p" style={{color: "#ffffff", fontSize: "10px"}}>
                      <b style={{textTransform: "uppercase"}}>current price: </b> {this.state.all_price[index]} wei <br />
                    </Typography>

                    <Typography variant="p" style={{color: "#ffffff", fontSize: "10px"}}>
                      <b style={{textTransform: "uppercase"}}>total volume: </b> {this.state.all_total_supply[index]} <br />
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
                    Learn More
                  </Button>

                  <Dialog open={this.state.open_dialog} onClose={this.handleCloseDialog} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">{this.CapitalizeFirstLetter(company_name)}</DialogTitle>
                      <DialogContent>
                        <Typography variant="p" style={{ fontSize: "12px", padding: "15px"}}>
                          Facebook, Inc. is an American social media and technology company based in Menlo Park, California. It was founded by Mark Zuckerberg, along with fellow Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes, originally as TheFacebook.com—today's Facebook, a popular global social networking website.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>


                </CardActions>
              </Card>
            </Grid>
          ))}
            
          </Grid>
        </Grid>
      </div>

    );

  }
}
