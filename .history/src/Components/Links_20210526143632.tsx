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
      opacity:"0.4",
      backgroundColor : "grey"
    },
    inline: {
      display: 'inline',
    },
    textItem:{
       opacity:"1",
       zIndex:1,
       color:black
    },
 }));

export const Links : React.FC<LinkCompInterface> = ({items}:LinkCompInterface) =>{   
   const classes = useStyles();
   
   return(
      <List className={classes.root}>
         {items.map((item) =>{
            return(<ListItem className={classes.inline}>
               <ListItemText className={classes.textItem}>
                  {item.filename}
               </ListItemText>
            </ListItem>
            )
         })}
      </List>
   )

}