import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = props => {
  let tIngredients = Object.keys(props.ingredients)
    .map(igkey => {
      let arr = [];
      for (let i = 0; i < props.ingredients[igkey]; i++) {
        arr.push(<BurgerIngredients key={igkey + i} type={igkey} />);
      }
      return arr;
    })
    .reduce((arr, elm) => {
      return [...arr, ...elm];
    });
  if (tIngredients.length === 0) {
    tIngredients = "Please start adding ingredients";
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {tIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
