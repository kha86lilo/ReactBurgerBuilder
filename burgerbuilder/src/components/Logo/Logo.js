import React from "react";
import LogoImage from "../../Assets/Images/burger-logo.png";
import classes from './Logo.module.css';
const Logo = props => {
  return (
    <div className={classes.Logo} style={{height:props.height}}>
      <img src={LogoImage} alt="MyBurger" />
    </div>
  );
};

export default Logo;
