import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { LoginInterface } from "../Models/Interfaces";
import AccountService from "../Services/AccountService";

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

export const Login: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const onSubmit = async (event:any) =>{
     const data : LoginInterface = {
        username: username,
        password: password
     }
     //trimite request la server
     AccountService.login(data)
         .then(resp => {
            console.log(resp)
         })
         .catch(err => {
            console.log(err)
         })
  }
  return (
    //impart ecranul in 2 coloane
    <div className={classes.root + classes.gridItem}>
          <div className = {classes.form}>
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
            <div style={{"textAlign":"center","margin":"3px"}} >
              <a href="/forgotpass">Forgot password? Click here!</a>
            </div>
            <Button fullWidth type="submit" variant="contained" color="primary"  onClick={onSubmit}>
               Sign in
            </Button>
          </div>
    </div>
  );
};
