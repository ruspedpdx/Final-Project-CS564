import React from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import useApiData from "../hooks/useApiData";

const url =
  "https://api.data.gov/ed/collegescorecard/v1/schools?api_key=Abbvh46FGz2Bhf4Ogu9HoN2arZKxkoJImRk48bRq&school.state=OR";
function APIData() {
  const { data: result, isLoaded, isError } = useApiData(url);
  console.log("result", result);
  if (isError) {
    return <div>Error: Unable to fetch data!</div>;
  }
  return (
    <main className="container">
      <h2 className="text-center m-4">`Raghad Page`</h2>

      {/* Loading Spinner */}
      {!isLoaded && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </div>
      )}

      {/* No results found */}
      {isLoaded && result.length === 0 && <div>No universities found.</div>}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {result&& result.results.map((item) => (
          <Col key={item.id}>
            {/* Using a unique key (id) for each item */}
            <Card className="d-flex" style={{ height: "250px" }}>
              <Card.Body className="text-center">
                <Card.Title>
                  {item.school.name || "City Not Available"}
                </Card.Title>

                <Card.Text className="m-2">
                  <p>City: {item.school.city || "School Name Not Available"}</p>
                  <p>
                    Avg Net Price:
                    {item.latest.cost.avg_net_price.overall ||
                      "Tuition Info Not Available"}
                  </p>

                  {/* School website URL */}
                  {item.school.school_url ? (
                    <p>
                      <a
                        href={item.school.school_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit School Website
                      </a>
                    </p>
                  ) : (
                    <p>No Website Available</p>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  );
}

export default APIData;
