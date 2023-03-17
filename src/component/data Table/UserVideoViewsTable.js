import React from "react";
import { useState } from "react";
import { ImProfile } from "react-icons/im";
import { Button, Modal, Spinner } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import {
  userEachVideoViewsApi,
  userSingleVideoViewsByIdApi,
} from "../../api/companyApis/analyticsApi";
import UserVideoViewsByIdChart from "../charts/UserVideoViewsByIdChart";

const UserVideoViewsTable = ({ id }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [videoAnalytic, setVideoAnalytics] = useState([]);

  const handleSingleVideoAnalytics = (id, videoId) => {
    userSingleVideoViewsByIdApi(id, videoId)
      .then((res) => {
        setIsOpen((prev) => !prev);
        setVideoAnalytics(res.data.data);
      })
      .catch((error) =>
        console.log("error in user single video view analytics", error.response)
      );
  };

  const columns = [
    {
      field: "company_presentation_id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "thumbnail",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <img src={params.row?.thumbnail} width={70} height={70} />
          </>
        );
      },
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
              onClick={() => {
                console.log("sdsadadasdasdasdjdgh asd*/*/*/**/*/*/*/***");
                handleSingleVideoAnalytics(
                  id,
                  params.row?.company_presentation_id
                );
              }}
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
    if (id) {
      userEachVideoViewsApi(id)
        .then((res) => {
          setLoading(false);
          setData(res.data.data);
        })
        .catch((error) =>
          console.log("user view with profile", error.response)
        );
    }
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
      <Paper>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.company_presentation_id}
            rowsPerPageOptions={[10, 20, 30]}
            checkboxSelection
            disableSelectionOnClick
            // experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Paper>

      <Modal show={isOpen} onHide={setIsOpen}>
        <Modal.Body>
          <>
            <UserVideoViewsByIdChart data={videoAnalytic} />
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserVideoViewsTable;
