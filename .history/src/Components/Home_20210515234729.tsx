import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

export const Home: React.FunctionComponent<{}> = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [fileName, setFileName] = useState<string>("");

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  return (
    <Card>
      <CardContent>
        <div>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={onFileChange}/>
            
          </Button>
          {fileName != null && <span>{fileName}</span>}
        </div>
      </CardContent>
    </Card>
  );
};
