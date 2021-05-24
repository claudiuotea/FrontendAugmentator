import { useEffect, useState } from "react";
import AccountService from "../Services/AccountService";
import UserService from "../Services/UserService";

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

  useEffect(() => {
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
        console.log(resp);
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
              console.log(resp2);
            });
          });
        }
      });
  }, []);
  return <div></div>;
};
