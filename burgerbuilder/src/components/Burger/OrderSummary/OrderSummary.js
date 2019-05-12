import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from '../../UI/Button/Buttons';
const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(ingKey => {
    return (
      <li key={ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}</span> :
        {props.ingredients[ingKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>

      <ul>{ingredientsSummary}</ul>
      <p> Continue to checkout ? </p>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      <Button buttonType="Danger" clicked ={props.cancelpurchase}>Cancel</Button>
      <Button buttonType="Success"  clicked ={props.continuePurchase}>Continue</Button>
    </Aux>
  );
};

export default OrderSummary;
