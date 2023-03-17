import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { inrestedUserChartApi } from "../../api/companyApis/analyticsApi";
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { MdDashboard } from "react-icons/md";

const IntrestedUserChart = () => {
  const [data, setData] = useState(null);

  let userData = {
    labels: data?.map((data) => data?.date),
    datasets: [
      {
        label: "Intrested user",
        data: data?.map((data) => data?.interested_count),
        fill: true,
        backgroundColor: "rgba(103, 49, 71,0.2)",
        borderColor: "plum",
      },
    ],
  };

  useEffect(() => {
    inrestedUserChartApi()
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Card
        style={{
          borderLeftColor: "plum",
          borderLeftWidth: "13px",
          padding: "5px",
          width: "490px",
          height: "250px",
        }}
      >
        <div className="align-items-center d-flex">

        <div className="chartsIconBg">   <MdDashboard color="plum" />
        </div>

    

       <h4 className="chartIconText"  style={{color:"plum"}}>Intrested User</h4>
       

        </div>
        <Line
        className="canvas"
          style={{ height: "250px", width: "490px" }}
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

export default IntrestedUserChart;
