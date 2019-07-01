import React from "react";
import classes from "./Order.module.css";
const Order = props => {
  let ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName]
    });
  }
  const ingredientsOutput = ingredients.map(ing => {
    return (
      <span key={ing.name}
      style={{
          textTransform:'capitalize',
          display:'inline-block',
          margin : '0 8px',
          border : '1px solid #ccc'
      }}>
        {ing.name} ({ing.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p> Ingredients : {ingredientsOutput}</p>
      <p>
        Price <strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
    </div>
  );
};

export default Order;
