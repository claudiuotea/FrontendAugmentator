import { useEffect, useState } from "react"
import UserService from "../Services/UserService"

export const Stats : React.FunctionComponent<{}> = () =>{
   const [stats,setStats] = useState<string[]>([])
   

   useEffect(() => {
      UserService.getStats()
      .then(resp =>{
         setStats(resp.data.Augmentations)
      })
      .catch(err =>{
         console.log(err)
      })
   }, [])
   return(
      
   )
}