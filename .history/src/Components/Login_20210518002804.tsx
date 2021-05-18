import { Button, Grid, makeStyles, TextField,LinearProgress, InputAdornment, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginInterface } from "../Models/Interfaces";
import AccountService from "../Services/AccountService";
import {useHistory} from "react-router"
import { Visibility, VisibilityOff } from "@material-ui/icons";
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
     marginTop:"15%"
  },
  linearProgress: {
    marginTop:15,
    marginBottom:15
  },
  textFieldInputProps: {
    color: "black !important",
    width: "100%",
    background: "none",
    border: "none",
    outline: "none",
    transition: "border-color .2s",
    fontSize: 30

   
  },
  textField: {
    color: "white !important",
    textTransform: "uppercase",
    background: "none",
    
    "& .MuiFormLabel-root": {
      color: "#666",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-notchedOutline":{
      border: "1px solid black"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid black",
      background: "none",
    },
    
 
    

    fontFamily: "Montserrat",
  },

  button:{
    border: '1px solid ',
    background: 'none',
    fontSize: 20,
    cursor: 'pointer',
    padding: '10px 20px',
    transition: '0.8s',
    color: '#000',
    borderColor: '#000',
    '&:hover': {
      color: '#fff',
      background: '#000',
      borderColor: '#000'
    },
    

  }
  
}));

export const Login: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //pentru loading bar
 const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
  const history = useHistory()
  //pentru a afisa erori
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


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
          <img  style = {{width: "300px", height: "auto",  display:"block",
            margin:"auto"}} src={Image} />
            <ViewErrorInfo 
              hasError = {hasError}
              errorMessage = {errorMessage}
            />
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

              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }} 
              inputProps = {{ className: classes.textFieldInputProps}}
              className = {classes.textField}
            />
            
            <div style={{"textAlign":"center",marginTop: 10, marginBottom: 10}} >
              <a href="/account/forgotpass" style = {{textDecoration: "none", color: "black"}}>Forgot password? Click here!</a>
            </div>
            {LinearFeedback()}
            <Button fullWidth type="submit" variant="contained" color="primary"  onClick={onSubmit} className={classes.button}>
               Sign in
            </Button>
          </div>
    </div>
  );
};
