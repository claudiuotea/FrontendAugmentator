import { Switch } from "@material-ui/core"
import React from "react";
import { Suspense } from "react"
import { Login } from "../Components/Login/Login";

//const LoginAsync = React.lazy(() => import('../Components/Login/Login'));

export const Routes : React.FunctionComponent<{}> = () =>{
   return(
      <Suspense fallback = {<div>Loading...</div>}>
         <Switch>
            <Route path="/login">
               <Login/>
            </Route>
         </Switch>
      </Suspense>
   )
}