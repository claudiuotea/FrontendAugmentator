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
          <input type="file"/>
        </Button>
      </CardContent>
    </Card>
  );
};
