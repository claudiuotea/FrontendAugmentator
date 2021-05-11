import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import Image from '../Images/bg.jpg';
//Creez un obiect CSS
const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
   //100% inaltimea paginii
   gridItem: {
     height: "100vh",
   },
   //adauga niste spatiu si centreaza-le
   form: {
      margin: theme.spacing(4),
      verticalAlign:"middle",
      marginTop:"35%"
   }
 }));

export const Account: React.FunctionComponent<{}> = () => {
  //instantiez obiectul
  const classes = useStyles();

   return (
    //impart ecranul in 2 coloane
    <div className={classes.root + classes.gridItem} style={{backgroundImage:  `url(${Image})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
      <Grid container className={classes.gridItem}>
        <Grid item xs={12} sm={9} >
           de
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.form}>
            DA
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
