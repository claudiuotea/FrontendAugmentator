import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NavbarNotLogged } from "../Components/NavbarNotLoggedIn";
import { Account } from "../Components/Accounts";
import { PrivateRoute } from "../Utils/PrivateRoute";
import { Home } from "../Components/MainContainer";

export const AppRoutes: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <NavbarNotLogged/>
            <Redirect push to={"/account/login"}/>
          </Route>
          <Route path="/account">
            <NavbarNotLogged/>
            <Account/>
          </Route>
          <PrivateRoute path="/home" component={()=><MainContainer/>}>
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
};
