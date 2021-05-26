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

export const Links : React.FC<LinkCompInterface> = ({filenames,links}:LinkCompInterface) =>{   
   const classes = useStyles();
   
   return(
      <List className={classes.root}>
         {
            for(var i = 0; i < filenames.length; i++)
               console.log(filenames[i])
            
         }
      </List>
   )

}