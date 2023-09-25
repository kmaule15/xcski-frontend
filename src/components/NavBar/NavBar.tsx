import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const NavBar = () => {
  return (


<Navbar bg="dark" expand="lg" variant="dark" className="navbar-custom">
<Navbar.Brand href="/"><img
              src="/XCSInverted.png"
              width="250"
              height="72"
              alt= "logo"
            /></Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="ml-auto">
    <Nav.Link href="trailsearch">Find a Trail</Nav.Link>
    <Nav.Link href="mytrails">My Trails</Nav.Link>
    <Nav.Link href="community">Community</Nav.Link>
  </Nav>
  <div className="ms-auto">
  <Button variant="outline-light" className=" me-3" href="login">Log in</Button>
  <Button variant="danger" className="me-3" href='createaccount'>Create Account</Button>
  </div>
</Navbar.Collapse>
</Navbar>
  );
};

export default NavBar;
