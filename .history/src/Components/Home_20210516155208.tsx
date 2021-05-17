import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Slider,
  Typography,
  Input,
} from "@material-ui/core";
import React, { useState } from "react";
import FileUploadService from "../Services/FileUploadService";
import {DropzoneDialog} from 'material-ui-dropzone'

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
   const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false)
  //pentru fisierele selectate de catre user
  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  //incarc datele intr-un formData si le trimit la server
  const onFileUpload = () => {
    const formData = new FormData();

    formData.append("myFile", selectedFile, selectedFile.name);
    setFileName(selectedFile.name);
    FileUploadService.uploadFile(formData)
      .then((resp) => {
        console.log(resp);
      })
      .catch((er) => {
        console.log(er.error);
      });
  };
  const renderFlipComponent = (
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
          <span>Flip on base dataset</span>
          <Checkbox
            checked={isFlipBase}
            onChange={(e: any) => setIsFlipBase(!isFlipBase)}
          />
          <span>Flip on CLAHE dataset</span>
          <Checkbox
            checked={isFlipClahe}
            onChange={(e: any) => setIsFlipClahe(!isFlipClahe)}
          />
          <span>Flip on grayscale dataset</span>
          <Checkbox
            checked={isFlipGray}
            onChange={(e: any) => setIsFlipGray(!isFlipGray)}
          />
        </div>
      )}
    </>
  );

  const renderEraseComponent = (
    <>
      <div>
        <span>Random erasing</span>
        <Checkbox
          checked={isEraseChecked}
          onChange={(e: any) => setIsEraseChecked(!isEraseChecked)}
        />
      </div>
      {isEraseChecked && (
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
          <span>Random erasing on base dataset</span>
          <Checkbox
            checked={isEraseBase}
            onChange={(e: any) => setIsEraseBase(!isEraseBase)}
          />
          <span>Random erasing on CLAHE dataset</span>
          <Checkbox
            checked={isEraseClahe}
            onChange={(e: any) => setIsEraseClahe(!isEraseClahe)}
          />
          <span>Random erasing on grayscale dataset</span>
          <Checkbox
            checked={isEraseGray}
            onChange={(e: any) => setIsEraseGray(!isEraseGray)}
          />
        </div>
      )}
    </>
  );

  const handleOpen = () =>{
     setIsUploadOpen(true)
  }

  const handleClose =()=>{
     setIsUploadOpen(false)
  }

  return (
    <Card>
      <CardContent>
        <Button onClick={handleOpen}>
           Upload archive
           </Button>
           <DropzoneDialog
           open={isUploadOpen}
           onSave={onFileChange}
           acceptedFiles={['.ZIP']}
           showPreviews={true}
           onClose={handleClose}
           />

        <div>
          <span>CLAHE</span>
          <Checkbox />
        </div>
        <div>
          <span>Grayscale</span>
          <Checkbox />
        </div>
        {renderFlipComponent}
        {renderEraseComponent}
      </CardContent>
    </Card>
  );
};
