import React, { FunctionComponent, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import AdminService from "../Services/AdminService";
import AccountService from "../Services/AccountService";
import { UserDataInterface } from "../Models/Interfaces";

interface Column {
  id: "public_id" | "username" | "email" | "isVerified" | "isAdmin";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "public_id", label: "ID", minWidth: 170 },
  { id: "username", label: "Username", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "isVerified", label: "Verified", minWidth: 100 },
  { id: "isAdmin", label: "Admin", minWidth: 100 },
];



const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export const UsersTable: FunctionComponent<any> = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [tableRows, setTableRows] = useState<UserDataInterface[]>([]);
  const [filteredTablerows, setFilteredTableRows] = useState<
    UserDataInterface[]
  >([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [numOfUsersSelected, setNumOfUsersSelected] = useState(0);
  const [selected, setSelected] = React.useState<string[]>([]);
  const jwt = window.localStorage.getItem("token");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoading(true);

    AdminService.getUsers()
      .then((resp) => {
        console.log(resp);
        setTableRows(resp.data.users);
        setFilteredTableRows(resp.data.users);
        setSelected([]);
      }) //in caz ca este expirat token-ul, apelez refresh token si reincerc
      .catch((err) => {
        if (err.response.data.msg === "Token has expired") {
          AccountService.refreshToken().then((resp1) => {
            localStorage.setItem("AccessToken", resp1.data.access_token);
            AccountService.checkAdmin().then((resp2) => {
              console.log(resp2);
              setTableRows(resp2.data.users);
              setFilteredTableRows(resp2.data.users);
              setSelected([]);
            });
          });
        }
      })
      .finally(() => {
             setIsLoading(false);
       })}

  const updateInput = (event: any) => {
    setSearchKeyword(event.target.value);

    const filteredData = tableRows.filter((row) => {
      return row.username
        .toLowerCase()
        .includes(event.target.value.toLowerCase()) || row.email.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredTableRows(filteredData);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tableRows.map((n) => n.email);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <div>
      <TextField
        autoComplete="fname"
        name="firstName"
        variant="outlined"
        required
        fullWidth
        id="firstName"
        label="Search for an employee"
        autoFocus
        value={searchKeyword}
        onChange={updateInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          itemsToDelete={selected}
          updateTable={getUsers}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    // indeterminate={
                    //   selected.length > 0 &&
                    //   selected.length < filteredTablerows.length
                    // }
                    // checked={
                    //   filteredTablerows.length > 0 &&
                    //   selected.length == filteredTablerows.length
                    // }
                    onChange={onSelectAllClick}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTablerows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.public_id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      key={row.email}
                      onClick={(event) => handleClick(event, row.public_id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>

                      {columns.map((column, index) => {
                        const value = row[column.id].toString();
                        return (
                          <TableCell align={column.align} key={index}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredTablerows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
