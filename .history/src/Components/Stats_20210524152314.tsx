import { useEffect, useState } from "react";
import AccountService from "../Services/AccountService";
import UserService from "../Services/UserService";
import { Bar, Pie } from "react-chartjs-2";

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [barData, setBarData] = useState({});
  const [barConfig, setBarConfig] = useState({});
  const [barText, setBarText] = useState("");
  const [erasePieData, setErasePieData] = useState({});
  const [flipPieData, setFlipPieData] = useState({});

  const flipPieChart = () => {
    setFlipPieData({
      labels: [
        "Flip on base dataset",
        "Flip on CLAHE dataset",
        "Flip on grayscale dataset",
      ],
      datasets: [
        {
          label: "# of uses",
          data: [flipBase, flipClahe, flipGray],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const erasePieChart = () => {
    setErasePieData({
      labels: [
        "Erase on base dataset",
        "Erase on CLAHE dataset",
        "Erase on grayscale dataset",
      ],
      datasets: [
        {
          label: "# of uses",
          data: [eraseBase, eraseClahe, eraseGray],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  //pentru a afisa chart-ul orizontal
  const barChart = () => {
    setBarData({
      labels: ["CLAHE", "GRAYSCALE", "FLIP", "ERASE"],
      datasets: [
        {
          label: "# of uses",
          data: [clahe, gray, flip, erase],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 2,
        },
      ],
    });

    setBarConfig({
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: barText,
        },
      },
    });
  };

  useEffect(() => {
    if (isAdmin == true) setBarText("Most Popular Augmentations");
    else setBarText("Most Used Augmentations By You");

    //generam info pentru chart-uri
    barChart();
    flipPieChart();
    erasePieChart();
    //oricare dintre acesti parametrii se schimba marcheaza ca un request la server a fost facut,deci reinitalizez parametrii pentru chart
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
  return (
    <div style={{ height: "auto", width: "auto" }}>
      <Bar data={barData} options={barConfig} type />
      <Pie data={erasePieData} type />
      <Pie data={flipPieData} type />
    </div>
  );
};
