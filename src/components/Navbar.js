import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavMenu = () => {
  return (
    <Navbar>
      <Container className="d-flex justify-content-center">
        <Nav>
          <Nav.Item>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/SearchPage" className="nav-link">
              Search Page
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/Raghad" className="nav-link">
              Raghad Page
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/Russ" className="nav-link">
              Russ Page
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
