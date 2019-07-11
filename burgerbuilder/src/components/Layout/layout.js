import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux"; 
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
        <Toolbar menuClicked={this.sideDrawerOpen} isAuth={this.props.isAuthinticated}/>
        <SideDrawer
          toggleSideClose={this.sideDrawerClose}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthinticated: state.auth.token != null
  };
};
export default connect(mapStateToProps)(layout);
