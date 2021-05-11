import React from "react";
import { Suspense } from "react";
import { Login } from "../Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register } from "../Components/Register";

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
        </Switch>
      </Suspense>
    </Router>
  );
};
