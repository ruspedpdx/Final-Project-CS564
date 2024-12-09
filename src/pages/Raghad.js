/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Spinner,
  Form,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useApiData from "../hooks/useApiData";
import States from "../components/statesList"; // Static state list

const apiKeyRa = process.env.REACT_APP_API_KEY_RA;

function APIData() {
  const [selectedState, setSelectedState] = useState("OR"); // Default to Oregon
  const [url, setUrl] = useState("");
  const { data: result, isLoaded, isError } = useApiData(url);

  const navigate = useNavigate();

  // Update the URL whenever the selected state changes
  useEffect(() => {
    if (selectedState) {
      setUrl(
        `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKeyRa}&school.state=${selectedState}&sort=latest.student.size:desc`
      );
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleGraphView = () => {
    navigate("/graphPage", { state: { schools: result.results } });
  };

  const handleCostDetailsClick = (item) => {
    navigate("/dashboard", { state: { school: item } });
  };

  return (
    <main className="bg-light">
      <Container fluid className="py-5">
        <h2 className="text-center mb-4 " style={{ fontSize: "2rem" }}>
          Explore the Largest Schools in the USA
        </h2>
        <p className="text-center text-muted mb-5">
          View schools by enrollment size, tuition cost, and other metrics.
        </p>
        <div className="d-flex flex-wrap justify-content-center align-items-center mb-4 gap-4">
          <Form.Select
            className="form-select-modern"
            value={selectedState}
            onChange={handleStateChange}
            aria-label="Select a state"
            style={{
              width: "550px",
              borderRadius: "30px",
              padding: "10px 15px",
              fontSize: "1rem",
              backgroundColor: "#F9FAFB",
              borderColor: "#CED4DA",
              color: "#495057",
            }}
          >
            <option value="">Select a state</option>
            {States.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center mb-4">
          <Button
            variant="dark"
            className="px-5 py-2 bg-secondary  border-3 border-warning shadow-sm"
            onClick={handleGraphView}
            style={{
              width: "300px",
              borderRadius: "30px",
            }}
          >
            View Graph
          </Button>
        </div>

        {/* Error Handling */}
        {isError && (
          <Alert
            variant="danger"
            className="text-center mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Unable to fetch data! Please try again later.
          </Alert>
        )}

        {/* Loading Spinner */}
        {!isLoaded && url && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" />
            <span className="d-block mt-2">Loading...</span>
          </div>
        )}

        {/* No Results Found */}
        {isLoaded && result && result.results.length === 0 && (
          <Alert
            variant="warning"
            className="text-center mx-auto"
            style={{ maxWidth: "600px" }}
          >
            No universities found for the selected state.
          </Alert>
        )}

        {/* Display Results */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {result?.results?.map((item) => (
            <Col key={item.id}>
              <Card
                className="shadow border-0 h-100"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF", // Clean white
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Header
                    className="text-center py-3"
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      backgroundColor: "#F4F6F8",
                      color: "#212529",
                    }}
                  >
                    <h5 className="mb-0">
                      {item.school.name || "School Name Not Available"}
                    </h5>
                  </Card.Header>
                  <Card.Text className="text-center text-secondary mt-3">
                    <p>City: {item.school.city || "N/A"}</p>
                    <p>
                      Size:{" "}
                      {item.latest.student.size?.toLocaleString() || "N/A"}
                    </p>
                    <p>
                      Cost: $
                      {item.latest.cost.attendance.academic_year?.toLocaleString() ||
                        "N/A"}
                    </p>
                  </Card.Text>
                  <div className="text-center mt-auto">
                    {item.school.school_url ? (
                      <a
                        href={
                          item.school.school_url.startsWith("http")
                            ? item.school.school_url
                            : `http://${item.school.school_url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-link text-primary mb-2"
                        style={{ textDecoration: "none" }}
                      >
                        Visit School Website
                      </a>
                    ) : (
                      <p className="text-muted">No Website Available</p>
                    )}
                    <Button
                      variant="secondary"
                      className="w-100 shadow-sm border-2 border-warning"
                      onClick={() => handleCostDetailsClick(item)}
                      style={{ borderRadius: "30px", width: "300px" }}
                    >
                      View Cost Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default APIData;
