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
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getAdmissionRate, getScores } from "../utils/collegeData";

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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "SAT Math Score",
        data: [
          scores.sat.math.p25 || null,
          scores.sat.math.p50 || null,
          scores.sat.math.p75 || null,
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const satCombinedData = {
    labels: ["Total SAT Score"],
    datasets: [
      {
        label: "Combined SAT Score",
        data: [scores.sat.avg || null],
        backgroundColor: "rgba(255, 159, 64, 1)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
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
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for each chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Score Percentiles",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 800, // Default max for SAT individual scores
      },
    },
  };

  const satCombinedOptions = {
    ...options,
    scales: {
      y: {
        beginAtZero: true,
        max: 1600, // Max for Combined SAT score
      },
    },
  };

  const actOptions = {
    ...options,
    scales: {
      y: {
        beginAtZero: true,
        max: 36, // Max for ACT score range
      },
    },
  };

  return (
    <Container className="admissions-container">
      <h2>Admissions</h2>
      <Row>
        {/* Right Column: Admission Rate and Combined SAT */}
        <Col md={4}>
          <div className="circular-progress-container mb-4">
            <h3>Admission Rate</h3>
            <CircularProgressbar
              value={admissionRate}
              text={`${admissionRate}%`}
              strokeWidth={10}
            />
          </div>
        </Col>
        {/* Left Column: SAT Math/Reading and ACT Charts */}
        <Col md={8}>
          <h3>SAT Math and Reading Scores</h3>
          <Bar data={satMathReadingData} options={options} />
        </Col>
      </Row>

      <Row>
        {/* Right Column: Admission Rate and Combined SAT */}
        <Col md={4} className="d-flex flex-column">
          <h3>Combined SAT Scores</h3>
          <Bar data={satCombinedData} options={satCombinedOptions} />
        </Col>
        {/* Left Column: SAT Math/Reading and ACT Charts */}
        <Col md={8}>
          <h3>ACT Scores</h3>
          <Bar data={actData} options={actOptions} />
        </Col>
      </Row>

      {/* Footer Note */}
      <Row className="mt-4">
        <Col>
          <p>
            To apply to {college["school.name"]}, prospective students must
            submit an application through the online portal, including necessary
            documentation such as transcripts and test scores.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

Admissions.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
    "latest.admissions.admission_rate.overall": PropTypes.number.isRequired,
  }).isRequired,
};

export default Admissions;
