import React from "react";
import { Suspense } from "react";
import { Login } from "../Components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const AppRoutes: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};
