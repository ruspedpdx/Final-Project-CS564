/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import "chart.js/auto";
import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";

const exchangeRate = 1.2;

const Dashboard = () => {
  const location = useLocation();
  const schoolData = location.state && location.state.school; // Safely extract school data

  if (!schoolData || schoolData.length === 0) {
    return <p>No data available.</p>;
  }
  // Data for the chart
  const chartSchoolData = {
    labels: [
      "Tuition (In-State)",
      "Tuition (Out-of-State)",
      "Books and Supplies",
      "Other Expenses (On Campus)",
      "Other Expenses (Off Campus)",
      "Room & Board (On Campus)",
      "Room & Board (Off Campus)",
    ],
    datasets: [
      {
        label: "Cost in (selected currency)",
        data: [
          schoolData.latest.cost.tuition.in_state * exchangeRate,
          schoolData.latest.cost.tuition.out_of_state * exchangeRate,
          schoolData.latest.cost.booksupply * exchangeRate,
          schoolData.latest.cost.otherexpense.oncampus * exchangeRate,
          schoolData.latest.cost.otherexpense.offcampus * exchangeRate,
          schoolData.latest.cost.roomboard.oncampus * exchangeRate,
          schoolData.latest.cost.roomboard.offcampus * exchangeRate,
        ],
        backgroundColor: [
          "#4caf50", // Green
          "#ffeb3b", // Yellow
          "#2196f3", // Blue
          "#ff5722", // Orange
          "#9c27b0", // Purple
          "#ff4081", // Pink
          "#8bc34a", // Light Green
        ],
        hoverBackgroundColor: [
          "#66bb6a", // Light Green
          "#fff176", // Light Yellow
          "#42a5f5", // Light Blue
          "#ff7043", // Light Orange
          "#ba68c8", // Light Purple
          "#ff80ab", // Light Pink
          "#aed581", // Lighter Green
        ],
      },
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  };

  return (
    <main className="container align-items-center my-4">
      <div className="text-center mb-4">
        <h1 className="m-4"> {schoolData.school.name} </h1>
        {schoolData.school.alias && (
          <h2>
            {schoolData.school.alias || "No alias available"} -{" "}
            {schoolData.school.city || "Unknown location"}
          </h2>
        )}
      </div>
      <React.Fragment key={schoolData.school.name}>
        {/* Individual Cards */}
        <Row xs={1} sm={2} md={3} lg={5} className="g-4">
          {[
            {
              label: "Average Annual Cost:",
              usdValue: `$${schoolData.latest.cost.attendance.academic_year.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`,
              exchValue: `${(
                schoolData.latest.cost.attendance.academic_year * exchangeRate
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
            },
            {
              label: "Tuition (In-State):",
              usdValue: `$${schoolData.latest.cost.tuition.in_state.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`,
              exchValue: `${(
                schoolData.latest.cost.tuition.in_state * exchangeRate
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
            },
            {
              label: "Tuition (Out-of-State):",
              usdValue: `$${schoolData.latest.cost.tuition.out_of_state.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`,
              exchValue: `${(
                schoolData.latest.cost.tuition.out_of_state * exchangeRate
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
            },
            {
              label: "Other Expenses:",
              usdValue: `$${schoolData.latest.cost.otherexpense.offcampus.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`,
              exchValue: `${(
                schoolData.latest.cost.otherexpense.offcampus * exchangeRate
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
            },
            {
              label: "Room & Board:",
              usdValue: `$${schoolData.latest.cost.roomboard.offcampus.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`,
              exchValue: `${(
                schoolData.latest.cost.roomboard.offcampus * exchangeRate
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
            },
          ].map((cardItem) => (
            <Col key={cardItem.label}>
              <Card className="d-flex text-center" style={{ height: "12rem" }}>
                <Card.Header style={{ height: "4rem" }}>
                  {cardItem.label}
                </Card.Header>
                <Card.Body style={{ height: "4rem" }}>
                  USD: {cardItem.usdValue}
                </Card.Body>
                <Card.Footer style={{ height: "4rem" }}>
                  Exch: {cardItem.exchValue}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <Row
          xs={1}
          sm={1}
          md={1}
          lg={1}
          className="flex g-4 m-4 p-4 justify-content-between"
        >
          <div className="square rounded border border-2 border-secondary text-center">
            {/* Bar Chart */}
            <h1 className="m-4">{schoolData.school.name} Expense Breakdown</h1>
            <Bar className="mb-4" data={chartSchoolData} />
          </div>
        </Row>
      </React.Fragment>
    </main>
  );
};

export default Dashboard;
