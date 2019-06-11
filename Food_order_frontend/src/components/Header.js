import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class Header extends Component {
  render() {
    return (
        <div>
            <Navbar color='primary'>
                <NavbarBrand>Food-Order</NavbarBrand>
            </Navbar>
        </div>

    );
  }
}

export default Header;
