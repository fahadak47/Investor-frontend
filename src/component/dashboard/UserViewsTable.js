import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userViewsWithProfileApi } from "../../api/companyApis/analyticsApi";
import { ImProfile } from "react-icons/im";
import { CSVLink } from "react-csv";

let headers = [
  { label: "Id", key: "user_id" },
  { label: "First Name", key: "first_name" },
  { label: "Last Name", key: "last_name" },
  { label: " Views", key: "view_count" },
  { label: "email", key: "email" },
];

const UserViewsTable = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const columns = [
    {
      field: "user_id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "view_count",
      headerName: "Views",
      // type: "number",
      width: 110,
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="outline-primary"
              onClick={() => navigate(`/company/user/${params.row?.user_id}`)}
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
    userViewsWithProfileApi()
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
        console.log(res.data.data);
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
        <h3>Views With Profile</h3>
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
            getRowId={(row) => row.user_id}
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

export default UserViewsTable;
