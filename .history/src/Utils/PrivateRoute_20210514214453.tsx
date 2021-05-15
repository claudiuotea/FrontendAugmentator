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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
   
  useEffect(() => {
    if(window.localStorage.getItem("isAuthenticated")! == "true")
    {
      setIsAuthenticated(true)
      console.log("da am intrat frate")
      console.log("Authenticated Private route: " + isAuthenticated)
    }
    
  });

  //autentificat? poti merge la componenta, atlfel redirect la login
  return isAuthenticated ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/account/login" />
  );
};
