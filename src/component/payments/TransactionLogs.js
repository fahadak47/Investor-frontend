import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import {
  getActiveScheduleHandle,
  getTransactionLogsHandle,
} from "../../redux/actions/creditCardActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Stack } from "@mui/system";
import { Box, IconButton } from "@mui/material";
import moment from "moment";
import { TableBodyDataSkeleton } from "../Common/TableBodyDataSkeleton";
import { useNavigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const columns = [
  // { id: 'serialNumber', label: 'S#', minWidth: 20, align: 'center', sortAction: false },

  {
    id: "id",
    label: " Id",
    width: 10,
    align: "center",
    sortAction: false,
    fontWeight: "bold",
  },

  {
    id: "Amount",
    label: "Amount",
    width: 100,
    align: "center",
    sortAction: false,
    fontWeight: "bold",
  },
  {
    id: "active-from-to",
    label: "Active from - to",
    width: 100,
    align: "center",
    sortAction: false,
    fontWeight: "bold",
  },
  // {
  //   id: 'Unit',
  //   label: 'Unit',
  //   width: 100,
  //   align: 'center',
  //   sortAction: false

  // },
  {
    id: "paymentDate",
    label: "Payment date",
    width: 100,
    align: "center",
    sortAction: false,
    fontWeight: "bold",
  },
  {
    id: "message",
    label: "Descriptaion",
    width: 100,
    align: "center",
    sortAction: false,
    fontWeight: "bold",
  },
];

export default function TransactionLogs() {
  const { loading, TransactionLogs, error } = useSelector(
    (state) => state.getTransactionLogsReducer
  );

  console.log(TransactionLogs);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [orderData, setOrderData] = useState("ASC");

  const sortingColumns = (col) => {
    if (orderData === "ASC") {
      const sorted = [...rows].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setRows([...sorted]);
      setOrderData("DSC");
    } else if (orderData === "DSC") {
      const sorted = [...rows].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setRows([...sorted]);
      setOrderData("ASC");
    } else {
      const sorted = [...rows].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setRows([...sorted]);
      setOrderData("ASC");
    }
  };

  useEffect(() => {
    // getActiveScheduleHandle(dispatch);
    getTransactionLogsHandle(dispatch);
  }, []);

  return (
    <div id="paymentsHistory">
      <div className="PaymentsPage_wrapper">
        <div className="blue_right_Border">
          <div className="topsection">
            <h3>Payments</h3>
            <Button onClick={() => navigate("/company/payments")}>
              Make payment
            </Button>
          </div>
          <TableContainer component={Paper} className="tableContainer">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column, i) => (
                    <TableCell
                      key={i}
                      align={column.align}
                      style={{
                        minWidth: column.width,
                        fontWeight: "700",
                        fontFamily: "poppins",
                        borderBottom: "1px solid gray",
                        fontSize: "0.9rem",
                      }}
                    >
                      {column.sortAction ? (
                        <Button onClick={() => sortingColumns(column.id)}>
                          {column.label}

                          {/* <BiSortAZ   size={20} style={{marginLeft:"15px"}} /> */}
                        </Button>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {loading ? (
                <TableBodyDataSkeleton
                  numberOfColumns={columns.length}
                  imagePreview={false}
                  editAction={false}
                  deleteAction={false}
                />
              ) : TransactionLogs.length !== 0 ? (
                <TableBody>
                  {TransactionLogs.map((row, i) => {
                    return (
                      <>
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            backgroundColor: "rgb(207 231 237)",
                            borderBottom: "1.1px solid darkgray",
                          }}
                        >
                          {columns.map((column, ind) => {
                            const value = row[column.id];
                            console.log(value);

                            return column.id === "active-from-to" ? (
                              <TableCell key={ind} align={column.align}>
                                <Stack
                                  direction="column "
                                  spacing={2}
                                  justifyContent="center"
                                >
                                  {row.company_active_schedule !== null
                                    ? moment(
                                        row.company_active_schedule.start_date
                                      ).format("MM-DD-YYYY")
                                    : "---"}
                                  <br />
                                  -
                                  <br />
                                  {row.company_active_schedule !== null
                                    ? moment(
                                        row.company_active_schedule.end_date
                                      ).format("MM-DD-YYYY")
                                    : "---"}
                                </Stack>
                              </TableCell>
                            ) : column.id === "paymentDate" ? (
                              <TableCell key={ind} align={column.align}>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  justifyContent="center"
                                >
                                  {row.created_at
                                    ? moment(row.created_at).format(
                                        "MM-DD-YYYY"
                                      )
                                    : "---"}
                                </Stack>
                              </TableCell>
                            ) : column.id === "Amount" ? (
                              <TableCell key={ind} align={column.align}>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  justifyContent="center"
                                >
                                  {row.amount ? (
                                    <Box sx={{ width: "100px" }}>
                                      {row.amount}
                                    </Box>
                                  ) : (
                                    "---"
                                  )}
                                </Stack>
                              </TableCell>
                            ) : column.id === "message" ? (
                              <TableCell key={ind} align={column.align}>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  justifyContent="center"
                                >
                                  {row.message !== null ? row.message : "---"}
                                </Stack>
                              </TableCell>
                            ) : (
                              <TableCell key={ind} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <div>No data found...</div>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
