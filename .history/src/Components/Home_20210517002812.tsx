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
import AccountService from "../Services/AccountService";

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
   const [flipProbability, setFlipProbability] = useState(0)
   const [eraseProbability, setEraseProbability] = useState(0)

  //pentru fisierele selectate de catre user
  const onFileChange = (files:any) => {
    setSelectedFile(files[0]);
    setFileName(files[0].name);
    handleClose()
  };

  //incarc datele intr-un formData si le trimit la server
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, fileName);
    setFileName(selectedFile.name);

   FileUploadService.uploadFile(formData)
   .then(resp=> {
      console.log(resp)
   })
   .catch(err =>{
      console.log("ERR" + err)
      if(err.response.data.msg=="Token has expired")
      {
         AccountService.refreshToken()
         .then(resp=>{
            localStorage.setItem("AccessToken", resp.data.access_token);
            FileUploadService.uploadFile(formData)
         })
         .catch(err2=> console.log("refreshToken err " + err2))
      }
   })

      console.log(selectedFile + "= selectedFile")
      console.log(fileName + "= fileName")
      console.log(isClaheChecked + "= isClaheChecked")
      console.log(isGrayscaleChecked + "= isGrayscaleChecked")
      console.log(isFlipChecked + "= isFlipChecked")
      console.log(isEraseChecked + "= isEraseChecked")
      console.log(isFlipBase + "= isFlipBase")
      console.log(isFlipClahe + "= isFlipClahe")
      console.log(isFlipGray + "= isFlipGray")
      console.log(isEraseBase + "= isEraseBase")
      console.log(isEraseClahe + "= isEraseClahe")
      console.log(isEraseGray + "= isEraseGray")
      console.log(flipProbability + "= flipProbability")
      console.log(eraseProbability + '= eraseProbability')
   };
  const renderFlipComponent = (
    <>
      <div>
        <span>Flip</span>
        <Checkbox
          checked={isFlipChecked}
          onChange={(e: any) =>{
             setIsFlipChecked(!isFlipChecked)
             if (isFlipChecked == true)
               setFlipProbability(5)
            else setFlipProbability(0)
          }}
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
            onChange={(event,value)=>{setFlipProbability(value as number)}}
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
          onChange={(e: any) => {
             setIsEraseChecked(!isEraseChecked)
             if(isEraseChecked == true)
               setEraseProbability(5)
            else setEraseProbability(0)
            }}
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
            onChange={(event,value)=>{setEraseProbability(value as number)}}
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
           {fileName != null && <Typography>{fileName}</Typography>}
           <DropzoneDialog
           open={isUploadOpen}
           onSave={onFileChange}
           acceptedFiles={['.ZIP']}
           showPreviews={true}
           onClose={handleClose}
           maxFileSize={100000000}
           filesLimit={1}
           />

        <div>
          <span>CLAHE</span>
          <Checkbox checked={isClaheChecked} onChange={()=>setIsClaheChecked(!isClaheChecked)}/>
        </div>
        <div>
          <span>Grayscale</span>
          <Checkbox checked={isGrayscaleChecked} onChange={()=>setIsGrayscaleChecked(!isGrayscaleChecked)}/>
        </div>
        {renderFlipComponent}
        {renderEraseComponent}
        <Button onClick={onFileUpload}>Send</Button>
      </CardContent>
    </Card>
  );
};
