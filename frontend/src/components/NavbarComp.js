import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarComp = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: "6px" }}
            />
            Crypto DashBoard
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/history">History</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* Navbar ends */}
    </div>
  );
};

export default NavbarComp;
