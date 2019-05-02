import React from "react";
import classes from "./NavigationItem.module.css";
const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}> 
      <a href={props.link} className={props.isActive ? classes.active : null}>{props.children}</a>{" "}
    </li>
  );
};

export default NavigationItem;
