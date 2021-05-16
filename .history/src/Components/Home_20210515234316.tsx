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

  const onFileChange = (event:any) =>{
     setSelectedFile(event.target.files[0])
     console.log(event.target.files[0].name)
  } 
   return (
      <>
    <Card>
      <CardContent>
        <div>
        <Button variant="contained" component="label">
          Upload File
          
        </Button>
        
        </div>
        
      </CardContent>
    </Card>
    <input type="file" onChange={onFileChange}/>
    </>
  );
};
