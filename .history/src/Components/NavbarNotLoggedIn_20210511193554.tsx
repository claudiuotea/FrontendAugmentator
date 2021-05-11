import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
   menuButton: {
     fontFamily: "Montserrat",
     fontStyle: "medium"
     fontSize:24,
     marginLeft: 15,
     marginRight: 15
   },
   title: {
     flexGrow: 1,
   },
   appBar:{
      
      padding:15,
      backgroundColor: "transparent",
      boxShadow: "none"
   }
 }));

export const NavbarNotLogged: React.FunctionComponent<{}> = () => {
   //incarca CSS-ul
   const classes = useStyles();
  
   return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Button color="inherit" className={classes.menuButton}>Login</Button>
        <Button color="inherit" className={classes.menuButton}>Register</Button>
      </Toolbar>
    </AppBar>
  );
};
