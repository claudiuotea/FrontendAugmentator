import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";

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
     alignItems: "center",
     verticalAlign:"center"
  }
}));

export const Login: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    //impart ecranul in 2 coloane
    <div className={classes.root + classes.gridItem}>
      <Grid container className={classes.gridItem}>
        <Grid item xs={12} sm={6} style={{ backgroundColor: "black" }}></Grid>
        <Grid item xs={12} sm={6}>
          <form className = {classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Username"
              name="username"
              value={username}
              autoFocus
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Password"
              name="password"
              value={password}
              autoFocus
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
