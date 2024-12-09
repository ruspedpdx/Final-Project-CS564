import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="shadow-sm bg-light border-2 border-secondary text-center my-5 py-5">
      <h2>Welcome to Education Expenses</h2>
      <h3>Your go-to place to search for information about colleges.</h3>

      <div className="d-flex flex-wrap justify-content-center align-items-center m-5 gap-4">
        <Link as={Link} to="/search">
          <Button
            variant="secondary"
            className="w-200 shadow-sm border-2 border-warning"
            style={{ borderRadius: "30px", width: "300px" }}
          >
            Search by School
          </Button>
        </Link>
        <Link as={Link} to="/searchByState">
          <Button
            variant="secondary"
            className="w-200 shadow-sm border-2 border-warning"
            style={{ borderRadius: "30px", width: "300px" }}
          >
            Search by State
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
