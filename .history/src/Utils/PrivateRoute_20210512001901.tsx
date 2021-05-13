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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => {
      const jwt = window.localStorage.getItem("token");
      return jwt != null
    }  
  );

  // useEffect(() => {
  //   const jwt = window.localStorage.getItem("token");
  //   //e autentificat
  //   if (jwt != null) setIsAuthenticated(true);
  // });

  //autentificat? poti merge la componenta, atlfel redirect la login
  return isAuthenticated ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/account/login" />
  );
};
