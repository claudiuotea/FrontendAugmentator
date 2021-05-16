import { Card, CardHeader } from "@material-ui/core"
import Typography from "material-ui/styles/typography"

export const Home : React.FunctionComponent <{}> = () =>{
   return(
      <Card>
         <CardHeader>
            <Typography variant="h1">
               Home page
            </Typography>
         </CardHeader>
      </Card>   
   )
}