import React, { useState } from "react";
import { SMTPClient , Message} from "emailjs";
import { createStyles, Theme } from "@material-ui/core/styles";
import {
  createMuiTheme,
  makeStyles,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        height: "100vh",
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    textFieldInputProps: {
      color: "white !important",
      width: "100%",
      background: "none",
      border: "none",
      textTransform: "uppercase",
      outline: "none",
      transition: "border-color .2s",
      borderColor: "green",
      borderBottomColor: "white",
    },
    textField: {
      color: "white !important",
      textTransform: "uppercase",
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

      fontFamily: "Montserrat",
    },
  })
);

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightRegular: "bolder",
    fontSize: 20,
  },
});

//Pentru SMTP client
const client = new SMTPClient({
  user: "claudiuoteaogc1@gmail.com",
  password: "veverita1999",
  host: "smtp.gmail.com",
  ssl: true,
  port: 465,
});

export const Contact: React.FunctionComponent<any> = () => {
  const classes = useStyles(theme);
  const [mail, setMail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSendEmail = () => {
   const message = new Message({
      text: message,
        from: mail,
        to: "claudiuoteaogc1@gmail.com",
        cc: "p.razvan_99@yahoo.ro",
        subject: subject,
   }) 
   client.send(
      message,
      (err, message) => {
        console.log(err || message);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mainContainer">
        <div className="formContainer">
          <div className="screen">
            <div className="screen-header">
              <div className="screen-header-left">
                <div className="screen-header-button close"></div>
                <div className="screen-header-button maximize"></div>
                <div className="screen-header-button minimize"></div>
              </div>
              <div className="screen-header-right">
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
              </div>
            </div>

            <div className="screen-body">
              <div className="screen-body-item left">
                <div className="app-title">
                  <span>CONTACT</span>
                  <span>US</span>
                </div>

                <div className="app-contact">
                  CONTACT INFO : +40 755 954 680
                </div>
              </div>

              <div className="screen-body-item">
                <div className="app-form">
                  <div className="app-form-group">
                    <TextField
                      className={classes.textField}
                      inputProps={{ className: classes.textFieldInputProps }}
                      label="Email"
                      value={mail}
                      onChange={(event) => {
                        setMail(event.target.value);
                      }}
                    />
                  </div>

                  <div className="app-form-group">
                    <TextField
                      className={classes.textField}
                      inputProps={{ className: classes.textFieldInputProps }}
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(event) => {
                        setPhoneNumber(event.target.value);
                      }}
                    />
                  </div>

                  <div className="app-form-group">
                    <TextField
                      className={classes.textField}
                      inputProps={{ className: classes.textFieldInputProps }}
                      label="Subject"
                      value={subject}
                      onChange={(event) => {
                        setSubject(event.target.value);
                      }}
                    />
                  </div>

                  <div className="app-form-group message">
                    <TextField
                      className={classes.textField}
                      inputProps={{ className: classes.textFieldInputProps }}
                      label="Message"
                      multiline
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                    />
                  </div>

                  <div className="app-form-group buttons">
                    <button className="app-form-button">SEND</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
