import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

export const Home: React.FunctionComponent<{}> = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [fileName, setFileName] = useState<string>("");
  const [isClaheChecked, setIsClaheChecked] = useState<boolean>(false);
  const [isGrayscaleChecked, setIsGrayscaleChecked] = useState<boolean>(false);
  const [isFlipChecked, setIsFlipChecked] = useState<boolean>(false);
  const [isEraseChecked, setIsEraseChecked] = useState<boolean>(false);

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const renderFlipRow = () => {
    return(
    <div>
      <span>Flip</span>
      <Checkbox />
    </div>
    )
  };

  return (
    <Card>
      <CardContent>
        <div>
          <Button variant="contained">
            Upload File
            <input type="file" hidden onChange={onFileChange} />
          </Button>
          {fileName != null && <span>{fileName}</span>}
        </div>
        <div>
          <span>CLAHE</span>
          <Checkbox />
        </div>
        <div>
          <span>Grayscale</span>
          <Checkbox />
        </div>
        {() => renderFlipRow}
      </CardContent>
    </Card>
  );
};
