import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardImg,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";

const qs = require("querystring");
const api = "http://localhost:5000";

function LoginComp(props) {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    // email: "",
    // password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const stateForm = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialState);
  const [dataForm, setDataForm] = useState(stateForm);
  const handleInputChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
    });

    const requestBody = {
      email: dataForm.email,
      password: dataForm.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(`${api}/auth/api/v1/login`, qs.stringify(requestBody), config)
      .then((res) => {
        if (res.data.success && res.data.isVerified === 1) {
          dispatch({
            type: "LOGIN",
            payload: res.data,
          });
          props.history.push("/dashboard");
        } else if (res.data.success && res.data.isVerified === 0) {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: "Email Not Verified, please check your email!",
          });
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: res.data.message,
          });
        }

        throw res;
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <Container>
        <br />
        <Row>
          <Col>
            <CardImg
              width="100%"
              src="https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            />
          </Col>
          <Col>
            <h1>Login Form</h1>
            <hr />
            <Form onSubmit={handleFormSubmit}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="exampleEmail"
                  placeholder="Input your Email"
                  value={dataForm.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Input your Password"
                  value={dataForm.password}
                  onChange={handleInputChange}
                />
              </FormGroup>
              {data.errorMessage && (
                <Alert color="danger">{data.errorMessage}</Alert>
              )}

              <Button disabled={data.isSubmitting} color="success">
                {data.isSubmitting ? "Loading...." : "Login"}
              </Button>
            </Form>
            <p>
              Register Now! <Link to="/register">Click here to Register.</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default LoginComp;
