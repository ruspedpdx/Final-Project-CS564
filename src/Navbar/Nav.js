import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavMenu = () => {
  return (
    <Navbar>
      <Container className=" d-flex justify-content-center">
        <Nav>
          <Nav.Link>
            <Link to="/"> Home </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/Dat"> Dat Page </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/Raghad"> Raghad Page </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/Russ"> Russ Page </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavMenu;