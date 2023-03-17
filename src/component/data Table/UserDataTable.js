import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { UserDataTableApi } from "../../api/companyApis/analyticsApi";
import csvDownload from "json-to-csv-export";
import { CSVLink } from "react-csv";

let headers = [
  { label: "Id", key: "user_id" },
  { label: "First Name", key: "first_name" },
  { label: "Last Name", key: "last_name" },
  { label: "Profile Views", key: "profile_view_count" },
  { label: "Video Count", key: "video_view_count" },
  { label: "Contact", key: "contact_number" },
  { label: "email", key: "email" },
];

const UserDataTable = () => {
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
      field: "contact_number",
      headerName: "Contact Number",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
    },
    {
      field: "video_view_count",
      headerName: "Video Views",
      width: 100,
    },
    {
      field: "profile_view_count",
      headerName: "Profile Views",
      width: 100,
    },
    {
      field: "interested",
      headerName: "Interested",
      width: 95,
      renderCell: (params) => {
        return (
          <>
            <div>
              {params.row?.interested ? (
                <span>Intrested</span>
              ) : (
                <span>Not Intrested</span>
              )}
            </div>
          </>
        );
      },
    },
    {
      field: "followed",
      headerName: "Followed",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <div>
              {params.row.followed ? <span>YES</span> : <span>NO</span>}
            </div>
          </>
        );
      },
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

  const handleDownload = () => {
    UserDataTableApi()
      .then((res) => {
        // setLoading(false);
        // setData(res.data.data);
        console.log("userData table download", res.data.data);
        const dataToConvert = {
          data: res.data.data,
        };

        console.log(<CSVLink data={res.data.data} headers={headers} />);
      })
      .catch((error) =>
        console.log("user Data download error", error.response)
      );
  };

  useEffect(() => {
    setLoading(true);
    UserDataTableApi()
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
        <h3>User Data Table</h3>
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

export default UserDataTable;
