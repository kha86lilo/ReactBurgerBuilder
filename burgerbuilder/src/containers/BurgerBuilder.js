import React, { Component } from "react";
import Aux from "../hoc/Aux";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 0.8
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };
  continuePurchaseHandler = () => {
    alert("test");
  };
  updatePurchaseState = (ingredients) => { 
    const sum = Object.keys(ingredients)
      .map(ingk => {
        return ingredients[ingk];
      })
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) return;
    const updatedCount = oldCount - 1;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          <OrderSummary 
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancelpurchase ={this.cancelPurchaseHandler}
          continuePurchase ={this.continuePurchaseHandler}> </OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientremoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
