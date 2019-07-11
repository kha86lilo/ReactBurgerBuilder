import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
  onCheckoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  onCheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    debugger;
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      
      summary = this.props.purchased ? <Redirect to="/" /> : (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            onCheckoutCanceled={this.onCheckoutCanceledHandler}
            onCheckoutContinued={this.onCheckoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return  summary ;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased : state.order.purchased 
  };
};
export default connect(mapStateToProps)(Checkout);
