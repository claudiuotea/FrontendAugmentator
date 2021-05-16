import { Button, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React from "react";

export const Home: React.FunctionComponent<{}> = () => {
  return (
    <Card>
      <CardContent>
         <input type="file"/>
         <Button>Upload</Button>
      </CardContent>
    </Card>
  );
};
