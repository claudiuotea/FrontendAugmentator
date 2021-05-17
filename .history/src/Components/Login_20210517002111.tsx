import { Button, Grid, makeStyles, TextField,LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginInterface } from "../Models/Interfaces";
import AccountService from "../Services/AccountService";
import {useHistory} from "react-router"
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
  },
  linearProgress: {
    marginTop:15,
    marginBottom:15
},
}));

export const Login: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //pentru loading bar
 const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
  const history = useHistory()

 //verifica daca trebuie afisat loading bar
 const LinearFeedback = () => {
    if (isFeedbackLoading) {
        return (
            <div className={classes.linearProgress}>
                <LinearProgress/>
            </div>
        );
    }
  }
  const onSubmit = async (event:any) =>{
    //setam ca inca asteptam raspunsul pentru loading bar
    setIsFeedbackLoading(true) 
    
    const data : LoginInterface = {
        username: username,
        password: password
     }
     //trimite request la server
     AccountService.login(data)
         .then(resp => {
           window.localStorage.setItem("AccessToken",resp.data.AccessToken)
           window.localStorage.setItem("RefreshToken",resp.data.RefreshToken)
            history.push("/app")
         })
         .catch(err => {
            console.log(err)
         })
         .finally( () =>{
           //am primit raspunsul
           setIsFeedbackLoading(false)
         })
         
  }

  useEffect(() => {
      let token = localStorage.getItem('AccessToken')
      if(token != "" && token != null && token != undefined)
        history.push("/app") 
  })
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
              disabled={isFeedbackLoading}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              disabled={isFeedbackLoading}
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
              <a href="/account/forgotpass">Forgot password? Click here!</a>
            </div>
            {LinearFeedback()}
            <Button fullWidth type="submit" variant="contained" color="primary"  onClick={onSubmit}>
               Sign in
            </Button>
          </div>
    </div>
  );
};
