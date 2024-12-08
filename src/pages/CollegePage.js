/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import useApiData from "../hooks/useApiData";
import buildSearchByNameUrl from "../utils/buildUrl";
import Overview from "../components/Overview";
import Admissions from "../components/Admissions";
import Academics from "../components/Academics";
import Costs from "../components/Costs";
import CampusLife from "../components/CampusLife";
import getCurrencySymbol from "../utils/currencySymbol";
import CurrencyConverter from "../components/currencyConverterSmall";
import { getSpecialDesignations } from "../utils/collegeData";

function CollegePage() {
  const { name, id } = useParams();
  const [conversionRates, setConversionRates] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState(
    getCurrencySymbol("USD")
  ); // Default symbol
  const decodedName = decodeURIComponent(name.replace(/-/g, " "));

  const fields = [
    "school.name",
    "school.alias",
    "school.city",
    "school.state",
    "school.school_url",
    "school.price_calculator_url",
    "school.locale",
    "school.degrees_awarded.highest",
    "school.degrees_awarded.predominant",
    "school.carnegie_basic",
    "school.carnegie_size_setting",
    "school.ownership_peps",
    "school.minority_serving.historically_black",
    "school.minority_serving.predominantly_black",
    "school.minority_serving.annh",
    "school.minority_serving.tribal",
    "school.minority_serving.aanipi",
    "school.minority_serving.hispanic",
    "school.minority_serving.nant",
    "school.men_only",
    "school.women_only",
    "school.religious_affiliation",
    "latest.student.size",
    "latest.cost.tuition.in_state",
    "latest.cost.tuition.out_of_state",
    "latest.cost.attendance.academic_year",
    "latest.cost.attendance.program_year",
    "latest.cost.avg_net_price.public",
    "latest.cost.avg_net_price.private",
    "latest.completion.completion_rate_4yr_150nt",
    "latest.completion.completion_rate_less_than_4yr_150nt",
    "latest.admissions",
    "latest.cost",
    "latest.student",
    "student",
    "latest.completion.completion_rate_4yr_150_nonresident.alien",
    "latest.completion.completion_rate_l4yr_150_nonresident.alien",
    "latest.academics",
    "latest.earnings.10_yrs_after_entry.median",
    "latest.earnings.10_yrs_after_entry.consumer.median_by_pred_degree",
    "latest.academics.program.program_percentage.legal",
    "latest.academics.program.program_percentage.health",
    "latest.academics.program.program_percentage.english",
    "latest.academics.program.program_percentage.history",
    "latest.academics.program.program_percentage.library",
    "latest.academics.program.program_percentage.computer",
    "latest.academics.program.program_percentage.language",
    "latest.academics.program.program_percentage.military",
    "latest.academics.program.program_percentage.education",
    "latest.academics.program.program_percentage.resources",
    "latest.academics.program.program_percentage.biological",
    "latest.academics.program.program_percentage.humanities",
    "latest.academics.program.program_percentage.psychology",
    "latest.academics.program.program_percentage.agriculture",
    "latest.academics.program.program_percentage.engineering",
    "latest.academics.program.program_percentage.mathematics",
    "latest.academics.program.program_percentage.architecture",
    "latest.academics.program.program_percentage.construction",
    "latest.academics.program.program_percentage.communication",
    "latest.academics.program.program_percentage.social_science",
    "latest.academics.program.program_percentage.transportation",
    "latest.academics.program.program_percentage.multidiscipline",
    "latest.academics.program.program_percentage.physical_science",
    "latest.academics.program.program_percentage.personal_culinary",
    "latest.academics.program.program_percentage.visual_performing",
    "latest.academics.program.program_percentage.business_marketing",
    "latest.academics.program.program_percentage.science_technology",
    "latest.academics.program.program_percentage.philosophy_religious",
    "latest.academics.program.program_percentage.precision_production",
    "latest.academics.program.program_percentage.engineering_technology",
    "latest.academics.program.program_percentage.ethnic_cultural_gender",
    "latest.academics.program.program_percentage.family_consumer_science",
    "latest.academics.program.program_percentage.parks_recreation_fitness",
    "latest.academics.program.program_percentage.security_law_enforcement",
    "latest.academics.program.program_percentage.communications_technology",
    "latest.academics.program.program_percentage.mechanic_repair_technology",
    "latest.academics.program.program_percentage.theology_religious_vocation",
    "latest.academics.program.program_percentage.public_administration_social_service",
  ]; // Specify the fields you want to fetch

  const url = buildSearchByNameUrl({ decodedName, id, fields }); // Build the URL dynamically
  const { data, isLoaded, error } = useApiData(url); // Fetch data with the constructed URL
  const navigate = useNavigate();

  const handleCurrencyChange = (currency, conversionRate) => {
    setConversionRates(conversionRate);
    setCurrencySymbol(getCurrencySymbol(currency));
  };

  const [key, setKey] = useState("overview");

  const college = data && data.results ? data.results[0] : null;

  let schoolUrl = null;

  if (college?.["school.school_url"]) {
    schoolUrl = college["school.school_url"].startsWith("http")
      ? college["school.school_url"]
      : `https://${college["school.school_url"]}`;
  }

  const designations = college ? getSpecialDesignations(college) : [];

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center full-page">
        <div className="text-center">
          <p>Error: {error}</p>
          <Button variant="primary" onClick={() => navigate("/search")}>
            Go Back to Search
          </Button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="full-page">
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="full-page">
        <div className="text-center">
          <p>No data found for this college.</p>
          <Button variant="primary" onClick={() => navigate("/search")}>
            Go Back to Search
          </Button>
        </div>
      </div>
    );
  }

  if (data.results.length > 1) {
    return (
      <div className="full-page">
        <div className="text-center">
          <p>Too many matches found. Please refine your search.</p>
          <Button variant="primary" onClick={() => navigate("/search")}>
            Go Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <header className="bg-light college-header">
        <Container>
          <Row>
            <Col xs={12} className="d-flex justify-content-between mt-3 pt-3">
              <Button
                variant="outline-primary"
                onClick={() => navigate("/search")}
                className="d-flex align-items-center"
              >
                <FaSearch className="me-2" />
                Back to Search
              </Button>
              <CurrencyConverter onCurrencyChange={handleCurrencyChange} />
            </Col>
            <Col className="text-start mt-3 pt-3">
              <h1 className="display-4 fw-bold mt-3 pt-3 mb-0 pb-0">
                {college["school.name"]}
              </h1>
              <p className="lead text-mute">
                {college["school.city"]}, {college["school.state"]}
              </p>
              {schoolUrl && (
                <a
                  href={schoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  Visit School Website
                </a>
              )}
              <section className="my-3 py-3">
                {designations.hasDesignation === 1 ? (
                  <>
                    <p>
                      <strong>Special Designation:</strong>
                    </p>
                    {designations.specialDesignations.length > 0 &&
                      designations.specialDesignations.map((designation) => (
                        <p key={designation}>{designation}</p>
                      ))}
                    {designations.genderStatus !== "Coed" && (
                      <p>{designations.genderStatus}</p>
                    )}
                    {designations.religiousAffiliation !== "None" && (
                      <p>{designations.religiousAffiliation}</p>
                    )}
                  </>
                ) : null}
              </section>
            </Col>
          </Row>
        </Container>
      </header>
      <main className="">
        <Container>
          <Tabs
            id="college-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="overview" title="Overview">
              <Overview
                college={college}
                currencySymbol={currencySymbol}
                conversionRates={conversionRates}
              />
            </Tab>
            <Tab eventKey="admissions" title="Admissions">
              <Admissions college={college} />
            </Tab>
            <Tab eventKey="academics" title="Academics">
              <Academics
                college={college}
                currencySymbol={currencySymbol}
                conversionRates={conversionRates}
              />
            </Tab>
            <Tab eventKey="costs" title="Costs">
              <Costs
                college={college}
                currencySymbol={currencySymbol}
                conversionRates={conversionRates}
              />
            </Tab>
            <Tab eventKey="campusLife" title="Campus Life">
              <CampusLife college={college} />
            </Tab>
          </Tabs>
        </Container>
      </main>
    </div>
  );
}

export default CollegePage;
