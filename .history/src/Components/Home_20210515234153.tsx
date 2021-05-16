import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

export const Home: React.FunctionComponent<{}> = () => {
  const[selectedFile, setSelectedFile] = useState<any>()


  const onFileChange = (event) =>{
     setSelectedFile(event.target.files[0])
  } 
   return (
    <Card>
      <CardContent>
        <div>
        <Button variant="contained" component="label">
          Upload File
          
        </Button>
        <input type="file"/>
        </div>
        
      </CardContent>
    </Card>
  );
};
