import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/*const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
*/

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
    
    render() {
        return (
        <div style={{flexGrow: "1"}}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" style={{marginRight: "theme.spacing(2)"}} color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6" style={{flexGrow: "1"}}>
                  STOCK MARKET
                </Typography>
                <Button href="/#/" color="inherit">Home</Button>
                <Button href="/#/show-my-stocks" color="inherit">My Stocks</Button>
                <Button href="/#/show-all-stocks" color="inherit">All Stocks</Button>
              </Toolbar>
            </AppBar>
        </div>
        /*<div>
            <nav class="navbar navbar-expand-lg navbar-light" style={{ background: "#202040"}}>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="/" style={{ color: "#ffbd69" }}>Stock Market</a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="/#/show-my-stocks" style={{ color: "#ffbd69" }}>Show My Stocks <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/#/show-all-stocks" style={{ color: "#ffbd69" }}>Show All Stocks</a>
                </li>
                </ul>
            </div>
            </nav>
            <div className="center">
            <h4 style={{ color: "#202040" }}>This is a stock market simulation !</h4>
            </div>
            Your account address: {this.props.state.accounts}
            <hr />
        </div> */
    );
  }
}

export default (TopBar);
