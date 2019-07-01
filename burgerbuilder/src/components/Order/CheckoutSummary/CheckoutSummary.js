import React from "react";
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Buttons';
import classes from './CheckoutSummary.module.css';
const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients = {props.ingredients} />
      </div>
      <Button buttonType="Danger" clicked ={props.onCheckoutCanceled}>Cancel</Button>
      <Button buttonType="Success"  clicked={props.onCheckoutContinued}>Continue</Button>
    </div>
  );
};

export default CheckoutSummary;
