import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Slider,
  Typography,
  Input,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import FileUploadService from "../Services/FileUploadService";
import { DropzoneDialog } from "material-ui-dropzone";
import AccountService from "../Services/AccountService";
import { ViewErrorInfo } from "./ViewErrorInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5vh",
    opacity: "0.9",
    textAlign: "center",
  },

  sendButton: {
    position: "relative",
    //left:"50%",
    border: "1px solid ",
    background: "none",
    fontSize: 20,
    cursor: "pointer",
    padding: "10px 20px",
    transition: "0.8s",
    marginTop: "2vh",
    marginBottom: "2vh",
    "&:hover": {
      color: "#fff",
      background: "#000",
      borderColor: "#000",
    },
    "&:before": {
      content: "",
      position: "absolute",
      //left: 0,
      width: "100%",
      height: "100%",
      background: "black",
    },
  },
  checkboxes: {
    float: "none",
  },
}));

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
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [flipProbability, setFlipProbability] = useState(0);
  const [eraseProbability, setEraseProbability] = useState(0);
  const [rotateProbability, setRotateProbability] = useState(0);
  const classes = useStyles();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //pentru fisierele selectate de catre user
  const onFileChange = (files: any) => {
    setSelectedFile(files[0]);
    setFileName(files[0].name);
    handleClose();
  };

  //incarc datele intr-un formData si le trimit la server
  const onFileUpload = () => {
    if (
      selectedFile == null ||
      selectedFile == undefined ||
      fileName == "" ||
      fileName == undefined ||
      fileName == null
    ) {
      setHasError(true);
      setErrorMessage("Please select a file first");
      return;
    }
    if (
      !isClaheChecked &&
      !isGrayscaleChecked &&
      !isFlipChecked &&
      !isEraseChecked
    ) {
      setHasError(true);
      setErrorMessage("Please select an option!");
      return;
    }
    if (isFlipChecked && !isFlipBase && !isFlipClahe && !isFlipGray) {
      setHasError(true);
      setErrorMessage("Please select an option for flip!");
      return;
    }
    if (isEraseChecked && !isEraseBase && !isEraseClahe && !isEraseGray) {
      setHasError(true);
      setErrorMessage("Please select an option for erase!");
      return;
    }

    const formData = new FormData();
    formData.append("myFile", selectedFile, fileName);
    //o sa adaug si parametrii pentru augmentari tot aici
    formData.append("isClahe", isClaheChecked.toString());
    formData.append("isGray", isGrayscaleChecked.toString());
    formData.append("isFlip", isFlipChecked.toString());
    formData.append("isErase", isEraseChecked.toString());
    formData.append("isFlipBase", isFlipBase.toString());
    formData.append("isFlipClahe", isFlipClahe.toString());
    formData.append("isFlipGray", isFlipGray.toString());
    formData.append("isEraseBase", isEraseBase.toString());
    formData.append("isEraseClahe", isEraseClahe.toString());
    formData.append("isEraseGray", isEraseGray.toString());
    formData.append("flipProbability", flipProbability.toString());
    formData.append("eraseProbability", eraseProbability.toString());
    formData.append("rotateProbability", rotateProbability.toString());

    FileUploadService.uploadFile(formData)
      .then((resp) => {
        window.location.assign(resp.data);
        console.log(resp);
      })
      .catch((err) => {
        console.log("ERR" + err);
        if (err.response.data.msg == "Token has expired") {
          AccountService.refreshToken()
            .then((resp) => {
              localStorage.setItem("AccessToken", resp.data.access_token);
              FileUploadService.uploadFile(formData).then((resp2) =>
                window.location.assign(resp2.data)
              ).catch(err3=>{
                setHasError(true);
                setErrorMessage(err3.response.data.message);
              })
            })
            .catch((err2) =>
             {
               console.log("refreshToken err " + err2)
               setHasError(true);
               setErrorMessage(err2.response.data.message);
             }
            );
          else{
            setHasError(true);
            setErrorMessage(err.response.data.message);
          }
        }
      });
  };
  const renderFlipComponent = (
    <>
      <div>
        <span>Flip</span>
        <Checkbox
          checked={isFlipChecked}
          onChange={(e: any) => {
            setIsFlipChecked(!isFlipChecked);
            if (isFlipChecked == false) {
              setFlipProbability(5);
              setRotateProbability(5);
            } else {
              setFlipProbability(0);
              setRotateProbability(0);
            }
          }}
        />
      </div>
      {isFlipChecked && (
        <div>
          <Typography gutterBottom>Flip probability</Typography>
          <Slider
            defaultValue={5}
            marks={true}
            valueLabelDisplay="on"
            min={5}
            max={100}
            step={5}
            onChange={(event, value) => {
              setFlipProbability(value as number);
            }}
            style={{ maxWidth: "80%" }}
          />
          <Typography gutterBottom>Rotation probability </Typography>
          <Slider
            defaultValue={5}
            marks={true}
            valueLabelDisplay="on"
            min={5}
            max={100}
            step={5}
            onChange={(event, value) => {
              setRotateProbability(value as number);
            }}
            style={{ maxWidth: "80%" }}
          />
          <div>
            <span>Flip on base dataset</span>
            <Checkbox
              checked={isFlipBase}
              onChange={(e: any) => setIsFlipBase(!isFlipBase)}
            />
          </div>
          <div>
            <span>Flip on CLAHE dataset</span>
            <Checkbox
              checked={isFlipClahe}
              onChange={(e: any) => setIsFlipClahe(!isFlipClahe)}
            />
          </div>
          <div>
            <span>Flip on grayscale dataset</span>
            <Checkbox
              checked={isFlipGray}
              onChange={(e: any) => setIsFlipGray(!isFlipGray)}
            />
          </div>
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
            setIsEraseChecked(!isEraseChecked);
            if (isEraseChecked == false) setEraseProbability(5);
            else setEraseProbability(0);
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
            onChange={(event, value) => {
              setEraseProbability(value as number);
            }}
            style={{ maxWidth: "80%" }}
          />
          <div>
            <span>Random erasing on base dataset</span>
            <Checkbox
              checked={isEraseBase}
              onChange={(e: any) => setIsEraseBase(!isEraseBase)}
            />
          </div>
          <div>
            <span>Random erasing on CLAHE dataset</span>
            <Checkbox
              checked={isEraseClahe}
              onChange={(e: any) => setIsEraseClahe(!isEraseClahe)}
            />
          </div>
          <div>
            <span>Random erasing on grayscale dataset</span>
            <Checkbox
              checked={isEraseGray}
              onChange={(e: any) => setIsEraseGray(!isEraseGray)}
            />
          </div>
        </div>
      )}
    </>
  );

  const handleOpen = () => {
    setIsUploadOpen(true);
  };

  const handleClose = () => {
    setIsUploadOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Button onClick={handleOpen} className={classes.sendButton}>
          Upload archive
        </Button>
        {fileName != null && <Typography>{fileName}</Typography>}
        <DropzoneDialog
          open={isUploadOpen}
          onSave={onFileChange}
          acceptedFiles={[".ZIP"]}
          showPreviews={true}
          onClose={handleClose}
          maxFileSize={100000000}
          filesLimit={1}
        />

        <div>
          <span>CLAHE</span>
          <Checkbox
            checked={isClaheChecked}
            onChange={() => setIsClaheChecked(!isClaheChecked)}
          />
        </div>
        <div>
          <span>Grayscale</span>
          <Checkbox
            checked={isGrayscaleChecked}
            onChange={() => setIsGrayscaleChecked(!isGrayscaleChecked)}
          />
        </div>
        {renderFlipComponent}
        {renderEraseComponent}
        <Button className={classes.sendButton} onClick={onFileUpload}>
          Send
        </Button>
        <ViewErrorInfo errorMessage={errorMessage} hasError={hasError}/>
      </CardContent>
    </Card>
  );
};
