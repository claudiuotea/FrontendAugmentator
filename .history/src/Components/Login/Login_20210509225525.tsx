import { Grid, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridItem: {
    height: "100%",
  },
}));

export const Login: React.FunctionComponent<any> = () => {
  const classes = useStyles();

  return (
   <div className={classes.root + classes.gridItem}>
   <Grid container className={classes.gridItem}>
      <Grid item xs={12} sm={6} style={{backgroundColor:"black"}}>
         dada
      </Grid>

      <Grid item xs={12} sm={6} style={{backgroundColor:"red"}}>
         dada
      </Grid>
   </Grid>
</div>
  );
};
