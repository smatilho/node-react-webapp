import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button
} from "reactstrap";
import "../App.css";

class NavbarMain extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar
          color="dark"
          dark
          expand="lg"
        >
          <Container fluid>  
            <div className="brand-centered">
            <NavbarBrand className="navbar-brand" href="/">Splunk Self-Service Dashboard</NavbarBrand>
            </div>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="brand-centered" navbar>
                <NavItem>
                  <NavLink href="#testSectionBody">Pull Roles</NavLink>
                </NavItem>
                <Button color="success" type="button" href="Login">Login</Button>{" "}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavbarMain;
