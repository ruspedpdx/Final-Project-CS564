/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import { Card, Col, Row, Spinner, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useApiData from "../hooks/useApiData";
import States from "../components/statesList"; // state list to be used in the search dropdwon

const apiKeyRa = process.env.REACT_APP_API_KEY_RA;
// const apiKeyRa = "Abbvh46FGz2Bhf4Ogu9HoN2arZKxkoJImRk48bRq";

function APIData() {
  const [selectedState, setSelectedState] = useState("OR"); // State for the selected state
  const [url, setUrl] = useState(""); // API URL
  const { data: result, isLoaded, isError } = useApiData(url);
  console.log(result);
  const navigate = useNavigate();

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
  const handleGraphView = () => {
    // Navigate to the graph page or display graph within this page
    navigate("/graph"); // Assuming you have a '/graph' page
  };

  const handleCostDetailsClick = (school) => {
    // Navigate to the Russ page and pass school data
    navigate("/russ", { state: { school } });
  };

  return (
    <main className="container ,m-3, bg-light">
      {/* <div className="d-flex justify-content-between align-items-center"> */}
        <h2 className="text-center p-4 m-4">
          Explore the Top Universities in the USA Sorted by Student Size
        </h2>

        {/* Button to view graph */}
      {/* </div> */}
      {/* State Selector */}
      <div className=" bg-secondary d-flex justify-content-between align-items-center m-3 p-3 border rounded shadow-sm">
        <Button
          variant="light"
          onClick={handleGraphView}
          style={{ width: "300px" }}
        >
          View Graph
        </Button>
        <Form.Select
          className="m-3"
          value={selectedState}
          onChange={handleStateChange}
          aria-label="Select a state"
        >
          <option value="">Select a state</option>
          {States.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="light"
          className="m-2"
          style={{ width: "300px"}}
          onClick={handleClearSelection}
        >
          Reset
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
                      Size:
                      {item.latest.student.size.toLocaleString() ||
                        "Student Size Not Available"}
                    </p>
                    <p>
                      Cost:{" "}
                      {item.latest.cost.attendance.academic_year.toLocaleString() ||
                        "Tuition Info Not Available"}
                    </p>
                  </Card.Text>
                  <Card.Footer
                    className="justify-content-center align-items-center"
                    variant="bottom"
                    style={{ height: "8rem" }}
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

                    <div className="m-2">
                      <Button
                        variant="warning"
                        onClick={() => handleCostDetailsClick(item.school)}
                      >
                        View Cost Details
                      </Button>
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
