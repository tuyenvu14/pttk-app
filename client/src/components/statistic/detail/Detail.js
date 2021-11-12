import { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { converVND, converTimestampToDate } from "../../../common/Common";

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

export default function Detail({ data }) {
  const [dataStatisticDetail, setDataStatisticDetail] = useState();
  const [pageCurrent, setPageCurrent] = useState(0);
  const [size, setSize] = useState(2);
  const { open, handleClickOpen, handleClose, name, startDate, endDate } = data;

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/detail", {
        params: {
          startDate: Math.round(startDate / 1000),
          endDate: Math.round(endDate / 1000),
          locationName: name,
          size: size,
          page: pageCurrent,
        },
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setDataStatisticDetail(response.data);
      });
  }, [pageCurrent]);

  const handlePage = () => {
    if (dataStatisticDetail) {
      return Math.ceil(dataStatisticDetail.total / size);
    }
  };

  console.log(dataStatisticDetail);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Danh Sách Hóa Đơn Đã Đặt Mua Tour Tới {name}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#CFE0F9" }}>
                  <StyledTableCell align="center">ID </StyledTableCell>
                  <StyledTableCell>Khách hàng đại diện</StyledTableCell>
                  <StyledTableCell align="left">Ngày xuất phát</StyledTableCell>
                  <StyledTableCell align="left">Tên Tour</StyledTableCell>
                  <StyledTableCell align="right">Tổng số khách</StyledTableCell>
                  <StyledTableCell align="right">Tổng tiền</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataStatisticDetail &&
                  dataStatisticDetail.detail.map((row) => (
                    <StyledTableRow key={row.id} className="row">
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.nameCustomer}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {converTimestampToDate(row.startDate)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.nameTour}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.totalCustomer}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {converVND(row.totalMonney)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  {dataStatisticDetail && dataStatisticDetail.total === 0 && (
                    <Grid>Không có hóa đơn nào !</Grid>
                  )}
                  {dataStatisticDetail && dataStatisticDetail.total !== 0 && (
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
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (pageCurrent > 0) {
                            setPageCurrent(pageCurrent - 1);
                          }
                        }}
                      />
                      <KeyboardArrowRightIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (pageCurrent < handlePage() - 1) {
                            setPageCurrent(pageCurrent + 1);
                          }
                        }}
                      />
                    </Grid>
                  )}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
