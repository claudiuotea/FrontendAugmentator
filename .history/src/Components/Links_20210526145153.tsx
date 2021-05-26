import { Button, Checkbox, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
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
      marginTop:"10vh",
      marginLeft:"10vh",
      width: '100%',
      maxWidth: '36ch',
      // backgroundColor: theme.palette.background.paper,
      opacity:"0.8",
      backgroundColor : "grey",
    },
    inline: {
      display: 'inline',
      textAlign:"center"
    },
    downloadButton:{
      float:"right"
    }
 }));

export const Links : React.FC<LinkCompInterface> = ({items}:LinkCompInterface) =>{   
   const classes = useStyles();
   //pentru redirect
  const history = useHistory();

   return(
      <List className={classes.root}>
         {items.map((item) =>{
            console.log(item.link)
            return(<ListItem>
               <ListItemText>
                  {item.filename}
               </ListItemText>
               <Button onClick={()=>history.push(item.link)} className={classes.downloadButton}>Download</Button>
               <Divider></Divider>
            </ListItem>
            )
         })}
      </List>
   )

}