import { Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
   root : {
      flexGrow : 1
   }
}))

export const Login : React.FunctionComponent<any> = () =>{
   const classes = useStyles()
   
   return(
      <div>
         <Grid>
            <Grid item xs={12} sm={6} style={{backgroundColor:"black"}}>
               dada
            </Grid>
            
            <Grid item xs={12} sm={6} style={{backgroundColor:"red"}}>
               dada
            </Grid>
         </Grid>
      </div>
   )
}