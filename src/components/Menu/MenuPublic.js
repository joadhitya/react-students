import React, { Fragment, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { AuthContext } from "../../App";

function MenuPublic() {
    
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { state, dispatch } = useContext(AuthContext);
    return (
        <Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Students React</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem></NavItem>
            </Nav>
            <NavbarText>
                <NavLink to="/login">LOGIN</NavLink>
            </NavbarText>
          </Collapse>
        </Navbar>
      </Fragment>
    )
}

export default MenuPublic
