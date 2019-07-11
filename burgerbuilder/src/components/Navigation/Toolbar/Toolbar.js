import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from '../SideDrawer/Menu/Menu';
const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <Menu clicked={props.menuClicked}>Menu</Menu>
      <Logo height="60%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems  isAuth = {props.isAuth}/>
      </nav>
    </header>
  );
};

export default Toolbar;
