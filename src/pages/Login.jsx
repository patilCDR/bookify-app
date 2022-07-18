import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import { useFirebase } from "../context/Firebase";

const LoginPage = () => {
  const firebase = useFirebase("");
  const navigate = useNavigate("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //if the user already loged in  redirect to the homepage , if not it'll ask to login in login page
  useEffect(() => {
    if (firebase.isLoggedIn) {
      //  navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login a user..");
    const result = await firebase.signinUserWithEmailAndPass(email, password);
    console.log("Successfull", result);
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      //signin with Google
      <h1 className="mt-5 mb-5">OR</h1>
      <Button onClick={firebase.signinWithGoogle} variant="danger">
        Sign in with Google
      </Button>
    </div>
  );
};

export default LoginPage;
