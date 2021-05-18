import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { Link, useHistory } from "react-router-dom";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Image from "../Images/home1_2.jpg";
import AccountService from "../Services/AccountService";
import { Admin } from "./Admin";
import { Contact } from "./Contact";
import { Home } from "./Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logo from "../Images/logo_side.png";
import { AutomaticDownload } from "./AutomaticDownload";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      // "& backgroundImage":{
      //    opacity:0.4,
      //  height:"100vh"
      // }
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      opacity: "80%",
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      backgroundColor: "transparent",
      boxShadow: "none",
      color: "black",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    list: {
      fontWeightRegular: "bolder",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    logoutButton: {
      border: "1px solid ",
      background: "none",
      fontSize: 20,
      cursor: "pointer",
      textAlign: "center",
      padding: "10px 20px",
      transition: "0.8s",
      "&:hover": {
        color: "#fff",
        background: "#000",
        borderColor: "#000",
      },
      "&:before": {
        content: "",
        position: "absolute",
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
      },
    },
  })
);

export const MainContainer: React.FunctionComponent<{}> = () => {
  //Obiectul CSS cu teme
  const classes = useStyles();
  //ca sa pot seta in care parte e ancorat meniul
  const theme = useTheme();
  //ca sa fie adaptive, in caz ca e rendat pe un ecran mic
  const [mobileOpen, setMobileOpen] = React.useState(false);
  //pentru redirect
  const history = useHistory();
  //pentru a vedea link curent
  const location = useLocation();
  //on/off pentru mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  //user admin sau nu?
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    //trimite request ca sa vad daca e admin
    AccountService.checkAdmin()
      .then((resp) => {
        setIsAdmin(resp.data.admin);
      }) //in caz ca este expirat token-ul, apelez refresh token si reincerc
      .catch((err) => {
        if (err.response.data.msg === "Token has expired") {
          AccountService.refreshToken().then((resp1) => {
            localStorage.setItem("AccessToken", resp1.data.access_token);
            AccountService.checkAdmin().then((resp2) => {
              setIsAdmin(resp2.data.admin);
            });
          });
        }
      });
  }, []);

  //stabilim ce componenta randam in functie de path
  const renderSwitch = (param: string) => {
    switch (param) {
      case "/app":
        return <Home />;
      case "/app/stats":
        return <div>stats</div>;
      case "/app/contact":
        return <Contact />;
      case "/app/admin":
        return isAdmin ? <Admin /> : <div>404</div>;
      case "app/download":
        return <div>WTF</div>
      default:
        //TODO aici
        return <div>Wrong path</div>;
    }
  };

  //Rendeaza itemele din meniu
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List className={classes.list}>
        <ListItem button key="home" onClick={() => history.push("/app")}>
          <ListItemIcon>
            <HomeIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="stats" onClick={() => history.push("/app/stats")}>
          <ListItemIcon>
            <EqualizerIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItem>
        <ListItem
          button
          key="contact"
          onClick={() => history.push("/app/contact")}
        >
          <ListItemIcon>
            <PermContactCalendarIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        {
          //doar admin are voie sa vada
          isAdmin ? (
            <ListItem
              button
              key="admin"
              onClick={() => history.push("/app/admin")}
            >
              <ListItemIcon>
                <SupervisorAccountIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          ) : null
        }
        <ListItem
          button
          key="stats"
          onClick={() => {
            AccountService.logout();
            window.location.reload(false);
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <img
        src={Image}
        style={{
          opacity: 0.4,
          position: "absolute",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <img src={Logo} style={{ width: "300px", height: "auto" , position:"absolute"}} />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {renderSwitch(location.pathname)}
      </main>
    </div>
  );
};
