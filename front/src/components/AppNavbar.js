import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logout(){
      
      fetch('/api/logout', {
        credentials: 'include',
        method: 'POST',
    }).then(res => res.json())
        .then(response => {
            console.log(response);
            localStorage.removeItem('acesso');
            // this.props.history.push('/');

            let port = (window.location.port ? ':' + window.location.port : '');
            window.location.href = '//' + window.location.hostname + port + '/';
        });
  }

  render() {
    let acesso = localStorage.getItem("acesso");

    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
            { (acesso)?
                <NavItem>
                    <NavLink onClick={this.logout} href="#">logout</NavLink>
                </NavItem>
            :''}  
          <NavItem>
            <NavLink href="https://github.com/tarcisiocardoso/crud_cli_react">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}
