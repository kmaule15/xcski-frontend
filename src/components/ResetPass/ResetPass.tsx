import React, { useState } from 'react';
import "./ResetPass.css"
import '../Login/BackgroundSquares.css';
import { Container, Form, Button, Image } from 'react-bootstrap';


const ResetPass = () => {

  const [email, setEmail] = useState('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const data = {
      email,
    };

      await fetch('http://localhost:3000/auth/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })    
  };

   
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
    <div className="sign-in-box">
      <div className="text-center mb-4">
        <Image src="./XCS.png" alt="Brand Logo" className="brand-logo"/>
        <h2>Password Reset</h2>
      </div>
      
      <Form onSubmit={handleSubmit} className="mt-4">

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter Email"
            style={{ maxWidth: '300px' }}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    
    </div>
    <div className="squares-background"></div> 
  </Container>
  );
};

export default ResetPass;
