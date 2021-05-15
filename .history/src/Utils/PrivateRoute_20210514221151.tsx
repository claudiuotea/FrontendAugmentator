import React, { useEffect, useState } from "react";
import { Redirect, Route} from "react-router-dom";

//sunt proprietatile pe care le primim
export interface PrivateRouteProps {
  component: React.FunctionComponent;
  path: string;
  exact?: boolean;
}

//se va folosi ca un wrapper pentru route, face doar o verificare daca userul este autentificat, si daca da, ii permite sa mearga mai departe, altfel il redirecteaza spre login
//este un higher-order component, instantiaza doar in anumite conditii componenta
export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props) => {
  const [isAuth, setIsAuth] = React.useState<boolean>(
    JSON.parse(localStorage.getItem('isAuthenticated')!) || false
  )
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  // const [st, setSt] = useState<string>("FALS")

  // useEffect(() => {
  //   if(window.localStorage.getItem("isAuthenticated")! === "true")
  //   {
  //     setIsAuthenticated(true)
  //     setSt("ADEVARAT IN MORTII MA-TII")
  //     console.log("da am intrat frate")
  //     console.log("Authenticated Private route: " + isAuthenticated)
  //     console.log("ST Private route: " + st)
  //   }
    
  // },[]);

  // useEffect(() => {
  //   console.log(st)
  // }, [st])

  //autentificat? poti merge la componenta, atlfel redirect la login
  return isAuth ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/account/login" />
  );
};
