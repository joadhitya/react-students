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

function RegisterComp(props) {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    // email: "",
    // password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const stateForm = {
    username: "",
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
      username: dataForm.username,
      email: dataForm.email,
      password: dataForm.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(`${api}/auth/api/v1/register`, qs.stringify(requestBody), config)
      .then((res) => {
        if (res.data.success && !res.data.isRegistered) {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: "Please check your email to Verifiy your Registration",
          });

          setDataForm({
            ...dataForm,
            username: "",
            email: "",
            password: "",
          });
        } else if (!res.data.success && res.data.isRegistered) {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: "Email already exist",
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
            <h1>Register Form</h1>
            <hr />

            {data.errorMessage && (
              <Alert color="success">{data.errorMessage}</Alert>
            )}
            <Form onSubmit={handleFormSubmit}>
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="exampleUsername"
                  placeholder="Input your Username"
                  value={dataForm.username}
                  onChange={handleInputChange}
                />
              </FormGroup>
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

              <Button disabled={data.isSubmitting} color="success">
                {data.isSubmitting ? "Loading...." : "Register"}
              </Button>
            </Form>
            <p>
              Already have account? <Link to="/login">Sign In!</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default RegisterComp;
