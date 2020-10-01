import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Activation from "../auth/Activation";
import Login from "../auth/Login";

const Routes = () => {
  return (
    <section className="container mx-auto bg-green-100">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/user/activate/:token" component={Activation} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
  );
};

export default Routes;
