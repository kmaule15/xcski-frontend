import React, { useState } from 'react';
import "./Login.css"
import './BackgroundSquares.css';
import { Container, Form, Button, Image } from 'react-bootstrap';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const data = {
      username,
      password
    };

    try {
      
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Account is verified
        console.log('Account verified and logged in successfully!');
      } else {
        // Account verification failed
        console.error('Account verification failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

    //unsure if want to keep forms or convert
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
    <div className="sign-in-box">
      <div className="text-center mb-4">
        <Image
          src="./XCS.png" 
          alt="Brand Logo"
          className="brand-logo"
        />
        <h2>Sign In</h2>
      </div>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email or username"
            style={{ maxWidth: '300px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            style={{ maxWidth: '300px' }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
      <div className="text-center mt-3">
        <a href="#">Forgot Password?</a>
      </div>
      <div className="text-center mt-3">
        <span>Don't have an account?</span>{' '}
        <a href="./signup">Sign Up</a>
      </div>
    </div>
    <div className="squares-background"></div> 
  </Container>
  );
};

export default Login;
