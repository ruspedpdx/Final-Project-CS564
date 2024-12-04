// src/pages/GraphPage.js

import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphPage() {
  const location = useLocation(); // Access location object using useLocation hook
  const { schools } = location.state || {}; // Access state and schools from location

  if (!schools || schools.length === 0) {
    // eslint-disable-next-line react/jsx-filename-extension
    return <div>No data to display</div>;
  }

  // Prepare data for the graph
  const chartData = {
    labels: schools.map((school) => school.school.name), // School names

    datasets: [
      {
        label: "Student Size",
        data: schools.map((school) => school.latest.student.size), // Student sizes
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Tuition Cost",
        data: schools.map(
          (school) => school.latest.cost.attendance.academic_year
        ), // Tuition costs
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Student Size & Tuition Cost Comparison",
      },
    },
  };

  return (
    <main className=" bg-dark justify-content-center ">
    <div className=" text-light p-2 mt-4">
      <h2 className="text-center">
        Comparison of Universities{" "}
      </h2>

      <div className=" bg-light d-flex justify-content-center border h-75 mx-5">
        <Line data={chartData} options={chartOptions} />
      </div>
      </div>
    </main>
  );
}

export default GraphPage;
