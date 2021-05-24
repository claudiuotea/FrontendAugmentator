import { useEffect, useState } from "react";
import AccountService from "../Services/AccountService";
import UserService from "../Services/UserService";


var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const Stats: React.FunctionComponent<{}> = () => {
  const [clahe, setClahe] = useState(0);
  const [gray, setGray] = useState(0);
  const [flip, setFlip] = useState(0);
  const [flipBase, setFlipBase] = useState(0);
  const [flipGray, setFlipGray] = useState(0);
  const [flipClahe, setFlipClahe] = useState(0);
  const [erase, setErase] = useState(0);
  const [eraseGray, setEraseGray] = useState(0);
  const [eraseClahe, setEraseClahe] = useState(0);
  const [eraseBase, setEraseBase] = useState(0);
  const [links, setLinks] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [isAdmin,setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
   let chartText = ""   
   if(isAdmin == true)
      chartText = "Most Popular Augmentations"
   else
      chartText = "Most Used Augmentations By You"   

    //oricare dintre acesti parametrii se schimba marcheaza ca un request la server a fost facut,deci reinitalizez parametrii pentru chart
    const options = {
      animationEnabled: true,
      theme: "dark2",
      title:{
         text: chartText
      },
      axisX: {
         title: "Augmentation",
         reversed: true,
      },
      axisY: {
         title: "Number of uses",
         includeZero: true,
      },
      data: [{
         type: "bar",
         dataPoints: [
            { y:  clahe, label: "CLAHE" },
            { y:  gray, label: "Grayscale" },
            { y:  flip, label: "Flip and Rotation" },
            { y:  erase, label: "Random erasing" },
            ]
      }]
   }
  }, [
    clahe,
    gray,
    flip,
    flipBase,
    flipGray,
    flipClahe,
    erase,
    eraseGray,
    eraseClahe,
    eraseBase,
    links,
    filenames,
  ]);

  useEffect(() => {
     //trimite request ca sa vad daca e admin
    AccountService.checkAdmin()
    .then((resp) => {
      setIsAdmin(resp.data.admin);
    }) //in caz ca este expirat token-ul, apelez refresh token si reincerc
    .catch((err) => {
      if (err.response.data.msg === "Token has expired") {
        AccountService.refreshToken().then((resp1) => {
          localStorage.setItem("AccessToken", resp1.data.access_token);
          AccountService.checkAdmin().then((resp2) => {
            setIsAdmin(resp2.data.admin);
          });
        });
      }
    });

    UserService.getStats()
      .then((resp) => {
        setClahe(resp.data.augmentations.clahe);
        setGray(resp.data.augmentations.gray);
        setErase(resp.data.augmentations.erase);
        setEraseBase(resp.data.augmentations.eraseBase);
        setEraseClahe(resp.data.augmentations.eraseClahe);
        setEraseGray(resp.data.augmentations.eraseGray);
        setFlip(resp.data.augmentations.flip);
        setFlipBase(resp.data.augmentations.flipBase);
        setFlipGray(resp.data.augmentations.flipGray);
        setFlipClahe(resp.data.augmentations.flipClahe);
        setLinks(resp.data.augmentations.links);
        setFilenames(resp.data.augmentations.filenames);
      })
      .catch((err) => {
        if (err.response.data.msg === "Token has expired") {
          AccountService.refreshToken().then((resp1) => {
            localStorage.setItem("AccessToken", resp1.data.access_token);
            UserService.getStats().then((resp2) => {
              setClahe(resp2.data.augmentations.clahe);
              setGray(resp2.data.augmentations.gray);
              setErase(resp2.data.augmentations.erase);
              setEraseBase(resp2.data.augmentations.eraseBase);
              setEraseClahe(resp2.data.augmentations.eraseClahe);
              setEraseGray(resp2.data.augmentations.eraseGray);
              setFlip(resp2.data.augmentations.flip);
              setFlipBase(resp2.data.augmentations.flipBase);
              setFlipGray(resp2.data.augmentations.flipGray);
              setFlipClahe(resp2.data.augmentations.flipClahe);
              setLinks(resp2.data.augmentations.links);
              setFilenames(resp2.data.augmentations.filenames);
            });
          });
        }
      });
  }, []);
  return <div></div>;
};
