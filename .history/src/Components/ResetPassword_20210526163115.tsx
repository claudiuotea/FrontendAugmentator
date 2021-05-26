import { Button, Grid, makeStyles, TextField, LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import AccountService from "../Services/AccountService";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { ResetPasswordInterface } from "../Models/Interfaces";

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
  linearProgress: {
    marginTop:15,
    marginBottom:15
},
}));

export const ResetPassword: React.FunctionComponent<any> = () => {
  //instantiez obiectul de css
  const classes = useStyles();
  //field-urile pt parola noua
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //query string-ul din care iau datele (token-ul pt reset si public_id-ul lui)
  const { search } = useLocation();
  //parsez query string-ul ca sa obtin datele
  const { id, token } = queryString.parse(search);
  //pentru loading bar
 const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
 const history = useHistory();


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
      //verificam daca parolele sunt identice si salvam datele pentru a le trimite la server
      const data: ResetPasswordInterface = {
        confirmPassword: confirmPassword,
        password: password,
        token: Array.isArray(token) ? token[0] : token!,
        public_id: Array.isArray(id) ? id[0] : id!,
      };

      //trimite request la server
      AccountService.resetPassword(data)
        .then((resp) => {
          console.log(resp);
          history.push("/account/login");
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
          label="Password"
          name="password"
          value={password}
          autoFocus
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          disabled={isFeedbackLoading}
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
        />
        {LinearFeedback()}
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
    </div>
  );
};
