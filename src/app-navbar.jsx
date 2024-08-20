import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function AppNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ marginLeft: "1.2rem" }}>
        <Navbar.Brand href="#home">T-Mobile Map Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Map Tools" id="basic-nav-dropdown">
              <NavDropdown.Item href="#d3">D3 Visuals</NavDropdown.Item>
              <NavDropdown.Item href="#d3">Heatmap</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
