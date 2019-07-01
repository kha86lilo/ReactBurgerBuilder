import React, { Component } from "react";
import Aux from "../hoc/Auxiliary";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import WithErrorHandler from "../hoc/WithErrorHandler";
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 0.8
};
class BurgerBuilder extends Component {
  state = {
    isLoading: false,
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    error: false
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };
  continuePurchaseHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };
  updatePurchaseState = ingredients => {
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

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => this.setState({ error: true }));
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = null;
    let buildControls = null;
    let orderSummary = null;
    let spinner = this.state.error ? (
      <p>Error while loading ingredients!</p>
    ) : (
      <Spinner />
    );
    if (!this.state.isLoading && this.state.ingredients != null) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancelpurchase={this.cancelPurchaseHandler}
          continuePurchase={this.continuePurchaseHandler}
        >
          {" "}
        </OrderSummary>
      );
      spinner = null;
      burger = <Burger ingredients={this.state.ingredients} />;
      buildControls = (
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientremoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {spinner}
        {burger}
        {buildControls}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
