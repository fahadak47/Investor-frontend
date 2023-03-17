import React from "react";
import { useState } from "react";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router-dom/dist";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Button, Spinner } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { inrestedUserTableApi } from "../../api/companyApis/analyticsApi";
import { CSVLink } from "react-csv";

let headers = [
  { label: "Id", key: "user_id" },
  { label: "First Name", key: "first_name" },
  { label: "Last Name", key: "last_name" },
  { label: "email", key: "email" },
];

const IntrestedUserTable = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const columns = [
    {
      key: 6,
      field: "id",
      headerName: "ID",
    },
    {
      key: 1,
      field: "first_name",
      headerName: "First name",
      width: 170,
    },
    {
      key: 2,
      field: "last_name",
      headerName: "Last name",
      width: 170,
    },
    {
      key: 3,
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      width: 170,
      sortable: false,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    { key: 4, field: "email", headerName: "Email", width: 150 },
    {
      key: 5,
      field: "details",
      headerName: "Details",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="outline-primary"
              onClick={() => navigate(`/company/user/${params.row?.id}`)}
            >
              <ImProfile />
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);

    inrestedUserTableApi()
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((error) => console.log("user view with profile", error.response));
  }, []);

  if (isLoading) {
    return (
      <>
        <Paper
          className="d-flex align-items-center justify-content-center"
          sx={{ height: 400, width: "100%" }}
        >
          <div className="container">
            <div className="d-flex align-items-center justify-content-center">
              <Spinner animation="border" size="lg" variant="primary" />
            </div>
          </div>
        </Paper>
      </>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3 ">
        <h3>Intrested Users</h3>
        <div>
          <Button variant="outline-primary">
            <CSVLink style={{ color: "inherit" }} data={data} headers={headers}>
              Download
            </CSVLink>
          </Button>
        </div>
      </div>

      <Paper>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            rowsPerPageOptions={[10, 20, 30]}
            checkboxSelection
            disableSelectionOnClick
            // experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default IntrestedUserTable;
