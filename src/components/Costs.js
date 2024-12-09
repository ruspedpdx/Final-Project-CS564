import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Dropdown, Table, Container } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { getCostOfAttendance } from "../utils/collegeData";

function Costs({ college, currencySymbol, conversionRates }) {
  const costDetails = getCostOfAttendance(college);

  const [residencyStatus, setResidencyStatus] = useState("outOfState");
  const [livingArrangement, setLivingArrangement] = useState("onCampus");

  let costUrl = null;

  if (college?.["school.price_calculator_url"]) {
    costUrl = college["school.price_calculator_url"].startsWith("http")
      ? college["school.price_calculator_url"]
      : `https://${college["school.price_calculator_url"]}`;
  }

  function calculateTotalCost(details, residency, living, conversionRate) {
    let tuition;
    if (residency === "inState") {
      tuition =
        details.inStateTuition !== "N/A" ? details.inStateTuition : null;
    } else {
      tuition =
        details.outOfStateTuition !== "N/A" ? details.outOfStateTuition : null;
    }

    let roomAndBoard;
    if (living === "withFamily") {
      roomAndBoard = 0;
    } else if (living === "offCampus") {
      roomAndBoard =
        details.offCampusRoomAndBoard !== "N/A"
          ? details.offCampusRoomAndBoard
          : null;
    } else {
      roomAndBoard =
        details.onCampusRoomAndBoard !== "N/A"
          ? details.onCampusRoomAndBoard
          : null;
    }

    let otherExpenses;
    if (living === "withFamily") {
      if (details.withFamilyOtherExpenses !== "N/A") {
        otherExpenses = details.withFamilyOtherExpenses;
      } else if (details.offCampusOtherExpenses !== "N/A") {
        otherExpenses = details.offCampusOtherExpenses;
      } else {
        otherExpenses =
          details.onCampusOtherExpenses !== "N/A"
            ? details.onCampusOtherExpenses
            : null;
      }
    } else if (living === "offCampus") {
      if (details.offCampusOtherExpenses !== "N/A") {
        otherExpenses =
          details.offCampusOtherExpenses !== "N/A"
            ? details.offCampusOtherExpenses
            : null;
      } else {
        otherExpenses =
          details.onCampusOtherExpenses !== "N/A"
            ? details.onCampusOtherExpenses
            : null;
      }
    } else {
      otherExpenses =
        details.onCampusOtherExpenses !== "N/A"
          ? details.onCampusOtherExpenses
          : null;
    }

    let booksAndSupplies =
      details.bookAndSupplies !== "N/A" ? details.bookAndSupplies : null;

    if (tuition !== null && !isNaN(tuition)) {
      tuition = Math.round(tuition * conversionRate);
    } else {
      tuition = null;
    }

    if (roomAndBoard !== null && !isNaN(roomAndBoard)) {
      roomAndBoard = Math.round(roomAndBoard * conversionRate);
    } else {
      roomAndBoard = null;
    }

    if (otherExpenses !== null && !isNaN(otherExpenses)) {
      otherExpenses = Math.round(otherExpenses * conversionRate);
    } else {
      otherExpenses = null;
    }

    if (booksAndSupplies !== null && !isNaN(booksAndSupplies)) {
      booksAndSupplies = Math.round(booksAndSupplies * conversionRate);
    } else {
      booksAndSupplies = null;
    }

    let totalCost = 0;
    if (tuition !== null) totalCost += tuition;
    if (roomAndBoard !== null) totalCost += roomAndBoard;
    if (otherExpenses !== null) totalCost += otherExpenses;
    if (booksAndSupplies !== null) totalCost += booksAndSupplies;

    return {
      tuition,
      roomAndBoard,
      otherExpenses,
      booksAndSupplies,
      totalCost,
    };
  }

  const { tuition, roomAndBoard, otherExpenses, booksAndSupplies, totalCost } =
    calculateTotalCost(
      costDetails,
      residencyStatus,
      livingArrangement,
      conversionRates
    );

  const handleResidencyStatusChange = (status) => setResidencyStatus(status);

  const handleLivingArrangementChange = (arrangement) =>
    setLivingArrangement(arrangement);

  const doughnutData = {
    labels: [
      "Tuition",
      "Room and Board",
      "Other Expenses",
      "Books and Supplies",
    ],
    datasets: [
      {
        data: [
          tuition || 0,
          roomAndBoard || 0,
          otherExpenses || 0,
          booksAndSupplies || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / totalCost) * 100).toFixed(2);
            return `${currencySymbol}${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Container className="costs-container mt-4">
      <div className="mb-4">
        <h2>Cost of Attendance</h2>
        {costUrl && (
          <a
            href={costUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            {college["school.name"]} Net Price Calculator
          </a>
        )}
      </div>
      <Row className="mb-4">
        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Residency Status</Card.Title>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-residency">
                  {residencyStatus === "inState"
                    ? "In-State"
                    : "Out-of-State/International"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleResidencyStatusChange("inState")}
                    disabled={costDetails.inStateTuition === "N/A"}
                  >
                    In-State
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleResidencyStatusChange("outOfState")}
                    disabled={costDetails.outOfStateTuition === "N/A"}
                  >
                    Out-of-State/International
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Living Situation</Card.Title>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-living-situation"
                >
                  {(() => {
                    switch (livingArrangement) {
                      case "onCampus":
                        return "On-Campus";
                      case "offCampus":
                        return "Off-Campus";
                      default:
                        return "With Family";
                    }
                  })()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleLivingArrangementChange("onCampus")}
                    disabled={costDetails.onCampusRoomAndBoard === "N/A"}
                  >
                    On-Campus
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleLivingArrangementChange("offCampus")}
                    disabled={costDetails.offCampusRoomAndBoard === "N/A"}
                  >
                    Off-Campus
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => handleLivingArrangementChange("withFamily")}
                  >
                    With Family
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Total Cost of Attendance</Card.Title>
              <Table hover>
                <thead>
                  <tr>
                    <th>Cost Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tuition</td>
                    <td>
                      {tuition !== null
                        ? `${currencySymbol}${tuition.toLocaleString()}`
                        : "Information not available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Room and Board</td>
                    <td>
                      {roomAndBoard !== null
                        ? `${currencySymbol}${roomAndBoard.toLocaleString()}`
                        : "Information not available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Other Expenses</td>
                    <td>
                      {otherExpenses !== null
                        ? `${currencySymbol}${otherExpenses.toLocaleString()}`
                        : "Information not available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Books and Supplies</td>
                    <td>
                      {booksAndSupplies !== null
                        ? `${currencySymbol}${booksAndSupplies.toLocaleString()}`
                        : "Information not available"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>
                        {" "}
                        {totalCost !== null
                          ? `${currencySymbol}${totalCost.toLocaleString()}`
                          : "Information not available"}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col
          md={6}
          sm={12}
          className="d-flex flex-column justify-content-center"
        >
          <Card className="text-center h-100 card-cost">
            <Card.Title className="d-flex flex-column justify-content-start mt-3 pt-3 mb-0 pb-0 ">
              Cost of Attendance
            </Card.Title>
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-primary display-3">
                <strong>
                  {totalCost !== null
                    ? `${currencySymbol}${totalCost.toLocaleString()}`
                    : "Information not available"}
                </strong>
              </h2>
            </Card.Body>
          </Card>
        </Col>

        <Col
          md={6}
          sm={12}
          className="d-flex flex-column justify-content-center"
        >
          <Card className="card-cost">
            <Card.Body className="d-flex justify-content-center">
              <Doughnut data={doughnutData} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

Costs.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
    "latest.cost.tuition.in_state": PropTypes.number,
    "latest.cost.tuition.out_of_state": PropTypes.number,
    "latest.cost.roomboard.oncampus": PropTypes.number,
    "latest.cost.roomboard.offcampus": PropTypes.number,
    "latest.cost.otherexpense.oncampus": PropTypes.number,
    "latest.cost.otherexpense.offcampus": PropTypes.number,
    "latest.cost.otherexpense.withfamily": PropTypes.number,
    "latest.cost.booksupply": PropTypes.number,
    "school.price_calculator_url": PropTypes.string,
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  conversionRates: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    .isRequired,
};

export default Costs;
