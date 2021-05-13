import { Paper } from "material-ui"
import Image from "../Images/home1.jpg";

export const Home : React.FunctionComponent<{}> = () => {
   return(
      <div>
         <Paper style={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>

         </Paper>
      </div>

   )
}