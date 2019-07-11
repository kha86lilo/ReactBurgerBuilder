import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return { type: actionTypes.ADD_INGREDIENT, ingredientName: name };
};

export const removeIngredient = name => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: name };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.meat
    }
  };
};
export const fetchIngredientFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENT_FAILED };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch(setIngredient(response.data));
      })
      .catch(err => {
        debugger;
        dispatch(fetchIngredientFailed());
      });
  };
};
