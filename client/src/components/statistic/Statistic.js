import { useState, useEffect } from "react";
import axios from "axios";
import * as Constants from "../../constants/Constants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PinDropIcon from "@mui/icons-material/PinDrop";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Detail from "./detail/Detail";
import { converVND } from "../../common/Common";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";
import "./statistic.scss";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Statistic() {
  const [startDate, setStartDate] = useState(new Date().getTime() - 2629743000);
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [dataStatistic, setDataStatistic] = useState();
  const [pageCurrent, setPageCurrent] = useState(0);
  const [size, setSize] = useState(5);

  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/statistic", {
        params: {
          startDate: Math.round(startDate / 1000),
          endDate: Math.round(endDate / 1000),
          size: size,
          page: pageCurrent,
        },
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setDataStatistic(response.data);
      });
  }, [startDate, endDate, pageCurrent]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePage = () => {
    if (dataStatistic) {
      return Math.ceil(dataStatistic.total / size);
    }
  };

  return (
    <div className="statistic">
      <Grid className="sidebar">
        <Typography variant="h5" gutterBottom component="div" mb={3}>
          TuyenTravel
        </Typography>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem button style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}>
            <PinDropIcon className="icon" style={{ color: "green" }} />
            <ListItemText primary="?????a ??i???m" />
          </ListItem>
          {/* <Divider /> */}
          <ListItem button>
            <DateRangeIcon className="icon" style={{ color: "red" }} />
            <ListItemText primary="Tour" />
          </ListItem>
          <ListItem button>
            <HomeRepairServiceIcon className="icon" style={{ color: "blue" }} />
            <ListItemText primary="?????i t??c" />
          </ListItem>
          {/* <Divider light /> */}
        </List>
      </Grid>
      <Grid className="content">
        <Grid className="title" container mb={6}>
          <Grid>
            <Typography variant="h6" gutterBottom component="div">
              Th???ng K?? Doanh Thu
            </Typography>
            {/* <Typography variant="body2">V?? V??n Tuy???n</Typography> */}
          </Grid>

          <TextField
            id="standard-basic"
            label="T??m ki???m ?????a ??i???m"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid container mb={4} style={{ alignItems: "center" }}>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Ng??y b???t ?????u"
                clearable
                value={new Date(startDate)}
                placeholder="10/10/2018"
                onChange={(date) => setStartDate(date.getTime())}
                format="dd/MM/yyyy"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Ng??y k???t th??c"
                clearable
                value={new Date(endDate)}
                placeholder="10/10/2018"
                onChange={(date) => setEndDate(date.getTime())}
                format="dd/MM/yyyy"
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#CFE0F9" }}>
                <StyledTableCell align="center">ID </StyledTableCell>
                <StyledTableCell>T??n ?????a ??i???m</StyledTableCell>
                <StyledTableCell align="right">
                  T???ng s??? Tour ???? ?????n
                </StyledTableCell>
                <StyledTableCell align="right">
                  T???ng s??? kh??ch ???? ?????n
                </StyledTableCell>
                <StyledTableCell align="right">T???ng doanh thu</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataStatistic &&
                dataStatistic.statistic.map((row) =>
                  row ? (
                    <StyledTableRow
                      key={row.id}
                      className="row"
                      style={{ height: "53px" }}
                      onClick={() => {
                        setOpen(true);
                        setName(row.name);
                      }}
                    >
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.totalTour}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.totalCustomer}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {converVND(row.totalMonney)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        style={{ height: "20px" }}
                      ></TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>

            <TableRow>
              <TableCell align="center" colSpan={5}>
                <Grid
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  <span style={{ marginRight: "5px" }}>
                    Trang {pageCurrent + 1} / {handlePage()}
                  </span>
                  <KeyboardArrowLeftIcon
                    onClick={() => {
                      if (pageCurrent > 0) {
                        setPageCurrent(pageCurrent - 1);
                      }
                    }}
                  />
                  <KeyboardArrowRightIcon
                    onClick={() => {
                      if (pageCurrent < handlePage() - 1) {
                        setPageCurrent(pageCurrent + 1);
                      }
                    }}
                  />
                </Grid>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        {open && (
          <Detail
            data={{
              open,
              handleClickOpen,
              handleClose,
              name,
              startDate,
              endDate,
            }}
          />
        )}
      </Grid>
    </div>
  );
}
