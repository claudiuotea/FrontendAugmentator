import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AdminService from "../Services/AdminService";
import AccountService from "../Services/AccountService";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface ITableToolbarProps {
  //cate elemente sunt selectate
  numSelected: number;
  //public_id-ul elementelor selectate
  itemsToDelete: string[];
  //functie pentru re-render cand stergem ceva
  updateTable: () => void;
}

export const EnhancedTableToolbar = (props: ITableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;


  //trimite request si sterge userii selectati
  const onClickDeleteButton = () => {
      props.itemsToDelete.map((user) =>{
          AdminService.removeUser(user)
          .then(resp => {
            props.updateTable()
          }) // double request daca trebuie refresh token
          .catch(err => {
            if (err.response.data.msg === "Token has expired") {
              AccountService.refreshToken().then((resp1) => {
                localStorage.setItem("AccessToken", resp1.data.access_token);
                AdminService.removeUser(user).then((resp2) => {
                  props.updateTable()
                });
              });
            }
          })
      })
  };
  //face promote la un user - il face admin
  const onClickPromoteButton = () => {
    props.itemsToDelete.map((user) =>{
        AdminService.promoteUser(user)
        .then(resp => {
          props.updateTable()
        })
        .catch(err => {
          if (err.response.data.msg === "Token has expired") {
            AccountService.refreshToken().then((resp1) => {
              localStorage.setItem("AccessToken", resp1.data.access_token);
              AdminService.promoteUser(user).then((resp2) => {
                props.updateTable()
              });
            });
          }
        })
    })
};

//seteaza un user fiind verified
const onClickVerifyButton = () => {
  props.itemsToDelete.map((user) =>{
      AdminService.verifyUser(user)
      .then(resp => {
        props.updateTable()
      })
      .catch(err => {
        if (err.response.data.msg === "Token has expired") {
          AccountService.refreshToken().then((resp1) => {
            localStorage.setItem("AccessToken", resp1.data.access_token);
            AdminService.verifyUser(user).then((resp2) => {
              props.updateTable()
            });
          });
        }
      })
  })
};

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Users
        </Typography>
      )}
      {numSelected > 0 && (
        <div>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={onClickDeleteButton}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Promote user">
            <IconButton aria-label="promote" onClick={onClickPromoteButton}>
              <TrendingUpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Verify user">
            <IconButton aria-label="verify" onClick={onClickVerifyButton}>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
};
