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
    <Grid container spacing={2}>
      <Grid item xs={8}  style={{backgroundColor:"black"}}>
        xs=8
      </Grid>
      <Grid item xs={4}  style={{backgroundColor:"black"}}>
        xs=4
      </Grid>
      <Grid item xs={4}  style={{backgroundColor:"black"}} >
        xs=4
      </Grid>
      <Grid item xs={8}  style={{backgroundColor:"black"}}>
        xs=8
      </Grid>
    </Grid>
  );
};
