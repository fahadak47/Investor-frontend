import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyCard from "../component/companies/CompanyCard";
import {
  getAllCompaniesHandle,
  getFollowedCompaniesHandle,
  getInrestedCompaniesHandle,
} from "../redux/actions/getAllCompaniesAction";
import { getCompanyByIDHandle } from "../redux/actions/getCompanyByIdAction";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Col, Row } from "antd";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Company = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDownValue, setDropDownValue] = useState("");
  const [tabsLoading, setTabsLoading] = useState(false);
  const { isLoading, getAllCompanies, error } = useSelector(
    (state) => state.getAllCompaniesReducer
  );

  const companybyIdHandle = (id) => {
    getCompanyByIDHandle(dispatch, id, navigate);
    navigate(`/user/company/${id}`);
  };

  const handleFilter = (value) => {
    switch (value) {
      case "intrested":
        return getInrestedCompaniesHandle(dispatch, setTabsLoading);

      case "followed":
        return getFollowedCompaniesHandle(dispatch, setTabsLoading);

      case "all":
        return getAllCompaniesHandle(dispatch);

      default:
        return getAllCompaniesHandle(dispatch);
    }
  };

  // let iscompayLevelTwo;
  useEffect(() => {
    getAllCompaniesHandle(dispatch);
    // iscompayLevelTwo = localStorage.getItem("IP_levelTwoProfileStatus");

    // console.warn(
    //   iscompayLevelTwo,
    //   "iscompayLevelTwoiscompayLevelTwoiscompayLevelTwo"
    // );
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="container">
          <div
            style={{ height: "90vh" }}
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner animation="border" size="lg" variant="primary" />
          </div>
        </div>
      </>
    );
  }

  const dropDownFunc = (e) => {
    setDropDownValue(e.target.value);
    console.log(e, "Eeeeeeeeeeee");
    handleFilter(e.target.value);
  };

  const tabsChange = (e) => {
    handleFilter(e);
  };

  return (
    <div className="companiesPageContainer container">
      <h1 className="text-center pageMianheading"> Companies</h1>
      <p className="text-muted text-center pb-5">
        Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
      </p>
      <div className="d-flex justify-content-between mb-5 w-100">
        <Tabs
          defaultActiveKey="all"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(e) => tabsChange(e)}
        >
          <Tab eventKey="all" title="All" />

          <Tab eventKey="intrested" title="Intrested" />

          <Tab eventKey="followed" title="Following" />
        </Tabs>

        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropDownValue}
              label="Select"
              onChange={(e) => dropDownFunc(e)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="intrested">Intrested</MenuItem>
              <MenuItem value="followed">Following</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      {getAllCompanies.length !== 0 ? (
        <>
          <div className="sectionsContainer">
            {/* <div className="leftSide">
              <form>
                <label>Following</label>
                <input
                  type="checkbox"
                  value="Submit"
                  className="checkbox"
                  onChange={(e) =>
                    handleFilter(e.target.checked ? "followed" : "")
                  }
                />
                <br />
                <br />

                <label>Intrested</label>
                <input
                  type="checkbox"
                  value="Submit"
                  className="checkbox"
                  onChange={(e) =>
                    handleFilter(e.target.checked ? "intrested" : "")
                  }
                />
                <br />
                <br />
              </form>
            </div> */}

            {tabsLoading ? (
              <div className="container">
                <div className="main-body">
                  <Spinner animation="border" size="lg" variant="primary" />
                </div>
              </div>
            ) : (
              <div className="companies_card_wrapper">
                <Row gutter={[30, 35]}>
                  {getAllCompanies.map((val, ind) => {
                    console.log(val, "pppppppppppppp");

                    return (
                      <>
                        <Col
                          className="gutter-row"
                          xs={24}
                          sm={24}
                          md={8}
                          lg={6}
                          xl={6}
                        >
                          <CompanyCard
                            CompanyName={val.company_name}
                            mark={true}
                            img={val?.logo}
                            text={val.description}
                            followed={val.followed}
                            intrested={val.interested}
                            id={val?.id}
                            isLevelTwo={val.is_level_two_profile}
                            onClick={() => companybyIdHandle(val?.id)}
                          />
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
            )}
          </div>
        </>
      ) : error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {" "}
          {error}
        </div>
      ) : (
        <h1 className="d-flex justify-content-center align-items-center">
          Companies not Found!
        </h1>
      )}
    </div>
  );
};

export default Company;
