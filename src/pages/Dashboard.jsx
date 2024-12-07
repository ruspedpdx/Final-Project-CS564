/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import "chart.js/auto";
import React, { useState } from "react";
import { Row, Card, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import getCurrencySymbol from "../utils/currencySymbol";
import CurrencyConverter from "../components/currencyConverterSmall";
import getCurrencyName from "../utils/currencyName";

const Dashboard = () => {
  const location = useLocation();
  const schoolData = location.state && location.state.school; // Safely extract school data
  const [conversionRates, setConversionRates] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState(
    getCurrencySymbol("USD")
  ); // Default symbol
  const [currencyName, setCurrencyName] = useState(getCurrencyName("USD")); // Default symbol

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
        label: `Cost in ${currencySymbol || "USD"}`, // Dynamic title with fallback
        data: [
          schoolData.latest.cost.tuition.in_state * conversionRates || null,
          schoolData.latest.cost.tuition.out_of_state * conversionRates || null,
          schoolData.latest.cost.booksupply * conversionRates || null,
          schoolData.latest.cost.otherexpense.oncampus * conversionRates ||
            null,
          schoolData.latest.cost.otherexpense.offcampus * conversionRates ||
            null,
          schoolData.latest.cost.roomboard.oncampus * conversionRates || null,
          schoolData.latest.cost.roomboard.offcampus * conversionRates || null,
        ].map((value) => value || "No Data Available"), // Ensure consistent fallback
        backgroundColor: [
          "rgba(0, 122, 255, 0.8)", // Blue
          "rgba(255, 165, 0, 0.8)", // Orange
          "rgba(0, 150, 136, 0.8)", // Green
          "rgba(156, 39, 176, 0.8)", // Purple
          "rgba(255, 215, 0, 0.8)", // Yellow
          "rgba(0, 150, 136, 0.8)", // Teal
          "rgba(128, 128, 128, 0.8)", // Grey
        ],
        hoverBackgroundColor: [
          "rgba(0, 162, 255, 0.8)", // Light Blue
          "rgba(255, 195, 0, 0.8)", // Light Orange
          "rgba(0, 190, 176, 0.8)", // Light Green
          "rgba(196, 79, 216, 0.8)", // Light Purple
          "rgba(255, 235, 0, 0.8)", // Light Yellow
          "rgba(0, 190, 176, 0.8)", // Light Teal
          "rgba(168, 168, 168, 0.8)", // Light Grey
        ],
      },
    ],
    options: {
      responsive: true, // Ensure responsiveness
      plugins: {
        legend: {
          display: true,
          position: "top", // Legend displayed at the top
        },
        tooltip: {
          callbacks: {
            label(tooltipItem) {
              const value = tooltipItem.raw;
              return value === "No Data Available"
                ? value
                : `${value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Start y-axis at zero
          title: {
            display: true,
            text: "Cost", // Label for the y-axis
          },
        },
        x: {
          title: {
            display: true,
            text: "Expense Categories", // Label for the x-axis
          },
        },
      },
    },
  };

  const handleCurrencyChange = (currency, conversionRate) => {
    setConversionRates(conversionRate);
    setCurrencySymbol(getCurrencySymbol(currency));
    setCurrencyName(getCurrencyName(currency));
  };

  return (
    <main className="container align-items-center my-4">
      <div className="square rounded border border-2 border-secondary text-center mb-4">
        <h1 className="m-4" style={{ fontSize: "42px" }}>
          {" "}
          {schoolData.school.name}{" "}
        </h1>
        {schoolData.school.alias && (
          <h2 style={{ fontSize: "32px" }}>
            {schoolData.school.alias || "No alias available"} -{" "}
            {schoolData.school.city || "Unknown location"}
          </h2>
        )}
        <div className="text-center my-4">
          <CurrencyConverter onCurrencyChange={handleCurrencyChange} />
          <h2>{currencyName || "Unknown currency"}</h2>
        </div>
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
                schoolData.latest.cost.attendance.academic_year *
                conversionRates
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
                schoolData.latest.cost.tuition.in_state * conversionRates
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
                schoolData.latest.cost.tuition.out_of_state * conversionRates
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
                schoolData.latest.cost.otherexpense.offcampus * conversionRates
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
                schoolData.latest.cost.roomboard.offcampus * conversionRates
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
                  USD : {cardItem.usdValue}
                </Card.Body>
                <Card.Footer style={{ height: "4rem" }}>
                  Exchange : {currencySymbol}
                  {cardItem.exchValue}
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
          className="flex g-4 m-4 justify-content-between"
        >
          <div className="square rounded border border-2 border-secondary text-center">
            {/* Bar Chart */}
            <h1 className="m-4" style={{ fontSize: "42px" }}>
              {schoolData.school.name} Expense Breakdown
            </h1>
            <h2 className="m-4">
              Expense information is provided to help estimate costs and may not
              be available for all expense types. Verify the current data by
              contacting your selected school.
            </h2>
            <Bar
              className="mb-4"
              data={chartSchoolData}
              options={chartSchoolData.options}
            />
          </div>
        </Row>
      </React.Fragment>
    </main>
  );
};

export default Dashboard;
