import { Card, CardHeader, Typography, } from "@material-ui/core"
import React from "react"

export const Home : React.FunctionComponent <{}> = () =>{
   return(
      <Card>
         <CardHeader>
            <Typography>
               Home page
            </Typography>
         </CardHeader>
      </Card>   
   )
}