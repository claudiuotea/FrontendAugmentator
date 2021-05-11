import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState} from "react";
import AccountService, { LoginInterface, RegisterInterface, ResetPasswordInterface } from "../Services/AccountService";
import {useLocation} from "react-router-dom"
import queryString from 'query-string'

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
    verticalAlign: "middle",
    marginTop: "35%",
  },
}));


export const ResetPassword: React.FunctionComponent<any> = () => {
  //instantiez obiectul de css
  const classes = useStyles();
  //field-urile pt parola noua
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //query string-ul din care iau datele (token-ul pt reset si public_id-ul lui)
  const {search} = useLocation();
  //parsez query string-ul ca sa obtin datele
  const {id, token} = queryString.parse(search)
  
  const onSubmit = async (event: any) => {
    if (password === confirmPassword) {
      const data: ResetPasswordInterface = {
        confirmPassword:confirmPassword,
        password: password,
        token:token?.toString(),
        public_id:id?.toString()
      };
     
      //trimite request la server
      AccountService.resetPassword(data)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
       //MESSAGEBOX
       console.log("NU UITA MESSAGEBOX CA NU II BUNA PAROLA")
    }
  };
  return (
    //impart ecranul in 2 coloane
    <div className={classes.root + classes.gridItem}>
      <Grid container className={classes.gridItem}>
        <Grid item xs={12} sm={9} style={{ backgroundColor: "black" }}></Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.form}>
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
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

