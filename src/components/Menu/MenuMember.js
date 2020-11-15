import React, { Fragment, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Button,
} from "reactstrap";
import { AuthContext } from "../../App";
function MenuMember() {
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
            <NavLink className="nav-link" to="/dashboard">
              HOME
            </NavLink>
            <NavLink className="nav-link" to="/transaction">
              TRANSACTION
            </NavLink>
          </Nav>
          <NavbarText>
            <Button
              color="danger"
              onClick={() =>
                dispatch({
                  type: "LOGOUT",
                })
              }
            >
              LOGOUT
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </Fragment>
  );
}

export default MenuMember;
