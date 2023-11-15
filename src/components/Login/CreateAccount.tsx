import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./createAccount.css";
import "./BackgroundSquares.css";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const { AuthLogin } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = { username, password, email };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Account created successfully");
        const loginData = {
          username,
          password,
        };

        await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        })
          .then((response) => {
            if (response.status === 401) {
              throw new Error("Unauthorized access")
            }

            if (response.ok) {
              return response.json()
            }
          })
          .then((data) => {
            const accessToken = data.access_token

            AuthLogin(username, accessToken)
            setLoginError(false)

            navigate("/")
          })
          .catch((error) => {
            setLoginError(true)
          });
      } else if (response.status === 409) {
        const data = await response.json()
        setError(data.error)
      } else {
        setError("Failed to create account. Please try again later.")
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="sign-in-box">
        <div className="text-center mb-4">
          <h2>Create Account</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}{" "}
        {/* Display error message */}
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ maxWidth: "300px" }}
              isInvalid={!!error}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ maxWidth: "300px" }}
              isInvalid={!!error}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ maxWidth: "300px" }}
              isInvalid={!!error}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
      <div className="squares-background"></div>
    </Container>
  );
};

export default CreateAccount;
