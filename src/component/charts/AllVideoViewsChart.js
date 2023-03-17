import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { allVideoViewsApi } from "../../api/companyApis/analyticsApi";
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from "react-bootstrap";
import  {MdPeopleAlt} from "react-icons/md"

const AllVideoViewsChart = () => {
  const [data, setData] = useState(null);

  let userData = {
    labels: data?.map((data) => data?.date),
    datasets: [
      {
        label: "All Video Views",
        data: data?.map((data) => data?.view_count),
        fill: true,
        backgroundColor: "rgba(0,181,226,0.2)",
        borderColor: "skyblue",
      },
    ],
  };

  console.log("user data line cart", userData);

  useEffect(() => {
    allVideoViewsApi()
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Card
        style={{
          borderLeftColor: "skyblue",
          borderLeftWidth: "13px",
          padding: "5px",
          width: "490px",
          height: "250px",
        }}
      >
        <div className="align-items-center d-flex">

       <div className="chartsIconBg">

        <MdPeopleAlt color="skyblue" />

       </div>

       <h4 className="chartIconText" style={{color:"skyblue"}}>All Video Views</h4>
        </div>
        <Line
        className="canvas"
          style={{ height: "20px", width: "490px" }}
          data={userData}
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
        />
      </Card>
    </div>
  );
};

export default AllVideoViewsChart;
