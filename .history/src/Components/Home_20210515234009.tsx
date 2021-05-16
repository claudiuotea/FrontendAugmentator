import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import React from "react";

export const Home: React.FunctionComponent<{}> = () => {
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
