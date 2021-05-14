import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NavbarNotLogged } from "../Components/NavbarNotLoggedIn";
import { Account } from "../Components/Accounts";
import { PrivateRoute } from "../Utils/PrivateRoute";
import { MainContainer } from "../Components/MainContainer";

export const AppRoutes: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <NavbarNotLogged/>
            <Redirect push to={"/app"}/>
          </Route>
          <Route path="/account">
            <NavbarNotLogged/>
            <Account/>
          </Route>
          <PrivateRoute path="/app" component={()=><MainContainer/>}>
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
};
