import { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { useHistory } from 'react-router-dom';


//verifica daca user-ul are token (este deja autentificat)
export const RequireAuth : React.FunctionComponent<FunctionComponent> = (comp) =>{
   const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false)
   const history = useHistory();

   useEffect(() => {
      const jwt = window.localStorage.getItem("token")
      //e autentificat
      if(jwt != null)
         setIsAuthenticated(true)

   }, [])

   return(
      //daca nu e autentificat il trimitem la login
      <div>
      {isAuthenticated?comp:() => history.push("/account/login")}
      </div>
   )
}