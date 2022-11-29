import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { register } from "../actions/userActions";
import styled from 'styled-components'
import { Box } from "@mui/material";

function RegisterScreen({ location, history }) {
  /* STATE */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error } = userRegister;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR REGISTER */
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} style={{zIndex : 2}}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3"  style={{zIndex : 2}}>
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col style={{zIndex : 2}}>
          Have an Account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
      <ColorBarContainer>
        <ColorBar color={`#e91e63`}></ColorBar>
        <ColorBar color={`#f44336`}></ColorBar>
        <ColorBar color={`#cddc39`}></ColorBar>
        <ColorBar color={`green`}></ColorBar>
        <ColorBar color={`#360ef7`}></ColorBar>
      </ColorBarContainer>
    </FormContainer>
  );
}


const ColorBar = styled(Box)`
  background : ${(props) => props.color} ;
  opacity : .2;
  width : 100vh ;
  height : 15px ;
  margin-top : 10px ;
  @media screen and (min-width : 1000px){
    width : 100vw ;
  }
`

const ColorBarContainer = styled(Box)`
  position : fixed ;
  top: 35vh ;
  left : 0;
  z-index: 0 ;
  transform : rotate(295deg);
`

export default RegisterScreen;
