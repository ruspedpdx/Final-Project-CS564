/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Row, Card, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

const exchangeRate = 1.12;

// const testData = [
//   {
//     id: 1,
//     school: {
//       name: "Oregon State University",
//       city: "Corvallis",
//       alias: "OSU",
//     },
//     latest: {
//       cost: {
//         attendance: { academic_year: 14000 },
//         otherexpense: 1494,
//         roomboard: { oncampus: 1946 },
//         tuition: {
//           in_state: 14946,
//           out_of_state: 24946,
//         },
//       },
//     },
//   },
// ];

const Dashboard = () => {
  const location = useLocation();
  const schoolData = location.state && location.state.school; // Safely extract school data

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const data = school;
  //         setSchoolData(data);
  //       } catch (error) {
  //         console.error("Error fetching school data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  if (loading) return <p>Loading...</p>;

  if (!schoolData || schoolData.length === 0) {
    return <p>No data available.</p>;
  }

  // Data for the chart
  const chartSchoolData = {
    labels: [
      "Average Annual Cost",
      "Tuition (In-State)",
      "Tuition (Out-of-State)",
      "Other Expenses",
      "Room & Board",
    ],
    datasets: [
      {
        data: [
          schoolData[0].latest.cost.attendance.academic_year * exchangeRate,
          schoolData[0].latest.cost.tuition.in_state * exchangeRate,
          schoolData[0].latest.cost.tuition.out_of_state * exchangeRate,
          schoolData[0].latest.cost.otherexpense * exchangeRate,
          schoolData[0].latest.cost.roomboard.oncampus * exchangeRate,
        ],
        backgroundColor: [
          "#4caf50",
          "#ffeb3b",
          "#2196f3",
          "#ff5722",
          "#9c27b0",
        ],
        hoverBackgroundColor: [
          "#66bb6a",
          "#fff176",
          "#42a5f5",
          "#ff7043",
          "#ba68c8",
        ],
      },
    ],
  };

  return (
    <main className="container align-items-center my-4">
      <h1 className="text-center mb-4">School Expense Information</h1>
      {schoolData.map((item) => (
        <React.Fragment key={item.id}>
          <Row
            xs={1}
            sm={2}
            md={2}
            lg={2}
            className="flex g-4 m-4 p-4 justify-content-between"
          >
            <Card className="square rounded border border-2 border-secondary text-center">
              <h1 className="m-4"> {item.school.name} </h1>
              {item.school.alias && (
                <h2>
                  {item.school.alias || "No alias available"} -{" "}
                  {item.school.city || "Unknown location"}
                </h2>
              )}
            </Card>
            <Card className="square rounded border border-2 border-secondary text-center">
              {/* Doughnut Chart */}
              <h1 className="m-4">{item.school.name} Expense Breakdown</h1>
              <Doughnut className="mb-4" data={chartSchoolData} />
            </Card>
          </Row>

          {/* Individual Cards */}
          <Row xs={1} sm={2} md={3} lg={5} className="g-4">
            {[
              {
                label: "Average Annual Cost:",
                usdValue: `$${item.latest.cost.attendance.academic_year.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                exchValue: `${(
                  item.latest.cost.attendance.academic_year * exchangeRate
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
              {
                label: "Tuition (In-State):",
                usdValue: `$${item.latest.cost.tuition.in_state.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                exchValue: `${(
                  item.latest.cost.tuition.in_state * exchangeRate
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
              {
                label: "Tuition (Out-of-State):",
                usdValue: `$${item.latest.cost.tuition.out_of_state.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                exchValue: `${(
                  item.latest.cost.tuition.out_of_state * exchangeRate
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
              {
                label: "Other Expenses:",
                usdValue: `$${item.latest.cost.otherexpense.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                exchValue: `${(
                  item.latest.cost.otherexpense * exchangeRate
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
              {
                label: "Room & Board:",
                usdValue: `$${item.latest.cost.roomboard.oncampus.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                exchValue: `${(
                  item.latest.cost.roomboard.oncampus * exchangeRate
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
            ].map((cardItem) => (
              <Col key={cardItem.label}>
                <Card
                  className="d-flex text-center"
                  style={{ height: "12rem" }}
                >
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
        </React.Fragment>
      ))}
    </main>
  );
};

export default Dashboard;
