import React, { useState } from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { logout, AuthUsername, isLoggedIn } = useAuth();

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="navbar-custom">
      <Link to="/">
        <Navbar.Brand href="/">
          <img src="/XCSInverted.png" width="250" height="72" alt="logo" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className="nav-link" to="/trailsearch">
            Find a Trail
          </Link>
          <Link className="nav-link" to="/createtrail">
            Create a Trail
          </Link>
          <Link className="nav-link" to="/mytrails">
            My Trails
          </Link>
          <Link className="nav-link" to="/community">
            Community
          </Link>
        </Nav>
        <div className="ms-auto">
          {isLoggedIn ? (
            <NavDropdown
              title={AuthUsername}
              id="basic-nav-dropdown"
              style={{ color: "white" }}
              className="me-3"
            >
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Button variant="outline-light" className=" me-3" href="/login">
                Log in
              </Button>
              <Button variant="danger" className="me-3" href="/createaccount">
                Create Account
              </Button>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
