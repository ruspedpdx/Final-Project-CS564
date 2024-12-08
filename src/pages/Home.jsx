import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="text-center my-5 py-5">
      <h2>Welcome to Education Expenses</h2>
      <h4>Your go-to place to search for information about colleges.</h4>

      <div className="mt-4">
        <Link to="/search">
          <Button variant="primary" size="lg" className="mx-2">
            Search by School
          </Button>
        </Link>
        <Link to="/raghad">
          <Button variant="secondary" size="lg" className="mx-2">
            View Schools by State
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
