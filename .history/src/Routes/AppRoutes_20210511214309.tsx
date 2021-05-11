import React from "react";
import { Suspense } from "react";
import { Login } from "../Components/Login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Register } from "../Components/Register";
import { ForgotPassword } from "../Components/ForgotPassword";
import { ResetPassword } from "../Components/ResetPassword";
import { VerifyAccount } from "../Components/VerifyAccount";
import { NavbarNotLogged } from "../Components/NavbarNotLoggedIn";
import { Account } from "../Components/Accounts";

export const AppRoutes: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <NavbarNotLogged/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Redirect push to={"/account/login"}/>
          </Route>
          <Route exact path="/account">
            <Account/>
          </Route>
          {/* <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgotpass">
             <ForgotPassword/>
          </Route>
          <Route path="/resetpass">
             <ResetPassword/>
          </Route>
          <Route path="/verifyaccount">
             <VerifyAccount/>
          </Route> */}
        </Switch>
      </Suspense>
    </Router>
  );
};
