import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Container, Accordion } from "react-bootstrap";
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
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getEnrollmentData,
  getStudentAndFacultyDemographics,
} from "../utils/collegeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CampusLife({ college }) {
  const enrollmentData = getEnrollmentData(college);

  const { gradStudents, totalSize, fullTimeShare, partTimeShare } =
    enrollmentData;

  const men = college["latest.student.demographics.men"];
  const women = college["latest.student.demographics.women"];
  const studentFacultyRatio =
    college["latest.student.demographics.student_faculty_ratio"];

  const malePercentage = Math.round(men * 100);
  const femalePercentage = Math.round(women * 100);

  const { studentDemographics, facultyDemographics } =
    getStudentAndFacultyDemographics(college);

  const getNonResidentAlienCompletionRate = () => {
    const fourYearCompletion =
      college["latest.completion.completion_rate_4yr_150_nonresident.alien"];
    const lessThanFourYearCompletion =
      college["latest.completion.completion_rate_l4yr_150_nonresident.alien"];

    let completionRate = 0;

    if (fourYearCompletion !== null) {
      completionRate = fourYearCompletion * 100;
    } else if (lessThanFourYearCompletion !== null) {
      completionRate = lessThanFourYearCompletion * 100;
    }

    return completionRate;
  };

  const internationalStudentPercentage = Math.round(
    college["latest.student.demographics.race_ethnicity.non_resident_alien"] *
      100 || 0
  );
  const completionRate = getNonResidentAlienCompletionRate();

  const demographicLabels = [
    "White",
    "Black",
    "Hispanic",
    "Asian",
    "American Indian or Alaska Native",
    "Native Hawaiian or Pacific Islander",
    "Two or More",
    "Non-Resident Alien",
    "Unknown",
  ];

  const chartData = (demographics, title) => ({
    labels: demographicLabels,
    datasets: [
      {
        label: title,
        data: Object.values(demographics),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const value = tooltipItem.raw;
              return `${value}%`;
            },
          },
        },
      },
    },
  });

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Campus Life</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>General Information</Accordion.Header>
          <Accordion.Body className="mb-5">
            <Row xs={1} sm={2} md={4} className="g-4">
              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 my-3 py-3">
                  <Card.Body>
                    <Card.Title className="text-primary display-6">
                      <strong>
                        {totalSize ? totalSize.toLocaleString() : "N/A"}
                      </strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>Undergraduate Students</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 my-3 py-3">
                  <Card.Body>
                    <Card.Title className="text-primary display-6">
                      <strong>
                        {gradStudents ? gradStudents.toLocaleString() : "N/A"}
                      </strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>Graduate Students</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 my-3 py-3">
                  <Card.Body>
                    <Card.Title className="text-primary display-6">
                      <strong>{Math.round(fullTimeShare * 100)}%</strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>Full-Time Students</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 my-3 py-3">
                  <Card.Body>
                    <Card.Title className="text-primary display-6">
                      <strong>{Math.round(partTimeShare * 100)}%</strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>Part-Time Students</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            International Students Information
          </Accordion.Header>
          <Accordion.Body className="mb-5">
            <Row xs={1} sm={2} className="g-4">
              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 mt-3 pt-3">
                  <Card.Body className="">
                    <Card.Title>
                      <strong>
                        Enrollment Share of International Students
                      </strong>
                    </Card.Title>
                    <CircularProgressbar
                      value={internationalStudentPercentage}
                      text={`${internationalStudentPercentage}%`}
                      strokeWidth={10}
                      className="progress-bar-international"
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 mt-3 pt-3">
                  <Card.Body className="">
                    <Card.Title>
                      <strong>
                        Completion Rate for International Students
                      </strong>
                    </Card.Title>
                    <CircularProgressbar
                      value={completionRate}
                      text={`${Math.round(completionRate)}%`}
                      strokeWidth={10}
                      className="progress-bar-international"
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Gender and Student-to-Teacher Ratio
          </Accordion.Header>
          <Accordion.Body className="mb-5">
            <Row xs={1} sm={2} className="g-4">
              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 py-4 my-4 card-ratio">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>
                      <strong>Male to Female Student Ratio</strong>
                    </Card.Title>
                    <Card.Text className="display-5 text-primary">
                      <strong>
                        {malePercentage}% | {femalePercentage}%
                      </strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card className="text-center d-flex align-items-center justify-content-center h-100 py-4 my-4 card-ratio">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>
                      <strong>Student-to-Faculty Ratio</strong>
                    </Card.Title>
                    <Card.Text className="display-5 text-primary">
                      <strong>{studentFacultyRatio}:1</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Demographics</Accordion.Header>
          <Accordion.Body className="mb-5">
            <Row xs={1} sm={1} className="g-4">
              <Col>
                <div className="chart-container my-3 py-3">
                  <h3>Student Body Demographics</h3>
                  <Bar
                    data={chartData(
                      studentDemographics,
                      "Percentage of Student Body"
                    )}
                    options={
                      chartData(
                        studentDemographics,
                        "Percentage of Student Body"
                      ).options
                    }
                  />
                </div>
              </Col>

              <Col>
                <div className="chart-container my-3 py-3">
                  <h3>Faculty Demographics</h3>
                  <Bar
                    data={chartData(
                      facultyDemographics,
                      "Percentage of Faculty Members"
                    )}
                    options={
                      chartData(
                        facultyDemographics,
                        "Percentage of Faculty Members"
                      ).options
                    }
                  />
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

CampusLife.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
    "latest.student.grad_students": PropTypes.number.isRequired,
    "latest.student.size": PropTypes.number.isRequired,
    "latest.student.part_time_share": PropTypes.number.isRequired,
    "latest.student.demographics.men": PropTypes.number.isRequired,
    "latest.student.demographics.women": PropTypes.number.isRequired,
    "latest.student.demographics.student_faculty_ratio":
      PropTypes.number.isRequired,
    "latest.completion.completion_rate_4yr_150_nonresident.alien":
      PropTypes.number,
    "latest.completion.completion_rate_l4yr_150_nonresident.alien":
      PropTypes.number,
    "latest.student.demographics.race_ethnicity.non_resident_alien":
      PropTypes.number,
  }).isRequired,
};

export default CampusLife;
