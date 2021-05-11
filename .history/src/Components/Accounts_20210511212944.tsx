import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { Suspense } from "react";
import Image from "../Images/bg.jpg";
import { ForgotPassword } from "./ForgotPassword";
import { Login } from "./Login";
import { Register } from "./Register";
import { ResetPassword } from "./ResetPassword";
import { VerifyAccount } from "./VerifyAccount";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Creez un obiect CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  //100% inaltimea paginii
  gridItem: {
    height: "100vh",
  },
  //adauga niste spatiu si centreaza-le
  form: {
    margin: theme.spacing(4),
    verticalAlign: "middle",
    marginTop: "35%",
  },
}));

export const Account: React.FunctionComponent<{}> = () => {
  //instantiez obiectul
  const classes = useStyles();

  return (
    //impart ecranul in 2 coloane
    <div
      className={classes.root + classes.gridItem}
    >
      <Grid container className={classes.gridItem} >
        <Grid item xs={12} sm={9} style={{
        backgroundImage: `url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
          de
        </Grid>
        <Grid item xs={12} sm={3}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/forgotpass">
                  <ForgotPassword />
                </Route>
                <Route path="/resetpass">
                  <ResetPassword />
                </Route>
                <Route path="/verifyaccount">
                  <VerifyAccount />
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </Grid>
      </Grid>
    </div>
  );
};
