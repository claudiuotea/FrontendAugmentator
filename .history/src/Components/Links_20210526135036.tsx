import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";

export interface LinkCompInterface{
   links:string[],
   filenames: string[],
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

export const Links = (props:LinkCompInterface) =>{   
   const classes = useStyles();
   return(
      <div>Salut</div>
      // <List className={classes.root}>
      //    {
      //       filenames.forEach(filename =>{
      //          <ListItem>
      //             <ListItemText>
      //                {filename}
      //             </ListItemText>
      //          </ListItem>
      //       })
      //    }
      // </List>
   )

}