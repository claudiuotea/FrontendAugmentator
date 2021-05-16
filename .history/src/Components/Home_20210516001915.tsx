import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Slider,
  Typography,
} from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import React, { useState } from "react";

export const Home: React.FunctionComponent<{}> = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [fileName, setFileName] = useState<string>("");
  const [isClaheChecked, setIsClaheChecked] = useState<boolean>(false);
  const [isGrayscaleChecked, setIsGrayscaleChecked] = useState<boolean>(false);
  const [isFlipChecked, setIsFlipChecked] = useState<boolean>(false);
  const [isEraseChecked, setIsEraseChecked] = useState<boolean>(false);
  const [isFlipBase, setIsFlipBase] = useState<boolean>(false);
  const [isFlipClahe, setIsFlipClahe] = useState<boolean>(false);
  const [isFlipGray, setIsFlipGray] = useState<boolean>(false);
  const [isEraseBase, setIsEraseBase] = useState<boolean>(false);
  const [isEraseClahe, setIsEraseClahe] = useState<boolean>(false);
  const [isEraseGray, setIsEraseGray] = useState<boolean>(false);

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const renderFlipRow = (
    <>
      <div>
        <span>Flip</span>
        <Checkbox
          checked={isFlipChecked}
          onChange={(e: any) => setIsFlipChecked(!isFlipChecked)}
        />
      </div>
      {isFlipChecked && (
        <div>
          <Typography gutterBottom>Probability</Typography>
          <Slider
            defaultValue={5}
            marks={true}
            valueLabelDisplay="on"
            min={5}
            max={100}
            step={5}
          />
          <span>
            <CheckBox checked={isFlipBase}/>
          </span>
          <span>
            <CheckBox checked={isFlipClahe}/>
          </span>
          <span>
            <CheckBox checked={isFlipGray}/>
          </span>
        </div>
      )}
    </>
  );

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
        {renderFlipRow}
      </CardContent>
    </Card>
  );
};
