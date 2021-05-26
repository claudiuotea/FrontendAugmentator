import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";

export interface LinkItemInterface{
   link:string,
   filename: string,
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
 }));

export const Links : React.FC<LinkItemInterface[]> = (items : LinkItemInterface[]) =>{   
   const classes = useStyles();
   
   return(
      <List className={classes.root}>
         {}
      </List>
   )

}