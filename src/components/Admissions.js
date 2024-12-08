import React from "react";
import PropTypes from "prop-types";
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
import { Container, Accordion, Card, Col, Row } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getAdmissionRate,
  getScores,
  getTestScoreRequirement,
} from "../utils/collegeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Admissions({ college }) {
  const admissionRate = getAdmissionRate(
    college["latest.admissions.admission_rate.overall"]
  );
  const scores = getScores(college);

  const satMathReadingData = {
    labels: ["25th Percentile", "50th Percentile", "75th Percentile"],
    datasets: [
      {
        label: "SAT Critical Reading Score",
        data: [
          scores.sat.cr.p25 || null,
          scores.sat.cr.p50 || null,
          scores.sat.cr.p75 || null,
        ],
        backgroundColor: "rgba(0, 123, 255, 0.3)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
        barThickness: 40,
      },
      {
        label: "SAT Math Score",
        data: [
          scores.sat.math.p25 || null,
          scores.sat.math.p50 || null,
          scores.sat.math.p75 || null,
        ],
        backgroundColor: "rgba(0, 123, 255, 1)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  };

  const satCombinedData = {
    labels: ["Average SAT Score"],
    datasets: [
      {
        label: "Average SAT Score",
        data: [scores.sat.avg || null],
        backgroundColor: "rgba(0, 123, 255, 1)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
        barThickness: 60,
      },
    ],
  };

  const actData = {
    labels: ["25th Percentile", "Midpoint", "75th Percentile"],
    datasets: [
      {
        label: "ACT Cumulative Score",
        data: [
          scores.act.cumulative.p25 || null,
          scores.act.cumulative.midpoint || null,
          scores.act.cumulative.p75 || null,
        ],
        backgroundColor: "rgba(0, 123, 255, 0.3)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  };

  const satMathReadingOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 800,
      },
    },
  };

  const satCombinedOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1600,
      },
    },
  };

  const actOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 36,
      },
    },
  };

  return (
    <Container className="admissions-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Admission Information</Accordion.Header>
          <Accordion.Body>
            <Row className="mt-3 mb-4">
              <Col md={6} className="d-flex">
                <Card className="flex-fill">
                  <Card.Body className="text-center">
                    <h3>Admission Rate</h3>
                    <div className="circular-progress-container">
                      <CircularProgressbar
                        value={admissionRate}
                        text={`${admissionRate}%`}
                        strokeWidth={10}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} className="d-flex">
                <Card className="flex-fill">
                  <Card.Body className="d-flex flex-column justify-content-center text-center test-requirement-container">
                    <h3>Test Score Requirement</h3>
                    <p className="my-auto">
                      {getTestScoreRequirement(college)}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Charts Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Test Scores</Accordion.Header>
          <Accordion.Body>
            <div className="chart-container mb-4">
              <h3>SAT Math and Reading Scores</h3>
              <Bar data={satMathReadingData} options={satMathReadingOptions} />
            </div>
            <div className="chart-container mb-4">
              <h3>SAT Scores</h3>
              <Bar data={satCombinedData} options={satCombinedOptions} />
            </div>
            <div className="chart-container mb-4">
              <h3>ACT Scores</h3>
              <Bar data={actData} options={actOptions} />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

Admissions.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
    "latest.admissions.admission_rate.overall": PropTypes.number,
  }).isRequired,
};

export default Admissions;
