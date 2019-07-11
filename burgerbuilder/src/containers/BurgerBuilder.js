import React, { Component } from "react";
import Aux from "../hoc/Auxiliary";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import WithErrorHandler from "../hoc/WithErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../store/actions/burgerBuilder";
import * as orderActions from "../store/actions/order";
import * as authActions from "../store/actions//auth";
class BurgerBuilder extends Component {
  state = {
    isLoading: false,
    purchasing: false
  };
  purchaseHandler = () => {
    if(this.props.isAuth){
      this.setState({ purchasing: true });
    }
    else{ 
      this.props.onRedirectPathChange('/checkout');
      this.props.history.push('/auth');
    }
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
    this.props.onInitIngredients();
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
    let spinner = this.props.error ? (
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
          ingredientAdded={ingName => this.props.onIngredientAdded(ingName)}
          ingredientremoved={ingName => this.props.onIngredientRemoved(ingName)}
          disabledInfo={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.props.purchasable}
          ordered={this.purchaseHandler}
          isAuth = {this.props.isAuth}
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
    ing: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
    error: state.burgerBuilder.error,
    isAuth : state.auth.token != null ,
    redirectPAth : state.auth.authRedirectPath
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => {
      dispatch(burgerBuilderActions.initIngredient());
      dispatch(orderActions.purchaseBurgerInit());
    },
    onRedirectPathChange : path =>{
      dispatch(authActions.changeRedirectPath(path))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
