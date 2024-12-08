import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaUniversity,
  FaBuilding,
  FaUsers,
  FaMoneyBill,
  FaGraduationCap,
} from "react-icons/fa";
import {
  getSchoolType,
  getOwnershipType,
  getDegreeType,
  getCampusLocale,
  getSchoolSize,
  getTotalCost,
  getCompletionRate,
  getSpecialDesignations,
  getAdmissionRate,
} from "../utils/collegeData";

function Overview({ college, currencySymbol, conversionRates }) {
  const schoolType = getSchoolType(college["school.carnegie_size_setting"]);
  const ownershipType = getOwnershipType(college["school.ownership_peps"]);
  const degreeType = getDegreeType(
    college["school.degrees_awarded.predominant"]
  );
  const campusLocale = getCampusLocale(college["school.locale"]);
  const schoolSize = getSchoolSize(college["school.carnegie_size_setting"]);
  const costDetails = getTotalCost({
    inState: college["latest.cost.tuition.in_state"],
    outOfState: college["latest.cost.tuition.out_of_state"],
    academicYear: college["latest.cost.attendance.academic_year"],
    programYear: college["latest.cost.attendance.program_year"],
  });
  const completionRate = getCompletionRate({
    rate4yr: college["latest.completion.completion_rate_4yr_150nt"],
    rateLess4yr:
      college["latest.completion.completion_rate_less_than_4yr_150nt"],
  });
  const admissionRateNumber = getAdmissionRate(
    college["latest.admissions.admission_rate.overall"]
  );
  const admissionRate =
    admissionRateNumber === "N/A" ? "N/A" : `${admissionRateNumber}%`;

  const designations = getSpecialDesignations(college);
  let genderStatus = "This coed college";

  if (designations.genderStatus === "Men-only") {
    genderStatus = "This men's college";
  } else if (designations.genderStatus === "Women-only") {
    genderStatus = "This women's college";
  }

  let campusSetting = campusLocale.type.toLowerCase();

  if (campusSetting === "N/A") {
    campusSetting = "N/A";
  } else if (campusSetting === "city") {
    campusSetting = "an urban";
  } else {
    campusSetting = `a ${campusSetting}`;
  }

  return (
    <Container className="text-start">
      <Row>
        <Col>
          <h2 className="my-3 pb-3">Overview</h2>
          <Container>
            {/* School type and ownership */}
            <Row className="d-flex flex-wrap justify-content-between gap-4 mb-3">
              <Col sm={6} md={4} className="d-flex align-items-center mb-3">
                <FaUniversity className="me-3" size={30} />
                <div className="d-flex flex-column text-start">
                  <span>Type</span>
                  <strong>
                    {schoolType || "N/A"} {schoolType && " | "}{" "}
                    {ownershipType || "N/A"}
                  </strong>
                </div>
              </Col>

              {/* Most common type of degree */}
              <Col sm={6} md={4} className="d-flex align-items-center mb-3">
                <span className="me-3">{degreeType.icon}</span>
                <div className="d-flex flex-column text-start hover-container">
                  <span>Degree Type</span>
                  <strong className="d-inline-block position-relative">
                    {degreeType.type || "N/A"}
                    {degreeType.description && (
                      <div className="hover-description">
                        {degreeType.description}
                      </div>
                    )}
                  </strong>
                </div>
              </Col>

              <Col className="d-none d-lg-block" />

              {/* Location */}
              <Col sm={6} md={4} className="d-flex align-items-center mb-3">
                <FaBuilding className="me-3" size={30} />
                <div className="d-flex flex-column text-start hover-container">
                  <span>Campus</span>
                  <strong className="d-inline-block position-relative">
                    {campusLocale.type || "N/A"}
                    {campusLocale.description && (
                      <div className="hover-description">
                        {campusLocale.description}
                      </div>
                    )}
                  </strong>
                </div>
              </Col>

              {/* Student size */}
              <Col sm={6} md={4} className="d-flex align-items-center mb-3">
                <FaUsers className="me-3" size={30} />
                <div className="d-flex flex-column text-start hover-container">
                  <span>School Size</span>
                  <strong className="d-inline-block position-relative">
                    {schoolSize.type || "N/A"}
                    {schoolSize.description && (
                      <div className="hover-description">
                        {schoolSize.description}
                      </div>
                    )}
                  </strong>
                </div>
              </Col>

              <Col className="d-none d-lg-block" />

              {/* Total cost */}
              <Col sm={6} md={4} className="d-flex align-items-center mb-3">
                <FaMoneyBill className="me-3 hover-icon" size={30} />
                <div className="d-flex flex-column text-start hover-container">
                  <span>Total Cost</span>
                  <strong className="d-inline-block position-relative">
                    {costDetails.cost !== "N/A"
                      ? `${currencySymbol}${Math.round(costDetails.cost * conversionRates).toLocaleString()}`
                      : "N/A"}
                    {costDetails.description && (
                      <div className="hover-description">
                        {costDetails.description}
                      </div>
                    )}
                  </strong>
                </div>
              </Col>

              {/* Completion rate */}
              <Col sm={6} md={4} className="d-flex align-items-center mb-3">
                <FaGraduationCap className="me-3 hover-icon" size={30} />
                <div className="d-flex flex-column text-start hover-container">
                  <span>Completion Rate</span>
                  <strong className="d-inline-block position-relative">
                    {!completionRate.rate.isNaN && completionRate.rate !== "N/A"
                      ? `${completionRate.rate}%`
                      : "N/A"}
                    {completionRate.description && (
                      <div className="hover-description">
                        {completionRate.description}
                      </div>
                    )}
                  </strong>
                </div>
              </Col>

              <Col className="d-none d-lg-block" />
            </Row>
          </Container>
        </Col>
      </Row>
      <hr />
      <Row>
        <p>
          {college["school.name"] &&
          college["school.city"] &&
          college["school.state"] &&
          schoolSize.type !== "N/A" &&
          schoolSize.residency !== "N/A" &&
          schoolType !== "N/A" &&
          ownershipType !== "N/A" &&
          admissionRate !== "N/A" &&
          completionRate !== "N/A" &&
          campusSetting !== "N/A" ? (
            <>
              {college["school.name"]} is a{" "}
              {schoolSize.type.replace("Very ", "").toLowerCase()},{" "}
              {schoolType.toLowerCase()}, {ownershipType.toLowerCase()}{" "}
              {schoolType === "2-Year" ? "college" : "university"} in{" "}
              {college["school.city"]}, {college["school.state"]}.{" "}
              {genderStatus} is located in {campusSetting} setting and{" "}
              {schoolSize.residency} This college has an acceptance rate of{" "}
              {admissionRate} and a graduation rate of{" "}
              {!completionRate.rate.isNaN && completionRate.rate !== "N/A"
                ? `${completionRate.rate}%`
                : "N/A"}
              .
            </>
          ) : null}
        </p>
      </Row>
    </Container>
  );
}

Overview.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
    "school.city": PropTypes.string.isRequired,
    "school.state": PropTypes.string.isRequired,
    "school.carnegie_size_setting": PropTypes.number.isRequired,
    "school.ownership_peps": PropTypes.number.isRequired,
    "school.degrees_awarded.predominant": PropTypes.number.isRequired,
    "school.locale": PropTypes.number.isRequired,
    "latest.cost.tuition.in_state": PropTypes.number,
    "latest.cost.tuition.out_of_state": PropTypes.number,
    "latest.cost.attendance.academic_year": PropTypes.number,
    "latest.cost.attendance.program_year": PropTypes.number,
    "latest.completion.completion_rate_4yr_150nt": PropTypes.number,
    "latest.completion.completion_rate_less_than_4yr_150nt": PropTypes.number,
    "latest.admissions.admission_rate.overall": PropTypes.number,
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  conversionRates: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    .isRequired,
};

export default Overview;
