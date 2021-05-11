import React from "react";
import { Suspense } from "react";
import { Login } from "../Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register } from "../Components/Register";
import { ForgotPassword } from "../Components/ForgotPassword";

export const AppRoutes: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgotpass">
             <ForgotPassword/>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};
