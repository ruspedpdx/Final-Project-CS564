import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Pagination,
  Form,
  InputGroup,
  Container,
  Spinner,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import useApiData from "../hooks/useApiData";
import buildSearchByNameUrl from "../utils/buildUrl";

function SearchPage() {
  const [schoolName, setSchoolName] = useState("");
  const [url, setUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const { data, isLoaded, error } = useApiData(url);
  const handleInputChange = (e) => {
    setSchoolName(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUrl = buildSearchByNameUrl({ name: schoolName });
    setUrl(newUrl);
    setCurrentPage(1);
    setShowResults(true);
  };

  const handlePagination = (newPage) => {
    setCurrentPage(newPage);
    const newUrl = buildSearchByNameUrl({
      name: schoolName,
      page: newPage,
    });
    setUrl(newUrl);
    setShowResults(true);
  };

  const {
    page,
    total: totalResults,
    per_page: resultsPerPage,
  } = data?.metadata || {};
  const lastPage = Math.ceil(totalResults / resultsPerPage);

  // Automatically navigate to college page if there is one match
  useEffect(() => {
    if (isLoaded && data && data.results.length === 1) {
      const { "school.name": collegeName, id } = data.results[0];
      navigate(`/college/${id}/${collegeName.toLowerCase()}`);
    }
  }, [data, isLoaded, navigate]);

  const renderSearchResults = () => {
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

    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
        </div>
      );
    }

    if (data.results.length === 0) {
      return (
        <div>
          <p>No College Found</p>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-3">
          <p>
            Showing {(page + 1) * resultsPerPage - resultsPerPage + 1} to{" "}
            {Math.min((page + 1) * resultsPerPage, totalResults)} of{" "}
            {totalResults} results.
          </p>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 m-5 px-5 m-sm-0">
          {data.results.map((college) => {
            const {
              "school.name": name,
              "school.city": city,
              "school.state": state,
              id,
            } = college;

            return (
              <Col key={id}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <a
                      href={`/college/${id}/${name.toLowerCase()}`}
                      className="card-title text-decoration-none fw-bold mt-5"
                    >
                      {name}
                    </a>
                    <Card.Subtitle className="mb-5 text-muted">
                      {city}, {state}
                    </Card.Subtitle>
                    <div className="flex-grow-1" />{" "}
                    <Button
                      variant="primary"
                      onClick={() =>
                        navigate(`/college/${id}/${name.toLowerCase()}`)
                      }
                    >
                      View College
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        {/* Pagination Controls */}
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First
              onClick={() => handlePagination(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Item disabled>
              {currentPage} of {lastPage}{" "}
            </Pagination.Item>
            <Pagination.Next
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === lastPage}
            />
            <Pagination.Last
              onClick={() => handlePagination(lastPage)}
              disabled={currentPage === lastPage}
            />
          </Pagination>
        </div>
      </div>
    );
  };

  return (
    <Container className="mt-5 bg-light">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">Search for a School</h1>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="search-icon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter school name"
                value={schoolName}
                onChange={handleInputChange}
              />
            </InputGroup>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      {showResults && renderSearchResults()}
    </Container>
  );
}

export default SearchPage;
