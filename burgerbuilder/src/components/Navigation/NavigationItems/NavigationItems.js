import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}> 
      <NavigationItem link="/">Burger Builder </NavigationItem>
      <NavigationItem  link="/Orders">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
