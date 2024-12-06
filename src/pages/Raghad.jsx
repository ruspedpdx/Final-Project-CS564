/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import { Card, Col, Row, Spinner, Form, Button } from "react-bootstrap";
import useApiData from "../hooks/useApiData";
import States from "../components/statesList"; // state list to be used in the search dropdwon
// import { useNavigate } from "react-router-dom";
const apiKeyRa = process.env.REACT_APP_API_KEY_RA;

function APIData() {
  const [selectedState, setSelectedState] = useState("OR"); // State for the selected state
  const [url, setUrl] = useState(""); // API URL
  const { data: result, isLoaded, isError } = useApiData(url);
  console.log(result);

  // Update the URL whenever the selected state changes
  useEffect(() => {
    if (selectedState) {
      setUrl(
        `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKeyRa}&school.state=${selectedState}&sort=latest.student.size:desc`
      );
    } else {
      setUrl(""); // Clear URL when no state is selected
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value); // Update the selected state
  };

  const handleClearSelection = () => {
    setSelectedState(""); // Clear the selection
  };

  return (
    <main className="container ,m-3, bg-light">
      <h2 className="text-center p-4 m-4">USA Colleges Snapshot </h2>

      {/* State Selector */}
      <div className="mb-3">
        <Form.Select
          value={selectedState}
          onChange={handleStateChange}
          aria-label="Select a state"
        >
          <option value="">Select a state</option>
          {States.map((stateCode) => (
            <option key={stateCode} value={stateCode}>
              {stateCode}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="secondary"
          className="mt-2"
          onClick={handleClearSelection}
        >
          Clear Selection
        </Button>
      </div>

      {/* Error Handling */}
      {isError && <div>Error: Unable to fetch data!</div>}

      {/* Loading Spinner */}
      {!isLoaded && url && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </div>
      )}

      {/* No Results Found */}
      {isLoaded && result && result.length === 0 && (
        <div>No universities found.</div>
      )}

      {/* Display Results */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {result &&
          result.results.map((item) => (
            <Col key={item.id}>
              <Card
                border="black"
                className="d-flex"
                style={{ height: "25rem" }}
              >
                <Card.Body className="text-center" border="dark">
                  <Card.Header
                    className="d-flex justify-content-center align-items-center"
                    variant="top"
                    style={{ height: "8rem" }}
                  >
                    <h5>{item.school.name || "City Not Available"}</h5>
                  </Card.Header>

                  <Card.Text className="m-2" style={{ height: "8rem" }}>
                    <p>
                      City: {item.school.city || "School Name Not Available"}
                    </p>
                    <p>
                      Size:{" "}
                      {item.latest.student.size || "Student Size Not Available"}
                    </p>
                    <p>
                      Cost:{" "}
                      {item.latest.cost.attendance.academic_year ||
                        "Tuition Info Not Available"}
                    </p>
                  </Card.Text>
                  <Card.Footer
                    className="justify-content-center align-items-center"
                    variant="bottom"
                    style={{ height: "6rem" }}
                  >
                    <div>
                      {item.school.school_url ? (
                        <a
                          href={
                            item.school.school_url.startsWith("http://") ||
                            item.school.school_url.startsWith("https://")
                              ? item.school.school_url
                              : `http://${item.school.school_url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit School Website
                        </a>
                      ) : (
                        <p>No Website Available</p>
                      )}
                    </div>
                    <div className="m-3">
                      <p>Cost Details</p>
                      {/* navigate("/dashboard",{School:{}}) */}
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </main>
  );
}

export default APIData;
