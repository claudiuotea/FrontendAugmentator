import { Button, Grid, makeStyles, TextField, LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { RegisterInterface } from "../Models/Interfaces";
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
export const Register: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  //pentru loading bar
 const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);

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

  const onSubmit = async (event: any) => {
    if (password === confirmPassword) {
      const data: RegisterInterface = {
        username: username,
        password: password,
        email: email,
      };
      //trimite request la server
      AccountService.register(data)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //MESSAGEBOX
      console.log("NU UITA MESSAGEBOX CA NU II BUNA PAROLA");
    }
  };
  return (
    //impart ecranul in 2 coloane
    <div className={classes.root + classes.gridItem}>
      <div className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          label="Email"
          name="email"
          value={email}
          autoFocus
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={isFeedbackLoading}
          inputProps = {{ className: classes.textFieldInputProps}}
          className = {classes.textField}
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
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          disabled={isFeedbackLoading}
          inputProps = {{ className: classes.textFieldInputProps}}
          className = {classes.textField}
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
          disabled={isFeedbackLoading}
          inputProps = {{ className: classes.textFieldInputProps}}
          className = {classes.textField}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          label="Confirm password"
          name="confirmPassword"
          value={confirmPassword}
          autoFocus
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          disabled={isFeedbackLoading}
          inputProps = {{ className: classes.textFieldInputProps}}
          className = {classes.textField}
        />
        {LinearFeedback()}
        <Button
          className = {classes.button}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};