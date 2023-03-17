import React, { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { userEachVideoViewsApi } from "../../api/companyApis/analyticsApi";
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from "react-bootstrap";
import { HiChartPie } from "react-icons/hi";

const UserEachVideoViewsBarChart = ({ id, state }) => {
  console.log("User Id in Chart", id);
  const [data, setData] = useState(null);

  let userData = {
    labels: data?.map((data) => data?.title),
    datasets: [
      {
        label: `Each Video Views`,
        data: data?.map((data) => data?.view_count),
        fill: true,
        // backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(1 114 214)",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (id) {
      userEachVideoViewsApi(id)
        .then((res) => setData(res.data.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <>
      <Card
        style={{
          borderLeftColor: "rgb(1 114 214)",
          borderLeftWidth: "130px",
          padding: "5px",
          width:"490px",
          height: "200px",
          minWidth:"490px"
        }}
      >

<div className="align-items-center d-flex">

<div className="chartsIconBg">

<HiChartPie color="rgb(1 114 214)" />
</div>
 
<h4 className="chartIconText">Each Video Views</h4>

</div>

        <Bar
        className="canvas"
          style={{ height: "200px",width:"490px !important" }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                // min: 0,
                ticks: {
                  beginAtZero: true,
                  // precision: 0,
                  stepSize: 1,
                  // callback: function (value) {
                  //   if (value % 1 === 0) {
                  //     return value;
                  //   }
                  // },
                },
              },
            },
          }}
          data={userData}
        />
      </Card>
    </>
  );
};

export default UserEachVideoViewsBarChart;
