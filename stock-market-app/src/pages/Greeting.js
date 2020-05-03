import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShowChartIcon from '@material-ui/icons/ShowChart';

class Greeting extends Component {
  render() {

    return (
      <div style={{width: "100%"}}>
        <Grid style={{flexGrow: "1"}}>
          <Grid style={{textAlign: "center"}} item>
            <Typography style={{marginTop: "20px", color: "#ee6002"}} variant="h4" gutterBottom>
              Welcome to the our stock market app!!
            </Typography>
          </Grid>
          <Grid style={{textAlign: "center", marginTop: "20px", color: "#ee6002"}} item>
            <ShowChartIcon style={{ fontSize: 70 }} />
          </Grid>
          <Grid style={{textAlign: "center"}} item>
            <Typography style={{marginTop: "20px"}} variant="subtitle1" gutterBottom>
              This CS481A3 blockchain game allows you to trade shares on the Ethereum blockchain.
            </Typography>
          </Grid>
          <Grid style={{textAlign: "center"}} item>
            <Typography variant="subtitle1" gutterBottom>
              In this game you can buy and sell your stocks, which are a ERC Tokens.
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Greeting;
