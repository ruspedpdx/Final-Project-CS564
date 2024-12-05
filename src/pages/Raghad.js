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
    setSelectedState("OR"); // Default to oregon
  };
  const handleGraphView = () => {
    // Navigate to the graph page or display graph within this page
    navigate("/graphPage", { state: { schools: result.results } });
  };

  const handleCostDetailsClick = (item) => {
    // Pass the specific 'item' (school) data to the 'russ' page
    navigate("/russ", { state: { school: item } });
  };

  return (
    <main className="gird ">
      <h2 className="text-center  p-2 m-4">
        Explore the Top Universities in the USA Sorted by Student Size
      </h2>
      <div className=" grid-template-columns: 2fr 3fr 2fr bg -dark  m-2">
        {/* Button to view graph */}
        {/* </div> */}
        {/* State Selector */}
        <div className=" bg-black d-flex  shadow-sm">
          <Button
            variant="secondary"
            className="m-3"
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
            variant="secondary"
            className="m-3"
            style={{ width: "300px" }}
            onClick={handleClearSelection}
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Error Handling */}
      {isError && <div>Error: Unable to fetch data!</div>}

      {/* Loading Spinner */}
      {!isLoaded && url && (
        <div className="text-center m-4">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </div>
      )}

      {/* No Results Found */}
      {isLoaded && result && result.length === 0 && (
        <div>No universities found.</div>
      )}

      {/* Display Results */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-5">
        {result &&
          result.results.map((item) => (
            <Col key={item.id}>
              <Card
                border="black"
                className="d-flex m-2"
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
