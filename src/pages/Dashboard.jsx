/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Row, Card, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

const exchangeRate = 1.12;

const testData = [
  {
    id: 1,
    school: {
      name: "Oregon State University",
      city: "Corvallis",
      alias: "OSU",
    },
    latest: {
      cost: {
        attendance: { academic_year: 14000 },
        otherexpense: 1494,
        roomboard: { oncampus: 1946 },
        tuition: {
          in_state: 14946,
          out_of_state: 24946,
        },
      },
    },
  },
];

const Dashboard = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = testData;
        setSchoolData(data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!schoolData || schoolData.length === 0) {
    return <p>No data available.</p>;
  }

  // Data for the chart
  const chartSchoolData = {
    labels: [
      "Academic Year",
      "Other Expenses",
      "Room & Board",
      "Tuition (In-State)",
      "Tuition (Out-of-State)",
    ],
    datasets: [
      {
        data: [
          schoolData[0].latest.cost.attendance.academic_year * exchangeRate,
          schoolData[0].latest.cost.otherexpense * exchangeRate,
          schoolData[0].latest.cost.roomboard.oncampus * exchangeRate,
          schoolData[0].latest.cost.tuition.in_state * exchangeRate,
          schoolData[0].latest.cost.tuition.out_of_state * exchangeRate,
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
      <h1 className="text-center mb-4">School Information</h1>
      {schoolData.map((item) => (
        <React.Fragment key={item.id}>
          {/* Doughnut Chart */}
          <Row xs={1} sm={2} md={2} lg={2} className="g-4 m-4">
            <Col className="border border-secondary text-center">
              <h1> {item.school.name} </h1>
              {item.school.alias && (
                <h2>
                  {item.school.alias || "No alias available"} -{" "}
                  {item.school.city || "Unknown location"}
                </h2>
              )}
            </Col>
            <Col className="border border-secondary text-light">
              <Doughnut data={chartSchoolData} />
            </Col>
          </Row>

          {/* Individual Cards */}
          <Row xs={1} sm={2} md={3} lg={5} className="g-4">
            {[
              {
                label: "Ave Cost Per Year:",
                value: `$${item.latest.cost.attendance.academic_year.toFixed(2)}`,
                exchValue: `$${(item.latest.cost.attendance.academic_year * exchangeRate).toFixed(2)}`,
              },
              {
                label: "Other Expenses:",
                value: `$${item.latest.cost.otherexpense.toFixed(2)}`,
                exchValue: `$${(item.latest.cost.otherexpense * exchangeRate).toFixed(2)}`,
              },
              {
                label: "Room & Board (On Campus):",
                value: `$${item.latest.cost.roomboard.oncampus.toFixed(2)}`,
                exchValue: `$${(item.latest.cost.roomboard.oncampus * exchangeRate).toFixed(2)}`,
              },
              {
                label: "Tuition (In-State):",
                value: `$${item.latest.cost.tuition.in_state.toFixed(2)}`,
                exchValue: `$${(item.latest.cost.tuition.in_state * exchangeRate).toFixed(2)}`,
              },
              {
                label: "Tuition (Out-of-State):",
                value: `$${item.latest.cost.tuition.out_of_state.toFixed(2)}`,
                exchValue: `$${(item.latest.cost.tuition.out_of_state * exchangeRate).toFixed(2)}`,
              },
            ].map((cardItem) => (
              <Col key={cardItem.label}>
                <Card className="d-flex" style={{ height: "12rem" }}>
                  <Card.Header style={{ height: "4rem" }}>
                    {cardItem.label}
                  </Card.Header>
                  <Card.Body style={{ height: "4rem" }}>
                    USD: {cardItem.value}
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
