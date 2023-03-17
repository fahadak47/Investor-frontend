import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { VideoViewByIdApi } from "../../api/companyApis/analyticsApi";
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from "react-bootstrap";

const VideoViewsByIdChart = ({ data, title }) => {
  let userData = {
    labels: data?.map((data) => data?.date),
    datasets: [
      {
        label: title,
        data: data?.map((data) => data?.view_count),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  console.log("user data line cart", userData);

  return (
    <div>
      <Card
        style={{
          borderLeftColor: "rgb(1 114 214)",
          borderLeftWidth: "13px",
          padding: "5px",
        }}
      >
        <Line
          width={"300px"}
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
    </div>
  );
};

export default VideoViewsByIdChart;
