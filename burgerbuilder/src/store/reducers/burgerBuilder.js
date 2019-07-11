import * as actionTypes from "../actions/actionTypes";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 0.8
};
const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
  purchasable: false,
  isBuilding : false
};

const reducer = (state = initialState, action) => {
  const priceAddition = INGREDIENTS_PRICES[action.ingredientName];
  let updatedIngredients;
  switch (action.type) {
    case actionTypes.FETCH_INGREDIENT_FAILED: 
      return {
        ...state,
       error : true
      };
      
    case actionTypes.SET_INGREDIENT: 
    return {
      ...state,
      ingredients : action.ingredients,
      isBuilding : false,
      totalPrice: 4

    };
    case actionTypes.ADD_INGREDIENT:
      updatedIngredients = {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      return {
        ...state,
        ingredients: updatedIngredients,
        isBuilding : true,
        totalPrice: state.totalPrice + priceAddition,
        purchasable: isPurchasable(updatedIngredients)
      };
    case actionTypes.REMOVE_INGREDIENT:
      updatedIngredients = {
        ...state.ingredients,
        isBuilding : true,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      return {
        ...state,
        ingredients:  updatedIngredients,
        totalPrice: state.totalPrice - priceAddition,
        purchasable: isPurchasable(updatedIngredients)
      };
    default:
      return state;
  }
};
const isPurchasable = ingredients => {
  const sum = Object.keys(ingredients)
    .map(ingk => {
      return ingredients[ingk];
    })
    .reduce((sum, elm) => {
      return sum + elm;
    }, 0);

  return sum > 0;
};
export default reducer;
