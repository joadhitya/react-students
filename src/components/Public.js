import React, { Fragment } from "react";
import { Jumbotron } from "reactstrap";

function Public() {
  return (
    <Fragment>
      <Jumbotron>
        <h1 className="display-3">Home!</h1>
        <p className="lead">
          This is a simple hero unit, a simple Jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-2" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
      </Jumbotron>
    </Fragment>
  );
}

export default Public;
