import { Button, Grid, makeStyles, TextField , LinearProgress} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ForgotPasswordInterface } from "../Models/Interfaces";
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
  },
  linearProgress: {
    marginTop:15,
    marginBottom:15
},
}));

export const ForgotPassword: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [email,setEmail] = useState<string>('')
  //pentru loading bar
 const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
 const history = useHistory();
 const [hasError, setHasError] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
 
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
     const data : ForgotPasswordInterface = {
        email:email
     }
     //trimite request la server
     AccountService.forgotPassword(data)
         .then(resp => {
            console.log(resp)
            history.push("/account/login");
            
         })
         .catch(err => {
            console.log(err)
            setHasError(true);
        setErrorMessage(err.response.data);
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
              label="Email"
              name="email"
              value={email}
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={isFeedbackLoading}
            />
            {LinearFeedback()}
            <ViewErrorInfo hasError={hasError} errorMessage={errorMessage} />
            <Button fullWidth type="submit" variant="contained" color="primary"  onClick={onSubmit}>
               Submit
            </Button>
          </div>
    </div>
  );
};
