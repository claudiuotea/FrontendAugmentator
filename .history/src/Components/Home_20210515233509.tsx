import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React from "react";

export const Home: React.FunctionComponent<{}> = () => {
  return (
    <Card>
      <CardHeader>
        <CardContent>
          <Typography>Home page</Typography>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
