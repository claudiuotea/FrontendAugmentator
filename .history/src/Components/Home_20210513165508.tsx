import { Paper } from "@material-ui/core"
import Image from "../Images/home2.jpg";

export const Home : React.FunctionComponent<{}> = () => {
   return(
      <div style={{
         backgroundImage: `url(${Image})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         height:"100vh"
       }}>
      </div>

   )
}