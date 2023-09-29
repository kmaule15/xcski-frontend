import React, { useState } from 'react';
import "./Login.css"
import './BackgroundSquares.css';
import {useAuth} from '../../AuthContext'
import { Container, Form, Button, Image, Alert } from 'react-bootstrap';


const Login = () => {

  const { AuthLogin } = useAuth();
  
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); 


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const data = {
      username,
      password
    };

    
      
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.status === 401) {
          // Handle the 401 Unauthorized error here
          throw new Error('Unauthorized access. Please log in.');
        }
        
        if (response.ok) {
          return response.json(); 
        } 
      })
         .then(data => {
          const accessToken = data.access_token;
        
          AuthLogin(username, accessToken);
          setLoginError(false);

          window.location.href = './';
      }).catch(error => {
        setLoginError(true);
      });     


    
  };

   
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
      {loginError && ( 
          <Alert variant="danger">
            Wrong username or Password
          </Alert>
        )}
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
          
            type="text"
            name="email"
            placeholder="Enter Username"
            style={{ maxWidth: '300px' }}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
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
        <a href="./">Forgot Password?</a>
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
