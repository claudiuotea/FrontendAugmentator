import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
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
  }
}));

export const ForgotPassword: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [email,setEmail] = useState<string>('')

 
  const onSubmit = async (event:any) =>{
     const data : ForgotPasswordInterface = {
        email:email
     }
     //trimite request la server
     AccountService.forgotPassword(data)
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
      <Grid container className={classes.gridItem}>
        <Grid item xs={12} sm={9} style={{ backgroundColor: "black" }}></Grid>
        <Grid item xs={12} sm={3}>
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
            />
            <Button fullWidth type="submit" variant="contained" color="primary"  onClick={onSubmit}>
               Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
