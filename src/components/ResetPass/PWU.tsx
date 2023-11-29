import { useParams } from "react-router-dom";
import { Container, Form, Button, Image, Alert } from "react-bootstrap";
import { useState } from "react";

const PWU = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [DoNotMatch, setMessage] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage(true);
      return;
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/resetpassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, confirmPassword }),
          }
        );

        if (response.ok) {
          setMessage(false);
          window.location.href = "/login";
        }
      } catch (error) {}
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="sign-in-box">
        <div className="text-center mb-4">
          <Image src="/XCS.png" alt="Brand Logo" className="brand-logo" />
          <h2>Password Reset</h2>
        </div>

        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Group>

          {DoNotMatch && <Alert variant="danger"> Passwords don't match</Alert>}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="squares-background"></div>
    </Container>
  );
};
export default PWU;
