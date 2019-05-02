import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClose = () => { 
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpen = () => { 
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Aux>
        <Toolbar menuClicked={this.sideDrawerOpen} />
        <SideDrawer toggleSideClose= {this.sideDrawerClose} open= {this.state.showSideDrawer}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default layout;
