import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import { AuthContext } from "../../App";

function RoleStaff() {
    const { state, dispatch } = useContext(AuthContext);
    
  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Jumbotron>
      <h1 className="display-3">RoleStaff {state.role} !{state.user} </h1>
      <p className="lead">
        This is a simple hero unit, a simple Jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-2" />
      <p>
        It uses utility classes for typography and spacing to space content out
        within the larger container.
      </p>
    </Jumbotron>
  );
}


export default RoleStaff