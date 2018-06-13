import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import './navbar.css'
// import logo from './../../logo.svg';

class Navbarr extends Component {
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
        <Navbar color="light" light expand="md">
          <div className="container">
            <NavbarBrand href="/">SheetViewer</NavbarBrand>
            {/* <img src={logo} className="App-logo" alt="logo" width="30" height="30"/> */}
            {/* <span className="badge badge-danger">{this.props.counter}</span> */}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/home/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/makinox">GitHub</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    )
  }
}

export default Navbarr;