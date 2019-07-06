import React, { Component } from "react";
import Aux from "../hoc/Auxiliary";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import WithErrorHandler from "../hoc/WithErrorHandler";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    isLoading: false, 
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
    
    this.props.history.push({
      pathname: "/checkout" 
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

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
      //  this.setState({ ingredients: response.data });
      })
      .catch(error => this.setState({ error: true }));
  }
  render() {
    const disabledInfo = {
      ...this.props.ing
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
    if (!this.state.isLoading && this.props.ing != null) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          price={this.props.totalPrice}
          cancelpurchase={this.cancelPurchaseHandler}
          continuePurchase={this.continuePurchaseHandler}
        >
          {" "}
        </OrderSummary>
      );
      spinner = null;
      burger = <Burger ingredients={this.props.ing} />;
      buildControls = (
        <BuildControls
          ingredientAdded={(ingName)=>this.props.onIngredientAdded(ingName)}
          ingredientremoved={(ingName)=>this.props.onIngredientRemoved(ingName)}
          disabledInfo={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.props.purchasable}
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

const mapStateToProps = state => {
  return {
    ing: state.ingredients,
    totalPrice : state.totalPrice,
    purchasable: state.purchasable
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName : ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName : ingName })
  };
};
 
export default connect(mapStateToProps,mapDispatchToProps)( WithErrorHandler(BurgerBuilder, axios));
