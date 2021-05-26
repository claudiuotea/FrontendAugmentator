import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";

export interface LinkCompInterface{
   items: LinkItemInterface[]
}

export interface LinkItemInterface{
   link:string,
   filename: string,
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      maxWidth: '36ch',
      // backgroundColor: theme.palette.background.paper,
      backgroundColor : "grey"
    },
    inline: {
      display: 'inline',
    },
 }));

export const Links : React.FC<LinkCompInterface> = ({items}:LinkCompInterface) =>{   
   const classes = useStyles();
   
   return(
      <List className={classes.root}>
         {items.map((item) =>{
            return(<ListItem>
               <ListItemText>
                  {item.filename}
               </ListItemText>
            </ListItem>
            )
         })}
      </List>
   )

}