import React, { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { videoViewsApi } from "../../api/companyApis/analyticsApi";
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from "react-bootstrap";
import { MdInsertChart } from "react-icons/md";

const MediaViewsChart = () => {
  const [data, setData] = useState(null);

  let userData = {
    labels: data?.map((data) => data?.title),
    datasets: [
      {
        label: "Each Video Views",
        data: data?.map((data) => data?.view_count),
        fill: true,
        backgroundColor: "rgba(0, 169, 107,0.2)",
        borderColor: "rgba(0, 169, 107,1)",
        borderWidth: 2,
      },
    ],
  };

  console.log("user data line cart", userData);

  useEffect(() => {
    videoViewsApi()
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Card
        style={{
          borderLeftColor: "rgb(0 169 107)",
          borderLeftWidth: "13px",
          padding: "5px",
          width: "490px",
          height: "250px",
        }}
      >
        <div className="align-items-center d-flex">
          <div className="chartsIconBg">
            <MdInsertChart color="rgb(0 169 107)" />
          </div>

          <h4 className="chartIconText" style={{color:"rgb(0 169 107)"}}>Each Video Views</h4>
        </div>

        <Bar
          className="canvas"
          style={{ height: "250px", width: "400px" }}
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

export default MediaViewsChart;
