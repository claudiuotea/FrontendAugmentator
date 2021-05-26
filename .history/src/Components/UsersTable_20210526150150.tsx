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


//interfata unei coloane din tabel
interface Column {
  id: "public_id" | "username" | "email" | "isVerified" | "isAdmin";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

//initializez coloanele din tabel
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
    opacity: "0.9"
  },
  container: {
    maxHeight: 440,
  },
});

export const UsersTable: FunctionComponent<any> = () => {
  const classes = useStyles();
  //pentru paginare
  const [page, setPage] = useState(0);
  //cate elemente sa afisez pe o pagina
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //pentru loading bar
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //randurile cu inregistrari din tabel
  const [tableRows, setTableRows] = useState<UserDataInterface[]>([]);
  //pentru search bar [ce afisez]
  const [filteredTablerows, setFilteredTableRows] = useState<
    UserDataInterface[]
  >([]);
  //pentru substring-uri(cautare)
  const [searchKeyword, setSearchKeyword] = useState("");
  //public_id-urile celor selectati [le trimit la toolbar]
  const [selected, setSelected] = useState<string[]>([]);

  //cand schimb pagina
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  //cand modific userii afisati pe o pagina
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //request-ul care preia userii de la server si ii adauga in tabel
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
            AdminService.getUsers().then((resp2) => {
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

  
  //pentru searchbar
  const updateInput = (event: any) => {
    setSearchKeyword(event.target.value);
    //filtrez dupa aparitia substring-ului in email/username
    const filteredData = tableRows.filter((row) => {
      return row.username
        .toLowerCase()
        .includes(event.target.value.toLowerCase()) || row.email.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredTableRows(filteredData);
  };

  //folosita sa verific daca un item e selectat
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  //ca sa selectez o inregistrare
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
    //cand apas pe select all din tabel (checkbox)
    if (event.target.checked) {
      const newSelected = tableRows.map((n) => n.public_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  
  return (
    <>
    {!isLoading && typeof (filteredTablerows) != "undefined"?(<div>
    <TextField
      autoComplete="fname"
      name="firstName"
      variant="outlined"
      required
      fullWidth
      id="firstName"
      label="Search for an user"
      autoFocus
      value={searchKeyword}
      onChange={updateInput}
      //iconita de search
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
                //checkbox-urile de + si - (pentru select all)
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < filteredTablerows.length
                  }
                  checked={
                    filteredTablerows.length > 0 &&
                    selected.length == filteredTablerows.length
                  }
                  onChange={onSelectAllClick}
                />
              </TableCell>
              {/* rendez header-ele */}
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
          {/* rendez fiecare inregisrare in tabel */}
          <TableBody>
            {filteredTablerows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {//mapez fiecare rand (item)
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
                    {/* mapez fiecare coloana (proprietate a item-ului) */}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTablerows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  </div>):<div>Loading</div>}
    </>
  );
};
