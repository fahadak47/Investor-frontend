import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { userProfileViewsApi } from "../../api/companyApis/analyticsApi";
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from "react-bootstrap";

const UserViewsLineChart = ({ id, state }) => {
  console.log("User Id in Chart", id);
  const [data, setData] = useState(null);

  let userData = {
    labels: data?.views?.map((data) => data?.date),
    datasets: [
      {
        label: `${data?.first_name} ${data?.last_name}`,
        data: data?.views?.map((data) => data?.view_count),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  useEffect(() => {
    if (id) {
      userProfileViewsApi(id)
        .then((res) => setData(res.data.data[0]))
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <div>
      <Card
        style={{
          borderLeftColor: "rgb(1 114 214)",
          borderLeftWidth: "13px",
          padding: "5px",
          width: "350px",
          height: "200px",
        }}
      >
        <Line
          style={{ height: "200px", width: "350px" }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1,
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

export default UserViewsLineChart;
