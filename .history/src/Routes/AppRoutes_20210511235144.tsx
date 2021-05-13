import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NavbarNotLogged } from "../Components/NavbarNotLoggedIn";
import { Account } from "../Components/Accounts";
import { PrivateRoute } from "../Utils/PrivateRoute";
import { Home } from "@material-ui/icons";

export const AppRoutes: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <NavbarNotLogged/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Redirect push to={"/account/login"}/>
          </Route>
          <Route path="/account">
            <Account/>
          </Route>
          <PrivateRoute path="/home" component={<Home/>}>
            
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
};
