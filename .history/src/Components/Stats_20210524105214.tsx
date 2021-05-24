import { useEffect, useState } from "react"
import AccountService from "../Services/AccountService"
import UserService from "../Services/UserService"

export const Stats : React.FunctionComponent<{}> = () =>{
   const [stats,setStats] = useState<string[]>([])
   

   useEffect(() => {
      UserService.getStats()
      .then(resp =>{
         setStats(resp.data.Augmentations)
         console.log(resp)
      })
      .catch(err =>{
         if (err.response.data.msg === "Token has expired") {
            AccountService.refreshToken().then((resp1) => {
              localStorage.setItem("AccessToken", resp1.data.access_token);
               UserService.getStats().then(resp2 =>{
                  setStats(resp2.data.Augmentations)
                  console.log(resp2)
               })
            });
            }});
   }, [])
   return(
      <div></div>
   )
}