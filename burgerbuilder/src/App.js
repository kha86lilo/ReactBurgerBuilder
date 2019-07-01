import React from "react";
import Layout from "./components/Layout/layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/Orders" component={Orders} />
          <Route path="/Checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
