/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraphPage() {
  const location = useLocation();
  const { schools } = location.state || {};

  if (!schools || schools.length === 0) {
    return (
      <main className="bg-light text-dark p-5 text-center">
        <h2>No data to display</h2>
      </main>
    );
  }

  // Get state name from the first school
  const stateName = schools[0]?.school?.state || "Unknown State";


  const backgroundColors = [
    "rgba(0, 123, 255, 0.6)", // Modern Blue
    "rgba(40, 167, 69, 0.6)", // Modern Green
  ];
  const borderColors = [
    "rgba(0, 123, 255, 1)", // Modern Blue Border
    "rgba(40, 167, 69, 1)", // Modern Green Border
  ];

  // Prepare data for the graph
  const chartData = {
    labels: schools.map((school) => school.school?.name || "Unknown"), // School names
    datasets: [
      {
        label: "Student Size",
        data: schools.map((school) => school.latest?.student?.size || 0),
        backgroundColor: backgroundColors[0],
        borderColor: borderColors[0],
        borderWidth: 2,
      },
      {
        label: "Tuition Cost",
        data: schools.map(
          (school) => school.latest?.cost?.attendance?.academic_year || 0
        ),
        backgroundColor: backgroundColors[1],
        borderColor: borderColors[1],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#495057", // Muted dark gray for legend text
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Student Size & Tuition Cost Comparison (${stateName})`,
        font: {
          size: 20,
          family: "Arial, sans-serif",
        },
        color: "#212529", // Modern dark gray for the title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#495057", // Muted dark gray for Y-axis
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0,0,0,0.1)", // Subtle gridlines
        },
      },
      x: {
        ticks: {
          color: "#495057", // Muted dark gray for X-axis
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0,0,0,0.1)", // Subtle gridlines
        },
      },
    },
  };

  return (
    <main className="bg-light text-dark">
      <div className="p-4">
        <h2 className="text-center text-primary mb-4">
          Comparison of Universities
        </h2>
        <div
          className="bg-white border shadow-sm rounded p-3 mx-auto"
          style={{ maxWidth: "900px", height: "500px" }}
        >
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </main>
  );
}

export default GraphPage;
