import { Paper } from "@material-ui/core"
import Image from "../Images/home1_2.jpg";

export const MainContainer : React.FunctionComponent<{}> = () => {
   return(
      <div style={{
         backgroundImage: `url(${Image})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         height:"100vh",
         opacity:"40%"
       }}>
      </div>

   )
}