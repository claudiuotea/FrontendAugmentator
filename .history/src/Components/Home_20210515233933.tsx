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
        <Button variant="contained" component="label">
          Upload File
          
        </Button>
        <input type="file"/>
      </CardContent>
    </Card>
  );
};
